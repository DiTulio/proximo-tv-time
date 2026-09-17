// Mapeia "moods" (estados de espírito) para IDs de gênero da TMDB.
// IDs de gênero são os mesmos para movie e tv na maioria dos casos relevantes aqui.
export const MOODS = [
  { id: "rir", label: "Quero rir", genreIds: [35] }, // Comédia
  { id: "chorar", label: "Quero chorar", genreIds: [18] }, // Drama
  { id: "tensao", label: "Tensão", genreIds: [53, 9648] }, // Thriller, Mistério
  { id: "medo", label: "Quero medo", genreIds: [27] }, // Terror
  { id: "fuga", label: "Fugir da realidade", genreIds: [14, 878] }, // Fantasia, Ficção científica
  { id: "acao", label: "Adrenalina", genreIds: [28, 12] }, // Ação, Aventura
];

export function getGenreIdsForMood(moodId) {
  const mood = MOODS.find((m) => m.id === moodId);
  return mood ? mood.genreIds : [];
}
