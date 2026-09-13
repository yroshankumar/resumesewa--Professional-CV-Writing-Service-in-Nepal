import React from "react";
import { ResumeData, TemplateConfig } from "../../types";
import { colorThemes, getDensityClass, getFontClass } from "../../utils/themeStyles";
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";

interface Props {
  data: ResumeData;
  config: TemplateConfig;
}

export const ModernCleanTemplate: React.FC<Props> = ({ data, config }) => {
  const { personal, experience, education, projects, skillCategories, certifications, languages, customSections } = data;
  const theme = colorThemes[config.accentColor] || colorThemes.indigo;
  const density = getDensityClass(config.layoutDensity);
  const fontClass = getFontClass(config.fontStyle);
  const { visibleSections } = config;

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} ${density.containerPadding} leading-relaxed`}>
      {/* Header */}
      <header className="border-b border-slate-200 pb-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {personal.fullName || "Your Name"}
            </h1>
            <p className={`text-base sm:text-lg font-medium mt-0.5 ${theme.primaryText}`}>
              {personal.title || "Professional Title"}
            </p>
          </div>

          {config.showPhoto && personal.avatarUrl && (
            <img
              src={personal.avatarUrl}
              alt={personal.fullName}
              className="w-20 h-20 rounded-lg object-cover border border-slate-200 shadow-sm shrink-0"
            />
          )}
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs sm:text-sm text-slate-600">
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.email}</span>
            </a>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.phone}</span>
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.location}</span>
            </span>
          )}
          {personal.website && (
            <a href={personal.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.website.replace(/^https?:\/\//, "")}</span>
            </a>
          )}
          {personal.linkedin && (
            <a href={`https://${personal.linkedin.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <Linkedin className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</span>
            </a>
          )}
          {personal.github && (
            <a href={`https://${personal.github.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>{personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}</span>
            </a>
          )}
        </div>
      </header>

      <div className={density.sectionGap}>
        {/* Professional Summary */}
        {visibleSections.summary && personal.summary && (
          <section id="section-summary">
            <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 ${density.headingMargin}`}>
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-normal text-justify">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {visibleSections.experience && experience.length > 0 && (
          <section id="section-experience">
            <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 ${density.headingMargin}`}>
              Work Experience
            </h2>
            <div className={density.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="group">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="font-semibold text-slate-900 text-sm sm:text-base">
                        {exp.role}
                      </span>
                      <span className="text-slate-700 text-sm font-medium"> · {exp.company}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap mt-0.5 sm:mt-0">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      {exp.location ? ` | ${exp.location}` : ""}
                    </span>
                  </div>

                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className={`mt-2 ${density.bulletSpacing} list-disc list-outside ml-4 text-slate-700`}>
                      {exp.bulletPoints.map((bullet, idx) => (
                        <li key={idx} className="pl-1">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className={`text-[10px] px-2 py-0.5 rounded font-medium ${theme.tagBg}`}>
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

        {/* Key Projects */}
        {visibleSections.projects && projects.length > 0 && (
          <section id="section-projects">
            <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 ${density.headingMargin}`}>
              Featured Projects & Systems
            </h2>
            <div className={density.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900 text-sm sm:text-base">
                        {proj.title}
                      </span>
                      {proj.subtitle && (
                        <span className="text-xs text-slate-500 font-medium italic">({proj.subtitle})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5 sm:mt-0">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="underline hover:text-slate-900">
                          Live Demo
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="underline hover:text-slate-900">
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>

                  {proj.description && (
                    <p className="text-xs sm:text-sm text-slate-700 mt-1">{proj.description}</p>
                  )}

                  {proj.bulletPoints && proj.bulletPoints.length > 0 && (
                    <ul className={`mt-1.5 ${density.bulletSpacing} list-disc list-outside ml-4 text-slate-700`}>
                      {proj.bulletPoints.map((bullet, idx) => (
                        <li key={idx} className="pl-1">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {proj.techStack.map((tech, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
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

        {/* Education */}
        {visibleSections.education && education.length > 0 && (
          <section id="section-education">
            <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 ${density.headingMargin}`}>
              Education
            </h2>
            <div className={density.itemGap}>
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div>
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </span>
                    <div className="text-xs sm:text-sm text-slate-600">
                      {edu.institution} {edu.location ? `· ${edu.location}` : ""}
                      {edu.grade && <span className="ml-2 font-medium text-slate-800">({edu.grade})</span>}
                    </div>
                    {edu.honors && <p className="text-xs text-slate-500 mt-0.5">{edu.honors}</p>}
                  </div>
                  <span className="text-xs text-slate-500 font-medium whitespace-nowrap mt-0.5 sm:mt-0">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {visibleSections.skills && skillCategories.length > 0 && (
          <section id="section-skills">
            <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 ${density.headingMargin}`}>
              Skills & Core Competencies
            </h2>
            <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="font-semibold text-slate-900 min-w-[170px] text-xs">
                    {cat.name}:
                  </span>
                  <span className="text-slate-700">
                    {cat.skills.join(" • ")}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleSections.certifications && certifications.length > 0 && (
            <section id="section-certifications">
              <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 ${density.headingMargin}`}>
                Certifications & Accreditations
              </h2>
              <div className="space-y-1.5 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <div>
                      <span className="font-medium text-slate-900">{cert.name}</span>
                      <span className="text-slate-500 text-[11px]"> · {cert.issuer}</span>
                    </div>
                    <span className="text-slate-400 text-[11px] whitespace-nowrap ml-2">{cert.issueDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {visibleSections.languages && languages.length > 0 && (
            <section id="section-languages">
              <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 ${density.headingMargin}`}>
                Languages
              </h2>
              <div className="flex flex-wrap gap-2 text-xs">
                {languages.map((lang) => (
                  <span key={lang.id} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                    {lang.name} <span className="text-slate-400 font-normal">({lang.proficiency})</span>
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Custom Sections */}
        {visibleSections.custom && customSections.length > 0 && (
          <div>
            {customSections.map((sec) => (
              <section key={sec.id} className="mt-4">
                <h2 className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} border-b border-slate-200 ${density.headingMargin}`}>
                  {sec.sectionTitle}
                </h2>
                <div className={density.itemGap}>
                  {sec.items.map((item) => (
                    <div key={item.id} className="text-xs sm:text-sm">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-slate-900">{item.title}</span>
                        {item.date && <span className="text-slate-500 text-xs">{item.date}</span>}
                      </div>
                      {item.subtitle && <p className="text-slate-600 text-xs italic">{item.subtitle}</p>}
                      {item.description && <p className="text-slate-700 text-xs mt-0.5">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
