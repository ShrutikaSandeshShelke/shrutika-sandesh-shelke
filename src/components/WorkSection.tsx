import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CaseStudy {
  accentColor: string;
  roleTag: string;
  roleColor: string;
  title: string;
  company: string;
  problem: string;
  role: string;
  approach: string[];
  tools: string[];
  outcomes: string[];
}

const cases: CaseStudy[] = [
  {
    accentColor: "#7C3AED",
    roleTag: "Program Management",
    roleColor: "rgba(124,58,237,0.15)",
    title: "Intelligent KPI Automation",
    company: "MakeMyTrip · 2024",
    problem: "20+ business-critical KPI reports were compiled manually every day across 50+ stakeholders in operations, marketing, and finance with no standardization and high error risk.",
    role: "Program Manager leading end-to-end automation from requirements through deployment.",
    approach: [
      "Mapped all 20+ report formats and defined a unified data schema",
      "Wrote SQL queries to extract and transform daily metrics from production databases",
      "Built Python scripts to auto-format outputs into structured report tables",
      "Set up cron jobs for nightly pipeline execution and automated email delivery to 50+ stakeholders",
    ],
    tools: ["SQL", "Python", "Cron", "Power BI", "JIRA"],
    outcomes: ["1,200 hrs saved annually", "20+ reports fully automated"],
  },
  {
    accentColor: "#0D9488",
    roleTag: "AI & Analytics",
    roleColor: "rgba(13,148,136,0.15)",
    title: "AI-Powered Customer Segmentation",
    company: "MakeMyTrip · 2024",
    problem: "Marketing and product teams were relying on broad customer segments that did not reflect real booking behavior, resulting in generic campaigns and missed personalization.",
    role: "Program Manager bridging data engineering and product strategy, owning the project from data scoping through business adoption.",
    approach: [
      "Pulled and cleaned 12 months of historical booking data totaling 9 million records",
      "Applied K-means clustering to identify distinct customer personas by booking frequency, destination, spend, and travel type",
      "Translated 8 validated clusters into product-readable personas for leadership",
      "Outputs directly shaped product roadmap and targeted marketing campaigns",
    ],
    tools: ["Python", "K-means", "SQL", "Power BI", "Confluence"],
    outcomes: ["9M records analyzed", "8 actionable customer clusters"],
  },
  {
    accentColor: "#7C3AED",
    roleTag: "Product Analytics",
    roleColor: "rgba(124,58,237,0.15)",
    title: "A/B Testing — Offers Page Optimization",
    company: "MakeMyTrip · 2024",
    problem: "The offers page on the MakeMyTrip app was underperforming. It was unclear which offer layout drove the highest engagement and product adoption.",
    role: "Program Manager overseeing test design, cross-functional coordination, and stakeholder communication of results.",
    approach: [
      "Partnered with product and engineering to design A/B tests on offer layouts and messaging on the app",
      "Defined success metrics, segmented user cohorts, and set statistical significance thresholds",
      "Tracked test status in JIRA and communicated results to product, marketing, and leadership",
      "Managed rollout of the winning variant across the full user base",
    ],
    tools: ["JIRA", "Google Analytics", "Power BI", "Confluence", "Excel"],
    outcomes: ["8% increase in product adoption", "Framework adopted as standard practice"],
  },
  {
    accentColor: "#0D9488",
    roleTag: "Program Management",
    roleColor: "rgba(13,148,136,0.15)",
    title: "ERP to E-commerce Website Integration",
    company: "Maruti Suzuki · 2019 to 2022",
    problem: "Product details on the e-commerce website were updated manually, causing customers to see outdated inventory and pricing, leading to high complaint volume and lost conversions.",
    role: "Program Manager leading the integration from business requirements through go-live.",
    approach: [
      "Mapped full data flow between internal ERP system and the customer-facing website",
      "Worked with web development team to build an automated nightly sync pipeline from ERP to website",
      "Defined data validation rules to catch mismatches before they reached customers",
      "Authored technical SOPs for operations team and coordinated UAT and go-live",
    ],
    tools: ["ERP", "SQL", "SharePoint", "MS Project", "Confluence"],
    outcomes: ["20% conversion rate increase", "50% drop in customer complaints"],
  },
];

function CaseCard({ c, index }: { c: CaseStudy; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card-hover p-6 flex flex-col"
      style={{ borderTop: `2px solid ${c.accentColor}` }}
    >
      <span className="text-xs font-medium px-3 py-1 rounded-full w-fit mb-3" style={{ background: c.roleColor, color: c.accentColor, border: `1px solid ${c.accentColor}30` }}>
        {c.roleTag}
      </span>
      <h3 className="text-lg font-bold text-white mb-1">{c.title}</h3>
      <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>{c.company}</p>

      <p className="text-sm mb-2 font-semibold text-white/80">Problem</p>
      <p className="text-sm mb-4" style={{ color: "var(--text-dim)" }}>{c.problem}</p>

      <p className="text-sm mb-2 font-semibold text-white/80">My Role</p>
      <p className="text-sm mb-4" style={{ color: "var(--text-dim)" }}>{c.role}</p>

      <p className="text-sm mb-2 font-semibold text-white/80">Approach</p>
      <ul className="text-sm mb-4 space-y-1 list-disc list-inside" style={{ color: "var(--text-dim)" }}>
        {c.approach.map((a, i) => <li key={i}>{a}</li>)}
      </ul>

      <div className="flex flex-wrap gap-2 mb-4">
        {c.tools.map((t) => <span key={t} className="tool-pill">{t}</span>)}
      </div>

      <div className="mt-auto grid grid-cols-2 gap-3">
        {c.outcomes.map((o) => (
          <div key={o} className="glass-card p-3 text-center">
            <span className="text-sm font-bold" style={{ color: c.accentColor }}>{o}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading">Featured Work</h2>
        <p className="section-subtitle">Projects that created real business impact</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cases.map((c, i) => <CaseCard key={c.title} c={c} index={i} />)}
        </div>
      </div>
    </section>
  );
}
