export type Database = {
  public: {
    Tables: {
      competitions: {
        Row: { id: string; name: string; slug: string; country: string | null; logo_url: string | null; type: string; is_active: boolean; created_at: string }
        Insert: { id?: string; name: string; slug: string; country?: string | null; logo_url?: string | null; type?: string; is_active?: boolean; created_at?: string }
        Update: { id?: string; name?: string; slug?: string; country?: string | null; logo_url?: string | null; type?: string; is_active?: boolean; created_at?: string }
        Relationships: []
      }
      seasons: {
        Row: { id: string; competition_id: string; name: string; start_date: string | null; end_date: string | null; created_at: string }
        Insert: { id?: string; competition_id: string; name: string; start_date?: string | null; end_date?: string | null; created_at?: string }
        Update: { id?: string; competition_id?: string; name?: string; start_date?: string | null; end_date?: string | null; created_at?: string }
        Relationships: []
      }
      teams: {
        Row: { id: string; name: string; short_name: string | null; slug: string; country: string | null; logo_url: string | null; created_at: string }
        Insert: { id?: string; name: string; short_name?: string | null; slug: string; country?: string | null; logo_url?: string | null; created_at?: string }
        Update: { id?: string; name?: string; short_name?: string | null; slug?: string; country?: string | null; logo_url?: string | null; created_at?: string }
        Relationships: []
      }
      matches: {
        Row: { id: string; season_id: string | null; home_team_id: string; away_team_id: string; home_score: number | null; away_score: number | null; status: string; match_date: string; stadium: string | null; round: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; season_id?: string | null; home_team_id: string; away_team_id: string; home_score?: number | null; away_score?: number | null; status?: string; match_date: string; stadium?: string | null; round?: string | null; created_at?: string; updated_at?: string }
        Update: { id?: string; season_id?: string | null; home_team_id?: string; away_team_id?: string; home_score?: number | null; away_score?: number | null; status?: string; match_date?: string; stadium?: string | null; round?: string | null; created_at?: string; updated_at?: string }
        Relationships: []
      }
      videos: {
        Row: { id: string; match_id: string; source: string; source_video_id: string | null; title: string; thumbnail_url: string | null; video_url: string; type: string; status: string; published_at: string | null; created_at: string; updated_at: string }
        Insert: { id?: string; match_id: string; source: string; source_video_id?: string | null; title: string; thumbnail_url?: string | null; video_url: string; type?: string; status?: string; published_at?: string | null; created_at?: string; updated_at?: string }
        Update: { id?: string; match_id?: string; source?: string; source_video_id?: string | null; title?: string; thumbnail_url?: string | null; video_url?: string; type?: string; status?: string; published_at?: string | null; created_at?: string; updated_at?: string }
        Relationships: []
      }
      favorite_teams: {
        Row: { user_id: string; team_id: string; created_at: string }
        Insert: { user_id: string; team_id: string; created_at?: string }
        Update: { user_id?: string; team_id?: string; created_at?: string }
        Relationships: []
      }
      favorite_competitions: {
        Row: { user_id: string; competition_id: string; created_at: string }
        Insert: { user_id: string; competition_id: string; created_at?: string }
        Update: { user_id?: string; competition_id?: string; created_at?: string }
        Relationships: []
      }
      notifications: {
        Row: { id: string; user_id: string; match_id: string | null; type: string; title: string; body: string | null; read_at: string | null; created_at: string }
        Insert: { id?: string; user_id: string; match_id?: string | null; type: string; title: string; body?: string | null; read_at?: string | null; created_at?: string }
        Update: { id?: string; user_id?: string; match_id?: string | null; type?: string; title?: string; body?: string | null; read_at?: string | null; created_at?: string }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
