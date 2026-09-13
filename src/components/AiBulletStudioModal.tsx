import React, { useState } from "react";
import { Sparkles, Copy, Check, Plus, ArrowRight, RefreshCw, X, Lightbulb, Wand2 } from "lucide-react";
import { ExperienceItem } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  experiences: ExperienceItem[];
  onAddBulletToExperience: (expId: string, bullet: string) => void;
  initialRole?: string;
  initialCompany?: string;
}

export const AiBulletStudioModal: React.FC<Props> = ({
  isOpen,
  onClose,
  experiences,
  onAddBulletToExperience,
  initialRole = "",
  initialCompany = "",
}) => {
  const [activeTab, setActiveTab] = useState<"generate" | "enhance">("generate");

  // Generator State
  const [role, setRole] = useState(initialRole);
  const [company, setCompany] = useState(initialCompany);
  const [notes, setNotes] = useState("");
  const [industry, setIndustry] = useState("Technology / Corporate");
  const [tone, setTone] = useState("Google XYZ Formula (Accomplished X by Y through Z)");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBullets, setGeneratedBullets] = useState<string[]>([]);
  const [targetExpId, setTargetExpId] = useState<string>(experiences[0]?.id || "");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  // Enhancer State
  const [weakBullet, setWeakBullet] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedVariations, setEnhancedVariations] = useState<
    { type: string; text: string; highlight: string }[]
  >([]);

  if (!isOpen) return null;

  const handleGenerateBullets = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/ai/bullet-points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: role,
          company,
          rawNotes: notes,
          industry,
          tone,
        }),
      });
      const data = await res.json();
      if (data.bullets && Array.isArray(data.bullets)) {
        setGeneratedBullets(data.bullets);
      }
    } catch (err) {
      console.error("Failed to generate bullets:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnhanceBullet = async () => {
    if (!weakBullet.trim()) return;
    setIsEnhancing(true);
    try {
      const res = await fetch("/api/ai/enhance-bullet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bulletText: weakBullet,
          roleContext: role || "Professional",
        }),
      });
      const data = await res.json();
      if (data.variations) {
        setEnhancedVariations(data.variations);
      }
    } catch (err) {
      console.error("Failed to enhance bullet:", err);
    } finally {
      setIsEnhancing(false);
    }
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-purple-50 via-indigo-50 to-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Gemini AI Bullet Point Studio
              </h2>
              <p className="text-xs text-slate-600">
                Craft high-impact, quantifiable resume bullets using Google's XYZ formula
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/70">
          <button
            onClick={() => setActiveTab("generate")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "generate"
                ? "border-purple-600 text-purple-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            Generate New Bullets
          </button>
          <button
            onClick={() => setActiveTab("enhance")}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "enhance"
                ? "border-purple-600 text-purple-700 bg-white"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Polish & Enhance Draft Bullet
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === "generate" ? (
            <>
              {/* Form inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Title / Role
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Lead Full Stack Architect"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Cloud Labs"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Draft Notes, Responsibilities, or Key Metrics (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Reduced API latency, migrated to microservices, led a team of 8 engineers, automated deployment..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Industry / Sector
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-hidden bg-white"
                  >
                    <option value="Software & Cloud Tech">Software & Cloud Tech</option>
                    <option value="Banking & Financial Services">Banking & Financial Services</option>
                    <option value="Government & Public Administration">Government & Public Administration (Lok Sewa)</option>
                    <option value="Overseas & International Construction (HSE/EPC)">Overseas & EPC (Gulf / Europe)</option>
                    <option value="Product Design & UX/UI">Product Design & UX/UI</option>
                    <option value="Healthcare & Operations">Healthcare & Operations</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bullet Point Formula
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-hidden bg-white"
                  >
                    <option value="Google XYZ Formula">Google XYZ Formula (Accomplished X by Y through Z)</option>
                    <option value="Metric-Driven & ROI Focused">Metric-Driven & High ROI</option>
                    <option value="Strategic Leadership & Ownership">Strategic Leadership & Scope</option>
                    <option value="Concise ATS Optimization">Concise ATS Keyword Density</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateBullets}
                disabled={isGenerating}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating with Gemini AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Professional Bullet Points
                  </>
                )}
              </button>

              {/* Output Results */}
              {generatedBullets.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Generated Action Bullets ({generatedBullets.length})
                    </span>
                    {experiences.length > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <span>Target Role:</span>
                        <select
                          value={targetExpId}
                          onChange={(e) => setTargetExpId(e.target.value)}
                          className="text-xs py-1 px-2 border border-slate-300 rounded-md bg-white"
                        >
                          {experiences.map((exp) => (
                            <option key={exp.id} value={exp.id}>
                              {exp.role} ({exp.company})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {generatedBullets.map((bullet, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-purple-50/40 hover:border-purple-200 transition-colors group"
                      >
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                          • {bullet}
                        </p>
                        <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-slate-200/60">
                          <button
                            onClick={() => copyToClipboard(bullet, idx)}
                            className="flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 px-2 py-1 rounded hover:bg-white transition-colors"
                          >
                            {copiedIdx === idx ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          {experiences.length > 0 && (
                            <button
                              onClick={() => {
                                onAddBulletToExperience(targetExpId, bullet);
                                setCopiedIdx(idx);
                                setTimeout(() => setCopiedIdx(null), 2000);
                              }}
                              className="flex items-center gap-1 text-[11px] font-semibold text-purple-700 hover:text-purple-900 bg-purple-100 hover:bg-purple-200 px-2.5 py-1 rounded-md transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Insert into Resume</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Polish & Enhance Tab */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Paste Any Existing or Weak Bullet Point
                </label>
                <textarea
                  rows={3}
                  value={weakBullet}
                  onChange={(e) => setWeakBullet(e.target.value)}
                  placeholder="e.g. Worked on database performance and made queries faster for the team."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Converts passive voice into powerful metrics and active verbs</span>
                </div>
                <button
                  onClick={handleEnhanceBullet}
                  disabled={isEnhancing || !weakBullet.trim()}
                  className="py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {isEnhancing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-3.5 h-3.5" />
                      Rewrite & Polish
                    </>
                  )}
                </button>
              </div>

              {enhancedVariations.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    High-Converting Revisions
                  </span>

                  <div className="space-y-2.5">
                    {enhancedVariations.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-purple-300 shadow-2xs transition-all"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                            {item.type}
                          </span>
                          <span className="text-[11px] text-slate-500 italic">
                            {item.highlight}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-relaxed">
                          • {item.text}
                        </p>
                        <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => copyToClipboard(item.text, 100 + idx)}
                            className="flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 px-2 py-1 rounded hover:bg-slate-100 transition-colors"
                          >
                            {copiedIdx === 100 + idx ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Text</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
