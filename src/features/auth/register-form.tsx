"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Field } from "@/components/ui/field";
import { Btn } from "@/components/ui/btn";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  name:     z.string().min(2, "Ingresa tu nombre"),
  email:    z.string().email("Ingresa un correo válido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export function RegisterForm() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [serverError, setServerError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.name },
      },
    });

    if (error) {
      setServerError(error.message === "User already registered"
        ? "Ya existe una cuenta con ese correo"
        : "Error al crear la cuenta. Inténtalo de nuevo.");
      return;
    }

    router.push("/onboarding");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-neutral-900">Crea tu cuenta</h1>
        <p className="text-sm text-neutral-500">Empieza tu camino financiero hoy</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Field
          label="Nombre completo"
          type="text"
          placeholder="Juan Pérez"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Field
          label="Correo electrónico"
          type="email"
          placeholder="tu@correo.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="relative">
          <Field
            label="Contraseña"
            type={showPass ? "text" : "password"}
            placeholder="Mínimo 6 caracteres"
            autoComplete="new-password"
            error={errors.password?.message}
            className="pr-11"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-[38px] text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <Field
          label="Confirmar contraseña"
          type="password"
          placeholder="Repite tu contraseña"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {serverError && (
          <p className="text-sm text-red-500 text-center">{serverError}</p>
        )}

        <Btn type="submit" loading={isSubmitting} className="w-full mt-2" size="lg">
          Crear cuenta
        </Btn>
      </form>

      <p className="text-center text-sm text-neutral-500">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="text-primary-600 font-semibold hover:underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
