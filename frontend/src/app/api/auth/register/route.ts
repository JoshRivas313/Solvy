import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, fullName } = await req.json();

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { message: "Nombre, email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        return NextResponse.json(
          { message: "Este correo ya está registrado" },
          { status: 409 }
        );
      }
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (!data.session) {
      // Supabase envió email de confirmación (si está activado en el proyecto)
      return NextResponse.json({
        message: "Revisa tu correo para confirmar tu cuenta",
        requiresConfirmation: true,
      });
    }

    const user = data.user!;
    const token = data.session.access_token;

    return NextResponse.json({
      token,
      userId: user.id,
      email: user.email,
      fullName: user.user_metadata?.full_name ?? fullName,
    });
  } catch {
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
