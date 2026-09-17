# references.md — Referências Visuais

## 1. Netflix — Grade de descoberta (Home)

**Arquivo:** `imagens/netflix-grid.png`

**Onde observamos:** a página inicial do Netflix, organizada em fileiras horizontais/grade por categoria (ex: "TV Shows", "Spanish Movies"), com pôster grande, pouco texto e nota implícita por destaque de posição.

**Elemento usado no nosso projeto:** a **grade de cards de pôster** (componente `MediaGrid` + `MediaCard`) nas páginas `Home`, `Discover` e `Search`. Cada card mostra pôster, título e nota — igual ao padrão de "muita imagem, pouco texto" do Netflix.

**Por que é adequado à nossa solução:** nosso problema central é reduzir a paralisia de escolha. Uma grade densa de pôsteres permite escanear visualmente várias opções rapidamente, muito mais rápido do que uma lista em texto — o que é exatamente o comportamento de "navegar procurando algo" que queremos suportar.

## 2. Twitch — Página de Browse (categorias e canais em alta)

**Arquivo:** `imagens/twitch-browse.png`

**Onde observamos:** a página "Browse" da Twitch, que combina uma fileira de canais "Live" em destaque com uma seção "Categorias que você pode gostar" no final — um grid de cards coloridos, cada categoria com sua própria capa/cor, muito mais visual do que uma lista de texto de gêneros.

**Elemento usado no nosso projeto:** o componente `GenreFilter`, que ganhou um indicador de cor (`chip__dot`) por gênero — cada gênero recebe uma cor fixa de uma paleta, deixando os chips mais parecidos com "categorias" visuais e menos com uma lista neutra de texto, como na Twitch.

**Por que é adequado à nossa solução:** na página `Discover`, o usuário está literalmente "navegando" (browsing) por opções sem saber exatamente o que quer, igual no fluxo da Twitch. Dar identidade visual a cada categoria/gênero ajuda a reconhecer rapidamente o filtro pelo "bloco colorido", sem precisar ler todo o texto.

## 3. YouTube — Grade de recomendados

**Arquivo:** `imagens/youtube-recommended.png`

**Onde observamos:** a home de recomendados do YouTube, onde cada thumbnail vem acompanhada de duas linhas de texto empilhadas abaixo (título e, numa linha secundária mais discreta, canal + visualizações + tempo).

**Elemento usado no nosso projeto:** o `MediaCard` passou a exibir uma segunda linha, discreta (`media-card__year`), abaixo do título — o ano de lançamento do filme/série — em vez de mostrar só o título isolado.

**Por que é adequado à nossa solução:** o ano ajuda a diferenciar remakes/reboots e dar contexto rápido (é um lançamento recente ou um clássico?) sem precisar abrir os detalhes, do mesmo jeito que o YouTube usa a linha secundária para dar contexto extra (canal, tempo) sem poluir o título principal.
