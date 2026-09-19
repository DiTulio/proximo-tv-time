# TV Time — descubra o que assistir

Um MVP web responsivo de **descoberta de filmes e séries**, criado para preencher a lacuna deixada pelo encerramento do TV Time em julho de 2026. O foco não é recriar o app inteiro (diário, comunidade, gamificação), e sim resolver um problema específico: ajudar a pessoa a decidir **o que assistir agora**, com base em tendências, gênero, "mood" e busca direta — incluindo onde assistir.

## Funcionalidades

- **Em alta** — lista de filmes/séries em tendência na semana, direto da API do TMDB
- **Descobrir** — filtro por gênero ou por "mood" (ex: "quero rir", "quero tensão"), com botão **Me surpreenda** para sortear um título dentre os resultados
- **Busca** — busca por nome com resultados em tempo real
- **Detalhes do título** — sinopse, nota, ano, gêneros e onde assistir (streaming)
- Alternância entre **Filmes** e **Séries** em todas as telas
- Estados de carregamento, vazio e erro tratados em toda a aplicação

## Tecnologias

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) (data router — `createBrowserRouter`)
- [lucide-react](https://lucide.dev/) — ícones
- [TMDB API](https://www.themoviedb.org/documentation/api) — dados de filmes, séries e streaming

## Estrutura do projeto

```
src/
  api/tmdb.js            # chamadas à API do TMDB
  components/             # componentes reutilizáveis (Header, MediaCard, GenreFilter...)
  pages/                   # Home, Discover, Search, MediaDetails, NotFound
  utils/moodMap.js        # mapeamento de "mood" para gêneros da TMDB
  App.jsx                  # definição das rotas
  main.jsx                 # ponto de entrada
```

Mais detalhes sobre arquitetura, componentes e fluxo de dados em [`docs/architecture.md`](docs/architecture.md), e sobre requisitos e critérios de aceitação em [`docs/requirements.md`](docs/requirements.md).

## Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18 ou superior
- Uma chave de API gratuita do [TMDB](https://www.themoviedb.org/settings/api) (**API Key**, não o Read Access Token)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/<seu-usuario>/proximo-tv-time.git
cd proximo-tv-time

# 2. Instale as dependências
npm install

# 3. Configure sua chave da API
# Crie um arquivo .env na raiz do projeto com o conteúdo:
echo "VITE_TMDB_API_KEY=sua_chave_aqui" > .env

# 4. Rode o servidor de desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:5173`.

### Outros scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | inicia o servidor de desenvolvimento |
| `npm run build` | gera a versão de produção em `dist/` |
| `npm run preview` | serve a build de produção localmente |
| `npm run lint` | roda o linter (Oxlint/ESLint) |

### Deploy

Acesse a página final aqui: `https://proximo-tv-time-gku2.vercel.app`

## 👥 Integrantes

- Vinicius Di Tulio Gomes Silva — RM 573019
- Ryan Romagnoli Santos — RM 568845

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).