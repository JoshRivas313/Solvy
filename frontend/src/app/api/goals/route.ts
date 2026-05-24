import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/** Crea un cliente Supabase autenticado con el JWT del usuario */
function getAuthClient(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    }
  );
}

function extractToken(req: NextRequest): string | null {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.substring(7);
}

function mapGoal(row: any) {
  const saved = Number(row.current_amount ?? 0);
  const target = Number(row.target_amount ?? 1);
  const progress = target > 0 ? Math.round((saved / target) * 100) : 0;

  // Calcular lastDeposit y recentActivity desde deposits si vienen
  const deposits: any[] = row.deposits ?? [];
  const sorted = deposits.sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const lastDeposit = sorted[0]?.amount ? Number(sorted[0].amount) : null;
  const lastDepositDate = sorted[0]?.created_at
    ? new Date(sorted[0].created_at).toLocaleDateString("es-PE")
    : null;

  const recentActivity = sorted.slice(0, 5).map((d: any) => ({
    title: `Aporte a ${row.title ?? row.name}`,
    date: new Date(d.created_at).toLocaleDateString("es-PE"),
    amount: `S/ ${Number(d.amount).toFixed(2)}`,
  }));

  return {
    id: row.id,
    title: row.title ?? row.name,
    type: row.type ?? "Secundaria",
    iconName: row.icon_name ?? "PiggyBank",
    iconColor: row.icon_color ?? "#10B981",
    iconBg: row.icon_bg ?? "rgba(16,185,129,0.1)",
    saved,
    target,
    progress,
    lastDeposit,
    lastDepositDate,
    recentActivity,
  };
}

// GET /api/goals — listar metas del usuario
export async function GET(req: NextRequest) {
  const token = extractToken(req);
  if (!token) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

  const supabase = getAuthClient(token);

  const { data, error } = await supabase
    .from("goals")
    .select(`*, deposits(*)`)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json((data ?? []).map(mapGoal));
}

// POST /api/goals — crear nueva meta
export async function POST(req: NextRequest) {
  const token = extractToken(req);
  if (!token) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

  const supabase = getAuthClient(token);

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const { title, type, iconName, iconColor, iconBg, target } = body;

  const { data, error } = await supabase
    .from("goals")
    .insert({
      user_id: user.id,
      name: title,
      title,
      type: type ?? "Secundaria",
      icon_name: iconName ?? "PiggyBank",
      icon_color: iconColor ?? "#10B981",
      icon_bg: iconBg ?? "rgba(16,185,129,0.1)",
      target_amount: target,
      current_amount: 0,
    })
    .select(`*, deposits(*)`)
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json(mapGoal(data));
}
