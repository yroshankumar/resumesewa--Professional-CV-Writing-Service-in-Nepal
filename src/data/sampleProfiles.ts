import { ResumeData, TemplateConfig } from "../types";

export const defaultTemplateConfig: TemplateConfig = {
  templateId: "modern-clean",
  fontStyle: "sans",
  accentColor: "indigo",
  layoutDensity: "normal",
  showPhoto: false,
  sectionOrder: ["summary", "experience", "projects", "education", "skills", "certifications", "languages", "custom"],
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

export const sampleProfiles: Record<string, { label: string; description: string; data: ResumeData; config: Partial<TemplateConfig> }> = {
  techLead: {
    label: "Senior Software Engineer / Tech Lead",
    description: "Modern ATS format with quantified impact, tech stacks, and cloud architectures",
    config: {
      templateId: "tech-developer",
      fontStyle: "sans",
      accentColor: "indigo",
      layoutDensity: "normal",
      showPhoto: false,
    },
    data: {
      personal: {
        fullName: "Aarav Sharma",
        title: "Lead Full-Stack & Cloud Solutions Architect",
        email: "aarav.sharma@example.com",
        phone: "+977 9801234567",
        location: "Kathmandu, Nepal / Remote",
        website: "https://aaravsharma.dev",
        linkedin: "linkedin.com/in/aarav-sharma-dev",
        github: "github.com/aaravsharma",
        summary: "Results-driven Lead Architect with 7+ years of expertise engineering scalable distributed microservices and reactive cloud applications. Championed performance re-architectures reducing API response latencies by 42% across 1.2M daily active users. Proven mentor skilled at bridging business vision with resilient software engineering.",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      },
      experience: [
        {
          id: "exp-1",
          company: "Apex Global Cloud Solutions",
          role: "Lead Software Architect",
          location: "Kathmandu & Singapore (Hybrid)",
          startDate: "Jan 2022",
          endDate: "Present",
          current: true,
          technologies: ["TypeScript", "Node.js", "React", "PostgreSQL", "AWS ECS", "Docker"],
          bulletPoints: [
            "Spearheaded cloud migration of core billing and ledger system to microservices, boosting fault tolerance to 99.98% uptime.",
            "Architected real-time WebSocket communication pipeline processing over 45,000 transactions per second with sub-50ms latency.",
            "Mentored an engineering squad of 11 full-stack developers, introducing automated CI/CD and rigorous code review standards that cut production regressions by 60%.",
            "Eliminated database cold-query bottlenecks by implementing Redis caching layers, saving an estimated $18,000 in monthly infrastructure costs."
          ]
        },
        {
          id: "exp-2",
          company: "Nexus FinTech Labs",
          role: "Senior Full Stack Engineer",
          location: "Lalitpur, Nepal",
          startDate: "Aug 2019",
          endDate: "Dec 2021",
          current: false,
          technologies: ["React", "Express", "GraphQL", "Tailwind CSS", "Jest"],
          bulletPoints: [
            "Engineered secure merchant payments dashboard adopted by 320+ partner vendors with end-to-end audit trails.",
            "Accelerated client-side bundle load speeds by 48% by implementing dynamic code-splitting and responsive asset pipelines.",
            "Co-authored ISO-27001 data compliance audit requirements for digital banking integrations."
          ]
        }
      ],
      education: [
        {
          id: "edu-1",
          institution: "Tribhuvan University, Institute of Engineering (IOE)",
          degree: "Bachelor of Engineering (B.E.)",
          fieldOfStudy: "Computer Engineering",
          location: "Pulchowk, Lalitpur",
          startDate: "2015",
          endDate: "2019",
          grade: "Distinction (83.4%)",
          honors: "Dean's Honor List for Academic Excellence & Best Capstone Project Award"
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "KoshPay - Open Source QR Gateway",
          subtitle: "Nepal Interbank Settlement Simulator",
          liveUrl: "https://koshpay-demo.dev",
          githubUrl: "https://github.com/aaravsharma/koshpay",
          description: "High-throughput QR payment gateway with offline reconciliation mechanisms and cryptographically signed audit receipts.",
          bulletPoints: [
            "Implemented HMAC-SHA256 signature verification handling 10k requests/minute.",
            "Integrated automated webhooks with retry back-off logic and zero message loss."
          ],
          techStack: ["Node.js", "TypeScript", "Redis", "TailwindCSS"]
        },
        {
          id: "proj-2",
          title: "CloudPulse - Observability Dashboard",
          subtitle: "Distributed Microservice Metric Tracker",
          liveUrl: "https://cloudpulse.io",
          githubUrl: "https://github.com/aaravsharma/cloudpulse",
          description: "Real-time metrics visualizer aggregating Docker container CPU, memory, and error rates via gRPC streams.",
          bulletPoints: [
            "Designed interactive latency heatmap charts rendering 100k data points with 60fps fluidity."
          ],
          techStack: ["React", "Vite", "D3.js", "WebSockets"]
        }
      ],
      skillCategories: [
        {
          id: "cat-1",
          name: "Languages & Frameworks",
          skills: ["TypeScript", "JavaScript (ES6+)", "Python", "Go", "React / Next.js", "Node.js", "GraphQL"]
        },
        {
          id: "cat-2",
          name: "Cloud & DevOps",
          skills: ["AWS (ECS, Lambda, S3, RDS)", "Docker", "Kubernetes", "CI/CD (GitHub Actions)", "Terraform", "Nginx"]
        },
        {
          id: "cat-3",
          name: "Databases & Architecture",
          skills: ["PostgreSQL", "Redis", "MongoDB", "Event-Driven Systems", "Microservices", "REST & gRPC"]
        }
      ],
      certifications: [
        {
          id: "cert-1",
          name: "AWS Certified Solutions Architect – Associate",
          issuer: "Amazon Web Services",
          issueDate: "2023",
          credentialId: "AWS-SAA-904821"
        }
      ],
      languages: [
        { id: "lang-1", name: "English", proficiency: "Fluent" },
        { id: "lang-2", name: "Nepali", proficiency: "Native" },
        { id: "lang-3", name: "Hindi", proficiency: "Professional" }
      ],
      customSections: [
        {
          id: "cust-1",
          sectionTitle: "Hackathons & Honors",
          items: [
            {
              id: "item-1",
              title: "1st Place Winner - Nepal TechFest Hackathon",
              subtitle: "National AI & FinTech Challenge",
              date: "2022",
              description: "Developed AI-powered offline crop disease diagnosis platform for rural agriculture cooperatives."
            }
          ]
        }
      ]
    }
  },
  loksewaOfficer: {
    label: "Nepal Civil Service & Banking Format (Lok Sewa)",
    description: "Curriculum Vitae compliant with Nepal Public Service Commission and BFIs standards",
    config: {
      templateId: "nepal-loksewa",
      fontStyle: "serif",
      accentColor: "navy",
      layoutDensity: "compact",
      showPhoto: true,
    },
    data: {
      personal: {
        fullName: "Bikash Thapa",
        title: "Section Officer / Senior Administrative Specialist",
        email: "bikash.thapa@nepalgov.np",
        phone: "+977 9841567890",
        location: "Singha Durbar, Kathmandu, Nepal",
        website: "",
        linkedin: "linkedin.com/in/bikashthapa-np",
        github: "",
        summary: "Dedicated Civil Service Professional with 6+ years of exemplary track record in public administration, policy formulation, and government fiscal oversight. Commended for digitizing provincial citizen grievance redressal mechanisms and managing multi-district government procurement audits in strict compliance with Public Procurement Act (PPA).",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      },
      experience: [
        {
          id: "exp-1",
          company: "Ministry of Federal Affairs and General Administration (MoFAGA)",
          role: "Section Officer (शाखा अधिकृत)",
          location: "Kathmandu, Nepal",
          startDate: "March 2021",
          endDate: "Present",
          current: true,
          bulletPoints: [
            "Spearheaded implementation of Local Level Performance Assessment (LISA) across 32 rural municipalities.",
            "Formulated administrative guidelines on local governance fiscal transfers and budget execution tracking.",
            "Conducted nationwide training seminars for over 250 municipal executive officers on digital filing and e-governance systems.",
            "Coordinated inter-ministerial liaison for bilateral donor projects (UNDP, World Bank) with 100% adherence to national audit criteria."
          ]
        },
        {
          id: "exp-2",
          company: "Rastriya Banijya Bank Limited (RBBL)",
          role: "Assistant Manager - Credit & Compliance",
          location: "Pokhara Branch, Nepal",
          startDate: "Feb 2018",
          endDate: "Feb 2021",
          current: false,
          bulletPoints: [
            "Evaluated and appraised commercial loan portfolios exceeding NPR 450 Million with under 0.8% Non-Performing Loans (NPL).",
            "Ensured strict regulatory compliance with Nepal Rastra Bank (NRB) unified directives and AML/CFT guidelines.",
            "Automated internal voucher verification reducing monthly branch reconciliation delays from 5 days to 4 hours."
          ]
        }
      ],
      education: [
        {
          id: "edu-1",
          institution: "Tribhuvan University, Central Department of Public Administration",
          degree: "Master of Public Administration (MPA)",
          fieldOfStudy: "Public Policy & Development Management",
          location: "Balkhu, Kathmandu",
          startDate: "2018",
          endDate: "2020",
          grade: "First Division (76.8%)"
        },
        {
          id: "edu-2",
          institution: "Prithvi Narayan Campus, Pokhara",
          degree: "Bachelor of Business Studies (BBS)",
          fieldOfStudy: "Finance & Accountancy",
          location: "Pokhara, Kaski",
          startDate: "2014",
          endDate: "2018",
          grade: "First Division"
        }
      ],
      projects: [],
      skillCategories: [
        {
          id: "cat-1",
          name: "Administrative & Regulatory Expertise",
          skills: ["Public Procurement Act (PPA)", "Nepal Civil Service Regulations", "Fiscal Decentralization", "AML/CFT Compliance", "NRB Directives"]
        },
        {
          id: "cat-2",
          name: "Operational & Software Competencies",
          skills: ["E-Governance Portals (SuTRA / LISA)", "Advanced MS Excel", "Government Accounting System (CGAS)", "Bilingual Official Drafting (Nepali & English)"]
        }
      ],
      certifications: [
        {
          id: "cert-1",
          name: "Executive Leadership & Governance Induction",
          issuer: "Nepal Administrative Staff College (NASC), Jawalakhel",
          issueDate: "2021"
        }
      ],
      languages: [
        { id: "lang-1", name: "Nepali", proficiency: "Native" },
        { id: "lang-2", name: "English", proficiency: "Fluent" },
        { id: "lang-3", name: "Maithili", proficiency: "Intermediate" }
      ],
      customSections: [
        {
          id: "cust-1",
          sectionTitle: "Official Examinations & Merits",
          items: [
            {
              id: "item-1",
              title: "Public Service Commission (Lok Sewa Aayog) Merit List",
              subtitle: "Section Officer (Gazetted Class III - Administration)",
              date: "2021",
              description: "Secured top merit ranking among 18,000+ national candidates across preliminary, subjective, and interview stages."
            }
          ]
        }
      ]
    }
  },
  foreignEmployment: {
    label: "International ATS & Foreign Employment (Gulf / Europe)",
    description: "Standard single-column ATS optimized for international recruiting agencies and global portals",
    config: {
      templateId: "international-ats",
      fontStyle: "sans",
      accentColor: "slate",
      layoutDensity: "normal",
      showPhoto: false,
    },
    data: {
      personal: {
        fullName: "Prajwal Shrestha",
        title: "Operations & HSE Safety Supervisor (Certified IOSH / OSHA)",
        email: "prajwal.shrestha@globaltalent.com",
        phone: "+971 50 123 4567 / +977 9812345678",
        location: "Dubai, UAE / Kathmandu, Nepal (Available Immediately)",
        website: "",
        linkedin: "linkedin.com/in/prajwal-shrestha-hse",
        github: "",
        summary: "NEBOSH & IOSH certified Health, Safety & Environment (HSE) Supervisor with 6+ years of international EPC and commercial construction experience across the UAE, Qatar, and Nepal. Demonstrated success maintaining over 2.5 million consecutive safe man-hours without Lost Time Incidents (LTI). Proven expertise in safety audits, risk assessments, and ISO 45001 standards.",
        avatarUrl: "",
      },
      experience: [
        {
          id: "exp-1",
          company: "Al-Futtaim Engineering & Construction",
          role: "Senior Safety & Operations Inspector",
          location: "Dubai, United Arab Emirates",
          startDate: "Oct 2020",
          endDate: "Dec 2023",
          current: false,
          bulletPoints: [
            "Supervised daily health, safety, and operational protocols for a mega mixed-use development with 1,400+ on-site personnel.",
            "Conducted 150+ comprehensive Job Hazard Analyses (JHA) and hazard identification risk assessments (HIRA).",
            "Achieved zero Lost Time Incidents (LTI) across 1.8 Million work hours through rigorous pre-task toolbox talks and safety coaching.",
            "Led incident investigations and implemented corrective preventive action plans (CAPA) aligned with Dubai Municipality safety codes."
          ]
        },
        {
          id: "exp-2",
          company: "Himalayan Infrastructure & Hydro Consortium",
          role: "HSE Field Officer",
          location: "Solukhumbu, Nepal",
          startDate: "Jan 2018",
          endDate: "Sep 2020",
          current: false,
          bulletPoints: [
            "Administered safety compliance for high-altitude hydropower penstock tunnel installation.",
            "Delivered emergency rescue, first-aid, and working-at-height training modules in English, Nepali, and Hindi."
          ]
        }
      ],
      education: [
        {
          id: "edu-1",
          institution: "Kathmandu University",
          degree: "Bachelor of Science (B.Sc.)",
          fieldOfStudy: "Environmental Science & Industrial Safety",
          location: "Dhulikhel, Nepal",
          startDate: "2013",
          endDate: "2017"
        }
      ],
      projects: [],
      skillCategories: [
        {
          id: "cat-1",
          name: "HSE Standards & Compliance",
          skills: ["ISO 45001 (OH&S)", "ISO 14001 (Environmental)", "Job Safety Analysis (JSA)", "HIRA & Risk Matrix", "Incident Root Cause Analysis"]
        },
        {
          id: "cat-2",
          name: "Field Competencies",
          skills: ["Confined Space Entry", "Scaffolding & Working at Heights", "Permit to Work (PTW) Systems", "First Aid & Fire Marshal Trained"]
        }
      ],
      certifications: [
        {
          id: "cert-1",
          name: "NEBOSH International General Certificate in Occupational Health & Safety",
          issuer: "NEBOSH (UK)",
          issueDate: "2020",
          credentialId: "00549210"
        },
        {
          id: "cert-2",
          name: "IOSH Managing Safely",
          issuer: "Institution of Occupational Safety and Health",
          issueDate: "2019"
        }
      ],
      languages: [
        { id: "lang-1", name: "English", proficiency: "Fluent" },
        { id: "lang-2", name: "Nepali", proficiency: "Native" },
        { id: "lang-3", name: "Hindi / Urdu", proficiency: "Professional" },
        { id: "lang-4", name: "Arabic", proficiency: "Basic" }
      ],
      customSections: [
        {
          id: "cust-1",
          sectionTitle: "International Documents & Readiness",
          items: [
            {
              id: "item-1",
              title: "Passport & Driving License",
              subtitle: "Valid international passport & UAE Light Vehicle Driving License",
              date: "Active",
              description: "Ready for immediate international mobilization with complete police clearance and attested academic credentials."
            }
          ]
        }
      ]
    }
  },
  creativePortfolio: {
    label: "Product Designer & Creative Lead",
    description: "Visual portfolio layout with sidebar, project highlights, live links, and design metrics",
    config: {
      templateId: "creative-portfolio",
      fontStyle: "sans",
      accentColor: "emerald",
      layoutDensity: "spacious",
      showPhoto: true,
    },
    data: {
      personal: {
        fullName: "Sneha Karki",
        title: "Lead Product Designer & UX Strategist",
        email: "sneha.karki@designstudio.com",
        phone: "+977 9860123456",
        location: "Kathmandu, Nepal / Remote Worldwide",
        website: "https://snehakarki.design",
        linkedin: "linkedin.com/in/snehakarki-design",
        github: "dribbble.com/snehakarki",
        summary: "User-obsessed Lead Product Designer with 6+ years designing high-retention SaaS platforms and mobile consumer apps. Championed design system adoption across 4 cross-functional product pods, cutting design-to-engineering turnaround time by 35%. Passionate about accessible UI, behavioral heuristics, and micro-interactions.",
        avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
      },
      experience: [
        {
          id: "exp-1",
          company: "Lumina Labs Design Studio",
          role: "Head of Product Design",
          location: "Remote / Hybrid",
          startDate: "Feb 2022",
          endDate: "Present",
          current: true,
          technologies: ["Figma", "Design Systems", "Prototyping", "User Research"],
          bulletPoints: [
            "Overhauled checkout and onboarding journey for flagship mobile banking client, lifting conversion rate from 58% to 81%.",
            "Built and published comprehensive multi-brand design system with 240+ accessible Figma components synced directly with React tokens.",
            "Facilitated 40+ usability testing sessions, translating customer pain points into actionable sprint deliverables."
          ]
        },
        {
          id: "exp-2",
          company: "Craft & Pixel Agency",
          role: "Senior UX/UI Designer",
          location: "Kathmandu, Nepal",
          startDate: "Jan 2019",
          endDate: "Jan 2022",
          current: false,
          technologies: ["Figma", "Adobe XD", "Wireframing", "Tailwind CSS"],
          bulletPoints: [
            "Designed end-to-end B2B analytics portal for logistics enterprises handling 200k daily tracking events.",
            "Mentored 4 junior designers and initiated weekly interactive critique workshops."
          ]
        }
      ],
      education: [
        {
          id: "edu-1",
          institution: "Kathmandu University School of Arts",
          degree: "Bachelor of Design (B.Des)",
          fieldOfStudy: "Interaction & Graphic Design",
          location: "Kathmandu, Nepal",
          startDate: "2015",
          endDate: "2019",
          grade: "CGPA 3.82 / 4.0"
        }
      ],
      projects: [
        {
          id: "proj-1",
          title: "SewaPay Redesign Case Study",
          subtitle: "Fintech Mobile Wallet for Emerging Markets",
          liveUrl: "https://snehakarki.design/sewapay",
          githubUrl: "",
          description: "Comprehensive UX overhaul focusing on rural literacy, biometric approvals, and bilingual microcopy.",
          bulletPoints: [
            "Conducted field interviews with 60+ street merchants across 3 districts.",
            "Reduced critical transaction error rates by 62% in post-launch usability tests."
          ],
          techStack: ["Figma", "Maze", "UserTesting", "Principle"]
        }
      ],
      skillCategories: [
        {
          id: "cat-1",
          name: "Design & UX Capabilities",
          skills: ["Design Systems", "User Research & Testing", "Rapid Prototyping", "Information Architecture", "Heuristic Evaluation"]
        },
        {
          id: "cat-2",
          name: "Tools & Technologies",
          skills: ["Figma", "FigJam", "Miro", "Adobe Creative Cloud", "Framer", "HTML/Tailwind CSS basics"]
        }
      ],
      certifications: [
        {
          id: "cert-1",
          name: "Nielsen Norman Group (NN/g) UX Master Certified",
          issuer: "Nielsen Norman Group",
          issueDate: "2022"
        }
      ],
      languages: [
        { id: "lang-1", name: "English", proficiency: "Fluent" },
        { id: "lang-2", name: "Nepali", proficiency: "Native" }
      ],
      customSections: []
    }
  }
};
