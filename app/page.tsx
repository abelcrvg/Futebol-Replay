const matches = [
  {
    home: "Flamengo",
    away: "Palmeiras",
    score: "3 × 1",
    competition: "Brasileirão",
    status: "Melhores momentos disponíveis",
  },
  {
    home: "Real Madrid",
    away: "Atlético de Madrid",
    score: "2 × 0",
    competition: "La Liga",
    status: "Melhores momentos disponíveis",
  },
  {
    home: "Liverpool",
    away: "Arsenal",
    score: "1 × 1",
    competition: "Premier League",
    status: "Aguardando vídeo",
  },
];

export default function Home() {
  return (
    <main style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 20px 48px" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          marginBottom: 44,
        }}
      >
        <div>
          <div style={{ fontSize: 26, fontWeight: 800 }}>⚽ Futebol Replay</div>
          <div style={{ color: "#9da9a3", marginTop: 5 }}>
            Seu futebol, organizado em um só lugar.
          </div>
        </div>
        <button
          style={{
            border: "1px solid #294238",
            background: "#0d1d16",
            color: "#fff",
            borderRadius: 10,
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          Entrar
        </button>
      </header>

      <section style={{ marginBottom: 42 }}>
        <div style={{ color: "#8fa198", marginBottom: 8 }}>SEU FUTEBOL</div>
        <h1 style={{ fontSize: "clamp(34px, 6vw, 62px)", lineHeight: 1.02, maxWidth: 760, margin: 0 }}>
          Encontre os melhores momentos sem precisar procurar.
        </h1>
        <p style={{ color: "#aeb9b4", fontSize: 18, lineHeight: 1.6, maxWidth: 680 }}>
          Partidas, competições, times e vídeos organizados em um único lugar.
          O Futebol Replay conecta cada partida às fontes de vídeo disponíveis.
        </p>
      </section>

      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 24 }}>🔥 Melhores momentos</h2>
          <span style={{ color: "#7f9087", fontSize: 14 }}>Protótipo</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {matches.map((match) => (
            <article
              key={`${match.home}-${match.away}`}
              style={{
                background: "#0c1a14",
                border: "1px solid #1d3329",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <div style={{ color: "#7f9087", fontSize: 13, marginBottom: 18 }}>{match.competition}</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{match.home}</div>
              <div style={{ fontSize: 30, fontWeight: 800, margin: "6px 0" }}>{match.score}</div>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>{match.away}</div>
              <div style={{ color: match.status.includes("disponíveis") ? "#8ee0b1" : "#b5beb9", fontSize: 14 }}>
                {match.status}
              </div>
            </article>
          ))}
        </div>
      </section>

      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 42,
          paddingTop: 20,
          borderTop: "1px solid #1b2c25",
          color: "#aeb9b4",
        }}
      >
        <span>🏠 Início</span>
        <span>⚽ Jogos</span>
        <span>🏆 Competições</span>
        <span>🔎 Buscar</span>
        <span>👤 Perfil</span>
      </nav>
    </main>
  );
}
