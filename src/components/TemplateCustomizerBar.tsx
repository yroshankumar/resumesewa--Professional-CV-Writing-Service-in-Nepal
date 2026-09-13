import React, { useState } from "react";
import { TemplateConfig, TemplateId, FontStyle, AccentColor, LayoutDensity } from "../types";
import { colorThemes } from "../utils/themeStyles";
import { Palette, Type, Sliders, Image, Eye, EyeOff, LayoutTemplate } from "lucide-react";

interface Props {
  config: TemplateConfig;
  onChange: (newConfig: TemplateConfig) => void;
}

const templates: { id: TemplateId; label: string; desc: string; badge?: string }[] = [
  { id: "modern-clean", label: "Modern Clean", desc: "Corporate & Tech standard layout" },
  { id: "executive-serif", label: "Executive Serif", desc: "Timeless elegance for leadership & finance" },
  { id: "tech-developer", label: "Tech Developer", desc: "Code chips, metrics & repo links", badge: "Dev" },
  { id: "nepal-loksewa", label: "Nepal Lok Sewa / Banking", desc: "Civil Service & BFIs format with photo", badge: "Official" },
  { id: "international-ats", label: "International ATS", desc: "100% automated screening compliant", badge: "ATS 99" },
  { id: "creative-portfolio", label: "Creative Portfolio", desc: "Split sidebar with visual flair", badge: "Design" },
];

const fonts: { id: FontStyle; label: string }[] = [
  { id: "sans", label: "Plus Jakarta (Sans)" },
  { id: "serif", label: "Merriweather (Serif)" },
  { id: "mono", label: "JetBrains (Mono)" },
  { id: "display", label: "Space Grotesk" },
];

const densities: { id: LayoutDensity; label: string }[] = [
  { id: "compact", label: "Compact (Single Page)" },
  { id: "normal", label: "Balanced" },
  { id: "spacious", label: "Spacious" },
];

export const TemplateCustomizerBar: React.FC<Props> = ({ config, onChange }) => {
  const [showSectionVisibility, setShowSectionVisibility] = useState(false);

  const setTemplate = (templateId: TemplateId) => {
    onChange({ ...config, templateId });
  };

  const setFont = (fontStyle: FontStyle) => {
    onChange({ ...config, fontStyle });
  };

  const setColor = (accentColor: AccentColor) => {
    onChange({ ...config, accentColor });
  };

  const setDensity = (layoutDensity: LayoutDensity) => {
    onChange({ ...config, layoutDensity });
  };

  const togglePhoto = () => {
    onChange({ ...config, showPhoto: !config.showPhoto });
  };

  const toggleSection = (sectionKey: keyof typeof config.visibleSections) => {
    onChange({
      ...config,
      visibleSections: {
        ...config.visibleSections,
        [sectionKey]: !config.visibleSections[sectionKey],
      },
    });
  };

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-2xs">
      <div className="flex flex-wrap items-center gap-3">
        {/* Template Selector */}
        <div className="flex items-center gap-1.5">
          <LayoutTemplate className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-slate-700">Template:</span>
          <select
            value={config.templateId}
            onChange={(e) => setTemplate(e.target.value as TemplateId)}
            className="text-xs font-medium py-1 px-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 focus:ring-1 focus:ring-slate-800"
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label} {t.badge ? `[${t.badge}]` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Font Selector */}
        <div className="flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-slate-700">Font:</span>
          <select
            value={config.fontStyle}
            onChange={(e) => setFont(e.target.value as FontStyle)}
            className="text-xs font-medium py-1 px-2 border border-slate-300 rounded-lg bg-white text-slate-900"
          >
            {fonts.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-slate-700">Accent:</span>
          <div className="flex items-center gap-1">
            {(Object.keys(colorThemes) as AccentColor[]).map((colorKey) => {
              const theme = colorThemes[colorKey];
              const isSelected = config.accentColor === colorKey;
              return (
                <button
                  key={colorKey}
                  onClick={() => setColor(colorKey)}
                  style={{ backgroundColor: theme.hex }}
                  className={`w-4 h-4 rounded-full transition-transform ${
                    isSelected ? "ring-2 ring-offset-1 ring-slate-900 scale-110" : "hover:scale-105"
                  }`}
                  title={theme.name}
                />
              );
            })}
          </div>
        </div>

        {/* Density Selector */}
        <div className="flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-slate-700">Spacing:</span>
          <select
            value={config.layoutDensity}
            onChange={(e) => setDensity(e.target.value as LayoutDensity)}
            className="text-xs font-medium py-1 px-2 border border-slate-300 rounded-lg bg-white text-slate-900"
          >
            {densities.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Photo Toggle */}
        <button
          onClick={togglePhoto}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-md border font-medium transition-colors ${
            config.showPhoto
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          <Image className="w-3 h-3" />
          <span>{config.showPhoto ? "Photo On" : "Photo Off"}</span>
        </button>
      </div>

      {/* Sections Toggle Dropdown Trigger */}
      <div className="relative">
        <button
          onClick={() => setShowSectionVisibility(!showSectionVisibility)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
        >
          <Eye className="w-3 h-3 text-slate-500" />
          <span>Sections Visible</span>
        </button>

        {showSectionVisibility && (
          <div className="absolute right-0 top-8 z-30 w-48 bg-white rounded-xl shadow-xl border border-slate-200 p-2.5 space-y-1 text-xs">
            <div className="font-bold text-[11px] uppercase tracking-wider text-slate-500 px-1 pb-1 border-b border-slate-100">
              Toggle Sections
            </div>
            {(Object.keys(config.visibleSections) as (keyof typeof config.visibleSections)[]).map((secKey) => {
              const isVisible = config.visibleSections[secKey];
              return (
                <button
                  key={secKey}
                  onClick={() => toggleSection(secKey)}
                  className="w-full flex items-center justify-between px-2 py-1 rounded hover:bg-slate-100 capitalize"
                >
                  <span>{secKey}</span>
                  {isVisible ? (
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
