import Link from "next/link";
import { notFound } from "next/navigation";
import { getMatchById } from "@/services/matches";

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match: any = await getMatchById(id);
  if (!match) notFound();

  const home = match.home_team;
  const away = match.away_team;
  const competition = match.season?.competition;
  const videos = (match.videos ?? []).filter((video: any) => video.status === "approved");
  const mainVideo = videos.find((video: any) => video.type === "highlights") ?? videos[0];

  return (
    <main style={{ maxWidth: 1050, margin: "0 auto", padding: "28px 20px 60px" }}>
      <Link href="/" style={{ color: "#8ee0b1" }}>← Futebol Replay</Link>

      <section style={{ marginTop: 30, background: "#0c1a14", border: "1px solid #1d3329", borderRadius: 20, padding: "30px 20px", textAlign: "center" }}>
        <div style={{ color: "#8fa198", fontSize: 14 }}>{competition?.name ?? "Partida"}</div>
        <div style={{ color: "#7f9087", fontSize: 14, marginTop: 7 }}>{new Date(match.match_date).toLocaleString("pt-BR", { dateStyle: "long", timeStyle: "short" })}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 18, marginTop: 28 }}>
          <Team team={home} />
          <div style={{ fontSize: 42, fontWeight: 900 }}>{match.home_score ?? "-"} × {match.away_score ?? "-"}</div>
          <Team team={away} />
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>🎬 Melhores momentos</h2>
        {mainVideo?.source === "youtube" && mainVideo.source_video_id ? (
          <div style={{ aspectRatio: "16 / 9", overflow: "hidden", borderRadius: 18, border: "1px solid #1d3329", background: "#000" }}>
            <iframe
              src={`https://www.youtube.com/embed/${encodeURIComponent(mainVideo.source_video_id)}`}
              title={mainVideo.title}
              style={{ width: "100%", height: "100%", border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <div style={{ padding: 30, border: "1px dashed #294238", borderRadius: 18, color: "#aeb9b4" }}>
            Os melhores momentos ainda não estão disponíveis para esta partida.
          </div>
        )}
        {mainVideo && <p style={{ color: "#8fa198" }}>{mainVideo.title}</p>}
      </section>

      {videos.length > 1 && (
        <section style={{ marginTop: 30 }}>
          <h2>📺 Outras versões</h2>
          <div style={{ display: "grid", gap: 10 }}>
            {videos.filter((video: any) => video.id !== mainVideo?.id).map((video: any) => (
              <a key={video.id} href={video.video_url} target="_blank" rel="noreferrer" style={{ padding: 16, border: "1px solid #1d3329", borderRadius: 12, background: "#0c1a14" }}>
                {video.title}
              </a>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
        <Info title="🏟️ Estádio" value={match.stadium ?? "Não informado"} />
        <Info title="🏆 Competição" value={competition?.name ?? "Não informado"} />
        <Info title="🔢 Rodada" value={match.round ?? "Não informada"} />
        <Info title="🎥 Vídeos" value={`${videos.length} disponível(is)`} />
      </section>
    </main>
  );
}

function Team({ team }: { team: any }) {
  return <div><div style={{ fontSize: 21, fontWeight: 800 }}>{team?.name ?? "Time"}</div></div>;
}

function Info({ title, value }: { title: string; value: string }) {
  return <div style={{ padding: 18, border: "1px solid #1d3329", borderRadius: 14, background: "#0c1a14" }}><div style={{ color: "#7f9087", fontSize: 13 }}>{title}</div><div style={{ marginTop: 7, fontWeight: 700 }}>{value}</div></div>;
}
