import React, { useRef, useState } from "react";
import { ResumeData, TemplateConfig } from "../types";
import { ModernCleanTemplate } from "./templates/ModernCleanTemplate";
import { ExecutiveSerifTemplate } from "./templates/ExecutiveSerifTemplate";
import { TechDeveloperTemplate } from "./templates/TechDeveloperTemplate";
import { NepalLokSewaTemplate } from "./templates/NepalLokSewaTemplate";
import { InternationalAtsTemplate } from "./templates/InternationalAtsTemplate";
import { CreativePortfolioTemplate } from "./templates/CreativePortfolioTemplate";
import { ZoomIn, ZoomOut, Maximize2, Download, Printer, Sparkles } from "lucide-react";
import { downloadResumeAsPdf, triggerPrintDialog } from "../utils/pdfExport";

interface Props {
  data: ResumeData;
  config: TemplateConfig;
  onOpenAiStudio?: () => void;
}

export const ResumePreview: React.FC<Props> = ({ data, config, onOpenAiStudio }) => {
  const [zoom, setZoom] = useState<number>(100);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(150, Math.max(60, prev + delta)));
  };

  const handleExportPdf = async () => {
    setIsExporting(true);
    const sanitizedName = (data.personal.fullName || "Resume").replace(/[^a-zA-Z0-9_-]/g, "_");
    await downloadResumeAsPdf("resume-print-area", `${sanitizedName}_Resume.pdf`);
    setIsExporting(false);
  };

  const renderSelectedTemplate = () => {
    switch (config.templateId) {
      case "executive-serif":
        return <ExecutiveSerifTemplate data={data} config={config} />;
      case "tech-developer":
        return <TechDeveloperTemplate data={data} config={config} />;
      case "nepal-loksewa":
        return <NepalLokSewaTemplate data={data} config={config} />;
      case "international-ats":
        return <InternationalAtsTemplate data={data} config={config} />;
      case "creative-portfolio":
        return <CreativePortfolioTemplate data={data} config={config} />;
      case "modern-clean":
      default:
        return <ModernCleanTemplate data={data} config={config} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-200/70 relative">
      {/* Top Floating Action Bar */}
      <div className="no-print sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:inline">
            A4 Live Preview
          </span>
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={() => handleZoom(-10)}
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-mono px-2 text-slate-700 min-w-[44px] text-center font-medium">
              {zoom}%
            </span>
            <button
              onClick={() => handleZoom(10)}
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(100)}
              className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors ml-0.5"
              title="Reset Zoom"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAiStudio && (
            <button
              onClick={onOpenAiStudio}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>AI Bullet Studio</span>
            </button>
          )}

          <button
            onClick={triggerPrintDialog}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-2xs"
            title="High-definition vector print / save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Print / Vector PDF</span>
          </button>

          <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? "Generating PDF..." : "Export PDF"}</span>
          </button>
        </div>
      </div>

      {/* A4 Scrollable Canvas */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start"
      >
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease-out",
          }}
          className="shadow-2xl rounded-sm transition-shadow"
        >
          {/* Print container with target ID */}
          <div
            id="resume-print-area"
            className="a4-sheet bg-white border border-slate-300 shadow-xl overflow-hidden print:border-none print:shadow-none"
          >
            {renderSelectedTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
