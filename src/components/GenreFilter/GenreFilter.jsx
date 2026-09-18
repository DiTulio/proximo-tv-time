
const GENRE_COLORS = [
  "#e879f9", "#60a5fa", "#34d399", "#fbbf24",
  "#f87171", "#a78bfa", "#38bdf8", "#fb923c",
];

function colorForGenre(genreId) {
  return GENRE_COLORS[genreId % GENRE_COLORS.length];
}

const GenreFilter = ({ genres, selectedGenreId, onSelect }) => {
  return (
    <div className="chip-row">
      <button
        className={`chip ${selectedGenreId === null ? "chip--active" : ""}`}
        onClick={() => onSelect(null)}
        type="button"
      >
        Todos os gêneros
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`chip ${selectedGenreId === genre.id ? "chip--active" : ""}`}
          onClick={() => onSelect(genre.id)}
          type="button"
        >
          <span className="chip__dot" style={{ background: colorForGenre(genre.id) }} />
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter
