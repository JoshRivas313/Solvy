-- ══════════════════════════════════════════════════════════
-- SOLVY — Migración 002: Extender goals + crear deposits
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ══════════════════════════════════════════════════════════

-- ── Ampliar tabla goals con campos de UI ──────────────────
alter table public.goals
  add column if not exists title       text,
  add column if not exists type        text not null default 'Secundaria',
  add column if not exists icon_name   text not null default 'PiggyBank',
  add column if not exists icon_bg     text not null default 'rgba(16, 185, 129, 0.1)',
  add column if not exists icon_color  text not null default '#10B981';

-- Sincronizar title con name para filas existentes
update public.goals set title = name where title is null;

-- ── Tabla deposits ────────────────────────────────────────
create table if not exists public.deposits (
  id          uuid primary key default uuid_generate_v4(),
  goal_id     uuid references public.goals(id) on delete cascade not null,
  user_id     uuid references auth.users(id) on delete cascade not null,
  amount      numeric(12, 2) not null check (amount > 0),
  created_at  timestamptz not null default now()
);

alter table public.deposits enable row level security;

create policy "Users can view own deposits"
  on public.deposits for select
  using (auth.uid() = user_id);

create policy "Users can insert own deposits"
  on public.deposits for insert
  with check (auth.uid() = user_id);

-- ── Trigger: actualizar current_amount en goals automáticamente ──
create or replace function public.update_goal_current_amount()
returns trigger as $$
begin
  update public.goals
  set current_amount = (
    select coalesce(sum(amount), 0)
    from public.deposits
    where goal_id = NEW.goal_id
  ),
  updated_at = now()
  where id = NEW.goal_id;
  return NEW;
end;
$$ language plpgsql security definer;

drop trigger if exists on_deposit_inserted on public.deposits;
create trigger on_deposit_inserted
  after insert on public.deposits
  for each row execute function public.update_goal_current_amount();
