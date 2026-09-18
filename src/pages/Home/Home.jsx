import { useEffect, useState } from "react";
import { getTrending, getReleaseYear } from "../../api/tmdb";
import Header from "../../components/Header/Header";
import MediaTypeToggle from "../../components/MediaTypeToggle/MediaTypeToggle";
import MediaGrid from "../../components/MediaGrid/MediaGrid";

const Home = () => {
  const [mediaType, setMediaType] = useState("movie");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setStatus("loading");

    getTrending(mediaType)
      .then((results) => {
        const mapped = results.map((r) => ({
          id: r.id,
          title: r.title || r.name,
          posterPath: r.poster_path,
          voteAverage: r.vote_average,
          mediaType,
          year: getReleaseYear(r),
        }));
        setItems(mapped);
        setStatus(mapped.length ? "success" : "empty");
      })
      .catch(() => setStatus("error"));
  }, [mediaType, retryCount]);

  const handleRetry = () => setRetryCount((c) => c + 1);

  return (
    <>
      <Header />
      <div className="page">
        <h1 className="page-title">Em alta essa semana</h1>
        <p className="page-subtitle">
          O que está bombando agora, direto do TMDB. Troque entre filmes e séries pra ver o que
          está em alta em cada catálogo.
        </p>
        <div style={{ marginBottom: 28 }}>
          <MediaTypeToggle value={mediaType} onChange={setMediaType} />
        </div>
        <MediaGrid
          items={items}
          state={status}
          emptyMessage="Nenhum título em alta encontrado agora."
          errorMessage="Não conseguimos carregar os títulos em alta. Verifique sua chave da API TMDB."
          onRetry={handleRetry}
        />
      </div>
    </>
  );
}

export default Home
