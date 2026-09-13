import React, { useState, useEffect } from "react";
import { ResumeData, TemplateConfig, TemplateId } from "./types";
import { sampleProfiles } from "./data/sampleProfiles";
import { HeaderNavbar } from "./components/HeaderNavbar";
import { TemplateCustomizerBar } from "./components/TemplateCustomizerBar";
import { ResumeEditor } from "./components/ResumeEditor";
import { ResumePreview } from "./components/ResumePreview";
import { AiBulletStudioModal } from "./components/AiBulletStudioModal";
import { AtsScannerModal } from "./components/AtsScannerModal";
import { CoverLetterModal } from "./components/CoverLetterModal";
import { Edit3, Eye, Sparkles } from "lucide-react";

const LOCAL_STORAGE_DATA_KEY = "resumesewa_resume_data_v1";
const LOCAL_STORAGE_CONFIG_KEY = "resumesewa_template_config_v1";

const initialConfig: TemplateConfig = {
  templateId: "tech-developer",
  accentColor: "indigo",
  fontStyle: "sans",
  layoutDensity: "normal",
  showPhoto: false,
  visibleSections: {
    summary: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
    certifications: true,
    languages: true,
    custom: true,
  },
};

export default function App() {
  // Resume Data State
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
    return sampleProfiles.softwareEngineer;
  });

  // Template Config State
  const [templateConfig, setTemplateConfig] = useState<TemplateConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not load from localStorage:", e);
    }
    return initialConfig;
  });

  // Responsive View Tab for Mobile/Tablet
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  // Modals
  const [isBulletStudioOpen, setIsBulletStudioOpen] = useState(false);
  const [bulletStudioRole, setBulletStudioRole] = useState("");
  const [bulletStudioCompany, setBulletStudioCompany] = useState("");

  const [isAtsScannerOpen, setIsAtsScannerOpen] = useState(false);
  const [isCoverLetterOpen, setIsCoverLetterOpen] = useState(false);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(resumeData));
    } catch (e) {
      console.warn("Failed to persist resumeData:", e);
    }
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(templateConfig));
    } catch (e) {
      console.warn("Failed to persist templateConfig:", e);
    }
  }, [templateConfig]);

  // Handlers
  const handleLoadSample = (sample: ResumeData, configPartial?: Partial<TemplateConfig>) => {
    setResumeData(sample);
    if (configPartial) {
      setTemplateConfig((prev) => ({ ...prev, ...configPartial }));
    }
  };

  const handleResetEmpty = () => {
    setResumeData({
      personal: {
        fullName: "",
        title: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
        summary: "",
      },
      experience: [],
      education: [],
      projects: [],
      skillCategories: [],
      certifications: [],
      languages: [],
      customSections: [],
    });
  };

  const handleOpenBulletStudio = (role?: string, company?: string) => {
    setBulletStudioRole(role || resumeData.personal.title || "");
    setBulletStudioCompany(company || resumeData.experience[0]?.company || "");
    setIsBulletStudioOpen(true);
  };

  const handleAddBulletToExperience = (expId: string, bulletText: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id === expId) {
          return {
            ...exp,
            bulletPoints: [...exp.bulletPoints, bulletText],
          };
        }
        return exp;
      }),
    }));
  };

  const handleAddSkillFromAts = (skill: string) => {
    setResumeData((prev) => {
      const categories = [...prev.skillCategories];
      if (categories.length > 0) {
        if (!categories[0].skills.includes(skill)) {
          categories[0] = {
            ...categories[0],
            skills: [...categories[0].skills, skill],
          };
        }
      } else {
        categories.push({
          id: `cat-${Date.now()}`,
          name: "Core Skills",
          skills: [skill],
        });
      }
      return { ...prev, skillCategories: categories };
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 text-slate-900">
      {/* Top Main Navigation */}
      <HeaderNavbar
        onLoadSample={handleLoadSample}
        onResetEmpty={handleResetEmpty}
        onOpenBulletStudio={() => handleOpenBulletStudio()}
        onOpenAtsScanner={() => setIsAtsScannerOpen(true)}
        onOpenCoverLetter={() => setIsCoverLetterOpen(true)}
      />

      {/* Template & Styling Control Bar */}
      <TemplateCustomizerBar
        config={templateConfig}
        onChange={setTemplateConfig}
      />

      {/* Mobile/Tablet Screen Tab Switcher */}
      <div className="lg:hidden flex border-b border-slate-200 bg-white px-4 py-1.5 justify-center gap-2 shrink-0">
        <button
          onClick={() => setMobileView("editor")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 ${
            mobileView === "editor"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Editor & AI Content</span>
        </button>
        <button
          onClick={() => setMobileView("preview")}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 ${
            mobileView === "preview"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Live Resume Preview</span>
        </button>
      </div>

      {/* Split Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Form Editor */}
        <div
          className={`w-full lg:w-[46%] xl:w-[44%] h-full flex flex-col ${
            mobileView === "editor" ? "flex" : "hidden lg:flex"
          }`}
        >
          <ResumeEditor
            data={resumeData}
            onChange={setResumeData}
            onOpenBulletStudio={handleOpenBulletStudio}
            onOpenAtsScanner={() => setIsAtsScannerOpen(true)}
          />
        </div>

        {/* Right Side: Live A4 Preview & Export */}
        <div
          className={`w-full lg:w-[54%] xl:w-[56%] h-full flex flex-col ${
            mobileView === "preview" ? "flex" : "hidden lg:flex"
          }`}
        >
          <ResumePreview
            data={resumeData}
            config={templateConfig}
            onOpenAiStudio={() => handleOpenBulletStudio()}
          />
        </div>
      </div>

      {/* AI Modals */}
      <AiBulletStudioModal
        isOpen={isBulletStudioOpen}
        onClose={() => setIsBulletStudioOpen(false)}
        experiences={resumeData.experience}
        onAddBulletToExperience={handleAddBulletToExperience}
        initialRole={bulletStudioRole}
        initialCompany={bulletStudioCompany}
      />

      <AtsScannerModal
        isOpen={isAtsScannerOpen}
        onClose={() => setIsAtsScannerOpen(false)}
        resumeData={resumeData}
        onAddSkill={handleAddSkillFromAts}
      />

      <CoverLetterModal
        isOpen={isCoverLetterOpen}
        onClose={() => setIsCoverLetterOpen(false)}
        resumeData={resumeData}
      />
    </div>
  );
}
