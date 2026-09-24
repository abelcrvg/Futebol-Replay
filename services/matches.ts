import { createClient } from "@/lib/supabase/server";

export async function getRecentMatches(limit = 12) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("matches")
    .select(
      `
        id,
        home_score,
        away_score,
        status,
        match_date,
        stadium,
        round,
        home_team:teams!matches_home_team_id_fkey(id,name,short_name,logo_url),
        away_team:teams!matches_away_team_id_fkey(id,name,short_name,logo_url),
        season:seasons(id,name,competition:competitions(id,name,slug,logo_url))
      `,
    )
    .order("match_date", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function getMatchById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("matches")
    .select(
      `
        id,
        home_score,
        away_score,
        status,
        match_date,
        stadium,
        round,
        home_team:teams!matches_home_team_id_fkey(id,name,short_name,logo_url),
        away_team:teams!matches_away_team_id_fkey(id,name,short_name,logo_url),
        season:seasons(id,name,competition:competitions(id,name,slug,logo_url)),
        videos(id,source,source_video_id,title,thumbnail_url,video_url,type,status,published_at)
      `,
    )
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}
