# Hands On! Legacy Modernization - Design System

Este documento define as diretrizes do universo visual da nova identidade da **Hands On!**, projetado para transparecer autoridade técnica, segurança em ambientes críticos e uma abordagem "engineering-first".

## 1. Princípios de Design

*   **Engineering First:** O design deve parecer uma ferramenta de engenharia, limpo, estruturado e com alta densidade de informação sem parecer desorganizado.
*   **Operate Mode:** A paleta de cores (Dark Mode) deve lembrar terminais, IDEs (VS Code) e dashboards técnicos de alta performance, transmitindo foco e precisão.
*   **High Tech & Glassmorphism:** O uso sutil de desfoques de fundo (backdrop-blur) e painéis translúcidos cria profundidade e um aspecto futurista/moderno, sem pesar a interface.

## 2. Paleta de Cores (Dark Mode)

A identidade adota um fundo escuro profundo (modo escuro nativo) com destaques luminosos:

*   **Fundo Principal (Background):** `#090A0F` (Um preto profundo com um leve traço de azul, que descansa os olhos e dá contraste total).
*   **Superfícies (Surface):** `#11131A` (Levemente mais claro que o fundo, para separar seções sem criar linhas duras).
*   **Bordas (Surface Border):** `#1F2937` (Bordas finas e precisas que estruturam a grade da interface).
*   **Cor de Destaque (Accent):** `#00F0FF` (Ciano vibrante / Eletric Cyan - Remete a código, terminais clássicos e inovação tech. Utilizado para call-to-actions principais, highlights de código e ícones).
*   **Destaque Hover (Accent Hover):** `#00D1FF` (Versão mais suave para interação).
*   **Texto Principal (Foreground):** `#F3F4F6` (Cinza muito claro, quase branco, otimizado para leitura em fundo escuro).
*   **Texto Secundário (Text Muted):** `#9CA3AF` (Cinza médio, ideal para descrições, metadados e elementos de apoio, mantendo a hierarquia clara).

## 3. Tipografia

*   **Fonte Padrão:** `Inter`, Sans-serif.
*   **Pesos Utilizados:**
    *   *Regular (400)*: Para corpo de texto, garantindo legibilidade.
    *   *Medium (500) / Semibold (600)*: Para botões, links e labels.
    *   *Bold (700) / Extrabold (800)*: Para títulos e métricas, criando âncoras visuais fortes.
    *   *Rastreamento (Tracking):* Uso de tracking amplo (`tracking-widest`) em *tags* e rótulos pequenos em maiúsculas (ex: `AGRITECH`, `SAAS`), trazendo estética técnica militar/aeroespacial.

## 4. Componentes Chave

### 4.1 Glass Panels (`.glass-panel`)
Substituem os cards brancos sólidos do design anterior.
*   **Propriedades:** Fundo levemente translúcido (`bg-surface/50`), borda sutil (`border-surface-border`), e desfoque (`backdrop-blur-sm`).
*   **Uso:** Cards de serviços, itens de portfólio, e container principal do formulário de diagnóstico.

### 4.2 Botões e CTAs
*   **Primário:** Cor de destaque com fundo (`bg-accent text-background`), cantos levemente arredondados, e sombra neon suave (`shadow-[0_0_10px_rgba(0,240,255,0.3)]`). No *hover*, a intensidade do neon aumenta para reforçar a interatividade.
*   **Secundário (Tags):** Fundos com baixíssima opacidade (ex: `bg-green-900/30`), texto vibrante (`text-green-400`) e bordas translúcidas, frequentemente utilizados em uppercase (ex: `AGRITECH`).

### 4.3 Gradientes e Glows
*   **Text Gradient:** Utilizado em títulos cruciais para dar um aspecto *premium* tecnológico (ex: `text-gradient-accent`).
*   **Ambient Glow:** Pontos de luz difusos no fundo (usando `blur-3xl` e cores como `bg-accent/10`) para quebrar o preto absoluto sem distrair o olhar. Utilizado atrás de seções chave (ex: atrás da imagem "Não começamos programando" e no resultado do Legacy Check).

## 5. Animações e Micro-Interações

*   **Hover Lift:** Os cards ganham um leve deslocamento vertical negativo (`-translate-y-1` ou `-translate-y-2`) ao passar o mouse.
*   **Slow Transitions:** Transições suaves de `500ms` a `700ms` (como visto nas imagens do portfólio), dando um aspecto "cinematográfico" e suave. As imagens fazem um leve zoom (scale-105).
*   **Pulse e Ping:** Utilizados com moderação em elementos que denotam atividade em tempo real ou status (ex: tag "Em Desenvolvimento" em estado *pulsing*).

## 6. O Formulário de Diagnóstico ("Operate Mode")

O formulário de avaliação ("Legacy Check") foi redesenhado para não parecer um formulário genérico de marketing de contato, mas sim um painel de diagnóstico embutido na landing page:
*   As etapas são claras, os inputs têm fundo integrado ao tema escuro.
*   O resultado final é o climax: O `Legacy Complexity Score` se destaca quase como um medidor de performance técnica. Os alertas de cores universais de operação (verde/amarelo/vermelho 🟢🟠🔴) criam um entendimento visual instintivo do risco.

## 7. Próximos Passos (Recomendação)

*   Padronizar as imagens de portfólio para mockups com estética similar ou telas escuras, garantindo que elas pareçam orgânicas na página.
*   Criar variações deste estilo visual nas sub-páginas de cada serviço especializado, mantendo o fundo `#090A0F`.
