import { createClient } from "@/lib/supabase/server";
import { SimulatorView } from "@/features/simulator/simulator-view";
import type { RiskLevel } from "@/types";
import type { Database } from "@/types/supabase";

type Profile = Database["public"]["Tables"]["financial_profiles"]["Row"];

export default async function SimulatorPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile: Profile | null = null;
  if (user) {
    const { data } = await supabase
      .from("financial_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    profile = data as Profile | null;
  }

  return (
    <SimulatorView
      initialContribution={profile ? Math.round((profile.monthly_income - profile.monthly_expenses - profile.monthly_debt) * 0.2) : 300}
      initialSavings={profile?.current_savings ?? 1000}
      initialAge={profile?.age ?? 25}
      initialRisk={(profile?.risk_tolerance as RiskLevel) ?? "medium"}
    />
  );
}
