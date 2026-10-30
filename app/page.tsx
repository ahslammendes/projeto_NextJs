"use client";

import React, { useRef, useState } from "react";
import {
  useMockupStore,
  FrameType,
  BackgroundType,
  ShadowSize,
} from "@/store/useMockupStore";
import {
  IphoneFrame,
  MacbookFrame,
  BrowserFrame,
  NoneFrame,
} from "@/components/frames/MockupFrames";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Laptop,
  Globe,
  Square,
  UploadCloud,
  Trash2,
  Download,
  RotateCcw,
  SlidersHorizontal,
  Palette,
} from "lucide-react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AspectRatioKey = "1:1" | "16:9" | "4:5" | "9:16";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const ASPECT_RATIOS: Record<
  AspectRatioKey,
  { label: string; width: number; height: number }
> = {
  "1:1": {
    label: "1:1 — Instagram Post (1080×1080)",
    width: 600,
    height: 600,
  },
  "16:9": {
    label: "16:9 — Twitter / YouTube (1920×1080)",
    width: 720,
    height: 405,
  },
  "4:5": {
    label: "4:5 — Feed Retrato (1080×1350)",
    width: 520,
    height: 650,
  },
  "9:16": {
    label: "9:16 — Stories / Reels (1080×1920)",
    width: 405,
    height: 720,
  },
};

export default function HomePage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioKey>("1:1");

  const {
    image,
    frame,
    background,
    padding,
    shadow,
    borderRadius,
    tilt,
    setImage,
    setFrame,
    setBackground,
    setPadding,
    setShadow,
    setBorderRadius,
    setTilt,
    reset,
  } = useMockupStore();

  // 1. UPLOAD: Validação de tamanho (>5MB) + Leitura com FileReader salvando Base64 no estado `image`
  const readFileAsBase64 = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Formato inválido. Envie um arquivo de imagem (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("A imagem enviada é muito pesada! O limite máximo é de 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setImage(result);
        toast.success("Screenshot carregada com sucesso!");
      }
    };
    reader.onerror = () => {
      toast.error("Erro ao ler o arquivo de imagem.");
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      readFileAsBase64(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      readFileAsBase64(file);
    }
    e.target.value = "";
  };

  // Exportação em alta resolução (pixelRatio: 2) com Toast de confirmação
  const handleExport = async () => {
    const node =
      canvasRef.current ??
      (document.getElementById("export-canvas") as HTMLDivElement | null);
    if (!node || !image) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `mockup-snap-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Mockup exportado com sucesso em alta resolução (2x)!");
    } catch (error) {
      console.error("Erro ao exportar imagem:", error);
      toast.error("Não foi possível exportar a imagem. Tente novamente.");
    } finally {
      setIsExporting(false);
    }
  };

  const currentDimensions = ASPECT_RATIOS[aspectRatio];

  // Estilo inline do #export-canvas lendo cores e direção do Zustand
  const canvasBackgroundStyle =
    background.type === "gradient"
      ? `linear-gradient(${background.direction}, ${background.color1}, ${background.color2})`
      : background.type === "solid"
      ? background.color1
      : "transparent";

  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-slate-100 md:flex-row">
      {/* Input de arquivo oculto compartilhado */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* LADO ESQUERDO: ÁREA DE CONFIGURAÇÃO (SIDEBAR) */}
      <aside className="flex w-full flex-col border-b border-slate-800 bg-slate-900/90 backdrop-blur md:h-screen md:w-80 md:border-b-0 md:border-r lg:w-96">
        {/* Header da Sidebar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 font-bold text-white shadow">
              M
            </div>
            <div>
              <h1 className="text-base font-bold leading-none text-white">
                MockupSnap
              </h1>
              <p className="mt-0.5 text-xs text-slate-400">
                Configurações do Mockup
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={reset}
            title="Resetar configurações"
            className="h-8 w-8 text-slate-400 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {/* 1. UPLOAD: Dropzone (drag and drop) limpo */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                1. Upload da Imagem (Máx. 5MB)
              </Label>
              {image && (
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-3 w-3" />
                  Remover
                </button>
              )}
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center transition-all",
                isDragging
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-slate-700 bg-slate-950/60 hover:border-slate-500 hover:bg-slate-900"
              )}
            >
              {image ? (
                <div className="flex items-center gap-3">
                  <img
                    src={image}
                    alt="Preview miniatura"
                    className="h-12 w-16 rounded border border-slate-700 object-cover"
                  />
                  <div className="text-left">
                    <p className="text-xs font-medium text-slate-200">
                      Imagem carregada
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Clique ou arraste outra para substituir
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <UploadCloud className="mb-2 h-7 w-7 text-indigo-400 transition-transform group-hover:scale-110" />
                  <p className="text-xs font-medium text-slate-200">
                    Arraste e solte seu print aqui
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    ou clique para selecionar (PNG, JPG, WEBP até 5MB)
                  </p>
                </>
              )}
            </div>
          </section>

          {/* ABAS DA SIDEBAR: "Estilo" (Moldura & Background) e "Ajustes" (Padding, BorderRadius, Tilt 3D, Shadow) */}
          <Tabs defaultValue="ajustes" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-950">
              <TabsTrigger value="estilo" className="gap-1.5 text-xs">
                <Palette className="h-3.5 w-3.5" />
                Moldura & Fundo
              </TabsTrigger>
              <TabsTrigger value="ajustes" className="gap-1.5 text-xs">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Ajustes
              </TabsTrigger>
            </TabsList>

            {/* ABA: MOLDURA & FUNDO */}
            <TabsContent value="estilo" className="mt-5 space-y-6">
              {/* 2. MOLDURAS: shadcn ToggleGroup com Smartphone, Laptop, Globe, Square */}
              <section className="space-y-2.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  2. Moldura (Frame)
                </Label>
                <ToggleGroup
                  type="single"
                  variant="outline"
                  value={frame}
                  onValueChange={(value) => {
                    if (value) setFrame(value as FrameType);
                  }}
                  className="grid grid-cols-4 gap-2"
                >
                  <ToggleGroupItem
                    value="iphone"
                    aria-label="Moldura iPhone"
                    className="flex h-16 flex-col items-center justify-center gap-1 border-slate-800 bg-slate-950/60 text-xs data-[state=on]:border-indigo-500 data-[state=on]:bg-indigo-500/15 data-[state=on]:text-indigo-300"
                  >
                    <Smartphone className="h-4 w-4" />
                    <span>iPhone</span>
                  </ToggleGroupItem>

                  <ToggleGroupItem
                    value="macbook"
                    aria-label="Moldura MacBook"
                    className="flex h-16 flex-col items-center justify-center gap-1 border-slate-800 bg-slate-950/60 text-xs data-[state=on]:border-indigo-500 data-[state=on]:bg-indigo-500/15 data-[state=on]:text-indigo-300"
                  >
                    <Laptop className="h-4 w-4" />
                    <span>MacBook</span>
                  </ToggleGroupItem>

                  <ToggleGroupItem
                    value="browser"
                    aria-label="Moldura Browser"
                    className="flex h-16 flex-col items-center justify-center gap-1 border-slate-800 bg-slate-950/60 text-xs data-[state=on]:border-indigo-500 data-[state=on]:bg-indigo-500/15 data-[state=on]:text-indigo-300"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Browser</span>
                  </ToggleGroupItem>

                  <ToggleGroupItem
                    value="none"
                    aria-label="Sem Moldura"
                    className="flex h-16 flex-col items-center justify-center gap-1 border-slate-800 bg-slate-950/60 text-xs data-[state=on]:border-indigo-500 data-[state=on]:bg-indigo-500/15 data-[state=on]:text-indigo-300"
                  >
                    <Square className="h-4 w-4" />
                    <span>Nenhuma</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </section>

              {/* 3. BACKGROUND: Tabs para "Sólido" ou "Gradiente" + <input type="color"> */}
              <section className="space-y-3">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  3. Background
                </Label>
                <Tabs
                  value={
                    background.type === "transparent"
                      ? "gradient"
                      : background.type
                  }
                  onValueChange={(value) =>
                    setBackground({ type: value as BackgroundType })
                  }
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-slate-950">
                    <TabsTrigger value="solid">Sólido</TabsTrigger>
                    <TabsTrigger value="gradient">Gradiente</TabsTrigger>
                  </TabsList>

                  {/* Tab Sólido */}
                  <TabsContent value="solid" className="mt-3 space-y-3">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="solid-color1"
                        className="text-xs text-slate-300"
                      >
                        Cor do Fundo (color1)
                      </Label>
                      <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                        <input
                          id="solid-color1"
                          type="color"
                          value={background.color1}
                          onChange={(e) =>
                            setBackground({ color1: e.target.value })
                          }
                          className="h-7 w-10 cursor-pointer rounded border-0 bg-transparent p-0"
                        />
                        <span className="font-mono text-xs text-slate-300">
                          {background.color1}
                        </span>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Tab Gradiente */}
                  <TabsContent value="gradient" className="mt-3 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="grad-color1"
                          className="text-xs text-slate-300"
                        >
                          Cor 1 (color1)
                        </Label>
                        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-2">
                          <input
                            id="grad-color1"
                            type="color"
                            value={background.color1}
                            onChange={(e) =>
                              setBackground({ color1: e.target.value })
                            }
                            className="h-6 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                          />
                          <span className="font-mono text-xs text-slate-300">
                            {background.color1}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label
                          htmlFor="grad-color2"
                          className="text-xs text-slate-300"
                        >
                          Cor 2 (color2)
                        </Label>
                        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-2">
                          <input
                            id="grad-color2"
                            type="color"
                            value={background.color2}
                            onChange={(e) =>
                              setBackground({ color2: e.target.value })
                            }
                            className="h-6 w-8 cursor-pointer rounded border-0 bg-transparent p-0"
                          />
                          <span className="font-mono text-xs text-slate-300">
                            {background.color2}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </section>
            </TabsContent>

            {/* ABA: AJUSTES (Padding, BorderRadius interno, Perspectiva 3D Tilt e Shadow) */}
            <TabsContent value="ajustes" className="mt-5 space-y-5">
              {/* Padding Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Espaçamento (Padding)
                  </Label>
                  <span className="font-mono text-xs text-indigo-400">
                    {padding}px
                  </span>
                </div>
                <Slider
                  value={[padding]}
                  min={0}
                  max={128}
                  step={4}
                  onValueChange={([val]) => setPadding(val)}
                />
              </div>

              {/* BorderRadius Interno Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Arredondamento Interno (borderRadius)
                  </Label>
                  <span className="font-mono text-xs text-indigo-400">
                    {borderRadius}px
                  </span>
                </div>
                <Slider
                  value={[borderRadius]}
                  min={0}
                  max={48}
                  step={2}
                  onValueChange={([val]) => setBorderRadius(val)}
                />
              </div>

              {/* Perspectiva 3D (Tilt) Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Perspectiva 3D (Tilt)
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-indigo-400">
                      {tilt}°
                    </span>
                    {tilt !== 0 && (
                      <button
                        type="button"
                        onClick={() => setTilt(0)}
                        className="text-[10px] text-slate-400 underline hover:text-white"
                      >
                        Zerar
                      </button>
                    )}
                  </div>
                </div>
                <Slider
                  value={[tilt]}
                  min={-30}
                  max={30}
                  step={1}
                  onValueChange={([val]) => setTilt(val)}
                />
              </div>

              {/* Shadow Select */}
              <div className="space-y-2.5">
                <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Sombra (Shadow)
                </Label>
                <Select
                  value={shadow}
                  onValueChange={(value) => setShadow(value as ShadowSize)}
                >
                  <SelectTrigger className="border-slate-800 bg-slate-950 text-slate-200">
                    <SelectValue placeholder="Selecione a intensidade da sombra" />
                  </SelectTrigger>
                  <SelectContent className="border-slate-800 bg-slate-900 text-slate-100">
                    <SelectItem value="none">Nenhuma (none)</SelectItem>
                    <SelectItem value="sm">Suave (sm)</SelectItem>
                    <SelectItem value="md">Média (md)</SelectItem>
                    <SelectItem value="xl">Grande (xl)</SelectItem>
                    <SelectItem value="2xl">Extra Profunda (2xl)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Botão de Exportação no rodapé da barra lateral */}
        <div className="border-t border-slate-800 bg-slate-950/60 p-4">
          <Button
            className="w-full bg-indigo-600 text-white hover:bg-indigo-500"
            disabled={!image || isExporting}
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Exportando..." : "Exportar Imagem (PNG)"}
          </Button>
        </div>
      </aside>

      {/* LADO DIREITO: PALCO DE EDIÇÃO */}
      <section className="flex flex-1 flex-col overflow-hidden bg-slate-950">
        {/* Header da Aplicação com Seletor de Aspect Ratio e Botão Exportar Imagem (PNG) */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/50 px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Proporção (Aspect Ratio):
            </span>
            <Select
              value={aspectRatio}
              onValueChange={(val) => setAspectRatio(val as AspectRatioKey)}
            >
              <SelectTrigger className="h-9 w-[260px] border-slate-800 bg-slate-950 text-xs text-slate-200">
                <SelectValue placeholder="Escolha a proporção" />
              </SelectTrigger>
              <SelectContent className="border-slate-800 bg-slate-900 text-slate-100">
                <SelectItem value="1:1">
                  1:1 — Instagram Post (1080×1080)
                </SelectItem>
                <SelectItem value="16:9">
                  16:9 — Landscape / X (1920×1080)
                </SelectItem>
                <SelectItem value="4:5">
                  4:5 — Feed Retrato (1080×1350)
                </SelectItem>
                <SelectItem value="9:16">
                  9:16 — Stories / Reels (1080×1920)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-slate-500">
              Canvas: {currentDimensions.width}×{currentDimensions.height}px (2x
              Retina)
            </span>
            <Button
              size="sm"
              className="bg-indigo-600 text-white hover:bg-indigo-500"
              disabled={!image || isExporting}
              onClick={handleExport}
            >
              <Download className="h-4 w-4" />
              {isExporting ? "Exportando..." : "Exportar Imagem (PNG)"}
            </Button>
          </div>
        </header>

        {/* Área central do palco */}
        <div className="relative flex flex-1 items-center justify-center overflow-auto p-6 md:p-8">
          {/* Grid pontilhado de fundo do palco */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* 1. O canvas principal (#export-canvas) NÃO existe se `image` estiver vazio.
                 Exibe uma área tracejada "Solte sua screenshot aqui" ocupando a tela inteira do palco. */}
          {!image ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "relative z-10 flex h-full min-h-[75vh] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center transition-all",
                isDragging
                  ? "border-indigo-500 bg-indigo-500/10 scale-[0.99]"
                  : "border-slate-700 bg-slate-900/40 hover:border-indigo-500/60 hover:bg-slate-900/70"
              )}
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
                <UploadCloud className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Solte sua screenshot aqui
              </h2>
              <p className="mt-2 max-w-md text-sm text-slate-400">
                Arraste e solte uma captura de tela em qualquer lugar desta área
                ou clique para selecionar do seu computador (máx. 5MB).
              </p>
            </div>
          ) : (
            <div
              id="export-canvas"
              ref={canvasRef}
              style={{
                width: `${currentDimensions.width}px`,
                height: `${currentDimensions.height}px`,
                padding: `${padding}px`,
                background: canvasBackgroundStyle,
              }}
              className="relative z-10 flex shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-2xl transition-all duration-200"
            >
              {/* Container do Frame com Perspectiva 3D dinâmica */}
              <div
                style={{
                  transform: `perspective(1000px) rotateY(${tilt}deg) rotateX(${
                    tilt / 2
                  }deg)`,
                  transformStyle: "preserve-3d",
                }}
                className="flex max-h-full max-w-full items-center justify-center transition-transform duration-200 ease-out"
              >
                {frame === "iphone" && <IphoneFrame image={image} />}
                {frame === "macbook" && <MacbookFrame image={image} />}
                {frame === "browser" && <BrowserFrame image={image} />}
                {frame === "none" && <NoneFrame image={image} />}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
