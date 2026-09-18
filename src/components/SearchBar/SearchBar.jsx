import { Search } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-bar">
      <Search size={18} className="search-bar__icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Buscar um título..."}
      />
    </div>
  );
}

export default SearchBar
