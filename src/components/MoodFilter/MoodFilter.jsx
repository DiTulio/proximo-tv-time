import { MOODS } from "../../utils/moodMap";

const MoodFilter = ({ selectedMood, onSelect }) => {
  return (
    <div className="chip-row">
      <button
        className={`chip ${selectedMood === null ? "chip--active" : ""}`}
        onClick={() => onSelect(null)}
        type="button"
      >
        Sem humor específico
      </button>
      {MOODS.map((mood) => (
        <button
          key={mood.id}
          className={`chip ${selectedMood === mood.id ? "chip--active" : ""}`}
          onClick={() => onSelect(mood.id)}
          type="button"
        >
          {mood.label}
        </button>
      ))}
    </div>
  );
}

export default MoodFilter
