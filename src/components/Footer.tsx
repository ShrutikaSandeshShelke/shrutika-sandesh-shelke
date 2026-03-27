import { Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center justify-center gap-4 mb-3">
        <a href="https://www.linkedin.com/in/shrutikashelke1998" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors">
          <Linkedin size={18} />
        </a>
        <a href="#" className="text-white/40 hover:text-white transition-colors">
          <Github size={18} />
        </a>
      </div>
      <p className="text-xs" style={{ color: "var(--text-muted)" }}>Shrutika Shelke · Dallas, Texas · 2026</p>
    </footer>
  );
}
