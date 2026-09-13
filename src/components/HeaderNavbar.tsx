import React from "react";
import { FileText, Sparkles, ShieldCheck, Mail, RotateCcw, ChevronDown, Check } from "lucide-react";
import { sampleProfiles } from "../data/sampleProfiles";
import { ResumeData, TemplateConfig } from "../types";

interface Props {
  onLoadSample: (data: ResumeData, config?: Partial<TemplateConfig>) => void;
  onResetEmpty: () => void;
  onOpenBulletStudio: () => void;
  onOpenAtsScanner: () => void;
  onOpenCoverLetter: () => void;
}

export const HeaderNavbar: React.FC<Props> = ({
  onLoadSample,
  onResetEmpty,
  onOpenBulletStudio,
  onOpenAtsScanner,
  onOpenCoverLetter,
}) => {
  const [showSampleMenu, setShowSampleMenu] = React.useState(false);

  return (
    <header className="no-print bg-slate-950 text-white border-b border-slate-800 px-4 py-2.5 flex items-center justify-between gap-4 sticky top-0 z-40">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-sm sm:text-base font-display-clean">
                Resume<span className="text-emerald-400">Sewa</span>
              </span>
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                AI Pro
              </span>
            </div>
            <p className="text-[10px] text-slate-400 -mt-0.5 hidden sm:block">
              Professional Resume & Portfolio Builder with Gemini AI
            </p>
          </div>
        </div>

        {/* Sample Profile Switcher */}
        <div className="relative ml-2 sm:ml-4">
          <button
            onClick={() => setShowSampleMenu(!showSampleMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <span>Load Sample Profile</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showSampleMenu && (
            <div className="absolute left-0 top-8 mt-1 z-50 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-1.5 space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">
                Select Pre-Filled Profile
              </div>
              <button
                onClick={() => {
                  onLoadSample(sampleProfiles.softwareEngineer, {
                    templateId: "tech-developer",
                    accentColor: "indigo",
                  });
                  setShowSampleMenu(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-xs transition-colors"
              >
                <div className="font-semibold text-slate-200">Aarav Sharma</div>
                <div className="text-[11px] text-slate-400">Senior Full-Stack Architect (Tech Template)</div>
              </button>
              <button
                onClick={() => {
                  onLoadSample(sampleProfiles.lokSewaOfficer, {
                    templateId: "nepal-loksewa",
                    accentColor: "slate",
                    fontStyle: "serif",
                  });
                  setShowSampleMenu(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-xs transition-colors"
              >
                <div className="font-semibold text-slate-200">Prabin K. Adhikari</div>
                <div className="text-[11px] text-slate-400">Section Officer / Lok Sewa (Official CV Format)</div>
              </button>
              <button
                onClick={() => {
                  onLoadSample(sampleProfiles.creativeDesigner, {
                    templateId: "creative-portfolio",
                    accentColor: "emerald",
                  });
                  setShowSampleMenu(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-xs transition-colors"
              >
                <div className="font-semibold text-slate-200">Pooja Gurung</div>
                <div className="text-[11px] text-slate-400">Lead Product & UI/UX Designer (Split Sidebar)</div>
              </button>
              <button
                onClick={() => {
                  onResetEmpty();
                  setShowSampleMenu(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-950/40 text-rose-300 text-xs flex items-center gap-1.5 border-t border-slate-800"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Start Blank Resume</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action Tools */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenBulletStudio}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 transition-all shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI Bullet Studio</span>
        </button>

        <button
          onClick={onOpenAtsScanner}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-950/30 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden md:inline">ATS Scanner</span>
        </button>

        <button
          onClick={onOpenCoverLetter}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <Mail className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Cover Letter</span>
        </button>
      </div>
    </header>
  );
};
