import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Globe2,
  Hash,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  Network,
  Phone,
  Scale,
  ShieldCheck,
  X,
} from "lucide-react";
import siteContent from "./content.json";
import type { CompanyInfo, Holding, SectionKey, SiteContent } from "./lib/types";

const content = siteContent as SiteContent;

const navItems = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Approach", href: "#approach" },
  { label: "Partnerships", href: "#partnerships" },
  { label: "Perspectives", href: "#perspectives" },
];

const pillars = [
  {
    number: "01",
    title: "See beyond the cycle",
    copy: "We build investment theses around structural change, not short-term momentum, with a disciplined view of risk and timing.",
    icon: Lightbulb,
  },
  {
    number: "02",
    title: "Build with operators",
    copy: "Capital is only the beginning. Our operating network helps portfolio companies turn strategy into durable execution.",
    icon: Network,
  },
  {
    number: "03",
    title: "Compound with purpose",
    copy: "Patient ownership, responsible governance, and measurable value creation are designed into every partnership.",
    icon: Leaf,
  },
];

const advantages = [
  {
    icon: Globe2,
    title: "Local access. Global perspective.",
    copy: "Deep U.S. market knowledge connected to international capital, expertise, and opportunity flow.",
  },
  {
    icon: Scale,
    title: "Flexible by design.",
    copy: "We invest across structures and stages when the strategic fit and return profile are compelling.",
  },
  {
    icon: ShieldCheck,
    title: "Governance that enables growth.",
    copy: "Institutional discipline, direct accountability, and transparent partnership from day one.",
  },
  {
    icon: Building2,
    title: "One platform. Shared capability.",
    copy: "Portfolio companies benefit from a common network across strategy, finance, talent, and operations.",
  },
];

const testimonials = [
  {
    quote:
      "The team combines the speed of an entrepreneur with the discipline of an institution. Conversations move quickly, but never at the expense of thoughtful diligence.",
    role: "Managing Partner",
    company: "U.S. Family Office",
  },
  {
    quote:
      "What stands out is the long horizon. They engage with the business we can become, then bring the practical network required to help us get there.",
    role: "Founder & CEO",
    company: "Portfolio Technology Company",
  },
  {
    quote:
      "All Investments approaches complex projects with clarity, commercial pragmatism, and genuine alignment. That is rare, and it changes the quality of the partnership.",
    role: "Development Director",
    company: "Regional Project Partner",
  },
];

const pathways = [
  {
    name: "Strategic mandate",
    price: "Bespoke",
    description: "For investors seeking disciplined access to a defined sector, market, or opportunity set.",
    features: [
      "Thesis and mandate design",
      "Proprietary opportunity sourcing",
      "Diligence and execution",
      "Active portfolio oversight",
    ],
    cta: "Discuss a mandate",
  },
  {
    name: "Co-investment",
    price: "$5M+",
    suffix: "target participation",
    description: "For aligned capital partners joining select opportunities alongside the holding group.",
    features: [
      "Curated deal access",
      "Aligned transaction economics",
      "Institutional reporting",
      "Direct management access",
    ],
    cta: "Join our partner network",
    featured: true,
  },
  {
    name: "Build with us",
    price: "Tailored JV",
    description: "For founders, landowners, and strategic operators creating a new platform or landmark project.",
    features: [
      "Joint venture structuring",
      "Capital and operating support",
      "Shared services platform",
      "Long-term growth roadmap",
    ],
    cta: "Bring us your vision",
  },
];

const faqs = [
  {
    question: "What does All Investments Strategic Holding invest in?",
    answer:
      "We focus on businesses and projects positioned to benefit from long-term structural growth. Our current and future platforms span private markets, real estate, technology, energy transition, mobility, and hospitality.",
  },
  {
    question: "What stage and investment size do you consider?",
    answer:
      "Our structure is intentionally flexible. We can support growth-stage companies, established cash-generative businesses, greenfield projects, and strategic joint ventures. Investment size is determined by conviction, governance, and the needs of each opportunity.",
  },
  {
    question: "Do you invest outside the United States?",
    answer:
      "Yes. We are anchored in the United States with deep domestic market access, while evaluating select international opportunities where our network and operating capabilities can add meaningful value.",
  },
  {
    question: "How do I present an opportunity or partnership?",
    answer:
      "Send a concise introduction covering the opportunity, team, market, capital requirement, and why All Investments is the right strategic partner. Our team reviews every qualified submission and follows up where there is alignment.",
  },
  {
    question: "How are future projects selected?",
    answer:
      "Future projects must meet a clear unmet need, align with our long-range sector theses, demonstrate attractive risk-adjusted potential, and benefit from capabilities shared across the holding group.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M35.5 13.8A16.2 16.2 0 0 1 39.8 24c0 8.73-7.07 15.8-15.8 15.8S8.2 32.73 8.2 24 15.27 8.2 24 8.2c3.16 0 6.1.93 8.57 2.54"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeDasharray="18 4"
      />
      <path
        d="M13.5 31.5 22 23l5.1 5.1L39 10.5"
        stroke="url(#brandBlue)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m32.7 10.8 7-.9-.7 7"
        stroke="url(#brandBlue)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="brandBlue" x1="13" y1="32" x2="40" y2="10">
          <stop stopColor="#0071e3" />
          <stop offset="0.5" stopColor="#2997ff" />
          <stop offset="1" stopColor="#0066cc" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function brandParts(info: CompanyInfo | null) {
  const legal = info?.legal_name?.trim() || "All Investments Strategic Holding LLC";
  const match = legal.match(/,?\s*\b(LLC|L\.L\.C\.|Inc\.?|Ltd\.?|Corp\.?)\s*$/i);
  const suffix = match ? match[1] : "";
  const name = match ? legal.slice(0, match.index).replace(/,\s*$/, "").trim() : legal;
  const words = name.split(/\s+/);
  return {
    legal,
    name,
    suffix,
    headlineLead: words.slice(0, -1).join(" "),
    headlineLast: words[words.length - 1],
  };
}

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${
        dark ? "text-[#2997ff]" : "text-[#0071e3]"
      }`}
    >
      <span className={`h-px w-7 ${dark ? "bg-[#2997ff]" : "bg-[#0071e3]"}`} />
      {children}
    </div>
  );
}

function Header({ info }: { info: CompanyInfo | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const brand = brandParts(info);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || isOpen
          ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a
          href="#home"
          className="group flex items-center gap-3 text-white"
          aria-label={`${brand.legal} home`}
        >
          {info?.logo_url ? (
            <img
              src={info.logo_url}
              alt=""
              className="h-9 w-auto max-w-[180px] object-contain transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <BrandMark className="h-8 w-8 text-white transition-transform duration-500 group-hover:rotate-6" />
          )}
          <span className="leading-none">
            <span className="block text-[13px] font-semibold tracking-[0.04em]">
              {brand.name}
            </span>
            {brand.suffix && (
              <span className="mt-0.5 block text-[9px] font-medium tracking-[0.2em] text-white/50">
                {brand.suffix.toUpperCase()}
              </span>
            )}
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link text-[13px] font-normal text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="btn-capsule btn-primary hidden items-center gap-2 px-5 py-2.5 text-[13px] font-medium lg:flex"
        >
          Start a conversation
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-white lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-black lg:hidden"
          >
            <div className="space-y-1 px-5 py-6 sm:px-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between border-b border-white/10 py-4 text-lg text-white"
                >
                  {item.label}
                  <ArrowUpRight className="h-4 w-4 text-[#2997ff]" />
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="btn-capsule btn-primary mt-6 flex items-center justify-center gap-2 px-5 py-4 text-sm font-medium"
              >
                Start a conversation <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ info }: { info: CompanyInfo | null }) {
  const brand = brandParts(info);
  return (
    <section
      id="home"
      className="relative flex min-h-[560px] items-end overflow-hidden bg-black pb-12 pt-28 text-white sm:min-h-[620px] sm:pb-14 lg:min-h-[92vh] lg:pb-20"
    >
      <div
        className="hero-kenburns absolute inset-0 bg-cover bg-[62%_center] opacity-55 sm:bg-center"
        style={{
          backgroundImage: `url(${info?.hero_image_url || `${import.meta.env.BASE_URL}images/usa-future.jpg`})`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.97)_0%,rgba(0,0,0,.55)_45%,rgba(0,0,0,.25)_100%),linear-gradient(90deg,rgba(0,0,0,.8)_0%,rgba(0,0,0,.35)_55%,rgba(0,0,0,.1)_100%)]" />
      <div className="grain absolute inset-0 opacity-20" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="max-w-5xl"
        >
          <motion.div
            variants={reveal}
            className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2997ff]"
          >
            <span className="h-px w-9 bg-[#2997ff]" />
            {brand.legal}
          </motion.div>
          <motion.h1
            variants={reveal}
            className="font-display hero-title max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
          >
            {brand.headlineLead && <span className="block">{brand.headlineLead}</span>}
            <span className="block text-white">{brand.headlineLast}</span>
          </motion.h1>
          <motion.div
            variants={reveal}
            className="mt-6 max-w-2xl"
          >
            <p className="text-lg font-normal leading-snug text-white/90 sm:text-xl lg:text-2xl">
              {info?.tagline || "We build the companies shaping what comes next."}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
              {info?.description ||
                "A U.S.-based holding group investing patient capital, operating expertise, and global perspective into ambitious businesses and future projects."}
            </p>
          </motion.div>
          <motion.div variants={reveal} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#portfolio"
              className="btn-capsule btn-primary group inline-flex items-center gap-3 px-7 py-4 text-[14px] font-medium"
            >
              Explore our portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="btn-capsule btn-outline inline-flex items-center gap-3 px-7 py-4 text-[14px] font-medium"
            >
              Partner with us
            </a>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#proof"
        aria-label="Scroll to discover"
        className="absolute bottom-7 right-5 z-10 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-white sm:flex lg:right-12"
      >
        Discover
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20">
          <ChevronDown className="scroll-cue h-4 w-4" />
        </span>
      </a>
    </section>
  );
}

function SocialProof() {
  const audiences = ["Family offices", "Institutions", "Founders", "Public-sector partners"];

  return (
    <section id="proof" className="border-b border-[#d2d2d7] bg-white py-8 sm:py-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={stagger}
        className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"
      >
        <motion.p variants={reveal} className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6e6e73]">
          Built for long-term alignment with
        </motion.p>
        <motion.div variants={reveal} className="mt-5 grid grid-cols-2 border-y border-[#d2d2d7] lg:grid-cols-4">
          {audiences.map((audience, index) => (
            <div
              key={audience}
              className={`flex min-h-14 items-center justify-center px-3 text-center font-display text-base font-medium text-[#1d1d1f] sm:text-lg lg:min-h-16 ${
                index % 2 !== 0 ? "border-l border-[#d2d2d7]" : ""
              } ${index > 1 ? "border-t border-[#d2d2d7] lg:border-t-0" : ""} ${
                index > 1 ? "lg:border-l" : ""
              }`}
            >
              {audience}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function CompanyInfoSection({ info }: { info: CompanyInfo }) {
  const addressLines = [info.address_line1, info.address_line2, [info.city, info.state, info.postal_code].filter(Boolean).join(", "), info.country].filter(Boolean);

  const details = [
    { icon: MapPin, label: "Address", value: addressLines.length ? addressLines.join(" · ") : "Address on file" },
    { icon: Phone, label: "Phone", value: info.phone || "—" },
    { icon: Mail, label: "Email", value: info.email || "—" },
    { icon: Globe2, label: "Website", value: info.website || "—" },
    { icon: Hash, label: "Registration", value: info.registration_number || "—" },
  ];

  return (
    <section id="company" className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="grid gap-6 rounded-[18px] border border-[#d2d2d7] bg-white p-6 sm:p-7 lg:grid-cols-[.9fr_1.1fr] lg:gap-10 lg:p-8"
        >
          <div>
            <SectionLabel>Company information</SectionLabel>
            {info.logo_url && (
              <img src={info.logo_url} alt={info.legal_name} className="mb-8 h-24 w-auto object-contain sm:h-28" />
            )}
            <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#1d1d1f] sm:text-4xl">
              {info.legal_name}
            </h2>
            {info.tagline && <p className="mt-4 text-base leading-7 text-[#6e6e73]">{info.tagline}</p>}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {details.map((detail) => {
              const Icon = detail.icon;
              return (
                <div key={detail.label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#0071e3]" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">{detail.label}</p>
                    <p className="mt-1 text-sm leading-6 text-[#1d1d1f]">{detail.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="bg-[#f5f5f7] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="grid gap-4 lg:grid-cols-[.8fr_1.2fr] lg:gap-10"
        >
          <SectionLabel>Our approach</SectionLabel>
          <div>
            <h2 className="font-display max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#1d1d1f] sm:text-4xl lg:text-5xl">
              Enduring value is built, not traded.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6e6e73] sm:text-lg sm:leading-8">
              We pair the perspective of a permanent owner with the energy of a builder, creating a shared platform where strong companies can move further, faster.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-10 grid border-t border-[#d2d2d7] lg:mt-12 lg:grid-cols-3"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article
                variants={reveal}
                key={pillar.title}
                className={`group relative rounded-none py-6 lg:px-7 lg:py-7 ${
                  index > 0 ? "border-t border-[#d2d2d7] lg:border-l lg:border-t-0" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-[#86868b]">{pillar.number}</span>
                  <Icon className="h-6 w-6 stroke-[1.3] text-[#0071e3] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3" />
                </div>
                <div className="mt-8 lg:mt-10">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">{pillar.title}</h3>
                  <p className="mt-2.5 max-w-sm text-sm leading-6 text-[#6e6e73]">{pillar.copy}</p>
                </div>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#0071e3] transition-all duration-700 group-hover:w-full" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Portfolio({ holdings }: { holdings: Holding[] }) {
  const [selected, setSelected] = useState(0);
  const company = holdings[selected];

  if (holdings.length === 0) return null;

  return (
    <section id="portfolio" className="overflow-hidden bg-white py-24 text-[#1d1d1f] sm:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="grid gap-4 lg:grid-cols-[.8fr_1.2fr] lg:gap-10"
        >
          <SectionLabel>Holding companies</SectionLabel>
          <div>
            <h2 className="font-display max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              One platform. Multiple paths to progress.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#6e6e73] sm:text-lg sm:leading-8">
              Explore the active companies and future projects that translate our long-term investment themes into focused operating platforms.
            </p>
          </div>
        </motion.div>

        <div className="mt-8 grid overflow-hidden rounded-[18px] border border-[#d2d2d7] lg:mt-10 lg:grid-cols-[.72fr_1.28fr]">
          <div className="border-b border-[#d2d2d7] bg-[#f5f5f7] py-3 lg:border-b-0 lg:border-r lg:py-6">
            {holdings.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(index)}
                aria-pressed={selected === index}
                className="group relative flex w-full items-center justify-between overflow-hidden border-b border-[#d2d2d7] px-2 py-3.5 text-left last:border-b-0 sm:px-4 lg:px-5 lg:py-4"
              >
                {selected === index && (
                  <motion.span
                    layoutId="company-active"
                    className="absolute inset-0 bg-white"
                    transition={{ type: "spring", stiffness: 280, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-4">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border bg-white text-[11px] font-semibold tracking-[0.06em] transition-colors"
                    style={{ borderColor: selected === index ? item.accent_color : "rgba(29,29,31,.2)", color: selected === index ? item.accent_color : "rgba(29,29,31,.5)" }}
                  >
                    {item.logo_url ? (
                      <img src={item.logo_url} alt="" className="h-full w-full object-contain p-1" />
                    ) : (
                      item.short_code
                    )}
                  </span>
                  <span>
                    <span className={`block text-sm font-medium transition-colors sm:text-base ${selected === index ? "text-[#1d1d1f]" : "text-[#6e6e73] group-hover:text-[#1d1d1f]"}`}>
                      {item.name}
                    </span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.12em] text-[#86868b]">
                      {item.stage}
                    </span>
                  </span>
                </span>
                <ArrowRight className={`relative h-4 w-4 transition-all ${selected === index ? "translate-x-0 text-[#0071e3]" : "-translate-x-2 text-transparent group-hover:translate-x-0 group-hover:text-[#1d1d1f]/70"}`} />
              </button>
            ))}
          </div>

          <div className="relative min-h-[440px] overflow-hidden bg-white lg:min-h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="relative flex h-full min-h-[440px] flex-col justify-between p-5 sm:p-7 lg:min-h-[480px] lg:p-8"
              >
                <div
                  className="portfolio-glow absolute -right-32 -top-36 h-[480px] w-[480px] rounded-full opacity-20 blur-3xl"
                  style={{ background: company.accent_color }}
                />
                <div className="portfolio-orbit absolute right-[-170px] top-16 h-[520px] w-[520px] rounded-full border border-[#d2d2d7] sm:right-[-70px] lg:right-[-30px]">
                  <div className="absolute inset-[15%] rounded-full border border-[#d2d2d7]" />
                  <div className="absolute inset-[32%] rounded-full border border-[#d2d2d7]" />
                  <span className="absolute left-1/2 top-[-4px] h-2 w-2 rounded-full" style={{ background: company.accent_color }} />
                </div>
                {company.logo_url && (
                  <img
                    src={company.logo_url}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[-60px] top-1/2 h-[340px] w-[340px] -translate-y-1/2 object-contain opacity-[0.06] sm:right-4 sm:h-[420px] sm:w-[420px] lg:right-16"
                  />
                )}
                <div className="relative flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6e6e73]">{company.sector}</p>
                  <span className="font-mono text-xs text-[#86868b]">
                    {String(selected + 1).padStart(2, "0")} / {String(holdings.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative mt-10 max-w-xl lg:mt-12">
                  {!company.logo_url && (
                    <p className="font-display -mb-4 text-5xl font-semibold text-[#1d1d1f]/10 sm:-mb-6 sm:text-7xl">{company.short_code}</p>
                  )}
                  <h3 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-3xl">
                    {company.headline}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-[#6e6e73]">{company.description}</p>
                  {company.photos.length > 0 && (
                    <div className="mt-4 flex gap-2.5 overflow-x-auto pb-1">
                      {company.photos.map((url) => (
                        <img
                          key={url}
                          src={url}
                          alt={`${company.name} photo`}
                          className="h-20 w-30 shrink-0 rounded-[12px] border border-[#d2d2d7] object-cover sm:h-24 sm:w-36"
                        />
                      ))}
                    </div>
                  )}
                  {(company.contact_email || company.contact_phone) && (
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#6e6e73]">
                      {company.contact_email && (
                        <a href={`mailto:${company.contact_email}`} className="flex items-center gap-2 hover:text-[#1d1d1f]">
                          <Mail className="h-3.5 w-3.5" /> {company.contact_email}
                        </a>
                      )}
                      {company.contact_phone && (
                        <span className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5" /> {company.contact_phone}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="relative mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-[#d2d2d7] pt-5">
                  <div className="flex flex-wrap gap-x-7 gap-y-3">
                    {company.focus_tags.map((focus) => (
                      <span key={focus} className="flex items-center gap-2 text-xs text-[#424245]">
                        <span className="h-1 w-1 rounded-full" style={{ background: company.accent_color }} />
                        {focus}
                      </span>
                    ))}
                  </div>
                  {company.website_url ? (
                    <a
                      href={company.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-[12px] font-semibold text-[#0066cc]"
                    >
                      Visit website
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="group flex items-center gap-2 text-[12px] font-semibold text-[#0066cc]"
                    >
                      Enquire
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="bg-black py-24 text-white sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-12 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <div className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2997ff]">
            <span className="h-px w-7 bg-[#2997ff]" />
            The AISH advantage
          </div>
          <h2 className="font-display max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Built to make ambition executable.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-white/60">
            The strongest partnerships combine aligned capital, decisive governance, and capabilities that turn potential into performance.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="border-t border-white/15"
        >
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                variants={reveal}
                key={advantage.title}
                className="group grid gap-4 border-b border-white/15 py-5 sm:grid-cols-[auto_1fr] sm:gap-6 sm:py-6"
              >
                <div className="flex items-center gap-5 sm:block">
                  <span className="font-mono text-[11px] text-white/40">0{index + 1}</span>
                  <Icon className="mt-0 h-6 w-6 stroke-[1.35] text-[#2997ff] transition-transform duration-500 group-hover:rotate-6 sm:mt-4" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">{advantage.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/60">{advantage.copy}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];

  const change = (direction: number) => {
    setActive((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  return (
    <section id="perspectives" className="bg-[#f5f5f7] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="grid gap-4 lg:grid-cols-[.55fr_1.45fr] lg:gap-10"
        >
          <SectionLabel>Partner perspectives</SectionLabel>
          <h2 className="font-display max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#1d1d1f] sm:text-4xl lg:text-5xl">
            Alignment you can feel in every decision.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="mt-8 rounded-[18px] border border-[#d2d2d7] bg-white py-6 sm:py-8 lg:ml-[24%] lg:mt-10 lg:px-8"
        >
          <div className="grid gap-6 px-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:px-8 lg:px-0">
            <span className="font-display text-6xl leading-none text-[#0071e3] sm:text-7xl">&ldquo;</span>
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.36 }}
                >
                  <blockquote className="max-w-4xl text-xl font-normal leading-snug tracking-[-0.01em] text-[#1d1d1f] sm:text-2xl lg:text-3xl lg:leading-snug">
                    {testimonial.quote}
                  </blockquote>
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-[#1d1d1f]">{testimonial.role}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[#6e6e73]">{testimonial.company}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2" aria-label="Testimonial pagination">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`h-1 rounded-full transition-all duration-300 ${active === index ? "w-9 bg-[#0071e3]" : "w-4 bg-[#d2d2d7] hover:bg-[#86868b]"}`}
                      aria-label={`Show testimonial ${index + 1}`}
                      aria-current={active === index ? "true" : undefined}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => change(-1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d2d2d7] transition-colors hover:border-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => change(1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d2d2d7] transition-colors hover:border-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Partnerships() {
  return (
    <section id="partnerships" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-7 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0071e3]">
            <span className="h-px w-7 bg-[#0071e3]" />
            Partnership pathways
            <span className="h-px w-7 bg-[#0071e3]" />
          </div>
          <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#1d1d1f] sm:text-4xl lg:text-5xl">
            Flexible structures. Clear alignment.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6e6e73] sm:text-lg sm:leading-8">
            Three ways to partner with our platform, each shaped around shared conviction and measurable outcomes.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-3"
        >
          {pathways.map((pathway, index) => (
            <motion.article
              variants={reveal}
              key={pathway.name}
              className={`relative flex flex-col rounded-[18px] border px-5 py-6 sm:px-6 lg:px-7 lg:py-7 ${
                pathway.featured
                  ? "border-[#0071e3] bg-white text-[#1d1d1f] shadow-[0_20px_60px_rgba(0,113,227,0.14)] ring-1 ring-[#0071e3]"
                  : "border-[#d2d2d7] text-[#1d1d1f]"
              }`}
            >
              {pathway.featured && (
                <span className="absolute right-5 top-5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0071e3]">
                  Preferred
                </span>
              )}
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#86868b]">
                0{index + 1} / {pathway.name}
              </p>
              <div className="mt-7">
                <p className="font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{pathway.price}</p>
                {pathway.suffix && <p className="mt-1.5 text-xs text-[#86868b]">{pathway.suffix}</p>}
                <p className="mt-4 text-sm leading-6 text-[#6e6e73]">
                  {pathway.description}
                </p>
              </div>
              <ul className="mt-5 space-y-2.5 border-t border-[#d2d2d7] pt-5">
                {pathway.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-[#424245]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0071e3]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`btn-capsule group mt-6 flex items-center justify-between px-5 py-3.5 text-[13px] font-medium transition-all ${
                  pathway.featured ? "btn-primary" : "btn-outline-dark"
                }`}
              >
                {pathway.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.article>
          ))}
        </motion.div>
        <p className="mt-5 text-center text-[11px] leading-5 text-[#86868b]">
          Structures and participation thresholds are indicative and subject to opportunity-specific diligence and terms.
        </p>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-[#f5f5f7] py-24 text-[#1d1d1f] sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-12 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <SectionLabel>Frequently asked</SectionLabel>
          <h2 className="font-display text-3xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Clarity before the conversation.
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-[#6e6e73]">
            A concise view of how we invest, partner, and evaluate what comes next.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="rounded-[18px] border border-[#d2d2d7] bg-white"
        >
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <motion.div variants={reveal} key={faq.question} className={index > 0 ? "border-t border-[#d2d2d7]" : ""}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="group flex w-full items-start justify-between gap-6 px-5 py-4 text-left sm:px-7 sm:py-5"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${index}`}
                >
                  <span className="flex gap-4 sm:gap-7">
                    <span className="mt-1 font-mono text-[10px] text-[#0071e3]">0{index + 1}</span>
                    <span className="text-base font-medium tracking-[-0.01em] text-[#1d1d1f] sm:text-lg">{faq.question}</span>
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#d2d2d7] transition-colors group-hover:border-[#0071e3]">
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#0071e3]" : "text-[#6e6e73]"}`} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl px-5 pb-5 pl-14 text-sm leading-6 text-[#6e6e73] sm:px-7 sm:pb-6 sm:pl-20 sm:leading-7">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function ContactCTA({ info }: { info: CompanyInfo | null }) {
  const contactEmail = info?.email || "info@allinvestments.ae";
  return (
    <section id="contact" className="relative overflow-hidden bg-black py-16 text-white sm:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(0,113,227,.22),transparent_28%),radial-gradient(circle_at_20%_100%,rgba(41,151,255,.14),transparent_30%)]" />
      <div className="grain absolute inset-0 opacity-20" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"
      >
        <motion.div variants={reveal} className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2997ff]">
          <span className="h-px w-7 bg-[#2997ff]" />
          The next chapter
        </motion.div>
        <motion.h2 variants={reveal} className="font-display mt-5 max-w-5xl text-4xl font-semibold leading-[1.04] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          Let's build what the future will value.
        </motion.h2>
        <motion.div variants={reveal} className="mt-7 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-7 text-white/60 sm:text-base">
            Share an investment, company, or project with our team. If the ambition and alignment are right, we will take it from there.
          </p>
          <a
            href={`mailto:${contactEmail}?subject=Partnership%20enquiry`}
            className="btn-capsule btn-primary group inline-flex w-fit items-center gap-4 px-7 py-4 text-[14px] font-medium"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer({ info }: { info: CompanyInfo | null }) {
  const brand = brandParts(info);
  const legalName = brand.legal;
  const contactEmail = info?.email || "info@allinvestments.ae";
  const location = [info?.city, info?.country].filter(Boolean).join(", ") || info?.country || "United States";

  return (
    <footer className="border-t border-[#d2d2d7] bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        <div className="grid gap-8 border-b border-[#d2d2d7] pb-8 lg:grid-cols-[1.3fr_.7fr_.7fr] lg:gap-12 lg:pb-10">
          <div>
            <a href="#home" className="inline-flex items-center gap-4" aria-label="Back to home">
              {info?.logo_url ? (
                <img src={info.logo_url} alt={legalName} className="h-12 w-12 object-contain" />
              ) : (
                <BrandMark className="h-12 w-12 text-[#0071e3]" />
              )}
              <span>
                <span className="block text-base font-semibold tracking-[0.04em]">{brand.name}</span>
                {brand.suffix && (
                  <span className="mt-1 block text-[10px] tracking-[0.18em] text-[#86868b]">{brand.suffix.toUpperCase()}</span>
                )}
              </span>
            </a>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#6e6e73]">
              Investing across generations, sectors, and frontiers to build companies of lasting relevance.
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">Navigate</p>
            <nav className="mt-4 space-y-2.5" aria-label="Footer navigation">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="block w-fit text-sm text-[#424245] transition-colors hover:text-[#0066cc]">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#86868b]">Contact</p>
            <div className="mt-4 space-y-2.5 text-sm text-[#424245]">
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 transition-colors hover:text-[#0066cc]">
                <Mail className="h-4 w-4 text-[#86868b]" />
                {contactEmail}
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#86868b]" />
                {location}
              </p>
              <a href="#contact" className="flex items-center gap-3 transition-colors hover:text-[#0066cc]">
                <ExternalLink className="h-4 w-4 text-[#86868b]" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 pt-7 text-[11px] text-[#86868b] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {legalName}</p>
          <div className="flex gap-6">
            <a href="#home" className="transition-colors hover:text-[#0066cc]">Privacy</a>
            <a href="#home" className="transition-colors hover:text-[#0066cc]">Terms</a>
            <a href={`${import.meta.env.BASE_URL}?admin=1`} className="transition-colors hover:text-[#0066cc]">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function useSiteContent() {
  const companyInfo: CompanyInfo = content.companyInfo;
  const holdings: Holding[] = [...content.holdings]
    .filter((h) => h.visible)
    .sort((a, b) => a.sort_order - b.sort_order);
  const visibility = Object.fromEntries(content.sections.map((s) => [s.section_key, s.visible])) as Partial<
    Record<SectionKey, boolean>
  >;

  const isVisible = (key: SectionKey) => visibility[key] ?? true;

  return { companyInfo, holdings, isVisible };
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  const { companyInfo, holdings, isVisible } = useSiteContent();

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-[#0071e3]"
        style={{ scaleX }}
      />
      <Header info={companyInfo} />
      <main>
        <Hero info={companyInfo} />
        {isVisible("company_info") && companyInfo && <CompanyInfoSection info={companyInfo} />}
        {isVisible("social_proof") && <SocialProof />}
        {isVisible("approach") && <Approach />}
        {isVisible("portfolio") && <Portfolio holdings={holdings} />}
        {isVisible("benefits") && <Benefits />}
        {isVisible("testimonials") && <Testimonials />}
        {isVisible("partnerships") && <Partnerships />}
        {isVisible("faq") && <FAQ />}
        {isVisible("contact") && <ContactCTA info={companyInfo} />}
      </main>
      <Footer info={companyInfo} />
    </div>
  );
}
