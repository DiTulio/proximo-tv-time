import { Link } from "react-router";
import { Star, ImageOff } from "lucide-react";
import { IMAGE_BASE } from "../../api/tmdb";
import "./MediaCard.css";

const MediaCard = ({ id, title, posterPath, voteAverage, mediaType, year }) => {
  return (
    <Link to={`/titulo/${mediaType}/${id}`} className="media-card">
      <div className="media-card__poster">
        {posterPath ? (
          <img src={`${IMAGE_BASE}${posterPath}`} alt={title} loading="lazy" />
        ) : (
          <div className="media-card__placeholder">
            <ImageOff size={28} />
          </div>
        )}
        {typeof voteAverage === "number" && voteAverage > 0 && (
          <span className="media-card__rating">
            <Star size={12} fill="currentColor" />
            {voteAverage.toFixed(1)}
          </span>
        )}
      </div>
      <p className="media-card__title">{title}</p>
      {/* Linha secundária discreta (ano), inspirada na referência do YouTube:
          título em destaque + linha auxiliar com contexto extra logo abaixo. */}
      {year && <p className="media-card__year">{year}</p>}
    </Link>
  );
}

export default MediaCard
