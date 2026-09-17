import { useEffect, useState } from "react";
import { getGenres, discoverByGenres, getReleaseYear } from "../../api/tmdb";
import { getGenreIdsForMood } from "../../utils/moodMap";
import Header from "../../components/Header/Header";
import MediaTypeToggle from "../../components/MediaTypeToggle/MediaTypeToggle";
import GenreFilter from "../../components/GenreFilter/GenreFilter";
import MoodFilter from "../../components/MoodFilter/MoodFilter";
import SurpriseButton from "../../components/SurpriseButton/SurpriseButton";
import MediaGrid from "../../components/MediaGrid/MediaGrid";

// Junta o gênero selecionado diretamente com os gêneros do mood escolhido,
// sem repetir nenhum id, usando só array (sem Set).
function buildGenreIdList(selectedGenreId, selectedMood, genres) {
  const ids = [];

  if (selectedGenreId && ids.indexOf(selectedGenreId) === -1) {
    ids.push(selectedGenreId);
  }

  const moodGenreIds = getGenreIdsForMood(selectedMood);
  for (let i = 0; i < moodGenreIds.length; i++) {
    if (ids.indexOf(moodGenreIds[i]) === -1) {
      ids.push(moodGenreIds[i]);
    }
  }

  // Sem filtro nenhum -> usa os 3 primeiros gêneros da lista como fallback
  if (ids.length === 0 && genres.length > 0) {
    for (let i = 0; i < 3 && i < genres.length; i++) {
      ids.push(genres[i].id);
    }
  }

  return ids;
}

const Discover = () => {
  const [mediaType, setMediaType] = useState("movie");
  const [genres, setGenres] = useState([]);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [retryCount, setRetryCount] = useState(0);

  const handleMediaTypeChange = (value) => {
    setMediaType(value);
    setSelectedGenreId(null);
    setSelectedMood(null);
  }

  const handleRetry = () => setRetryCount((c) => c + 1);

  // Carrega a lista de gêneros sempre que o tipo de mídia mudar
  useEffect(() => {
    getGenres(mediaType)
      .then((data) => setGenres(data))
      .catch(() => setGenres([]));
  }, [mediaType]);

  // Busca títulos combinando gênero selecionado diretamente + gêneros do mood
  useEffect(() => {
    const idsToUse = buildGenreIdList(selectedGenreId, selectedMood, genres);

    if (idsToUse.length === 0) {
      return;
    }

    setStatus("loading");

    discoverByGenres(mediaType, idsToUse)
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
        setStatus(mapped.length > 0 ? "success" : "empty");
      })
      .catch(() => setStatus("error"));
  }, [mediaType, selectedGenreId, selectedMood, genres, retryCount]);

  return (
    <>
      <Header />
      <div className="page">
        <h1 className="page-title">Descobrir</h1>
        <p className="page-subtitle">
          Filtre por gênero ou pelo humor de hoje. Sem paciência pra decidir? Deixa o "Me
          surpreenda" escolher por você.
        </p>

        <div style={{ marginBottom: 28 }}>
          <MediaTypeToggle value={mediaType} onChange={handleMediaTypeChange} />
        </div>

        <GenreFilter genres={genres} selectedGenreId={selectedGenreId} onSelect={setSelectedGenreId} />
        <MoodFilter selectedMood={selectedMood} onSelect={setSelectedMood} />

        <SurpriseButton
          candidates={items}
          mediaType={mediaType}
          disabled={status !== "success"}
        />

        <MediaGrid
          items={items}
          state={status}
          emptyMessage="Nenhum título encontrado com esses filtros."
          errorMessage="Não conseguimos carregar sugestões agora."
          onRetry={handleRetry}
        />
      </div>
    </>
  );
}

export default Discover
