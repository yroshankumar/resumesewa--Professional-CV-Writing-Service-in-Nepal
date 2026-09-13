import React from "react";
import { ResumeData, TemplateConfig } from "../../types";
import { colorThemes, getDensityClass } from "../../utils/themeStyles";
import { Terminal, ExternalLink, GitBranch, Mail, MapPin, Globe, Github, Linkedin } from "lucide-react";

interface Props {
  data: ResumeData;
  config: TemplateConfig;
}

export const TechDeveloperTemplate: React.FC<Props> = ({ data, config }) => {
  const { personal, experience, education, projects, skillCategories, certifications, languages, customSections } = data;
  const theme = colorThemes[config.accentColor] || colorThemes.indigo;
  const density = getDensityClass(config.layoutDensity);
  const { visibleSections } = config;

  return (
    <div className={`w-full bg-white text-slate-800 font-sans ${density.containerPadding} leading-relaxed`}>
      {/* Dev Header with Terminal Accent */}
      <header className="border-b-2 border-slate-900 pb-4 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-slate-900 text-emerald-400 font-mono text-xs">
                <Terminal className="w-3.5 h-3.5 inline mr-1" />
                ~/profile
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-display-clean">
                {personal.fullName || "Developer Name"}
              </h1>
            </div>
            <p className={`text-sm sm:text-base font-semibold font-mono mt-1 ${theme.primaryText}`}>
              &gt; {personal.title || "Full Stack Engineer"}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-600">
            {personal.email && (
              <a href={`mailto:${personal.email}`} className="flex items-center gap-1 hover:text-indigo-600">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>{personal.email}</span>
              </a>
            )}
            {personal.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{personal.location}</span>
              </span>
            )}
            {personal.github && (
              <a href={`https://${personal.github.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-600">
                <Github className="w-3 h-3 text-slate-400" />
                <span>gh/{personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}</span>
              </a>
            )}
            {personal.linkedin && (
              <a href={`https://${personal.linkedin.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-600">
                <Linkedin className="w-3 h-3 text-slate-400" />
                <span>in/{personal.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}</span>
              </a>
            )}
            {personal.website && (
              <a href={personal.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-indigo-600">
                <Globe className="w-3 h-3 text-slate-400" />
                <span>web</span>
              </a>
            )}
          </div>
        </div>
      </header>

      <div className={density.sectionGap}>
        {/* About / Summary */}
        {visibleSections.summary && personal.summary && (
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1.5">
              <span className="text-emerald-500">##</span> Summary
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-700 leading-normal">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Technical Skills Stack */}
        {visibleSections.skills && skillCategories.length > 0 && (
          <section className="bg-slate-50 border border-slate-200 rounded-lg p-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2">
              <span className="text-indigo-500">##</span> Technical Stacks & Competencies
            </h2>
            <div className="space-y-1.5 font-mono text-[11px] sm:text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                  <span className="font-bold text-slate-900 min-w-[170px] text-slate-800">
                    {cat.name}:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((skill, i) => (
                      <span key={i} className="px-1.5 py-0.2 bg-white border border-slate-300 rounded text-slate-800 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {visibleSections.experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2 border-b border-slate-200 pb-1">
              <span className="text-emerald-500">##</span> Engineering Experience
            </h2>
            <div className={density.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-3 border-l-2 border-slate-200 hover:border-indigo-500 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {exp.role}
                      </span>
                      <span className="text-slate-700 font-medium text-xs sm:text-sm"> @ {exp.company}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 mt-0.5 sm:mt-0">
                      [{exp.startDate} → {exp.current ? "HEAD" : exp.endDate}]
                    </span>
                  </div>

                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className={`mt-1.5 ${density.bulletSpacing} list-disc list-outside ml-4 text-slate-700`}>
                      {exp.bulletPoints.map((bullet, idx) => (
                        <li key={idx} className="pl-1">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2 font-mono text-[10px]">
                      <span className="text-slate-400 py-0.5">stack:</span>
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium">
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

        {/* Projects / Systems */}
        {visibleSections.projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2 border-b border-slate-200 pb-1">
              <span className="text-emerald-500">##</span> Built Systems & Open Source
            </h2>
            <div className={density.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id} className="p-2.5 rounded-md border border-slate-200 bg-slate-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div className="flex items-center gap-2">
                      <GitBranch className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="font-bold text-slate-900 text-sm">
                        {proj.title}
                      </span>
                      {proj.subtitle && (
                        <span className="text-xs text-slate-500 font-mono">[{proj.subtitle}]</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-indigo-600 mt-1 sm:mt-0">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                          <ExternalLink className="w-3 h-3" /> Live
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                          <Github className="w-3 h-3" /> Repo
                        </a>
                      )}
                    </div>
                  </div>

                  {proj.description && (
                    <p className="text-xs text-slate-700 mt-1">{proj.description}</p>
                  )}

                  {proj.bulletPoints && proj.bulletPoints.length > 0 && (
                    <ul className={`mt-1.5 ${density.bulletSpacing} list-disc list-outside ml-4 text-slate-700`}>
                      {proj.bulletPoints.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2 font-mono text-[10px]">
                      {proj.techStack.map((tech, idx) => (
                        <span key={idx} className="px-1 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
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

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleSections.education && education.length > 0 && (
            <section>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1.5 border-b border-slate-200 pb-1">
                <span className="text-emerald-500">##</span> Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-bold text-slate-900">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </div>
                    <div className="text-slate-600 font-mono text-[11px]">
                      {edu.institution} ({edu.startDate} - {edu.endDate})
                    </div>
                    {edu.grade && <div className="text-slate-500 font-mono text-[11px]">{edu.grade}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {visibleSections.certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-1.5 border-b border-slate-200 pb-1">
                <span className="text-emerald-500">##</span> Credentials
              </h2>
              <div className="space-y-1.5 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id} className="font-mono text-[11px]">
                    <span className="font-bold text-slate-900">{cert.name}</span>
                    <div className="text-slate-500">{cert.issuer} · {cert.issueDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
