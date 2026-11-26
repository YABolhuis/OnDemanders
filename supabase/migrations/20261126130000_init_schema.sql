-- OnDemanders: initial schema shared by the web app and the mobile app.

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  bedrijfsnaam text,
  kvk_nummer text,
  btw_nummer text,
  telefoon text,
  plaats text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles are readable by everyone"
  on public.profiles for select
  using (true);

create policy "users update their own profile"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- ---------------------------------------------------------------------------
-- Vakgebieden
-- ---------------------------------------------------------------------------
create table public.vakgebieden (
  slug text primary key,
  label text not null,
  meervoud text not null,
  heeft_filters boolean not null default false,
  volgorde int not null default 0
);

alter table public.vakgebieden enable row level security;

create policy "vakgebieden are readable by everyone"
  on public.vakgebieden for select
  using (true);

insert into public.vakgebieden (slug, label, meervoud, heeft_filters, volgorde) values
  ('schilder', 'Schilder', 'schilders', true, 1),
  ('stukadoor', 'Stukadoor', 'stukadoors', false, 2),
  ('dakdekker', 'Dakdekker', 'dakdekkers', false, 3),
  ('loodgieter', 'Loodgieter', 'loodgieters', false, 4),
  ('timmerman', 'Timmerman', 'timmerlieden', false, 5),
  ('metselaar', 'Metselaar', 'metselaars', false, 6),
  ('elektricien', 'Elektricien', 'elektriciens', false, 7),
  ('stratenmaker', 'Stratenmaker', 'stratenmakers', false, 8);

-- ---------------------------------------------------------------------------
-- Klussen
-- ---------------------------------------------------------------------------
create type public.klus_status as enum ('open', 'gegund', 'afgerond', 'geannuleerd');

create table public.klussen (
  id uuid primary key default gen_random_uuid(),
  eigenaar_id uuid not null references public.profiles (id) on delete cascade,
  vakgebied_slug text not null references public.vakgebieden (slug),
  titel text not null,
  omschrijving text not null default '',
  -- null means "Bieden": the client asks for offers instead of naming a price
  budget_centen int check (budget_centen is null or budget_centen >= 0),
  plaats text not null,
  latitude double precision,
  longitude double precision,
  sector text,
  duur text,
  afbeelding_url text,
  status public.klus_status not null default 'open',
  bieden_tot timestamptz,
  weergaven int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index klussen_eigenaar_id_idx on public.klussen (eigenaar_id);
create index klussen_open_vakgebied_idx on public.klussen (vakgebied_slug, created_at desc)
  where status = 'open';

alter table public.klussen enable row level security;

create policy "open klussen are readable by everyone"
  on public.klussen for select
  using (status = 'open' or (select auth.uid()) = eigenaar_id);

create policy "users create their own klussen"
  on public.klussen for insert
  to authenticated
  with check ((select auth.uid()) = eigenaar_id);

create policy "owners update their klussen"
  on public.klussen for update
  to authenticated
  using ((select auth.uid()) = eigenaar_id)
  with check ((select auth.uid()) = eigenaar_id);

create policy "owners delete their klussen"
  on public.klussen for delete
  to authenticated
  using ((select auth.uid()) = eigenaar_id);

-- ---------------------------------------------------------------------------
-- Biedingen
-- ---------------------------------------------------------------------------
create table public.biedingen (
  id uuid primary key default gen_random_uuid(),
  klus_id uuid not null references public.klussen (id) on delete cascade,
  bieder_id uuid not null references public.profiles (id) on delete cascade,
  bedrag_centen int not null check (bedrag_centen > 0),
  toelichting text,
  created_at timestamptz not null default now(),
  unique (klus_id, bieder_id)
);

create index biedingen_bieder_id_idx on public.biedingen (bieder_id);

alter table public.biedingen enable row level security;

create policy "bidders and klus owners read biedingen"
  on public.biedingen for select
  to authenticated
  using (
    (select auth.uid()) = bieder_id
    or exists (
      select 1 from public.klussen k
      where k.id = klus_id and k.eigenaar_id = (select auth.uid())
    )
  );

create policy "users bid on open klussen of others"
  on public.biedingen for insert
  to authenticated
  with check (
    (select auth.uid()) = bieder_id
    and exists (
      select 1 from public.klussen k
      where k.id = klus_id
        and k.status = 'open'
        and k.eigenaar_id <> (select auth.uid())
        and (k.bieden_tot is null or k.bieden_tot > now())
    )
  );

create policy "bidders update their own bod"
  on public.biedingen for update
  to authenticated
  using ((select auth.uid()) = bieder_id)
  with check ((select auth.uid()) = bieder_id);

create policy "bidders withdraw their own bod"
  on public.biedingen for delete
  to authenticated
  using ((select auth.uid()) = bieder_id);

-- ---------------------------------------------------------------------------
-- Gesprekken & berichten
-- ---------------------------------------------------------------------------
create table public.gesprekken (
  id uuid primary key default gen_random_uuid(),
  klus_id uuid not null references public.klussen (id) on delete cascade,
  klant_id uuid not null references public.profiles (id) on delete cascade,
  vakman_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  laatste_bericht_at timestamptz not null default now(),
  unique (klus_id, vakman_id),
  check (klant_id <> vakman_id)
);

create index gesprekken_klant_id_idx on public.gesprekken (klant_id, laatste_bericht_at desc);
create index gesprekken_vakman_id_idx on public.gesprekken (vakman_id, laatste_bericht_at desc);

alter table public.gesprekken enable row level security;

create policy "participants read their gesprekken"
  on public.gesprekken for select
  to authenticated
  using ((select auth.uid()) in (klant_id, vakman_id));

-- Gesprekken are only created through public.ontgrendel_chat(), which charges credits.

create table public.gesprek_favorieten (
  gesprek_id uuid not null references public.gesprekken (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  primary key (user_id, gesprek_id)
);

create index gesprek_favorieten_gesprek_id_idx on public.gesprek_favorieten (gesprek_id);

alter table public.gesprek_favorieten enable row level security;

create policy "users manage their own favorieten"
  on public.gesprek_favorieten for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.gesprekken g
      where g.id = gesprek_id and (select auth.uid()) in (g.klant_id, g.vakman_id)
    )
  );

create table public.berichten (
  id uuid primary key default gen_random_uuid(),
  gesprek_id uuid not null references public.gesprekken (id) on delete cascade,
  afzender_id uuid not null references public.profiles (id) on delete cascade,
  tekst text not null check (length(tekst) between 1 and 5000),
  citaat_bericht_id uuid references public.berichten (id) on delete set null,
  gelezen_at timestamptz,
  created_at timestamptz not null default now()
);

create index berichten_gesprek_id_idx on public.berichten (gesprek_id, created_at);
create index berichten_afzender_id_idx on public.berichten (afzender_id);
create index berichten_citaat_bericht_id_idx on public.berichten (citaat_bericht_id);

alter table public.berichten enable row level security;

create policy "participants read berichten"
  on public.berichten for select
  to authenticated
  using (
    exists (
      select 1 from public.gesprekken g
      where g.id = gesprek_id and (select auth.uid()) in (g.klant_id, g.vakman_id)
    )
  );

create policy "participants send berichten"
  on public.berichten for insert
  to authenticated
  with check (
    (select auth.uid()) = afzender_id
    and exists (
      select 1 from public.gesprekken g
      where g.id = gesprek_id and (select auth.uid()) in (g.klant_id, g.vakman_id)
    )
  );

create function public.markeer_gelezen(p_gesprek_id uuid)
returns void
language sql
security definer
set search_path = ''
as $$
  update public.berichten b
  set gelezen_at = now()
  from public.gesprekken g
  where b.gesprek_id = p_gesprek_id
    and g.id = b.gesprek_id
    and (select auth.uid()) in (g.klant_id, g.vakman_id)
    and b.afzender_id <> (select auth.uid())
    and b.gelezen_at is null;
$$;

create function public.raak_gesprek_aan()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.gesprekken set laatste_bericht_at = new.created_at where id = new.gesprek_id;
  return new;
end;
$$;

create trigger berichten_raak_gesprek_aan
  after insert on public.berichten
  for each row execute function public.raak_gesprek_aan();

-- ---------------------------------------------------------------------------
-- Credits (ledger) & abonnementen
-- ---------------------------------------------------------------------------
create table public.credit_transacties (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  aantal int not null check (aantal <> 0),
  reden text not null,
  klus_id uuid references public.klussen (id) on delete set null,
  created_at timestamptz not null default now()
);

create index credit_transacties_user_id_idx on public.credit_transacties (user_id, created_at desc);
create index credit_transacties_klus_id_idx on public.credit_transacties (klus_id);

alter table public.credit_transacties enable row level security;

create policy "users read their own credit_transacties"
  on public.credit_transacties for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Credits are only written by security definer functions or the service role
-- (e.g. a payment webhook), never directly by clients.

create view public.credit_saldo
with (security_invoker = true) as
  select user_id, coalesce(sum(aantal), 0)::int as saldo
  from public.credit_transacties
  group by user_id;

create type public.abonnement_plan as enum ('plus-3', 'plus-12', 'plus-24');

create table public.abonnementen (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  plan public.abonnement_plan not null,
  start_at timestamptz not null default now(),
  eind_at timestamptz not null,
  extern_id text unique,
  created_at timestamptz not null default now(),
  check (eind_at > start_at)
);

create index abonnementen_user_id_idx on public.abonnementen (user_id, eind_at desc);

alter table public.abonnementen enable row level security;

create policy "users read their own abonnementen"
  on public.abonnementen for select
  to authenticated
  using ((select auth.uid()) = user_id);

create function public.ontgrendel_chat(p_klus_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  p_kosten constant int := 10;
  v_user uuid := (select auth.uid());
  v_eigenaar uuid;
  v_gesprek uuid;
  v_saldo int;
begin
  if v_user is null then
    raise exception 'not authenticated';
  end if;

  select eigenaar_id into v_eigenaar
  from public.klussen
  where id = p_klus_id and status = 'open';
  if v_eigenaar is null then
    raise exception 'klus not found';
  end if;
  if v_eigenaar = v_user then
    raise exception 'cannot open a chat on your own klus';
  end if;

  select id into v_gesprek
  from public.gesprekken
  where klus_id = p_klus_id and vakman_id = v_user;
  if v_gesprek is not null then
    return v_gesprek;
  end if;

  -- Serialize concurrent unlocks per user so the balance check stays accurate.
  perform pg_advisory_xact_lock(hashtext(v_user::text));

  select coalesce(sum(aantal), 0) into v_saldo
  from public.credit_transacties
  where user_id = v_user;
  if v_saldo < p_kosten then
    raise exception 'insufficient credits';
  end if;

  insert into public.gesprekken (klus_id, klant_id, vakman_id)
  values (p_klus_id, v_eigenaar, v_user)
  returning id into v_gesprek;

  insert into public.credit_transacties (user_id, aantal, reden, klus_id)
  values (v_user, -p_kosten, 'chat_ontgrendeld', p_klus_id);

  return v_gesprek;
end;
$$;

-- ---------------------------------------------------------------------------
-- Notificatie-instellingen
-- ---------------------------------------------------------------------------
create table public.notificatie_instellingen (
  user_id uuid not null references public.profiles (id) on delete cascade,
  sleutel text not null,
  aan boolean not null default true,
  primary key (user_id, sleutel)
);

alter table public.notificatie_instellingen enable row level security;

create policy "users manage their own notificatie_instellingen"
  on public.notificatie_instellingen for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------------------
-- New users: profile + starting credits
-- ---------------------------------------------------------------------------
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));

  insert into public.credit_transacties (user_id, aantal, reden)
  values (new.id, 25, 'startsaldo');

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger klussen_set_updated_at
  before update on public.klussen
  for each row execute function public.set_updated_at();

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.raak_gesprek_aan() from public, anon, authenticated;
revoke execute on function public.ontgrendel_chat(uuid) from public, anon;
revoke execute on function public.markeer_gelezen(uuid) from public, anon;
