import { motion } from 'framer-motion';
import Card3D from './Card3D';

const industries = [
  {
    name: 'Food',
    icon: (
      <path
        d="M10 6v8m4-8v8m4-8v8M8 14h12v6a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-6Zm10 0V8a4 4 0 1 0-8 0v6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'Events',
    icon: (
      <path
        d="M7 10h10m-8 4h6m-8 8h10a2 2 0 0 0 2-2V8l-4-3H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'Travel',
    icon: (
      <path
        d="m4 15 8-11 8 11M6 19h12M10 19v-4h4v4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'Manufacturing',
    icon: (
      <path
        d="M4 20V9l7 4V9l9-5v16H4Zm4 0v-4m4 4v-4m4 4v-4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'Jewellery',
    icon: (
      <path
        d="m12 4 7 6-7 10L5 10l7-6Zm0 0v5m-4 1h8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'Real Estate',
    icon: (
      <path
        d="M5 20V9l7-5 7 5v11m-9 0v-6h4v6M4 20h16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'NGO',
    icon: (
      <path
        d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.4A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function Industries() {
  return (
    <section className="premium-section premium-section-alt relative py-40 lg:py-48">
      <div className="section-shell relative max-w-[96rem]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="mb-16 text-center md:mb-20">
            <span className="eyebrow mb-6">Our Clients</span>
            <h2 className="section-title mb-5 text-4xl font-extrabold md:text-6xl">
              A trusted presence
              <span className="text-gradient"> across sectors</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 xl:grid-cols-7">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <Card3D className="h-full">
                  <article className="premium-card relative flex min-h-[220px] flex-col items-center justify-center p-8 text-center md:min-h-[250px]">
                    <div className="absolute inset-x-8 top-8 h-16 rounded-full bg-[rgba(67,71,75,0.08)] blur-3xl" />
                    <div className="premium-card-content flex h-full flex-col items-center justify-center">
                      <div className="mb-7 flex h-18 w-18 items-center justify-center rounded-[1.7rem] border border-[rgba(67,71,75,0.08)] bg-[rgba(226,230,236,0.92)] shadow-[0_18px_40px_rgba(47,49,52,0.08)]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="h-9 w-9 stroke-[2] text-[#f2c300]"
                        >
                          {industry.icon}
                        </svg>
                      </div>
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-slate-500)]">
                        Sector
                      </div>
                      <h3 className="text-[1.02rem] font-semibold tracking-[-0.03em] text-[color:var(--color-slate-900)] md:text-[1.28rem]">
                        {industry.name}
                      </h3>
                    </div>
                  </article>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
