import { RegisterForm } from "@/features/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-8 py-10">
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-2xl font-bold text-brand-900">Solvy</span>
        </div>
      </div>
      <RegisterForm />
    </div>
  );
}
