import Link from "next/link";
import { getRecentMatches } from "@/services/matches";

const demoMatches = [
  { id: "demo-1", home: "Flamengo", away: "Palmeiras", score: "3 × 1", competition: "Brasileirão", status: "Melhores momentos disponíveis" },
  { id: "demo-2", home: "Real Madrid", away: "Atlético de Madrid", score: "2 × 0", competition: "La Liga", status: "Melhores momentos disponíveis" },
  { id: "demo-3", home: "Liverpool", away: "Arsenal", score: "1 × 1", competition: "Premier League", status: "Aguardando vídeo" },
];

export default async function Home() {
  let matches: any[] = [];
  try {
    matches = await getRecentMatches();
  } catch {
    matches = [];
  }

  return (
    <main style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 20px 48px" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, marginBottom: 44 }}>
        <Link href="/" style={{ fontSize: 26, fontWeight: 800 }}>⚽ Futebol Replay</Link>
        <Link href="/entrar" style={{ border: "1px solid #294238", background: "#0d1d16", color: "#fff", borderRadius: 10, padding: "10px 16px" }}>Entrar</Link>
      </header>

      <section style={{ marginBottom: 42 }}>
        <div style={{ color: "#8fa198", marginBottom: 8 }}>SEU FUTEBOL</div>
        <h1 style={{ fontSize: "clamp(34px, 6vw, 62px)", lineHeight: 1.02, maxWidth: 760, margin: 0 }}>
          Encontre os melhores momentos sem precisar procurar.
        </h1>
        <p style={{ color: "#aeb9b4", fontSize: 18, lineHeight: 1.6, maxWidth: 680 }}>
          Partidas, competições, times e vídeos organizados em um único lugar.
        </p>
      </section>

      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 24 }}>🔥 Jogos recentes</h2>
          <Link href="/jogos" style={{ color: "#8ee0b1", fontSize: 14 }}>Ver todos →</Link>
        </div>

        {matches.length === 0 ? (
          <div style={{ color: "#aeb9b4", padding: 24, border: "1px dashed #294238", borderRadius: 16 }}>
            O banco ainda não possui partidas. Abaixo está uma prévia da experiência.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}

        {matches.length === 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 16 }}>
            {demoMatches.map((match) => <MatchCard key={match.id} match={match} demo />)}
          </div>
        )}
      </section>

      <nav style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 42, paddingTop: 20, borderTop: "1px solid #1b2c25", color: "#aeb9b4" }}>
        <Link href="/">🏠 Início</Link>
        <Link href="/jogos">⚽ Jogos</Link>
        <Link href="/competicoes">🏆 Competições</Link>
        <Link href="/buscar">🔎 Buscar</Link>
        <Link href="/perfil">👤 Perfil</Link>
      </nav>
    </main>
  );
}

function MatchCard({ match, demo = false }: { match: any; demo?: boolean }) {
  const home = match.home_team?.name ?? match.home;
  const away = match.away_team?.name ?? match.away;
  const score = match.home_score != null ? `${match.home_score} × ${match.away_score}` : match.score;
  const competition = match.season?.competition?.name ?? match.competition ?? "Futebol";
  const hasVideo = demo ? match.status.includes("disponíveis") : true;

  return (
    <article style={{ background: "#0c1a14", border: "1px solid #1d3329", borderRadius: 16, padding: 20 }}>
      <div style={{ color: "#7f9087", fontSize: 13, marginBottom: 18 }}>{competition}</div>
      <div style={{ fontWeight: 700, fontSize: 18 }}>{home}</div>
      <div style={{ fontSize: 30, fontWeight: 800, margin: "6px 0" }}>{score}</div>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>{away}</div>
      <div style={{ color: hasVideo ? "#8ee0b1" : "#b5beb9", fontSize: 14, marginBottom: 14 }}>
        {hasVideo ? "🎬 Vídeo disponível" : "⏳ Aguardando vídeo"}
      </div>
      {!demo && <Link href={`/jogos/${match.id}`} style={{ display: "inline-block", background: "#173a2a", padding: "9px 13px", borderRadius: 9, fontSize: 14 }}>Ver partida →</Link>}
    </article>
  );
}
