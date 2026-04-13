import { motion } from 'framer-motion';

const footerLinks = {
  links: ['Home', 'Services', 'Travel Pathways', 'Our Clients', 'Contact'],
  services: ['Flights', 'Hotels', 'Visa', 'Forex', 'Train', 'Cruise', 'Insurance', 'Euro Rail'],
  legal: ['Terms & Conditions', 'Privacy Policy'],
};

export default function Footer() {
  return (
    <footer className="premium-dark-section relative overflow-hidden pt-32 pb-8">
      <div className="section-seam section-seam-top" />
      <div className="absolute left-0 top-0 h-[15rem] w-[22rem] bg-[#2f3a45] [clip-path:polygon(0_0,100%_0,68%_100%,0_100%)]" />
      <div className="absolute right-0 bottom-0 h-[12rem] w-[16rem] bg-[#ffc100] [clip-path:polygon(100%_0,0_100%,100%_100%)]" />
      <div className="absolute right-0 bottom-0 h-[9rem] w-[12rem] bg-[#eda117] [clip-path:polygon(100%_0,0_100%,100%_100%)] opacity-90" />

      <div className="section-shell relative z-10">
        <div className="mb-16 rounded-[1.6rem] border border-[rgba(47,58,69,0.08)] bg-white/94 px-6 py-10 shadow-[0_28px_80px_rgba(31,35,40,0.08)] backdrop-blur-xl md:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))]">
            <div className="col-span-2 md:col-span-1">
              <motion.div className="mb-6 flex items-center gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                <img src="/logo.png" alt="Eighty Mile Travel logo" className="h-12 w-12 object-contain" />
                <span className="flex flex-col leading-none text-[color:var(--color-slate-900)]">
                  <span className="text-2xl font-extrabold tracking-tight">Eighty Mile</span>
                  <span className="text-center text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--color-slate-600)]">Travel</span>
                </span>
              </motion.div>

              <p className="max-w-sm text-[color:var(--color-slate-700)]">
                Premium travel planning for private movement, corporate travel, and tailored journeys.
              </p>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="mb-4 font-semibold text-[color:var(--color-slate-900)]">{title[0].toUpperCase() + title.slice(1)}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-[color:var(--color-slate-700)] transition-colors hover:text-[color:var(--color-slate-900)]">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[rgba(67,71,75,0.08)] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <div className="text-sm text-[color:var(--color-slate-500)]">&copy; 2023 by Eighty Mile Travel</div>
            <div className="flex flex-wrap justify-center gap-6">
              {['Terms & Conditions', 'Privacy Policy'].map((link) => (
                <a key={link} href="#" className="text-sm text-[color:var(--color-slate-500)] transition-colors hover:text-[color:var(--color-slate-900)]">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
