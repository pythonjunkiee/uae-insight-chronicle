import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Crosshair, Landmark, Siren, Heart, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { incidents } from "@/data/incidents";

/* ─── animated counter ─── */
const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else setCount(start);
    }, 25);
    return () => clearInterval(id);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ─── reusable fade-in wrapper ─── */
const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ─── gold divider ─── */
const GoldDivider = () => (
  <div className="flex items-center justify-center gap-3 my-12">
    <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-amber-500/60" />
    <Star className="h-4 w-4 text-amber-500" />
    <span className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-amber-500/60" />
  </div>
);

const interceptedCount = incidents.filter(i => i.outcome === "Intercepted" || i.outcome === "Blocked").length;

const tributeCards = [
  {
    icon: Shield,
    emoji: "🎖️",
    title: "UAE Armed Forces",
    message: "To the soldiers and officers of the UAE Armed Forces — your vigilance and rapid response have intercepted threats before they could cause harm. You are the shield of this nation.",
  },
  {
    icon: Crosshair,
    emoji: "🛡️",
    title: "Air Defense Teams",
    message: "To the men and women operating UAE air defense systems — your precision and speed have saved countless lives. Every interception is a life protected.",
  },
  {
    icon: Landmark,
    emoji: "🏛️",
    title: "UAE Leadership",
    message: "To the wise leadership of the UAE — your decisive policies and investment in national security have made the UAE one of the safest countries in the world despite regional challenges.",
  },
  {
    icon: Siren,
    emoji: "🚨",
    title: "First Responders & Civil Defense",
    message: "To paramedics, firefighters, police, and civil defense teams — you rush toward danger so others may run to safety. Your courage defines this nation's character.",
  },
];

const TributePage = () => (
  <div className="relative overflow-hidden">
    {/* UAE map watermark */}
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center opacity-[0.025] z-0">
      <Shield className="w-[600px] h-[600px]" />
    </div>

    {/* ─── HERO ─── */}
    <section className="relative isolate overflow-hidden">
      {/* UAE flag gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(145,60%,22%)] via-[hsl(222,47%,9%)] to-[hsl(0,72%,35%)]" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[hsl(0,0%,100%,0.04)] to-transparent" />

      {/* animated flag accent */}
      <motion.div
        className="absolute top-6 right-6 flex flex-col gap-1 origin-top-left"
        animate={{ rotateZ: [0, 1, -1, 0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {["bg-[hsl(145,60%,35%)]", "bg-[hsl(0,0%,100%)]", "bg-[hsl(0,0%,10%)]"].map((c, i) => (
          <div key={i} className={`h-2 w-16 rounded-sm ${c}`} />
        ))}
        <div className="absolute -left-3 top-0 h-full w-1 bg-[hsl(0,72%,45%)] rounded" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-4 py-24 md:py-36 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Heart className="h-10 w-10 mx-auto mb-6 text-amber-400" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[hsl(0,0%,100%)] leading-tight mb-6">
            To Those Who Keep Us Safe
          </h1>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-[hsl(0,0%,100%,0.8)] leading-relaxed">
            A heartfelt tribute to the UAE Government, Armed Forces, and every official who stands between danger and the people of this great nation
          </p>
        </motion.div>
      </div>
    </section>

    {/* ─── MAIN TRIBUTE MESSAGE ─── */}
    <section className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
      <GoldDivider />
      <FadeIn>
        <Card className="border-amber-500/30 bg-card shadow-[0_0_40px_-12px_hsl(45,80%,50%,0.12)]">
          <CardContent className="p-8 md:p-12 space-y-5 text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>In times of uncertainty and rising threats across the region, the UAE has remained a beacon of safety, stability, and strength — and that is no accident.</p>
            <p>It is the result of the tireless dedication, unwavering courage, and extraordinary sacrifice of the men and women serving in the UAE Armed Forces, the Ministry of Interior, the National Crisis &amp; Emergency Management Authority (NCEMA), and every government official working around the clock behind the scenes.</p>
            <p>To His Highness Sheikh Mohamed bin Zayed Al Nahyan, President of the UAE, and the wise leadership of this nation — your vision and resolve in protecting every resident and citizen of this country does not go unnoticed.</p>
            <p>To the soldiers, pilots, air defense operators, intelligence officers, first responders, and civil defense teams — you are the silent guardians of millions of lives. Your bravery is the reason families sleep peacefully at night.</p>
            <p>To every government official who has put duty before comfort, and service before self — this nation stands tall because of you.</p>
            <p className="text-foreground font-medium">From the residents of the UAE — expatriates and citizens alike — thank you. Truly, deeply, thank you.</p>
            <p>This website exists not to alarm, but to document and remember — so that the world may understand the scale of threats this nation faces, and the remarkable efficiency with which its defenders respond.</p>
            <p className="text-amber-400 font-semibold text-base md:text-lg">The UAE is safe because its people are protected by the best.</p>
          </CardContent>
        </Card>
      </FadeIn>
    </section>

    {/* ─── TRIBUTE CARDS ─── */}
    <section className="relative z-10 container mx-auto px-4 pb-16 max-w-6xl">
      <GoldDivider />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tributeCards.map((card, i) => (
          <FadeIn key={card.title} delay={i * 0.1}>
            <Card className="h-full border-border hover:border-amber-500/30 transition-colors bg-card">
              <CardContent className="p-6 md:p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/10">
                    <card.icon className="h-5 w-5 text-amber-500" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">{card.title} {card.emoji}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.message}</p>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>

    {/* ─── CLOSING QUOTE ─── */}
    <section className="relative z-10 bg-[hsl(222,47%,5%)] border-y border-amber-500/10">
      <div className="container mx-auto px-4 py-20 text-center max-w-3xl">
        <FadeIn>
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-bold text-amber-400 leading-snug italic">
            "The safety of our people is not a privilege — it is a promise we keep every single day."
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground tracking-wide">— UAE National Defense Commitment</p>
        </FadeIn>
      </div>
    </section>

    {/* ─── NATIONAL PRIDE / STATS ─── */}
    <section className="relative z-10 container mx-auto px-4 py-16 max-w-5xl">
      <GoldDivider />
      <FadeIn className="text-center mb-12">
        {/* Golden falcon / emblem placeholder */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center">
          <svg viewBox="0 0 64 64" className="w-12 h-12 text-amber-500" fill="currentColor">
            <path d="M32 4c-1 0-2 .5-3 1.5L18 16c-2 2-3 5-3 8v8c0 6 3 12 8 16l9 8 9-8c5-4 8-10 8-16v-8c0-3-1-6-3-8L35 5.5C34 4.5 33 4 32 4zm0 6 8 7c1 1 2 3 2 5v6c0 4-2 8-5 11l-5 4-5-4c-3-3-5-7-5-11v-6c0-2 1-4 2-5l8-7z" />
          </svg>
        </div>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { label: "Threats Intercepted", value: interceptedCount, suffix: "+" },
          { label: "Lives Protected", value: 10000000, suffix: "+" },
          { label: "Years of Stability", value: new Date().getFullYear() - 1971, suffix: "" },
          { label: "World Safety Ranking", value: 2, suffix: "nd" },
        ].map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.12}>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-extrabold text-amber-400">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8 opacity-60">
        Numbers reflect publicly reported data and international safety indices
      </p>
    </section>

    <GoldDivider />
    <div className="pb-12" />
  </div>
);

export default TributePage;
