import React from "react";
import { ResumeData, TemplateConfig } from "../../types";
import { getDensityClass } from "../../utils/themeStyles";

interface Props {
  data: ResumeData;
  config: TemplateConfig;
}

export const InternationalAtsTemplate: React.FC<Props> = ({ data, config }) => {
  const { personal, experience, education, projects, skillCategories, certifications, languages, customSections } = data;
  const density = getDensityClass(config.layoutDensity);
  const { visibleSections } = config;

  return (
    <div className={`w-full bg-white text-black font-sans ${density.containerPadding} leading-normal`}>
      {/* ATS Header - Single Column Standard */}
      <header className="text-center pb-3 border-b border-black mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-black">
          {personal.fullName || "Candidate Name"}
        </h1>
        <p className="text-sm font-semibold text-black mt-0.5">
          {personal.title || "Professional Role"}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-2 text-xs text-black mt-1.5">
          {personal.location && <span>{personal.location}</span>}
          {personal.location && (personal.phone || personal.email) && <span>|</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.phone && personal.email && <span>|</span>}
          {personal.email && <span>{personal.email}</span>}
          {personal.linkedin && (
            <>
              <span>|</span>
              <span>{personal.linkedin}</span>
            </>
          )}
          {personal.website && (
            <>
              <span>|</span>
              <span>{personal.website}</span>
            </>
          )}
        </div>
      </header>

      <div className={density.sectionGap}>
        {/* Professional Summary */}
        {visibleSections.summary && personal.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Professional Summary
            </h2>
            <p className="text-xs text-black leading-normal text-justify">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Core Competencies & Technical Skills */}
        {visibleSections.skills && skillCategories.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Core Competencies & Skills
            </h2>
            <div className="space-y-1 text-xs text-black">
              {skillCategories.map((cat) => (
                <p key={cat.id}>
                  <strong>{cat.name}:</strong> {cat.skills.join(", ")}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {visibleSections.experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Professional Experience
            </h2>
            <div className={density.itemGap}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline font-bold text-xs sm:text-sm text-black">
                    <span>{exp.company}</span>
                    <span className="font-normal text-xs">{exp.location}</span>
                  </div>
                  <div className="flex justify-between items-baseline italic text-xs text-black mb-1">
                    <span>{exp.role}</span>
                    <span className="not-italic text-[11px]">
                      {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>

                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-black">
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

        {/* Projects */}
        {visibleSections.projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Key Projects & Initiatives
            </h2>
            <div className={density.itemGap}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between text-xs font-bold text-black">
                    <span>
                      {proj.title} {proj.subtitle ? `— ${proj.subtitle}` : ""}
                    </span>
                    {proj.liveUrl && <span className="font-normal text-[11px] underline">{proj.liveUrl}</span>}
                  </div>
                  {proj.description && <p className="text-xs text-black mt-0.5">{proj.description}</p>}
                  {proj.bulletPoints && proj.bulletPoints.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-black mt-1">
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Education
            </h2>
            <div className={density.itemGap}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between font-bold text-xs text-black">
                    <span>{edu.institution}</span>
                    <span className="font-normal text-[11px]">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="text-xs text-black">
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                    {edu.grade && <span> — {edu.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Licenses */}
        {visibleSections.certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Certifications & Professional Licenses
            </h2>
            <div className="space-y-1 text-xs text-black">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between">
                  <span>
                    <strong>{cert.name}</strong>, {cert.issuer} {cert.credentialId ? `(ID: ${cert.credentialId})` : ""}
                  </span>
                  <span className="text-[11px]">{cert.issueDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages & Custom Details */}
        {visibleSections.languages && languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Languages
            </h2>
            <p className="text-xs text-black">
              {languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}
            </p>
          </section>
        )}

        {visibleSections.custom && customSections.length > 0 && (
          <div>
            {customSections.map((sec) => (
              <section key={sec.id} className="mt-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
                  {sec.sectionTitle}
                </h2>
                <div className="space-y-1.5 text-xs text-black">
                  {sec.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between font-bold">
                        <span>{item.title}</span>
                        {item.date && <span className="font-normal">{item.date}</span>}
                      </div>
                      {item.subtitle && <div className="italic">{item.subtitle}</div>}
                      {item.description && <div>{item.description}</div>}
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
