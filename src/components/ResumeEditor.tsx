import React, { useState } from "react";
import { ResumeData, ExperienceItem, EducationItem, ProjectItem, SkillCategory, CertificationItem, LanguageItem, CustomSection } from "../types";
import {
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Cpu,
  Award,
  Languages,
  Plus,
  Trash2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Wand2,
  Layers,
  HelpCircle,
  GripVertical
} from "lucide-react";

interface Props {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onOpenBulletStudio: (role?: string, company?: string) => void;
  onOpenAtsScanner: () => void;
}

export const ResumeEditor: React.FC<Props> = ({
  data,
  onChange,
  onOpenBulletStudio,
  onOpenAtsScanner,
}) => {
  const [activeSection, setActiveSection] = useState<string>("personal");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summaryTone, setSummaryTone] = useState("executive");

  // Summary AI Generator
  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const topSkills = data.skillCategories.flatMap((c) => c.skills).slice(0, 6).join(", ");
      const highlights = data.experience.map((e) => `${e.role} at ${e.company}`).join("; ");

      const res = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: data.personal.title,
          experienceYears: "5+",
          skills: topSkills,
          highlights,
          tone: summaryTone,
        }),
      });
      const resData = await res.json();
      if (resData.summary) {
        onChange({
          ...data,
          personal: {
            ...data.personal,
            summary: resData.summary,
          },
        });
      }
    } catch (err) {
      console.error("Failed to generate summary:", err);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // Helper updates
  const updatePersonal = (field: keyof typeof data.personal, value: string) => {
    onChange({
      ...data,
      personal: {
        ...data.personal,
        [field]: value,
      },
    });
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: "New Company",
      role: "New Role",
      location: "City, Country",
      startDate: "Jan 2023",
      endDate: "Present",
      current: true,
      bulletPoints: [
        "Spearheaded key initiatives driving measurable improvements across core team KPIs.",
      ],
      technologies: [],
    };
    onChange({
      ...data,
      experience: [newExp, ...data.experience],
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((e) => e.id !== id),
    });
  };

  const updateExperience = (id: string, updated: Partial<ExperienceItem>) => {
    onChange({
      ...data,
      experience: data.experience.map((e) => (e.id === id ? { ...e, ...updated } : e)),
    });
  };

  const addExperienceBullet = (expId: string) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (!exp) return;
    updateExperience(expId, {
      bulletPoints: [...exp.bulletPoints, "Accelerated project milestones by implementing best practices."],
    });
  };

  const updateExperienceBullet = (expId: string, idx: number, value: string) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (!exp) return;
    const newBullets = [...exp.bulletPoints];
    newBullets[idx] = value;
    updateExperience(expId, { bulletPoints: newBullets });
  };

  const removeExperienceBullet = (expId: string, idx: number) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (!exp) return;
    updateExperience(expId, {
      bulletPoints: exp.bulletPoints.filter((_, i) => i !== idx),
    });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: "University Name",
      degree: "Bachelor of Science",
      fieldOfStudy: "Major Field",
      startDate: "2018",
      endDate: "2022",
      grade: "First Division",
    };
    onChange({
      ...data,
      education: [...data.education, newEdu],
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((e) => e.id !== id),
    });
  };

  const updateEducation = (id: string, updated: Partial<EducationItem>) => {
    onChange({
      ...data,
      education: data.education.map((e) => (e.id === id ? { ...e, ...updated } : e)),
    });
  };

  // Project handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: "New Project / Portfolio Piece",
      subtitle: "Full-Stack Application",
      liveUrl: "https://demo.example.com",
      githubUrl: "",
      description: "A high-performance solution built to streamline user workflows.",
      bulletPoints: ["Engineered scalable architecture with 99.9% uptime."],
      techStack: ["React", "TypeScript", "Node.js"],
    };
    onChange({
      ...data,
      projects: [...data.projects, newProj],
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    onChange({
      ...data,
      projects: data.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    });
  };

  // Skills handlers
  const addSkillCategory = () => {
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: "Specialized Tools",
      skills: ["Tool 1", "Tool 2"],
    };
    onChange({
      ...data,
      skillCategories: [...data.skillCategories, newCat],
    });
  };

  const updateSkillCategoryName = (id: string, name: string) => {
    onChange({
      ...data,
      skillCategories: data.skillCategories.map((c) => (c.id === id ? { ...c, name } : c)),
    });
  };

  const updateSkillCategorySkills = (id: string, commaSeparated: string) => {
    const skills = commaSeparated.split(",").map((s) => s.trim()).filter(Boolean);
    onChange({
      ...data,
      skillCategories: data.skillCategories.map((c) => (c.id === id ? { ...c, skills } : c)),
    });
  };

  const removeSkillCategory = (id: string) => {
    onChange({
      ...data,
      skillCategories: data.skillCategories.filter((c) => c.id !== id),
    });
  };

  // Sections navigation tabs
  const sections = [
    { id: "personal", label: "Personal Bio", icon: User },
    { id: "experience", label: "Work Experience", icon: Briefcase, count: data.experience.length },
    { id: "education", label: "Education", icon: GraduationCap, count: data.education.length },
    { id: "projects", label: "Projects & Portfolio", icon: FolderGit2, count: data.projects.length },
    { id: "skills", label: "Skills & Stacks", icon: Cpu, count: data.skillCategories.length },
    { id: "certifications", label: "Certifications", icon: Award, count: data.certifications.length },
    { id: "languages", label: "Languages", icon: Languages, count: data.languages.length },
    { id: "custom", label: "Custom Sections", icon: Layers, count: data.customSections.length },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Section Quick Navigation Bar */}
      <div className="flex items-center overflow-x-auto p-2 border-b border-slate-200 bg-slate-50/80 gap-1 shrink-0 no-scrollbar">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
              {sec.count !== undefined && sec.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? "bg-slate-800 text-slate-200" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {sec.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* PERSONAL SECTION */}
        {activeSection === "personal" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Personal Information</h3>
                <p className="text-xs text-slate-500">Provide your contact details and professional summary</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={data.personal.fullName}
                  onChange={(e) => updatePersonal("fullName", e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Headline / Role</label>
                <input
                  type="text"
                  value={data.personal.title}
                  onChange={(e) => updatePersonal("title", e.target.value)}
                  placeholder="e.g. Senior Software Architect"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={data.personal.email}
                  onChange={(e) => updatePersonal("email", e.target.value)}
                  placeholder="e.g. contact@domain.com"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={data.personal.phone}
                  onChange={(e) => updatePersonal("phone", e.target.value)}
                  placeholder="e.g. +977 9801234567"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Address</label>
                <input
                  type="text"
                  value={data.personal.location}
                  onChange={(e) => updatePersonal("location", e.target.value)}
                  placeholder="e.g. Kathmandu, Nepal"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={data.personal.linkedin}
                  onChange={(e) => updatePersonal("linkedin", e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Portfolio / Personal Website</label>
                <input
                  type="text"
                  value={data.personal.website}
                  onChange={(e) => updatePersonal("website", e.target.value)}
                  placeholder="https://mysite.dev"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub / Dribbble Profile</label>
                <input
                  type="text"
                  value={data.personal.github}
                  onChange={(e) => updatePersonal("github", e.target.value)}
                  placeholder="github.com/username"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-hidden"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Profile Photo URL (Optional for Photo Templates)</label>
                <input
                  type="text"
                  value={data.personal.avatarUrl || ""}
                  onChange={(e) => updatePersonal("avatarUrl", e.target.value)}
                  placeholder="https://example.com/photo.jpg or direct image link"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Summary with AI Generator */}
            <div className="pt-2 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                <label className="block text-xs font-semibold text-slate-800">
                  Executive / Professional Summary
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={summaryTone}
                    onChange={(e) => setSummaryTone(e.target.value)}
                    className="text-[11px] py-1 px-2 border border-slate-200 rounded-md bg-white text-slate-700"
                  >
                    <option value="executive">Executive Tone</option>
                    <option value="tech">Modern Tech</option>
                    <option value="civil-service">Formal Civil Service (Lok Sewa)</option>
                    <option value="compact">Punchy & Compact</option>
                  </select>
                  <button
                    onClick={handleGenerateSummary}
                    disabled={isGeneratingSummary}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-md transition-colors shadow-2xs disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span>{isGeneratingSummary ? "Writing..." : "AI Write Summary"}</span>
                  </button>
                </div>
              </div>
              <textarea
                rows={4}
                value={data.personal.summary}
                onChange={(e) => updatePersonal("summary", e.target.value)}
                placeholder="Briefly state your value proposition, years of experience, core domains, and major achievements..."
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-hidden leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* EXPERIENCE SECTION */}
        {activeSection === "experience" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Work Experience</h3>
                <p className="text-xs text-slate-500">List your professional employment history</p>
              </div>
              <button
                onClick={addExperience}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Role</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.experience.map((exp, expIdx) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Position #{expIdx + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenBulletStudio(exp.role, exp.company)}
                        className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-md transition-colors"
                        title="Generate bullet points for this specific role with Gemini"
                      >
                        <Wand2 className="w-3 h-3 text-purple-600" />
                        <span>AI Bullets</span>
                      </button>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                        title="Remove role"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, { role: e.target.value })}
                        placeholder="e.g. Lead Software Architect"
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company / Organization</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        placeholder="e.g. Apex Global Solutions"
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                        placeholder="e.g. Kathmandu, Nepal / Remote"
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Start Date</label>
                        <input
                          type="text"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          placeholder="Jan 2022"
                          className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">End Date</label>
                        <input
                          type="text"
                          disabled={exp.current}
                          value={exp.current ? "Present" : exp.endDate}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          placeholder="Present"
                          className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white disabled:bg-slate-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                      className="rounded border-slate-300 text-slate-900 focus:ring-slate-800"
                    />
                    <label htmlFor={`current-${exp.id}`} className="text-xs text-slate-700 font-medium">
                      I currently work in this position
                    </label>
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700">
                        Achievement Bullet Points ({exp.bulletPoints.length})
                      </label>
                      <button
                        onClick={() => addExperienceBullet(exp.id)}
                        className="text-[11px] text-slate-600 hover:text-slate-900 font-semibold flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Bullet
                      </button>
                    </div>

                    <div className="space-y-2">
                      {exp.bulletPoints.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-1.5">
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => updateExperienceBullet(exp.id, bIdx, e.target.value)}
                            className="flex-1 text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-slate-800"
                          />
                          <button
                            onClick={() => removeExperienceBullet(exp.id, bIdx)}
                            className="p-1 text-slate-400 hover:text-rose-600 mt-1"
                            title="Delete bullet"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EDUCATION SECTION */}
        {activeSection === "education" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Education & Academics</h3>
                <p className="text-xs text-slate-500">Degrees, colleges, boards, and grades</p>
              </div>
              <button
                onClick={addEducation}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Degree</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {data.education.map((edu) => (
                <div key={edu.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-xs text-slate-700">{edu.degree || "Degree"}</span>
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Degree / Qualification</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        placeholder="e.g. Bachelor of Engineering"
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Field of Study</label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                        placeholder="e.g. Computer Science / Public Admin"
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Institution / University</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        placeholder="e.g. Tribhuvan University, Pulchowk"
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Passed Year / End</label>
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                          placeholder="2020"
                          className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Division / Grade</label>
                        <input
                          type="text"
                          value={edu.grade || ""}
                          onChange={(e) => updateEducation(edu.id, { grade: e.target.value })}
                          placeholder="First Division (80%)"
                          className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS SECTION */}
        {activeSection === "projects" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Featured Projects & Case Studies</h3>
                <p className="text-xs text-slate-500">Showcase software, designs, or major business deliverables</p>
              </div>
              <button
                onClick={addProject}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.projects.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-xs text-slate-800">{proj.title}</span>
                    <button
                      onClick={() => removeProject(proj.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                        placeholder="e.g. KoshPay Open Source QR Gateway"
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Subtitle / Category</label>
                      <input
                        type="text"
                        value={proj.subtitle}
                        onChange={(e) => updateProject(proj.id, { subtitle: e.target.value })}
                        placeholder="e.g. FinTech Settlement Engine"
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Live Demo URL</label>
                      <input
                        type="text"
                        value={proj.liveUrl}
                        onChange={(e) => updateProject(proj.id, { liveUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Code Repo URL</label>
                      <input
                        type="text"
                        value={proj.githubUrl}
                        onChange={(e) => updateProject(proj.id, { githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Summary Description</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                      placeholder="Brief problem statement and outcome..."
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Tech Stack (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={proj.techStack.join(", ")}
                      onChange={(e) =>
                        updateProject(proj.id, {
                          techStack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      placeholder="React, TypeScript, Redis, TailwindCSS"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS SECTION */}
        {activeSection === "skills" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Skills & Competencies</h3>
                <p className="text-xs text-slate-500">Group your abilities into clear categories</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAtsScanner}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ATS Keyword Match</span>
                </button>
                <button
                  onClick={addSkillCategory}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Category</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {data.skillCategories.map((cat) => (
                <div key={cat.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => updateSkillCategoryName(cat.id, e.target.value)}
                      placeholder="Category Name"
                      className="text-xs font-bold text-slate-800 px-2 py-1 border border-slate-300 rounded bg-white"
                    />
                    <button
                      onClick={() => removeSkillCategory(cat.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Skills list (comma separated)
                    </label>
                    <input
                      type="text"
                      value={cat.skills.join(", ")}
                      onChange={(e) => updateSkillCategorySkills(cat.id, e.target.value)}
                      placeholder="e.g. TypeScript, React, Docker, Node.js"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS SECTION */}
        {activeSection === "certifications" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Certifications & Accreditations</h3>
                <p className="text-xs text-slate-500">Official licenses, trainings, or certificates</p>
              </div>
              <button
                onClick={() =>
                  onChange({
                    ...data,
                    certifications: [
                      ...data.certifications,
                      {
                        id: `cert-${Date.now()}`,
                        name: "New Certificate",
                        issuer: "Issuing Body",
                        issueDate: "2023",
                      },
                    ],
                  })
                }
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Certificate</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        certifications: data.certifications.map((c) =>
                          c.id === cert.id ? { ...c, name: e.target.value } : c
                        ),
                      })
                    }
                    placeholder="Certificate Title"
                    className="text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                  />
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        certifications: data.certifications.map((c) =>
                          c.id === cert.id ? { ...c, issuer: e.target.value } : c
                        ),
                      })
                    }
                    placeholder="Issuer Organization"
                    className="text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cert.issueDate}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          certifications: data.certifications.map((c) =>
                            c.id === cert.id ? { ...c, issueDate: e.target.value } : c
                          ),
                        })
                      }
                      placeholder="Year"
                      className="w-24 text-xs px-2.5 py-1.5 border border-slate-300 rounded-md bg-white"
                    />
                    <button
                      onClick={() =>
                        onChange({
                          ...data,
                          certifications: data.certifications.filter((c) => c.id !== cert.id),
                        })
                      }
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LANGUAGES SECTION */}
        {activeSection === "languages" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Languages</h3>
                <p className="text-xs text-slate-500">Spoken and written language competencies</p>
              </div>
              <button
                onClick={() =>
                  onChange({
                    ...data,
                    languages: [
                      ...data.languages,
                      { id: `lang-${Date.now()}`, name: "New Language", proficiency: "Professional" },
                    ],
                  })
                }
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Language</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.languages.map((l) => (
                <div key={l.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2 justify-between">
                  <input
                    type="text"
                    value={l.name}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        languages: data.languages.map((item) =>
                          item.id === l.id ? { ...item, name: e.target.value } : item
                        ),
                      })
                    }
                    className="text-xs px-2.5 py-1 border border-slate-300 rounded-md bg-white flex-1"
                  />
                  <select
                    value={l.proficiency}
                    onChange={(e) =>
                      onChange({
                        ...data,
                        languages: data.languages.map((item) =>
                          item.id === l.id ? { ...item, proficiency: e.target.value as any } : item
                        ),
                      })
                    }
                    className="text-xs px-2 py-1 border border-slate-300 rounded-md bg-white"
                  >
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Professional">Professional</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                  <button
                    onClick={() =>
                      onChange({
                        ...data,
                        languages: data.languages.filter((item) => item.id !== l.id),
                      })
                    }
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOM SECTIONS */}
        {activeSection === "custom" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Custom Sections</h3>
                <p className="text-xs text-slate-500">Add Lok Sewa merits, foreign visa/passport data, publications, or honors</p>
              </div>
              <button
                onClick={() => {
                  const newSection: CustomSection = {
                    id: `sec-${Date.now()}`,
                    sectionTitle: "Honors & Achievements",
                    items: [
                      {
                        id: `item-${Date.now()}`,
                        title: "Achievement Title",
                        subtitle: "Organization / Awarder",
                        date: "2023",
                        description: "Key highlight of this recognition.",
                      },
                    ],
                  };
                  onChange({
                    ...data,
                    customSections: [...data.customSections, newSection],
                  });
                }}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Section</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.customSections.map((sec) => (
                <div key={sec.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={sec.sectionTitle}
                      onChange={(e) =>
                        onChange({
                          ...data,
                          customSections: data.customSections.map((s) =>
                            s.id === sec.id ? { ...s, sectionTitle: e.target.value } : s
                          ),
                        })
                      }
                      className="text-xs font-bold text-slate-900 px-2 py-1 border border-slate-300 rounded bg-white"
                    />
                    <button
                      onClick={() =>
                        onChange({
                          ...data,
                          customSections: data.customSections.filter((s) => s.id !== sec.id),
                        })
                      }
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {sec.items.map((item) => (
                    <div key={item.id} className="p-2.5 rounded-lg border border-slate-200 bg-white space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              customSections: data.customSections.map((s) =>
                                s.id === sec.id
                                  ? {
                                      ...s,
                                      items: s.items.map((it) =>
                                        it.id === item.id ? { ...it, title: e.target.value } : it
                                      ),
                                    }
                                  : s
                              ),
                            })
                          }
                          placeholder="Title / Honor"
                          className="text-xs px-2 py-1 border border-slate-300 rounded"
                        />
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) =>
                            onChange({
                              ...data,
                              customSections: data.customSections.map((s) =>
                                s.id === sec.id
                                  ? {
                                      ...s,
                                      items: s.items.map((it) =>
                                        it.id === item.id ? { ...it, date: e.target.value } : it
                                      ),
                                    }
                                  : s
                              ),
                            })
                          }
                          placeholder="Date / Status"
                          className="text-xs px-2 py-1 border border-slate-300 rounded"
                        />
                      </div>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          onChange({
                            ...data,
                            customSections: data.customSections.map((s) =>
                              s.id === sec.id
                                ? {
                                    ...s,
                                    items: s.items.map((it) =>
                                      it.id === item.id ? { ...it, description: e.target.value } : it
                                    ),
                                  }
                                : s
                            ),
                          })
                        }
                        placeholder="Description..."
                        className="w-full text-xs px-2 py-1 border border-slate-300 rounded"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
