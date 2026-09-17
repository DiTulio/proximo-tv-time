# architecture.md — Próximo TV Time: "Descubra o que Assistir"

## 1. Stack técnica

- **React 19** (Vite)
- **React Router** (`react-router`, com `createBrowserRouter`/`RouterProvider`) — múltiplas páginas e rota dinâmica
- **lucide-react** — biblioteca de ícones
- **fetch** (nativo do navegador) — consumo da API
- **TMDB API** (The Movie Database) — trending, discover (por gênero), search, detalhes, watch providers

## 2. Estrutura de pastas

```
src/
  api/
    tmdb.js              # fetch + funções de chamada à API (sem lib externa)
  components/
    Header/
      Header.jsx         # navegação, renderizado no topo de cada página
    MediaCard/
      MediaCard.jsx      # card de filme/série (poster, nota, título, ano)
    MediaGrid/
      MediaGrid.jsx      # grade de MediaCards
    GenreFilter/
      GenreFilter.jsx    # lista de chips de gênero
    MoodFilter/
      MoodFilter.jsx     # lista de chips de mood
    MediaTypeToggle/
      MediaTypeToggle.jsx  # alterna Filme / Série
    SearchBar/
      SearchBar.jsx
    SurpriseButton/
      SurpriseButton.jsx
    WatchProviders/
      WatchProviders.jsx
    StateFeedback/
      StateFeedback.jsx  # loading / empty / error genéricos
  pages/
    Home/
      Home.jsx            # trending
    Discover/
      Discover.jsx        # filtros por gênero/mood + me surpreenda
    Search/
      Search.jsx
    MediaDetails/
      MediaDetails.jsx    # rota dinâmica /titulo/:type/:id
    NotFound/
      NotFound.jsx
  utils/
    moodMap.js            # mapeamento mood -> genre_ids
  App.jsx                 # define as rotas (createBrowserRouter/RouterProvider)
  main.jsx                # só monta <App /> no DOM
.env.example
```

Não existe layout compartilhado (sem `Outlet`): cada página importa e renderiza o próprio `<Header />` no topo. É mais repetitivo, mas mais fácil de acompanhar — cada página é dona de tudo que ela renderiza.

## 3. Rotas (React Router)

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Home | Trending da semana (filmes ou séries, conforme toggle) |
| `/descobrir` | Discover | Filtros por gênero e mood + botão "Me surpreenda" |
| `/busca` | Search | Busca por texto |
| `/titulo/:type/:id` | MediaDetails | Rota dinâmica — `type` = `movie` \| `tv`, `id` = id da TMDB |
| `*` | NotFound | Página 404 |

Definidas em `App.jsx` com a API de data router do `react-router` (mesmo padrão usado em sala, sem JSX `<Routes>/<Route>`):

```jsx
const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <NotFound /> },
  { path: "descobrir", element: <Discover /> },
  { path: "busca", element: <Search /> },
  { path: "titulo/:type/:id", element: <MediaDetails /> },
  { path: "*", element: <NotFound /> },
]);

// renderizado com <RouterProvider router={router} />, importado de "react-router/dom"
```

## 4. Componentes, props e responsabilidades

### `Header`
- Props: nenhuma. Navegação entre Home/Descobrir/Busca. Renderizado individualmente no topo de cada página (não há layout compartilhado).

### `MediaTypeToggle`
- Props: `{ value: "movie" | "tv", onChange: (value) => void }`
- Estado local: nenhum (controlado pelo pai).

### `MediaCard`
- Props: `{ id, title, posterPath, voteAverage, mediaType, year }`
- Não tem estado. Ao clicar, navega para `/titulo/:mediaType/:id`.
- `year` (opcional) é exibido como linha secundária discreta abaixo do título — decisão inspirada na referência do YouTube (título + linha auxiliar de contexto).

### `MediaGrid`
- Props: `{ items: Array<MediaCardProps>, state: "loading"|"success"|"empty"|"error", emptyMessage?: string, errorMessage?: string, onRetry?: () => void }`
- Renderiza `StateFeedback` quando `state !== "success"` (repassando `onRetry`), senão mapeia `items` em `MediaCard`.

### `GenreFilter`
- Props: `{ genres: Array<{id, name}>, selectedGenreId: number|null, onSelect: (id) => void }`
- Cada chip exibe um `chip__dot` colorido (cor derivada do `genre.id`, via paleta fixa) — decisão inspirada na referência da Twitch (grid colorido de categorias).

### `MoodFilter`
- Props: `{ selectedMood: string|null, onSelect: (mood) => void }`
- Usa `utils/moodMap.js` para exibir as opções fixas de mood.

### `SearchBar`
- Props: `{ value: string, onChange: (v) => void, placeholder?: string }`
- Sem `onSubmit`: a busca é reativa (dispara pelo `useEffect` da página `Search` a cada mudança em `value`), não por submissão de formulário.
- Estado local: nenhum (controlado pelo pai da página `Search`).

### `SurpriseButton`
- Props: `{ candidates: Array<MediaCardProps>, mediaType: "movie"|"tv", disabled: boolean }`
- Estado local: `lastPickedId` (para não repetir o último sorteio).
- Ao clicar, sorteia um item de `candidates` e navega para `/titulo/:mediaType/:id`.

### `WatchProviders`
- Props: `{ providers: Array<{ provider_id, provider_name, logo_path }> }`
- Se `providers.length === 0`, renderiza mensagem de indisponibilidade.

### `StateFeedback`
- Props: `{ state: "loading" | "empty" | "error", message?: string, onRetry?: () => void }`

## 5. Páginas — estados React e efeitos

### `Home`
- **Estado**: `mediaType` ("movie" | "tv"), `items` (array), `status` ("loading"|"success"|"empty"|"error"), `retryCount` (number)
- **Efeito**: `useEffect` (dependências: `mediaType`, `retryCount`) → liga `status` para "loading", chama `getTrending(mediaType)` e define `status` como "success"/"empty"/"error" quando a resposta chega.
- **Handler**: `handleRetry` → incrementa `retryCount` (o que dispara o efeito de novo).

### `Discover`
- **Estado**: `mediaType`, `genres` (array), `selectedGenreId`, `selectedMood`, `items`, `status`, `retryCount`
- **Efeitos**:
  1. `useEffect` (dependência: `mediaType`) → carrega lista de gêneros da TMDB (`getGenres(mediaType)`).
  2. `useEffect` (dependências: `mediaType`, `selectedGenreId`, `selectedMood`, `genres`, `retryCount`) → liga `status` para "loading" e chama `discoverByGenres`, combinando gênero direto ou gêneros derivados do mood selecionado.
- **Handlers**: `handleMediaTypeChange` (troca `mediaType` e limpa os filtros) e `handleRetry`.

### `Search`
- **Estado**: `query`, `items`, `status` ("idle"|"loading"|"success"|"empty"|"error"), `mediaType`, `retryCount`
- **Efeito**: `useEffect` (dependências: `query`, `mediaType`, `retryCount`) → se `query` tem menos de 2 caracteres, volta pro estado "idle"; senão liga "loading" e chama `searchMedia(mediaType, query)`.
- **Handler**: `handleRetry`.
- Sem debounce: a busca dispara a cada tecla digitada (assim que passa de 2 caracteres). É uma simplificação intencional — mais fácil de explicar, ao custo de mais chamadas à API durante a digitação.

### `MediaDetails`
- **Estado**: `details` (objeto), `providers` (array), `status`, `retryCount`
- Lê `type`/`id` da URL via `useParams`.
- **Efeito**: `useEffect` (dependências: `type`, `id`, `retryCount`) → liga `status` para "loading", chama `getDetails` e depois `getWatchProviders` (encadeados com `.then`).
- **Handler**: `handleRetry`.

## 6. Camada de API (`src/api/tmdb.js`)

Funções expostas:
- `getTrending(mediaType)`
- `getGenres(mediaType)`
- `discoverByGenres(mediaType, genreIds)`
- `searchMedia(mediaType, query)`
- `getDetails(mediaType, id)`
- `getWatchProviders(mediaType, id)`
- `getReleaseYear(item)` — extrai o ano de `release_date`/`first_air_date`, usado pelo `MediaCard`

Todas usam `fetch` (nativo, sem biblioteca externa) contra a base `https://api.themoviedb.org/3`, com a chave lida de `import.meta.env.VITE_TMDB_API_KEY`. Uma função auxiliar `fetchFromTMDB` monta a URL e já retorna o JSON.

## 7. Fluxo de dados (resumo)

```
Home        -> api/tmdb.getTrending      -> MediaGrid -> MediaCard -> (navega) MediaDetails
Discover    -> api/tmdb.getGenres        -> GenreFilter / MoodFilter -> discoverByGenres -> MediaGrid -> SurpriseButton
Search      -> api/tmdb.searchMedia      -> MediaGrid
MediaDetails-> api/tmdb.getDetails + getWatchProviders -> WatchProviders
```
