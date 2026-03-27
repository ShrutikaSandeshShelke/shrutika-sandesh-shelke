import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Linkedin } from "lucide-react";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Shrutika will get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          <h2 className="section-heading">Let's Connect</h2>
          <p className="section-subtitle">Open to PM and BA internship opportunities for Summer 2026</p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <a href="mailto:shrutikasandesh.shelke@utdallas.edu" className="flex items-center gap-2 text-sm hover:underline" style={{ color: "#0D9488" }}>
              <Mail size={16} /> shrutikasandesh.shelke@utdallas.edu
            </a>
            <a href="https://www.linkedin.com/in/shrutikashelke1998" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm hover:underline" style={{ color: "#0D9488" }}>
              <Linkedin size={16} /> LinkedIn
            </a>
            <span className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <MapPin size={16} /> Dallas, Texas
            </span>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-6 text-left space-y-4">
            <input
              required
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-white/40 outline-none focus:ring-1 focus:ring-purple"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-white/40 outline-none focus:ring-1 focus:ring-purple"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <textarea
              required
              rows={4}
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-white/40 outline-none resize-none focus:ring-1 focus:ring-purple"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            <button type="submit" className="gradient-btn w-full">Send Message</button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
