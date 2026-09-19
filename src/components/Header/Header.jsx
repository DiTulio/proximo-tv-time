import { NavLink } from "react-router";
import { Clapperboard } from "lucide-react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="header__logo">
          <Clapperboard size={22} />
          <span>TV Time</span>
        </NavLink>
        <nav className="header__nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "is-active" : "")}>
            Em alta
          </NavLink>
          <NavLink to="/descobrir" className={({ isActive }) => (isActive ? "is-active" : "")}>
            Descobrir
          </NavLink>
          <NavLink to="/busca" className={({ isActive }) => (isActive ? "is-active" : "")}>
            Busca
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header
