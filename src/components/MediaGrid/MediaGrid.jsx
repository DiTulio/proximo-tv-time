import MediaCard from "../MediaCard/MediaCard";
import StateFeedback from "../StateFeedback/StateFeedback";
import "./MediaGrid.css";

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
