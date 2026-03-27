import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const entries = [
  {
    institution: "The University of Texas at Dallas",
    degree: "MS in Business Analytics and AI",
    period: "Expected May 2027",
    gpa: "4.0",
    detail: "Coursework in Advanced Statistics, Digital Product Management, Predictive Analytics, and Prescriptive Analytics. Teaching Assistant for Information Technology for Business.",
    color: "#C75B12",
  },
  {
    institution: "Indian Institute of Management (IIM) Lucknow",
    degree: "MBA in Operations and Strategy",
    period: "March 2024",
    gpa: "3.8",
    detail: "Coursework in Big Data Analytics, Management Information Systems, Marketing Management, and Strategic Management.",
    color: "#8B1A1A",
  },
  {
    institution: "Veermata Jijabai Technological Institute (VJTI), Mumbai",
    degree: "BS in Mechanical Engineering",
    period: "June 2019",
    gpa: "3.7",
    detail: "Foundation in engineering principles and systems thinking.",
    color: "#1E40AF",
  },
];

export default function EducationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="py-24 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <h2 className="section-heading">Education</h2>
        <div className="relative mt-12 pl-8">
          {/* Timeline spine */}
          <div className="absolute left-3 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, #7C3AED, #0D9488)" }} />

          {entries.map((e, i) => (
            <motion.div
              key={e.institution}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative mb-12 last:mb-0"
            >
              {/* dot */}
              <div className="absolute -left-5 top-1 w-4 h-4 rounded-full border-2" style={{ borderColor: e.color, background: "#080B14" }}>
                <div className="w-2 h-2 rounded-full m-0.5" style={{ background: e.color }} />
              </div>

              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                  <h3 className="text-base font-bold text-white">{e.institution}</h3>
                </div>
                <p className="text-sm font-semibold gradient-text mb-1">{e.degree}</p>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{e.period} · GPA: {e.gpa}</p>
                <p className="text-sm mt-2" style={{ color: "var(--text-dim)" }}>{e.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
