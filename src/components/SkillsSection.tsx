import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const groups = [
  { title: "Project Management", color: "#7C3AED", items: ["MS Project", "JIRA", "Confluence", "Azure DevOps", "SharePoint", "Agile/Scrum"] },
  { title: "Data & Analytics", color: "#0D9488", items: ["SQL", "Python", "Power BI", "Tableau", "Advanced Excel", "Google Analytics"] },
  { title: "Automation & Technical", color: "#7C3AED", items: ["Python scripting", "ETL processes", "Cron jobs", "CI/CD pipelines", "R"] },
  { title: "Strategy & Product", color: "#0D9488", items: ["Product Roadmapping", "A/B Testing", "Customer Segmentation", "GTM Strategy", "Stakeholder Management"] },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading">Skills & Tools</h2>
        <p className="section-subtitle">Technologies and frameworks I work with</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: g.color }} />
                <h3 className="text-base font-semibold text-white">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span key={item} className="tool-pill">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
