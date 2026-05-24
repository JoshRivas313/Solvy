-- ══════════════════════════════════════════════════════════
-- SOLVY — Schema inicial
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ══════════════════════════════════════════════════════════

-- ── Extensiones ───────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ══════════════════════════════════════════════════════════
-- TABLA: financial_profiles
-- ══════════════════════════════════════════════════════════
create table if not exists public.financial_profiles (
  id                uuid primary key default uuid_generate_v4(),
  user_id           uuid references auth.users(id) on delete cascade not null unique,
  age               integer not null check (age >= 16 and age <= 100),
  monthly_income    numeric(12, 2) not null default 0,
  monthly_expenses  numeric(12, 2) not null default 0,
  current_savings   numeric(12, 2) not null default 0,
  monthly_debt      numeric(12, 2) not null default 0,
  knowledge_level   text not null default 'none'
                      check (knowledge_level in ('none', 'basic', 'intermediate', 'advanced')),
  risk_tolerance    text not null default 'medium'
                      check (risk_tolerance in ('low', 'medium', 'high')),
  investment_goal   text not null default '',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Trigger: actualiza updated_at automáticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_financial_profiles
  before update on public.financial_profiles
  for each row execute function public.handle_updated_at();

-- RLS: cada usuario solo ve y modifica su propio perfil
alter table public.financial_profiles enable row level security;

create policy "Users can view own profile"
  on public.financial_profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.financial_profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.financial_profiles for update
  using (auth.uid() = user_id);


-- ══════════════════════════════════════════════════════════
-- TABLA: plans
-- ══════════════════════════════════════════════════════════
create table if not exists public.plans (
  id                    uuid primary key default uuid_generate_v4(),
  user_id               uuid references auth.users(id) on delete cascade not null,
  period                text not null,
  summary               text not null default '',
  savings_suggested     numeric(12, 2) not null default 0,
  investment_suggested  numeric(12, 2) not null default 0,
  expenses_limit        numeric(12, 2) not null default 0,
  created_at            timestamptz not null default now()
);

alter table public.plans enable row level security;

create policy "Users can view own plans"
  on public.plans for select
  using (auth.uid() = user_id);

create policy "Users can insert own plans"
  on public.plans for insert
  with check (auth.uid() = user_id);


-- ══════════════════════════════════════════════════════════
-- TABLA: plan_actions
-- ══════════════════════════════════════════════════════════
create table if not exists public.plan_actions (
  id            uuid primary key default uuid_generate_v4(),
  plan_id       uuid references public.plans(id) on delete cascade not null,
  user_id       uuid references auth.users(id) on delete cascade not null,
  title         text not null,
  description   text not null default '',
  priority      text not null default 'medium'
                  check (priority in ('high', 'medium', 'low')),
  completed     boolean not null default false,
  completed_at  timestamptz,
  created_at    timestamptz not null default now()
);

alter table public.plan_actions enable row level security;

create policy "Users can view own actions"
  on public.plan_actions for select
  using (auth.uid() = user_id);

create policy "Users can insert own actions"
  on public.plan_actions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own actions"
  on public.plan_actions for update
  using (auth.uid() = user_id);


-- ══════════════════════════════════════════════════════════
-- TABLA: goals
-- ══════════════════════════════════════════════════════════
create table if not exists public.goals (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid references auth.users(id) on delete cascade not null,
  name            text not null,
  target_amount   numeric(12, 2) not null check (target_amount > 0),
  current_amount  numeric(12, 2) not null default 0 check (current_amount >= 0),
  color           text not null default '#34BD78',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger set_updated_at_goals
  before update on public.goals
  for each row execute function public.handle_updated_at();

alter table public.goals enable row level security;

create policy "Users can view own goals"
  on public.goals for select
  using (auth.uid() = user_id);

create policy "Users can insert own goals"
  on public.goals for insert
  with check (auth.uid() = user_id);

create policy "Users can update own goals"
  on public.goals for update
  using (auth.uid() = user_id);

create policy "Users can delete own goals"
  on public.goals for delete
  using (auth.uid() = user_id);


-- ══════════════════════════════════════════════════════════
-- TABLA: lesson_progress
-- ══════════════════════════════════════════════════════════
create table if not exists public.lesson_progress (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete cascade not null,
  lesson_id     text not null,
  completed     boolean not null default false,
  quiz_passed   boolean not null default false,
  completed_at  timestamptz,
  unique(user_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "Users can view own lesson progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own lesson progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own lesson progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id);
