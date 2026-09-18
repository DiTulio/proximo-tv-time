import { useEffect, useState } from "react";
import { searchMedia, getReleaseYear } from "../../api/tmdb";
import Header from "../../components/Header/Header";
import MediaTypeToggle from "../../components/MediaTypeToggle/MediaTypeToggle";
import SearchBar from "../../components/SearchBar/SearchBar";
import MediaGrid from "../../components/MediaGrid/MediaGrid";

const Search = () => {
  const [mediaType, setMediaType] = useState("movie");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (query.trim().length < 2) {
      setStatus("idle");
      setItems([]);
      return;
    }

    setStatus("loading");

    searchMedia(mediaType, query.trim())
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
  }, [query, mediaType, retryCount]);

  const handleRetry = () => setRetryCount((c) => c + 1);

  return (
    <>
      <Header />
      <div className="page">
        <h1 className="page-title">Buscar</h1>
        <p className="page-subtitle">Procure um título pelo nome, entre filmes ou séries.</p>

        <div style={{ marginBottom: 20 }}>
          <MediaTypeToggle value={mediaType} onChange={setMediaType} />
        </div>

        <SearchBar value={query} onChange={setQuery} placeholder="Ex: Duna, Breaking Bad..." />

        {status === "idle" ? (
          <p style={{ color: "var(--text-muted)" }}>Digite pelo menos 2 letras para buscar.</p>
        ) : (
          <MediaGrid
            items={items}
            state={status}
            emptyMessage={`Nenhum resultado para "${query}".`}
            errorMessage="Não conseguimos completar a busca agora."
            onRetry={handleRetry}
          />
        )}
      </div>
    </>
  );
}

export default Search
