# requirements.md — Próximo TV Time: "Descubra o que Assistir"

## 1. Objetivo

Com o encerramento do TV Time em julho de 2026, milhões de usuários perderam uma ferramenta central para decidir "o que assistir hoje". Este projeto propõe um MVP web responsivo focado exclusivamente em **descoberta de conteúdo**: ajudar a pessoa a encontrar um filme ou série para assistir agora, com base em tendências, gêneros/humor (mood) e busca direta, além de indicar onde assistir.

Não é objetivo deste MVP recriar o TV Time inteiro (diário de episódios, comunidade, gamificação etc.) — o escopo é deliberadamente restrito à jornada de descoberta.

## 2. Público-alvo

- Pessoas que assistem filmes/séries com frequência e sentem "paralisia de escolha" (choice paralysis) diante de tantos catálogos de streaming.
- Ex-usuários do TV Time que perderam a ferramenta de descoberta que usavam.
- Não é voltado a quem já sabe exatamente o que quer assistir (não é um player nem um catálogo de streaming).

## 3. User Stories

| ID | User Story | Prioridade |
|----|------------|------------|
| US01 | Como usuário, quero ver uma lista de filmes/séries em alta (trending) para descobrir o que está popular agora. | Alta |
| US02 | Como usuário, quero filtrar sugestões por gênero (ação, comédia, terror...) para encontrar algo do meu interesse. | Alta |
| US03 | Como usuário, quero escolher um "mood" (ex: "quero rir", "quero chorar", "quero tensão") e receber sugestões compatíveis. | Alta |
| US04 | Como usuário, quero buscar um filme/série pelo nome para ver detalhes rapidamente. | Alta |
| US05 | Como usuário, quero ver a página de detalhes de um título (sinopse, nota, elenco, gênero) para decidir se vale assistir. | Alta |
| US06 | Como usuário, quero saber em quais serviços de streaming um título está disponível para saber onde assistir. | Alta |
| US07 | Como usuário, quero um botão "Me surpreenda" que sorteia um título aleatório dentro dos filtros escolhidos, para quando não quero decidir. | Média |
| US08 | Como usuário, quero alternar entre "Filmes" e "Séries" nas listagens, pois são catálogos e necessidades diferentes. | Média |
| US09 | Como usuário, quero ver um estado de carregamento enquanto os dados da API chegam, para saber que o app está funcionando. | Média |
| US10 | Como usuário, quero ver uma mensagem clara quando uma busca não retorna resultados, para não achar que o app quebrou. | Média |

## 4. Critérios de aceitação

**US01 — Trending**
- Dado que estou na Home, então vejo uma grade com ao menos 12 títulos em alta, com pôster, nota e título.
- Cada card é clicável e leva à página de detalhes do título.

**US02 — Filtro por gênero**
- Dado que estou na página Descobrir, quando seleciono um gênero, então a listagem é atualizada mostrando apenas títulos daquele gênero.
- É possível voltar para "todos os gêneros".

**US03 — Filtro por mood**
- Dado que estou na página Descobrir, quando seleciono um mood (ex: "Tensão"), então o app mapeia esse mood para um ou mais gêneros da API e atualiza a listagem.

**US04 — Busca**
- Dado que digito um termo na barra de busca e confirmo, então vejo uma lista de resultados correspondentes ao termo.
- Se não houver resultados, uma mensagem de "nenhum resultado encontrado" é exibida.

**US05 — Detalhes**
- Dado que clico em um card, então sou levado a uma rota dinâmica (`/titulo/:id`) com sinopse, nota, ano, gêneros e pôster em tamanho maior.

**US06 — Onde assistir**
- Na página de detalhes, se a API retornar provedores de streaming para o título, então eles são exibidos como uma lista de logos/nomes.
- Se não houver provedores disponíveis (dado da API), exibe-se "Não disponível em nenhum serviço no momento".

**US07 — Me surpreenda**
- Dado que estou na página Descobrir com filtros aplicados (ou sem filtro), quando clico em "Me surpreenda", então sou levado aos detalhes de um título sorteado dentre os resultados atuais.

**US08 — Filmes/Séries**
- Um seletor (tabs ou toggle) alterna o tipo de conteúdo buscado na API entre `movie` e `tv` em todas as páginas relevantes.

**US09/US10 — Loading e vazio**
- Toda chamada à API exibe um estado de "carregando" enquanto pendente.
- Erros de rede exibem uma mensagem amigável, sem quebrar a tela.

## 5. Estados da aplicação

- **loading**: aguardando resposta da API (Home, Descobrir, Busca, Detalhes).
- **success**: dados carregados e renderizados.
- **empty**: requisição concluída mas sem resultados (busca sem match, filtro sem títulos).
- **error**: falha de rede ou da API (mensagem amigável + opção de tentar novamente).
- **idle**: estado inicial da busca antes do usuário digitar algo.

## 6. Regras do produto

1. O conteúdo é sempre segmentado por tipo: **Filme** ou **Série** — nunca misturado na mesma listagem.
2. Moods são um mapeamento fixo definido no front-end (mood → lista de `genre_id`s da TMDB), não um campo nativo da API.
3. "Me surpreenda" nunca repete o último título sorteado na mesma sessão, se houver mais de 1 resultado disponível.
4. Toda chamada à API TMDB usa a chave via variável de ambiente (`VITE_TMDB_API_KEY`), nunca hardcoded no código.
5. Imagens de pôster usam o CDN de imagens da TMDB (`image.tmdb.org`); se um título não tiver pôster, exibe-se um placeholder.
6. A aplicação é responsiva: funciona em telas mobile (>= 360px) e desktop.
