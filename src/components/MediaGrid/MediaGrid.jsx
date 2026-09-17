import MediaCard from "../MediaCard/MediaCard";
import StateFeedback from "../StateFeedback/StateFeedback";
import "./MediaGrid.css";

// Recebe a lista de itens (já no formato de props do MediaCard) e o
// estado atual da requisição, delegando o feedback visual ao StateFeedback.
const MediaGrid = ({ items, state, emptyMessage, errorMessage, onRetry }) => {
  if (state !== "success") {
    return (
      <StateFeedback
        state={state}
        message={state === "empty" ? emptyMessage : errorMessage}
        onRetry={onRetry}
      />
    );
  }

  return (
    <div className="media-grid">
      {items.map((item) => (
        <MediaCard key={item.id} {...item} />
      ))}
    </div>
  );
}

export default MediaGrid
