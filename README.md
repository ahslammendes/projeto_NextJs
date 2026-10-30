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

O projeto está organizado diretamente dentro da pasta raiz **`MockupSnap/`** seguindo o padrão modular do Next.js 14:

```text
MockupSnap/
├── app/
│   ├── globals.css                 # Estilos globais e variáveis CSS do tema escuro (Tailwind / shadcn)
│   ├── layout.tsx                  # Layout raiz da aplicação + provedor de Toasts (<Toaster />)
│   └── page.tsx                    # Página principal: Sidebar (Lado Esquerdo) + Palco #export-canvas (Lado Direito)
├── components/
│   ├── frames/
│   │   └── MockupFrames.tsx        # Componentes das molduras (<IphoneFrame>, <MacbookFrame>, <BrowserFrame>, <NoneFrame>)
│   └── ui/                         # Componentes reutilizáveis do shadcn/ui
│       ├── button.tsx              # Botões de ação e exportação
│       ├── label.tsx               # Rótulos de formulário
│       ├── select.tsx              # Seletor de Sombra e Aspect Ratio
│       ├── slider.tsx              # Sliders de Padding, BorderRadius e Tilt 3D
│       ├── tabs.tsx                # Abas de navegação (Moldura & Fundo / Ajustes / Sólido & Gradiente)
│       ├── toggle-group.tsx        # Grupo de seleção rápida de molduras
│       └── toggle.tsx              # Base de estilização dos botões de alternância
├── lib/
│   └── utils.ts                    # Função utilitária cn() para combinação de classes Tailwind
├── store/
│   └── useMockupStore.ts           # Store Zustand (image, frame, background, padding, shadow, borderRadius, tilt, actions)
├── .gitignore                      # Arquivos e pastas ignorados pelo Git (node_modules, .next, .env, caches)
├── components.json                 # Configuração do shadcn/ui
├── next.config.mjs                 # Configuração do Next.js 14
├── package.json                    # Dependências e scripts npm
├── postcss.config.mjs              # Configuração do PostCSS / Autoprefixer
├── README.md                       # Documentação do projeto
├── tailwind.config.ts              # Configuração de temas e plugins do Tailwind CSS
└── tsconfig.json                   # Configuração do compilador TypeScript e alias (@/*)
```

---

## 🚀 Como Rodar o Projeto Localmente

1. **Acesse a pasta do projeto:**
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
