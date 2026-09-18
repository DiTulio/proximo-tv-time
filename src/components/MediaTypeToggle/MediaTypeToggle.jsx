import { Film, Tv } from "lucide-react";
import "./MediaTypeToggle.css";

const MediaTypeToggle = ({ value, onChange }) => {
  return (
    <div className="media-type-toggle">
      <button
        className={value === "movie" ? "is-active" : ""}
        onClick={() => onChange("movie")}
        type="button"
      >
        <Film size={16} /> Filmes
      </button>
      <button
        className={value === "tv" ? "is-active" : ""}
        onClick={() => onChange("tv")}
        type="button"
      >
        <Tv size={16} /> Séries
      </button>
    </div>
  );
}

export default MediaTypeToggle
