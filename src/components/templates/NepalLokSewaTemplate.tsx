import React from "react";
import { ResumeData, TemplateConfig } from "../../types";
import { getDensityClass } from "../../utils/themeStyles";
import { User, Mail, Phone, MapPin } from "lucide-react";

interface Props {
  data: ResumeData;
  config: TemplateConfig;
}

export const NepalLokSewaTemplate: React.FC<Props> = ({ data, config }) => {
  const { personal, experience, education, skillCategories, certifications, languages, customSections } = data;
  const density = getDensityClass(config.layoutDensity);
  const { visibleSections } = config;

  return (
    <div className={`w-full bg-white text-slate-900 font-serif-clean ${density.containerPadding} leading-normal`}>
      {/* Official Top Banner */}
      <div className="text-center border-b-2 border-slate-900 pb-3 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase text-slate-950">
          Curriculum Vitae (व्यक्तिगत विवरण)
        </h1>
        <p className="text-xs sm:text-sm font-sans text-slate-600 mt-0.5">
          Standard Format for Civil Service, Banking & Public Sector Applications
        </p>
      </div>

      {/* Header Info with Passport Size Photo */}
      <div className="flex justify-between items-start gap-4 pb-4 border-b border-slate-300">
        <div className="flex-1 space-y-1 text-xs sm:text-sm">
          <div className="text-lg sm:text-xl font-bold text-slate-900">{personal.fullName}</div>
          <div className="font-sans font-medium text-slate-700">{personal.title}</div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs text-slate-600 mt-1">
            {personal.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>Permanent/Current Address: {personal.location}</span>
              </span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400" />
                <span>Contact: {personal.phone}</span>
              </span>
            )}
            {personal.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>Email: {personal.email}</span>
              </span>
            )}
          </div>
        </div>

        {/* Passport Photo Box */}
        <div className="w-24 h-28 sm:w-28 sm:h-32 border-2 border-slate-800 bg-slate-50 flex flex-col items-center justify-center p-1 shrink-0 text-center">
          {personal.avatarUrl ? (
            <img src={personal.avatarUrl} alt="Passport Photograph" className="w-full h-full object-cover" />
          ) : (
            <div className="text-slate-400 flex flex-col items-center">
              <User className="w-8 h-8 mb-1 opacity-50" />
              <span className="text-[10px] font-sans font-medium uppercase">Passport Size Photo</span>
            </div>
          )}
        </div>
      </div>

      <div className={`mt-4 ${density.sectionGap}`}>
        {/* Career Objective / Professional Statement */}
        {visibleSections.summary && personal.summary && (
          <section>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 border-l-4 border-slate-800 mb-2">
              1. Career Objective & Personal Summary (उद्देश्य तथा व्यक्तिगत विवरण)
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify px-1">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Academic Qualifications Table */}
        {visibleSections.education && education.length > 0 && (
          <section>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 border-l-4 border-slate-800 mb-2">
              2. Academic Qualifications (शैक्षिक योग्यता)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-slate-400 text-xs text-left">
                <thead>
                  <tr className="bg-slate-100 text-slate-900">
                    <th className="border border-slate-400 p-1.5 font-bold">Level / Degree</th>
                    <th className="border border-slate-400 p-1.5 font-bold">Institution / Board</th>
                    <th className="border border-slate-400 p-1.5 font-bold">Year</th>
                    <th className="border border-slate-400 p-1.5 font-bold">Division / Score</th>
                    <th className="border border-slate-400 p-1.5 font-bold">Major Subjects</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((edu) => (
                    <tr key={edu.id} className="hover:bg-slate-50">
                      <td className="border border-slate-400 p-1.5 font-semibold text-slate-900">{edu.degree}</td>
                      <td className="border border-slate-400 p-1.5">{edu.institution}</td>
                      <td className="border border-slate-400 p-1.5 whitespace-nowrap">{edu.endDate || edu.startDate}</td>
                      <td className="border border-slate-400 p-1.5 font-medium">{edu.grade || "First Division"}</td>
                      <td className="border border-slate-400 p-1.5">{edu.fieldOfStudy || "General"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Work Experience & Administrative History */}
        {visibleSections.experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 border-l-4 border-slate-800 mb-2">
              3. Professional Experience & Postings (कार्य अनुभव तथा पदभार)
            </h2>
            <div className="space-y-3 px-1">
              {experience.map((exp, idx) => (
                <div key={exp.id} className="border-b border-slate-200 pb-2.5 last:border-b-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-sans">
                    <div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        3.{idx + 1} {exp.role}
                      </span>
                      <span className="text-slate-700 font-medium text-xs"> — {exp.company}</span>
                    </div>
                    <span className="text-xs text-slate-600 font-medium">
                      Duration: {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                    </span>
                  </div>

                  {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                    <ul className="mt-1.5 space-y-1 list-disc list-outside ml-5 text-xs text-slate-800">
                      {exp.bulletPoints.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Official Trainings & Merits */}
        {visibleSections.certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 border-l-4 border-slate-800 mb-2">
              4. Institutional Trainings & Certifications (तालिम तथा प्रमाणपत्र)
            </h2>
            <ul className="space-y-1 list-disc list-outside ml-5 text-xs text-slate-800 px-1">
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <strong>{cert.name}</strong>, Organized by: <em>{cert.issuer}</em> ({cert.issueDate})
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Competencies & Skills */}
        {visibleSections.skills && skillCategories.length > 0 && (
          <section>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 border-l-4 border-slate-800 mb-2">
              5. Knowledge Areas & Competencies (दक्षता तथा विषयगत ज्ञान)
            </h2>
            <div className="space-y-1.5 text-xs px-1">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="flex flex-col sm:flex-row gap-1">
                  <span className="font-bold text-slate-900 min-w-[200px]">{cat.name}:</span>
                  <span className="text-slate-800">{cat.skills.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages & Nationality Details */}
        <section>
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 border-l-4 border-slate-800 mb-2">
            6. Language Proficiency & Additional Information (भाषा दक्षता)
          </h2>
          <div className="text-xs text-slate-800 px-1">
            <p>
              <strong>Languages Known:</strong>{" "}
              {languages.map((l) => `${l.name} (${l.proficiency})`).join(", ")}
            </p>
          </div>
        </section>

        {/* Custom / Examination Merits */}
        {visibleSections.custom && customSections.length > 0 && (
          <div>
            {customSections.map((sec, sIdx) => (
              <section key={sec.id} className="mt-3">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 border-l-4 border-slate-800 mb-2">
                  7.{sIdx + 1} {sec.sectionTitle}
                </h2>
                <div className="space-y-1.5 px-1 text-xs">
                  {sec.items.map((item) => (
                    <div key={item.id}>
                      <div className="flex justify-between font-semibold text-slate-900">
                        <span>{item.title}</span>
                        {item.date && <span>{item.date}</span>}
                      </div>
                      {item.subtitle && <p className="italic text-slate-600">{item.subtitle}</p>}
                      {item.description && <p className="text-slate-700">{item.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Official Declaration */}
        <div className="mt-8 pt-4 border-t border-slate-300 text-xs font-sans text-slate-700">
          <p className="italic">
            Declaration: I hereby declare that the particulars furnished above are true, complete and correct to the best of my knowledge and belief.
          </p>
          <div className="flex justify-between items-end mt-6">
            <div>
              <p>Date: ____________________</p>
              <p className="mt-1">Place: {personal.location || "Kathmandu, Nepal"}</p>
            </div>
            <div className="text-center">
              <div className="w-36 border-b border-slate-800 mb-1"></div>
              <p className="font-semibold text-slate-900">{personal.fullName}</p>
              <p className="text-[11px] text-slate-500">(Signature / दस्तखत)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
