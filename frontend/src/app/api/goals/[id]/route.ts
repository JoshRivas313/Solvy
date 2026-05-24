import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAuthClient(token: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
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
  const deposits: any[] = row.deposits ?? [];
  const sorted = [...deposits].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
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
    lastDeposit: sorted[0] ? Number(sorted[0].amount) : null,
    lastDepositDate: sorted[0]
      ? new Date(sorted[0].created_at).toLocaleDateString("es-PE")
      : null,
    recentActivity: sorted.slice(0, 5).map((d) => ({
      title: `Aporte a ${row.title ?? row.name}`,
      date: new Date(d.created_at).toLocaleDateString("es-PE"),
      amount: `S/ ${Number(d.amount).toFixed(2)}`,
    })),
  };
}

// PUT /api/goals/[id] — actualizar meta
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = extractToken(req);
  if (!token) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const supabase = getAuthClient(token);
  const body = await req.json();

  const updates: Record<string, any> = {};
  if (body.title)     { updates.title = body.title; updates.name = body.title; }
  if (body.type)        updates.type = body.type;
  if (body.iconName)    updates.icon_name = body.iconName;
  if (body.iconColor)   updates.icon_color = body.iconColor;
  if (body.iconBg)      updates.icon_bg = body.iconBg;
  if (body.target)      updates.target_amount = body.target;

  const { data, error } = await supabase
    .from("goals")
    .update(updates)
    .eq("id", id)
    .select(`*, deposits(*)`)
    .single();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(mapGoal(data));
}

// DELETE /api/goals/[id] — eliminar meta
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = extractToken(req);
  if (!token) return NextResponse.json({ message: "No autorizado" }, { status: 401 });

  const { id } = await params;
  const supabase = getAuthClient(token);

  const { error } = await supabase.from("goals").delete().eq("id", id);
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  return new NextResponse(null, { status: 204 });
}
