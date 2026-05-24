import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAuthClient(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
}

// POST /api/goals/[id]/deposits — registrar aporte
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }
  const token = auth.substring(7);
  const { id: goalId } = await params;
  const supabase = getAuthClient(token);

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const amount = Number(body.amount);
  if (!amount || amount <= 0) {
    return NextResponse.json({ message: "Monto inválido" }, { status: 400 });
  }

  // Insertar depósito (el trigger de Supabase actualiza current_amount en goals)
  const { data, error } = await supabase
    .from("deposits")
    .insert({ goal_id: goalId, user_id: user.id, amount })
    .select()
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  return NextResponse.json({
    id: data.id,
    amount: Number(data.amount),
    date: data.created_at,
  });
}
