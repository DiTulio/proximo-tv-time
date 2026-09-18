import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Star } from "lucide-react";
import { getDetails, getWatchProviders, IMAGE_BASE } from "../../api/tmdb";
import Header from "../../components/Header/Header";
import StateFeedback from "../../components/StateFeedback/StateFeedback";
import WatchProviders from "../../components/WatchProviders/WatchProviders";
import "./MediaDetails.css";

const MediaDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [providers, setProviders] = useState([]);
  const [status, setStatus] = useState("loading");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setStatus("loading");

    getDetails(type, id)
      .then((detailsData) => {
        return getWatchProviders(type, id).then((providersData) => {
          setDetails(detailsData);
          setProviders(providersData);
          setStatus("success");
        });
      })
      .catch(() => setStatus("error"));
  }, [type, id, retryCount]);

  const handleRetry = () => setRetryCount((c) => c + 1);

  if (status !== "success") {
    return (
      <>
        <Header />
        <div className="page">
          <StateFeedback
            state={status}
            message="Não conseguimos carregar este título."
            onRetry={handleRetry}
          />
        </div>
      </>
    );
  }

  const title = details.title || details.name;
  const year = (details.release_date || details.first_air_date || "").slice(0, 4);

  return (
    <>
      <Header />
      <div className="page media-details">
        <button onClick={() => navigate(-1)} className="media-details__back" type="button">
          <ArrowLeft size={18} /> Voltar
        </button>

        <div className="media-details__grid">
          <div className="media-details__poster">
            {details.poster_path ? (
              <img src={`${IMAGE_BASE}${details.poster_path}`} alt={title} />
            ) : (
              <div className="media-details__poster-placeholder" />
            )}
          </div>

          <div className="media-details__info">
            <h1 className="page-title">{title}</h1>
            <div className="media-details__meta">
              {year && <span>{year}</span>}
              {details.vote_average > 0 && (
                <span className="media-details__rating">
                  <Star size={14} fill="currentColor" /> {details.vote_average.toFixed(1)}
                </span>
              )}
            </div>

            {details.genres && details.genres.length > 0 && (
              <div className="chip-row">
                {details.genres.map((g) => (
                  <span key={g.id} className="chip">{g.name}</span>
                ))}
              </div>
            )}

            <p className="media-details__overview">
              {details.overview || "Sem sinopse disponível para este título."}
            </p>

            <h2 className="media-details__section-title">Onde assistir</h2>
            <WatchProviders providers={providers} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MediaDetails
