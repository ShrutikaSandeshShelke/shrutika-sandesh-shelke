import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import shrutikaImg from "@/assets/shrutika_portfolio_final.jpg";

const ParticleMesh = lazy(() => import("./ParticleMesh"));

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const metrics = [
  { value: "$5.7M", label: "Revenue contributed", color: "#0D9488" },
  { value: "1,200 hrs", label: "Automated annually", color: "#7C3AED" },
  { value: "9M", label: "Records analyzed", color: "#0D9488" },
  { value: "4+ years", label: "Industry experience", color: "#7C3AED" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 70%)" }} />

      <Suspense fallback={null}>
        <ParticleMesh />
      </Suspense>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 w-full grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
        {/* Left */}
        <div>
          <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6" style={{ border: "1px solid rgba(124,58,237,0.4)", background: "rgba(124,58,237,0.08)", color: "rgba(255,255,255,0.8)" }}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to Summer 2026 internships
          </motion.div>

          <motion.h1 {...fadeUp(0.1)} className="text-4xl md:text-[56px] font-bold leading-tight text-white mb-2">Shrutika Shelke</motion.h1>
          <motion.h2 {...fadeUp(0.2)} className="text-2xl md:text-3xl font-bold gradient-text mb-5">Product Manager & Business Analyst</motion.h2>

          <motion.p {...fadeUp(0.3)} className="text-[15px] leading-relaxed mb-8 max-w-lg" style={{ color: "var(--text-dim)" }}>
            MS Business Analytics & AI at UT Dallas (GPA 4.0) · MBA from IIM Lucknow · 4+ years driving data-driven product and program impact at MakeMyTrip and Maruti Suzuki. Currently based in Dallas, Texas.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4 mb-10">
            <a href="#work" className="gradient-btn">View My Work</a>
            <a href="https://raw.githubusercontent.com/shrutikasandeshshelke/shrutika-sandesh-shelke/main/resume.pdf" target="_blank" rel="noopener noreferrer" className="outline-btn">Download Resume</a>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="grid grid-cols-2 gap-3 max-w-md">
            {metrics.map((m) => (
              <div key={m.label} className="glass-card p-4">
                <div className="text-xl font-bold mb-1" style={{ color: m.color }}>{m.value}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{m.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <motion.div {...fadeUp(0.3)} className="flex justify-center relative">
          <div className="relative">
            <img
              src={shrutikaImg}
              alt="Shrutika Shelke"
              className="w-64 h-64 md:w-[340px] md:h-[340px] rounded-full object-cover"
              style={{
                border: "2px solid rgba(124,58,237,0.5)",
                boxShadow: "0 0 40px rgba(124,58,237,0.3)",
              }}
            />
            {/* Floating badges */}
            <div className="absolute -top-2 -right-4 glass-card px-3 py-2 text-xs text-white/90 font-medium" style={{ borderRadius: 12, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              🟢 KPMG Certified
            </div>
            <div className="absolute -bottom-2 -left-4 glass-card px-3 py-2 text-xs text-white/90 font-medium" style={{ borderRadius: 12, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              🎓 IIM Lucknow MBA
            </div>
            <div className="absolute top-1/2 -right-16 hidden lg:block glass-card px-3 py-2 text-xs text-white/90 font-medium" style={{ borderRadius: 12, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
              ⭐ GPA 4.0
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
