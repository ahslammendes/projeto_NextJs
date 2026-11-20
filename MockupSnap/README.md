# 📸 MockupSnap — Gerador de Mockups para Redes Sociais

O **MockupSnap** é um estúdio visual **100% Client-Side (Zero Backend)** para criação rápida de mockups profissionais a partir de capturas de tela (screenshots).

Projetado para **designers, desenvolvedores, indie hackers, afiliados e criadores de conteúdo**, o MockupSnap permite transformar qualquer print de tela em uma imagem pronta para engajar no **Instagram, X (Twitter), LinkedIn, Threads ou YouTube**, aplicando molduras realistas de dispositivos, fundos em gradiente, sombras profundas e perspectiva 3D — tudo processado diretamente no navegador com privacidade total.

---

## ✨ O que é o Projeto e Como Funciona?

Diferente de ferramentas pesadas de design, o **MockupSnap** foca em um fluxo de trabalho instantâneo em tela única:

1. **Envie sua Screenshot**: Arraste e solte um print na área principal (`Dropzone`) ou na barra lateral. O arquivo é validado (limite de `5MB`) e convertido localmente em Base64 via `FileReader`, sem enviar dados para nenhum servidor.
2. **Escolha a Moldura (`Frame`)**:
   - **iPhone**: Bordas super arredondadas, Dynamic Island / notch falso centralizado no topo e acabamento escuro.
   - **MacBook**: Tela de notebook com câmera superior (notch) e chassi inferior em alumínio.
   - **Browser**: Janela de navegador estilo macOS com as 3 bolinhas clássicas (vermelho, amarelo e verde) e barra de endereço.
   - **Sem Moldura (`None`)**: Apenas a captura de tela com controle livre de arredondamento e sombra.
3. **Personalize o Fundo (`Background`)**:
   - Alterne entre **Cor Sólida** ou **Gradiente Linear** com seletores nativos de cor (`color1` e `color2`).
4. **Aplique Polimento Premium (`Aba Ajustes`)**:
   - **Espaçamento (`Padding`)**: Controle a distância entre o mockup e as bordas do canvas (`0px` a `128px`).
   - **Arredondamento Interno (`borderRadius`)**: Arredonde diretamente os cantos da imagem do print (`0px` a `48px`).
   - **Perspectiva 3D (`Tilt`)**: Incline o mockup em três dimensões em tempo real usando CSS 3D Transforms (`perspective(1000px) rotateY(...) rotateX(...)`).
   - **Sombras (`Shadow`)**: Escolha entre 5 intensidades (`none`, `sm`, `md`, `xl`, `2xl`).
5. **Selecione a Proporção (`Aspect Ratio`) e Exporte em Retina (2x HD)**:
   - Escolha entre `1:1` (Instagram Post), `16:9` (X/Twitter/YouTube), `4:5` (Feed Retrato) ou `9:16` (Stories/Reels).
   - Clique em **"Exportar Imagem (PNG)"** para renderizar o DOM do `#export-canvas` com `pixelRatio: 2` via `html-to-image`, garantindo textos nítidos em telas Retina.

---

## 🛠️ Tecnologias Utilizadas

- **[Next.js 14](https://nextjs.org/)** (App Router)
- **[TypeScript](https://www.typescriptlang.org/)** (Tipagem estática completa)
- **[Tailwind CSS](https://tailwindcss.com/)** + **[shadcn/ui](https://ui.shadcn.com/)** (`Tabs`, `Slider`, `Select`, `ToggleGroup`, `Button`, `Label`)
- **[Zustand](https://zustand-demo.pmnd.rs/)** (Gerenciamento de estado reativo no cliente)
- **[html-to-image](https://github.com/bubkoo/html-to-image)** (Captura do DOM para PNG em alta resolução `pixelRatio: 2`)
- **[Lucide React](https://lucide.dev/)** (Ícones)
- **[Sonner](https://sonner.emilkowal.ski/)** (Notificações Toast para feedback de upload, erros de tamanho e download)

---

## 📂 Organização das Pastas (`MockupSnap`)

O repositório possui a pasta **`MockupSnap/`** configurada como **Root Directory** do projeto Next.js 14 para deploy na **Vercel**:

```text
projeto_NextJs/                     # Raiz do repositório Git
├── MockupSnap/                     # <-- Root Directory para selecionar na Vercel
│   ├── public/
│   │   └── favicon.svg             # Ícone estático da aplicação
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css         # Estilos globais e variáveis CSS do tema escuro (Tailwind / shadcn)
│   │   │   ├── layout.tsx          # Layout raiz da aplicação + provedor de Toasts (<Toaster />)
│   │   │   └── page.tsx            # Página principal: Sidebar (Lado Esquerdo) + Palco #export-canvas (Lado Direito)
│   │   ├── components/
│   │   │   ├── frames/
│   │   │   │   └── MockupFrames.tsx # Componentes das molduras (<IphoneFrame>, <MacbookFrame>, <BrowserFrame>, <NoneFrame>)
│   │   │   └── ui/                 # Componentes reutilizáveis do shadcn/ui
│   │   │       ├── button.tsx
│   │   │       ├── label.tsx
│   │   │       ├── select.tsx
│   │   │       ├── slider.tsx
│   │   │       ├── tabs.tsx
│   │   │       ├── toggle-group.tsx
│   │   │       └── toggle.tsx
│   │   ├── lib/
│   │   │   └── utils.ts            # Função utilitária cn() para combinação de classes Tailwind
│   │   └── store/
│   │       └── useMockupStore.ts   # Store Zustand (image, frame, background, padding, shadow, borderRadius, tilt, actions)
│   ├── .eslintrc.json              # Configuração do ESLint para Next.js / Vercel Build
│   ├── components.json             # Configuração do shadcn/ui
│   ├── next.config.mjs             # Configuração do Next.js 14
│   ├── package-lock.json           # Lockfile de dependências
│   ├── package.json                # Dependências e scripts npm
│   ├── postcss.config.mjs          # Configuração do PostCSS / Autoprefixer
│   ├── tailwind.config.ts          # Configuração de temas e plugins do Tailwind CSS
│   └── tsconfig.json               # Configuração do compilador TypeScript e alias (@/* -> ./src/*)
├── .gitignore                      # Arquivos e pastas ignorados pelo Git
└── README.md                       # Documentação do projeto
```

---

## 🚀 Como Rodar o Projeto Localmente

1. **Acesse a pasta do projeto (`Root Directory`):**
   ```bash
   cd MockupSnap
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Abra no navegador:**
   Acesse [http://localhost:3000](http://localhost:3000).

---

## ▲ Deploy na Vercel

1. Suba as alterações para o seu repositório GitHub (`git push`).
2. Acesse a [Vercel](https://vercel.com/) e clique em **Add New... → Project**.
3. Importe o repositório `projeto_NextJs`.
4. Na opção **Root Directory**, clique em **Edit** e selecione a pasta **`MockupSnap`**.
5. Mantenha o **Framework Preset** como `Next.js` e clique em **Deploy**.
