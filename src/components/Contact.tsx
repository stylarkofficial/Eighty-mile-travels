import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="premium-section relative py-40 lg:py-48">
      <div className="section-shell relative">
        <div className="grid gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="eyebrow mb-6">Contact</span>
            <h2 className="section-title mb-6 text-4xl font-extrabold md:text-5xl">
              Begin the conversation
              <br />
              <span className="text-gradient">for what comes next</span>
            </h2>
            <p className="section-copy mb-10 max-w-xl text-lg leading-8">
              Whether the brief is private, corporate, or more tailored in nature, the journey can
              be shaped with clarity, discretion, and close attention to detail.
            </p>
            <div className="section-copy max-w-lg space-y-3 text-base">
              <p>Guru Prasadh</p>
              <p>guruprasadh@gmail.com</p>
              <p>+91 00000 00000</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <form onSubmit={handleSubmit} className="premium-card p-8 md:p-12">
              <div className="premium-card-content space-y-7">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-[color:var(--color-slate-500)]">Your Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} className="premium-input cursor-text px-4 py-3" placeholder="Guru Prasadh" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-[color:var(--color-slate-500)]">Email Address</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} className="premium-input cursor-text px-4 py-3" placeholder="guruprasadh@gmail.com" />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-[color:var(--color-slate-500)]">Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} className="premium-input cursor-text px-4 py-3" placeholder="+91 00000 00000" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-[color:var(--color-slate-500)]">Subject</label>
                    <select value={formData.subject} onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))} className="premium-input cursor-text px-4 py-3">
                      <option value="">Select a topic</option>
                      <option value="booking">Booking</option>
                      <option value="individual">Personal Journey</option>
                      <option value="corporate">Corporate / MICE</option>
                      <option value="custom">Customised Plan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-[color:var(--color-slate-500)]">Your Message</label>
                  <textarea required rows={5} value={formData.message} onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))} className="premium-input cursor-text resize-none px-4 py-3" placeholder="Share a few details about the journey you have in mind..." />
                </div>

                <motion.button type="submit" className="cursor-button premium-button-primary flex w-full items-center justify-center gap-2 py-4 font-semibold" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isSubmitting}>
                  {isSubmitting ? <>Sending...</> : submitted ? <>Message Sent!</> : <>Send Message</>}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
