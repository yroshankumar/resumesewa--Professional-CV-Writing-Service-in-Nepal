import React from "react";
import { ResumeData, TemplateConfig } from "../../types";
import { colorThemes, getDensityClass } from "../../utils/themeStyles";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, ExternalLink } from "lucide-react";

interface Props {
  data: ResumeData;
  config: TemplateConfig;
}

export const CreativePortfolioTemplate: React.FC<Props> = ({ data, config }) => {
  const { personal, experience, education, projects, skillCategories, certifications, languages, customSections } = data;
  const theme = colorThemes[config.accentColor] || colorThemes.emerald;
  const density = getDensityClass(config.layoutDensity);
  const { visibleSections } = config;

  return (
    <div className="w-full bg-white text-slate-800 font-sans flex flex-col md:flex-row min-h-full">
      {/* Left Sidebar */}
      <aside className={`w-full md:w-[32%] ${theme.subtleBg} text-slate-100 p-6 sm:p-7 shrink-0 flex flex-col justify-between`}>
        <div className="space-y-6">
          {/* Avatar & Name */}
          <div className="text-center md:text-left">
            {config.showPhoto && personal.avatarUrl && (
              <img
                src={personal.avatarUrl}
                alt={personal.fullName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-white/20 mx-auto md:mx-0 shadow-lg mb-3"
              />
            )}
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-display-clean">
              {personal.fullName || "Candidate Name"}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-emerald-400 mt-1 font-mono">
              {personal.title || "Creative Lead"}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs text-slate-300">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 border-b border-white/10 pb-1">
              Contact & Links
            </h3>
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="flex items-center gap-2 hover:text-white truncate">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{personal.email}</span>
              </a>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
            {personal.website && (
              <a href={personal.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white truncate">
                <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{personal.website.replace(/^https?:\/\//, "")}</span>
              </a>
            )}
            {personal.linkedin && (
              <a href={`https://${personal.linkedin.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white truncate">
                <Linkedin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</span>
              </a>
            )}
            {personal.github && (
              <a href={`https://${personal.github.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white truncate">
                <Github className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}</span>
              </a>
            )}
          </div>

          {/* Core Skills & Tools in Sidebar */}
          {visibleSections.skills && skillCategories.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 border-b border-white/10 pb-1">
                Expertise & Skills
              </h3>
              {skillCategories.map((cat) => (
                <div key={cat.id} className="space-y-1">
                  <span className="text-xs font-semibold text-white/90">{cat.name}</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((skill, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-emerald-200 border border-white/10 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {visibleSections.languages && languages.length > 0 && (
            <div className="space-y-1.5">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 border-b border-white/10 pb-1">
                Languages
              </h3>
              <div className="space-y-1 text-xs text-slate-300">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span>{l.name}</span>
                    <span className="text-slate-400 text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Right Content */}
      <main className={`flex-1 p-6 sm:p-8 space-y-5 leading-relaxed`}>
        {/* Profile Bio */}
        {visibleSections.summary && personal.summary && (
          <section>
            <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 pb-1 mb-2 font-display-clean`}>
              About & Value Proposition
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience Timeline */}
        {visibleSections.experience && experience.length > 0 && (
          <section>
            <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 pb-1 mb-2.5 font-display-clean`}>
              Design & Work Experience
            </h2>
            <div className={density.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="group">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">
                        {exp.role}
                      </span>
                      <span className="text-slate-600 text-xs font-medium"> — {exp.company}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>

                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className={`mt-1.5 ${density.bulletSpacing} list-disc list-outside ml-4 text-slate-700`}>
                      {exp.bulletPoints.map((bullet, idx) => (
                        <li key={idx} className="pl-1">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Selected Projects */}
        {visibleSections.projects && projects.length > 0 && (
          <section>
            <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 pb-1 mb-2.5 font-display-clean`}>
              Portfolio Case Studies & Projects
            </h2>
            <div className={density.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900 text-sm">
                      {proj.title}
                      {proj.subtitle && <span className="font-normal text-xs text-slate-500 ml-1">· {proj.subtitle}</span>}
                    </span>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-emerald-600 hover:underline">
                        <ExternalLink className="w-3 h-3" /> Live Demo
                      </a>
                    )}
                  </div>
                  {proj.description && <p className="text-xs text-slate-700 mt-1">{proj.description}</p>}
                  {proj.bulletPoints && proj.bulletPoints.length > 0 && (
                    <ul className={`mt-1.5 ${density.bulletSpacing} list-disc list-outside ml-4 text-slate-700`}>
                      {proj.bulletPoints.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {proj.techStack.map((tech, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleSections.education && education.length > 0 && (
            <section>
              <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 pb-1 mb-1.5 font-display-clean`}>
                Education
              </h2>
              <div className="space-y-1.5 text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-semibold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.institution}</div>
                    <div className="text-slate-400 text-[11px]">{edu.startDate} - {edu.endDate} {edu.grade ? `(${edu.grade})` : ""}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {visibleSections.certifications && certifications.length > 0 && (
            <section>
              <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 pb-1 mb-1.5 font-display-clean`}>
                Certifications
              </h2>
              <div className="space-y-1.5 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-semibold text-slate-900">{cert.name}</div>
                    <div className="text-slate-500 text-[11px]">{cert.issuer} · {cert.issueDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
