import { useState } from "react";
import { useNavigate } from "react-router";
import { Shuffle } from "lucide-react";
import "./SurpriseButton.css";

const SurpriseButton = ({ candidates, mediaType, disabled }) => {
  const [lastPickedId, setLastPickedId] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!candidates.length) return;

    let pool = candidates;
    if (candidates.length > 1) {
      pool = candidates.filter((item) => item.id !== lastPickedId);
    }

    const picked = pool[Math.floor(Math.random() * pool.length)];
    setLastPickedId(picked.id);
    navigate(`/titulo/${mediaType}/${picked.id}`);
  }

  return (
    <button
      className="surprise-button"
      onClick={handleClick}
      disabled={disabled || candidates.length === 0}
      type="button"
    >
      <Shuffle size={18} />
      Me surpreenda
    </button>
  );
}

export default SurpriseButton
