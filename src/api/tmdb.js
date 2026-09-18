const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";


async function fetchFromTMDB(path, extraParams) {
  let url = BASE_URL + path + "?api_key=" + API_KEY + "&language=pt-BR";

  if (extraParams) {
    for (const key in extraParams) {
      url += "&" + key + "=" + extraParams[key];
    }
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados da TMDB");
  }

  const data = await response.json();
  return data;
}

export async function getTrending(mediaType) {
  const data = await fetchFromTMDB("/trending/" + mediaType + "/week");
  return data.results;
}

export async function getGenres(mediaType) {
  const data = await fetchFromTMDB("/genre/" + mediaType + "/list");
  return data.genres;
}

export async function discoverByGenres(mediaType, genreIds) {
  const data = await fetchFromTMDB("/discover/" + mediaType, {
    with_genres: genreIds.join(","),
    sort_by: "popularity.desc",
  });
  return data.results;
}

export async function searchMedia(mediaType, query) {
  const data = await fetchFromTMDB("/search/" + mediaType, {
    query: encodeURIComponent(query),
  });
  return data.results;
}

export async function getDetails(mediaType, id) {
  const data = await fetchFromTMDB("/" + mediaType + "/" + id);
  return data;
}

export function getReleaseYear(item) {
  const date = item.release_date || item.first_air_date;
  return date ? date.slice(0, 4) : null;
}

export async function getWatchProviders(mediaType, id) {
  const data = await fetchFromTMDB("/" + mediaType + "/" + id + "/watch/providers");

  if (data.results && data.results.BR && data.results.BR.flatrate) {
    return data.results.BR.flatrate;
  }

  return [];
}
