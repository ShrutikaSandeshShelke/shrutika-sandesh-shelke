import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import certKpmg from "@/assets/cert-kpmg.jpg";
import certCsca from "@/assets/cert-csca.png";
import certGoogle from "@/assets/cert-google-ads.png";

const certs = [
  {
    title: "Lean Six Sigma Green Belt",
    issuer: "KPMG India",
    date: "July 2022",
    description: "Completed Green Belt programme in Lean Six Sigma Methodology, certified by KPMG India. Applied process optimization frameworks during tenure at Maruti Suzuki.",
    color: "#22C55E",
    image: certKpmg,
  },
  {
    title: "Certified Supply Chain Analyst (CSCA)",
    issuer: "ISCEA",
    date: "December 2023 · Score: 99/100",
    description: "Passed the CSCA certification exam with a score of 99/100, earning the CSCA designation from ISCEA.",
    color: "#3B82F6",
    image: certCsca,
  },
  {
    title: "Google Ads Apps Certification",
    issuer: "Google",
    date: "December 2024 · Valid through December 2025",
    description: "Certified in Google Ads Apps by Google, demonstrating proficiency in app campaign strategy and performance marketing.",
    color: "#EA4335",
    image: certGoogle,
  },
];

export default function CertificationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="certifications" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <h2 className="section-heading">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card-hover p-5 flex flex-col"
            >
              <div className="w-3 h-3 rounded-full mb-3" style={{ background: c.color }} />
              <h3 className="text-base font-bold text-white mb-1">{c.title}</h3>
              <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{c.issuer}</p>
              <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{c.date}</p>
              <p className="text-sm mb-4 flex-1" style={{ color: "var(--text-dim)" }}>{c.description}</p>
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-32 object-cover rounded-lg mb-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setLightbox(c.image)}
              />
              <button onClick={() => setLightbox(c.image)} className="text-xs font-medium hover:underline" style={{ color: "#0D9488" }}>
                View Certificate →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-white" onClick={() => setLightbox(null)}>
              <X size={28} />
            </button>
            <img src={lightbox} alt="Certificate" className="max-w-full max-h-[85vh] rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
