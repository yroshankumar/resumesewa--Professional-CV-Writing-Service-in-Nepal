import React from "react";
import { ResumeData, TemplateConfig } from "../../types";
import { colorThemes, getDensityClass } from "../../utils/themeStyles";

interface Props {
  data: ResumeData;
  config: TemplateConfig;
}

export const ExecutiveSerifTemplate: React.FC<Props> = ({ data, config }) => {
  const { personal, experience, education, projects, skillCategories, certifications, languages, customSections } = data;
  const theme = colorThemes[config.accentColor] || colorThemes.slate;
  const density = getDensityClass(config.layoutDensity);
  const { visibleSections } = config;

  return (
    <div className={`w-full bg-white text-stone-900 font-serif-clean ${density.containerPadding} leading-relaxed`}>
      {/* Centered Classic Header */}
      <header className="text-center border-b-2 border-stone-800 pb-4 mb-6">
        <h1 className="text-3xl sm:text-4xl font-normal tracking-wide text-stone-950 uppercase font-cinzel">
          {personal.fullName || "Your Full Name"}
        </h1>
        <p className="text-sm sm:text-base italic text-stone-700 mt-1 font-serif-clean">
          {personal.title || "Senior Executive & Strategic Advisor"}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-2.5 text-xs text-stone-600 font-sans">
          {personal.location && <span>{personal.location}</span>}
          {personal.location && (personal.email || personal.phone) && <span>•</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.phone && personal.email && <span>•</span>}
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="hover:text-stone-900 underline">
              {personal.email}
            </a>
          )}
          {personal.linkedin && (
            <>
              <span>•</span>
              <a href={`https://${personal.linkedin.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer" className="hover:text-stone-900 underline">
                LinkedIn
              </a>
            </>
          )}
          {personal.website && (
            <>
              <span>•</span>
              <a href={personal.website} target="_blank" rel="noreferrer" className="hover:text-stone-900 underline">
                Portfolio
              </a>
            </>
          )}
        </div>
      </header>

      <div className={density.sectionGap}>
        {/* Executive Summary */}
        {visibleSections.summary && personal.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-2 font-sans">
              Executive Profile
            </h2>
            <p className="text-xs sm:text-[13px] text-stone-800 leading-relaxed text-justify">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {visibleSections.experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-2 font-sans">
              Professional Experience
            </h2>
            <div className={density.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <span className="font-bold text-stone-900 text-sm sm:text-base">
                        {exp.role}
                      </span>
                      <span className="text-stone-700 italic text-sm"> — {exp.company}</span>
                    </div>
                    <span className="text-xs text-stone-500 font-sans whitespace-nowrap mt-0.5 sm:mt-0">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                      {exp.location ? ` | ${exp.location}` : ""}
                    </span>
                  </div>

                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className={`mt-1.5 ${density.bulletSpacing} list-disc list-outside ml-4 text-stone-800`}>
                      {exp.bulletPoints.map((bullet, idx) => (
                        <li key={idx} className="pl-1">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Projects */}
        {visibleSections.projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-2 font-sans">
              Selected Initiatives & Case Studies
            </h2>
            <div className={density.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-stone-900 text-sm sm:text-[15px]">
                      {proj.title}
                      {proj.subtitle && <span className="italic font-normal text-stone-600 text-xs ml-2">({proj.subtitle})</span>}
                    </span>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-xs font-sans text-stone-600 underline">
                        View Initiative
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-xs sm:text-[13px] text-stone-700 mt-0.5">{proj.description}</p>
                  )}
                  {proj.bulletPoints && proj.bulletPoints.length > 0 && (
                    <ul className={`mt-1 ${density.bulletSpacing} list-disc list-outside ml-4 text-stone-800`}>
                      {proj.bulletPoints.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {visibleSections.education && education.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-2 font-sans">
              Education & Academic Honors
            </h2>
            <div className={density.itemGap}>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-stone-900 text-sm">
                      {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    </span>
                    <div className="text-xs sm:text-[13px] text-stone-700 italic">
                      {edu.institution}{edu.location ? `, ${edu.location}` : ""}
                      {edu.grade && <span className="font-normal font-sans ml-2 text-stone-800">[{edu.grade}]</span>}
                    </div>
                    {edu.honors && <p className="text-xs text-stone-600 font-sans mt-0.5">{edu.honors}</p>}
                  </div>
                  <span className="text-xs text-stone-500 font-sans whitespace-nowrap ml-2">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Core Competencies */}
        {visibleSections.skills && skillCategories.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-2 font-sans">
              Areas of Expertise
            </h2>
            <div className="space-y-1.5 text-xs sm:text-[13px]">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="font-bold text-stone-900 min-w-[160px] font-sans text-xs uppercase tracking-wide">
                    {cat.name}:
                  </span>
                  <span className="text-stone-800">{cat.skills.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Languages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleSections.certifications && certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-1.5 font-sans">
                Professional Credentials
              </h2>
              <div className="space-y-1 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between">
                    <span>
                      <strong>{cert.name}</strong> — <span className="italic text-stone-600">{cert.issuer}</span>
                    </span>
                    <span className="font-sans text-stone-500 text-[11px]">{cert.issueDate}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {visibleSections.languages && languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-1.5 font-sans">
                Languages
              </h2>
              <p className="text-xs text-stone-800">
                {languages.map((l) => `${l.name} (${l.proficiency})`).join(" • ")}
              </p>
            </section>
          )}
        </div>

        {/* Custom Sections */}
        {visibleSections.custom && customSections.length > 0 && (
          <div>
            {customSections.map((sec) => (
              <section key={sec.id} className="mt-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-300 pb-1 mb-1.5 font-sans">
                  {sec.sectionTitle}
                </h2>
                <div className={density.itemGap}>
                  {sec.items.map((item) => (
                    <div key={item.id} className="text-xs sm:text-[13px]">
                      <div className="flex justify-between">
                        <span className="font-bold text-stone-900">{item.title}</span>
                        {item.date && <span className="font-sans text-stone-500 text-xs">{item.date}</span>}
                      </div>
                      {item.subtitle && <p className="italic text-stone-600 text-xs">{item.subtitle}</p>}
                      {item.description && <p className="text-stone-700 text-xs mt-0.5">{item.description}</p>}
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
