import React, { useState } from "react";
import { X, ShieldCheck, AlertCircle, Plus, Check, RefreshCw, Zap } from "lucide-react";
import { ResumeData, ATSReviewResult } from "../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onAddSkill: (skill: string) => void;
}

export const AtsScannerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  resumeData,
  onAddSkill,
}) => {
  const [jobDescription, setJobDescription] = useState(resumeData.targetJobDescription || "");
  const [isScanning, setIsScanning] = useState(false);
  const [reviewResult, setReviewResult] = useState<ATSReviewResult | null>(null);
  const [addedKeywords, setAddedKeywords] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch("/api/ai/ats-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeContent: {
            personal: resumeData.personal,
            experience: resumeData.experience,
            education: resumeData.education,
            skills: resumeData.skillCategories,
            projects: resumeData.projects,
          },
          jobDescription,
        }),
      });
      const data = await res.json();
      setReviewResult(data);
    } catch (err) {
      console.error("ATS review failed:", err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleAddKeyword = (kw: string) => {
    onAddSkill(kw);
    setAddedKeywords((prev) => ({ ...prev, [kw]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                ATS Scanner & Keyword Matcher
              </h2>
              <p className="text-xs text-slate-600">
                Audit your resume against applicant tracking systems (Workday, Taleo, Greenhouse)
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Target Job Description or Role Expectations
            </label>
            <textarea
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job posting, key qualifications, or requirements here to calculate keyword match..."
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleScan}
                disabled={isScanning}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-xs"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Scanning ATS Compatibility...
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    Calculate ATS Score
                  </>
                )}
              </button>
            </div>
          </div>

          {reviewResult && (
            <div className="space-y-5 pt-2 border-t border-slate-200">
              {/* Score Gauge */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full flex flex-col items-center justify-center border-4 font-bold text-lg ${
                      reviewResult.atsScore >= 80
                        ? "border-emerald-500 text-emerald-700 bg-emerald-50"
                        : reviewResult.atsScore >= 65
                        ? "border-amber-500 text-amber-700 bg-amber-50"
                        : "border-rose-500 text-rose-700 bg-rose-50"
                    }`}
                  >
                    <span>{reviewResult.atsScore}</span>
                    <span className="text-[9px] uppercase tracking-tighter text-slate-500 font-semibold -mt-1">
                      /100
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {reviewResult.atsScore >= 80
                        ? "High Match — Strong Recruiter Pass Probability"
                        : reviewResult.atsScore >= 65
                        ? "Moderate Match — Keyword Refinements Recommended"
                        : "Low Match — Critical Missing Keywords"}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Based on keyword overlap, role relevancy, and action verbs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Keywords Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Matched Keywords */}
                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/40">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1 mb-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Detected Keywords ({reviewResult.matchingKeywords?.length || 0})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {reviewResult.matchingKeywords?.map((kw, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-medium"
                      >
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1 mb-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    Missing Recommended Keywords
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {reviewResult.missingKeywords?.map((kw, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddKeyword(kw)}
                        disabled={addedKeywords[kw]}
                        className={`text-xs px-2 py-0.5 rounded-md font-medium transition-colors flex items-center gap-1 ${
                          addedKeywords[kw]
                            ? "bg-slate-200 text-slate-600 cursor-default"
                            : "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
                        }`}
                        title="Click to add to your skills"
                      >
                        {addedKeywords[kw] ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" /> + {kw}
                          </>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1.5">Profile Strengths:</h4>
                  <ul className="space-y-1 list-disc list-inside text-slate-700">
                    {reviewResult.strengths?.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1.5">Suggested ATS Optimizations:</h4>
                  <ul className="space-y-1 list-disc list-inside text-slate-700">
                    {reviewResult.improvements?.map((imp, idx) => (
                      <li key={idx}>{imp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
