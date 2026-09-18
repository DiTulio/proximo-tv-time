import { IMAGE_BASE } from "../../api/tmdb";
import "./WatchProviders.css";

const WatchProviders = ({ providers }) => {
  if (!providers || providers.length === 0) {
    return (
      <p className="watch-providers__empty">
        Não disponível em nenhum serviço de streaming no momento.
      </p>
    );
  }

  return (
    <ul className="watch-providers">
      {providers.map((provider) => (
        <li key={provider.provider_id} className="watch-providers__item">
          <img
            src={`${IMAGE_BASE}${provider.logo_path}`}
            alt={provider.provider_name}
          />
          <span>{provider.provider_name}</span>
        </li>
      ))}
    </ul>
  );
}

export default WatchProviders
