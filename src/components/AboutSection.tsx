import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import shrutikaImg from "@/assets/shrutika_portfolio_final.jpg";

const pills = ["SQL & Python", "Product Strategy", "Cross-functional Leadership"];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <img
            src={shrutikaImg}
            alt="Shrutika Shelke"
            className="w-full max-w-sm rounded-2xl object-cover"
            style={{ boxShadow: "0 20px 60px rgba(124,58,237,0.2)" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">About Me</h2>
          <div className="w-12 h-1 rounded-full mb-6" style={{ background: "var(--purple)" }} />
          <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            I am a graduate student at UT Dallas pursuing my MS in Business Analytics and AI, with a background in Mechanical Engineering from VJTI Mumbai and an MBA in Operations and Strategy from IIM Lucknow. Before coming to the US, I spent over four years working as a Program Manager at MakeMyTrip and Maruti Suzuki India, where I led AI and data projects, automated business operations, and drove measurable revenue impact. I bridge the gap between data, technology, and business strategy — and I am actively seeking Product Manager and Business Analyst internships for Summer 2026 in e-commerce, travel tech, and fintech.
          </p>
          <div className="flex flex-wrap gap-3">
            {pills.map((p) => (
              <span key={p} className="skill-pill">{p}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
