import { Loader2, SearchX, TriangleAlert } from "lucide-react";
import "./StateFeedback.css";

const StateFeedback = ({ state, message, onRetry }) => {
  if (state === "loading") {
    return (
      <div className="state-feedback">
        <Loader2 className="state-feedback__icon state-feedback__icon--spin" size={28} />
        <p>Carregando...</p>
      </div>
    );
  }

  if (state === "empty") {
    return (
      <div className="state-feedback">
        <SearchX className="state-feedback__icon" size={28} />
        <p>{message || "Nada encontrado por aqui."}</p>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="state-feedback">
        <TriangleAlert className="state-feedback__icon state-feedback__icon--error" size={28} />
        <p>{message || "Algo deu errado ao buscar os dados."}</p>
        {onRetry && (
          <button className="state-feedback__retry" onClick={onRetry}>
            Tentar de novo
          </button>
        )}
      </div>
    );
  }

  return null;
}

export default StateFeedback
