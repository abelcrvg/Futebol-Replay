create extension if not exists pgcrypto;

create table public.competitions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  country text,
  logo_url text,
  type text not null default 'league' check (type in ('league','cup','continental','international','other')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.seasons (
  id uuid primary key default gen_random_uuid(),
  competition_id uuid not null references public.competitions(id) on delete cascade,
  name text not null,
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  unique (competition_id, name)
);

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text,
  slug text not null unique,
  country text,
  logo_url text,
  created_at timestamptz not null default now()
);

create table public.matches (
  id uuid primary key default gen_random_uuid(),
  season_id uuid references public.seasons(id) on delete set null,
  home_team_id uuid not null references public.teams(id) on delete restrict,
  away_team_id uuid not null references public.teams(id) on delete restrict,
  home_score integer,
  away_score integer,
  status text not null default 'scheduled' check (status in ('scheduled','live','finished','postponed','cancelled')),
  match_date timestamptz not null,
  stadium text,
  round text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (home_team_id <> away_team_id),
  check (home_score is null or home_score >= 0),
  check (away_score is null or away_score >= 0)
);

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches(id) on delete cascade,
  source text not null check (source in ('youtube','other')),
  source_video_id text,
  title text not null,
  thumbnail_url text,
  video_url text not null,
  type text not null default 'highlights' check (type in ('highlights','goals','match_report','other')),
  status text not null default 'pending' check (status in ('pending','approved','rejected','broken')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source, source_video_id)
);

create table public.favorite_teams (
  user_id uuid not null references auth.users(id) on delete cascade,
  team_id uuid not null references public.teams(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, team_id)
);

create table public.favorite_competitions (
  user_id uuid not null references auth.users(id) on delete cascade,
  competition_id uuid not null references public.competitions(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, competition_id)
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  match_id uuid references public.matches(id) on delete cascade,
  type text not null check (type in ('video_available','match_finished','system')),
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index matches_match_date_idx on public.matches(match_date desc);
create index matches_home_team_idx on public.matches(home_team_id);
create index matches_away_team_idx on public.matches(away_team_id);
create index matches_season_idx on public.matches(season_id);
create index videos_match_idx on public.videos(match_id);
create index videos_status_idx on public.videos(status);
create index favorite_teams_team_idx on public.favorite_teams(team_id);
create index favorite_competitions_competition_idx on public.favorite_competitions(competition_id);
create index notifications_user_idx on public.notifications(user_id, created_at desc);

alter table public.competitions enable row level security;
alter table public.seasons enable row level security;
alter table public.teams enable row level security;
alter table public.matches enable row level security;
alter table public.videos enable row level security;
alter table public.favorite_teams enable row level security;
alter table public.favorite_competitions enable row level security;
alter table public.notifications enable row level security;

create policy "Public can view active competitions" on public.competitions for select to anon, authenticated using (is_active = true);
create policy "Public can view seasons" on public.seasons for select to anon, authenticated using (true);
create policy "Public can view teams" on public.teams for select to anon, authenticated using (true);
create policy "Public can view matches" on public.matches for select to anon, authenticated using (true);
create policy "Public can view approved videos" on public.videos for select to anon, authenticated using (status = 'approved');

create policy "Users can view own favorite teams" on public.favorite_teams for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can add own favorite teams" on public.favorite_teams for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users can remove own favorite teams" on public.favorite_teams for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Users can view own favorite competitions" on public.favorite_competitions for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can add own favorite competitions" on public.favorite_competitions for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Users can remove own favorite competitions" on public.favorite_competitions for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Users can view own notifications" on public.notifications for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can update own notifications" on public.notifications for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
