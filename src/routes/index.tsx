import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, Mail, MessageCircle, Instagram, MapPin, Sparkles, Phone, Clock } from "lucide-react";
import { trackEvent } from "@/lib/tracking";


const BOOKSY_URL = "https://ojulogemakeupprofessional.booksy.com/a/";
const WHATSAPP_NUMBER = "447780648586";
const PHONE_DISPLAY = "+44 7780 648586";
const PHONE_TEL = "+447780648586";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Ojuloge, I'd love to book a session."
)}`;
const INSTAGRAM_URL = "https://instagram.com/ojuloge_makeuppro";
const INSTAGRAM_HANDLE = "@ojuloge_makeuppro";
const ADDRESS_LINE = "Burnley & Manchester, UK";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_LINE)}`;
const HOURS: { day: string; hours: string }[] = [
  { day: "Mon – Sun", hours: "By appointment only" },
];

// Live service menu — mirrors Booksy so clients can book either way
const BOOKSY_SERVICES: { name: string; price: string; duration: string; blurb: string }[] = [
  { name: "Makeup", price: "From £POA", duration: "1h 30min", blurb: "Bridal, party or shoot glam — tailored to your day." },
  { name: "Microblading", price: "£150", duration: "1h 15min", blurb: "Hair-by-hair brows for soft, natural definition." },
  { name: "Brow lamination", price: "From £POA", duration: "1h", blurb: "Lifted, brushed-up brows that frame the face." },
  { name: "Brow tint", price: "£20", duration: "20min", blurb: "Subtle colour boost to define & shape." },
  { name: "Eyebrow tinting", price: "£30", duration: "20min", blurb: "Richer, longer-lasting brow colour." },
  { name: "Brow wax", price: "£30", duration: "30min", blurb: "Clean, precise wax for sharp definition." },
  { name: "Eyebrow waxing", price: "£20", duration: "25min", blurb: "Quick tidy — neat, even arches." },
  { name: "Eyebrow shaping", price: "£20", duration: "30min", blurb: "Fully reshaped brows mapped to your face." },
  { name: "Lip wax", price: "£15", duration: "15min", blurb: "Fast, gentle upper-lip wax." },
];

function whatsappFor(service: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Ojuloge, I'd like to book: ${service}. Could you share your next availability?`,
  )}`;
}


const FAQS: { q: string; a: string }[] = [
  {
    q: "Where are you based?",
    a: "Ojuloge's Beauty serves Burnley and Manchester. Travel is available across the UK for weddings and special occasions.",
  },
  {
    q: "How do I book an appointment?",
    a: "All appointments are by appointment only. Book instantly on Booksy, or message on WhatsApp at +44 7780 648586 — no account required.",
  },
  {
    q: "What services do you offer?",
    a: "Bridal Makeup, Bridal Gele, Birthday Shoot, Party Guest makeup, Microblading and Locs.",
  },
  {
    q: "What is your refund policy?",
    a: "Please note: all bookings are non-refundable. Deposits secure your date and cover preparation time.",
  },
];


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bridal Makeup Artist Burnley & Manchester | Gele & Microblading | Ojuloge's Beauty" },
      {
        name: "description",
        content:
          "Ojuloge — bridal makeup artist serving Burnley & Manchester. Bridal makeup, Gele, microblading, locs & party glam. Travel available across the UK. Book on WhatsApp or Booksy.",
      },
      { name: "keywords", content: "bridal makeup artist Burnley, makeup artist Manchester, Gele stylist Manchester, microblading Burnley, Yoruba bridal makeup UK, wedding makeup Manchester, MUA Burnley, Ojuloge makeup pro" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "Ojuloge's Beauty" },
      { name: "geo.region", content: "GB-LAN" },
      { name: "geo.placename", content: "Burnley, Manchester" },
      { property: "og:title", content: "Bridal Makeup Artist Burnley & Manchester | Ojuloge's Beauty" },
      { property: "og:description", content: "Bridal makeup, Gele, microblading & locs across Burnley & Manchester. Travel available UK-wide." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GB" },
      { property: "og:site_name", content: "Ojuloge's Beauty" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ojuloge's Beauty — Burnley & Manchester" },
      { name: "twitter:description", content: "Bridal makeup, Gele & microblading across Burnley & Manchester." },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          "@id": "/#business",
          name: "Ojuloge's Beauty",
          alternateName: "Ojuloge Makeup Pro",
          description:
            "Bridal makeup, Gele styling, microblading and locs by Ojuloge — serving Burnley & Manchester with travel available across the UK.",
          areaServed: ["Burnley", "Manchester", "Lancashire", "United Kingdom"],
          image: "/og-image.jpg",
          url: "/",
          telephone: PHONE_DISPLAY,
          sameAs: [BOOKSY_URL, INSTAGRAM_URL],
          priceRange: "££",
          address: { "@type": "PostalAddress", addressLocality: "Burnley", addressRegion: "Lancashire", addressCountry: "GB" },
          openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], description: "By appointment only" },
          ],
          makesOffer: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bridal Makeup" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bridal Gele" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Birthday Shoot Makeup" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Party Guest Makeup" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Microblading" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Locs" } },
          ],
        }),
      },

      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});


function BookButton({
  children = "Book Now",
  variant = "primary",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: "primary" | "ghost" | "block";
  className?: string;
}) {
  const base =
    "group inline-flex items-center justify-center gap-3 font-semibold uppercase tracking-widest transition-all active:scale-[0.97]";
  const styles =
    variant === "primary"
      ? "rounded-full bg-accent px-8 py-5 text-xs text-primary shadow-xl shadow-black/40 hover:bg-secondary"
      : variant === "block"
      ? "w-full bg-primary py-6 font-display normal-case tracking-wider text-lg text-primary-foreground hover:bg-foreground"
      : "rounded-full border border-current px-6 py-3 text-[11px] hover:bg-foreground hover:text-background";
  return (
    <a
      href={BOOKSY_URL} target="_blank" rel="noopener noreferrer"
      onClick={() => trackEvent("booksy_click")}
      aria-label="Book your appointment on Booksy"
      className={`${base} ${styles} ${className}`}
    >
      {variant !== "block" && <Calendar className="h-4 w-4" />}
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Index() {
  const services = [
    { title: "Bridal Makeup", desc: "A flawless, photo-ready bridal beat — soft skin, lifted eyes and a finish that lasts from first look to final dance." },
    { title: "Bridal Gele", desc: "Sculpted with care and rooted in Yoruba tradition. Crisp pleats, regal silhouettes, tied to crown your day." },
    { title: "Birthday Shoot", desc: "Editorial glam for the moment you've been counting down to — glow, drama and detail dialled in for the camera." },
    { title: "Party Guest", desc: "Effortless party glam. Polished skin, soft glow and a statement eye that earns every second look." },
    { title: "Microblading", desc: "Precision brows, drawn hair by hair. Soft, natural definition that frames your face and wakes up beautifully." },
    { title: "Locs", desc: "Styled, refreshed and shaped to finish your look from the crown down." },
  ];



  return (
    <main className="min-h-screen bg-primary">
      {/* Sticky top bar — always-visible book button */}
      <header className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-primary/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3 text-primary-foreground">
          <a href="#top" className="font-display text-base tracking-wide sm:text-lg">
            Ojuloge's <span className="italic text-accent">Beauty</span>
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackEvent("instagram_click")}
              aria-label="See my work on Instagram @ojuloge_makeuppro"
              title="See my work · @ojuloge_makeuppro"
              className="group relative inline-flex items-center gap-1.5 rounded-full border-2 border-accent bg-accent/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_18%,transparent)] transition hover:bg-accent hover:text-primary sm:px-4 sm:py-2"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>See My Work</span>
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            </a>
            <a
              href={BOOKSY_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackEvent("booksy_click")}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-primary transition hover:bg-secondary sm:px-4 sm:py-2"
            >
              <Calendar className="h-3.5 w-3.5" />
              Book
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative mx-auto flex min-h-[88vh] max-w-3xl flex-col justify-end overflow-hidden px-8 pb-20 pt-20 text-primary-foreground">
        <div className="absolute inset-0" style={{ background: "var(--hero-gradient)" }} />
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute -left-10 bottom-1/3 h-40 w-40 rounded-full border border-primary-foreground/5" />

        <div className="relative space-y-8">
          <p className="text-[10px] uppercase tracking-[0.4em] text-accent/80">
            Bridal · Gele · Microblading · Locs
          </p>
          <h1 className="font-display text-5xl leading-[1.02] sm:text-6xl">
            Soft glam.<br />
            <span className="italic font-light text-accent">Bridal royalty.</span>
          </h1>
          <p className="max-w-[340px] text-[15px] font-light leading-relaxed text-primary-foreground/75">
            I'm <span className="text-accent">Ojuloge</span> — bridal makeup artist and Gele stylist serving Burnley, Manchester and brides across the UK. Quiet luxury, lasting finishes, every detail considered.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <BookButton>Book on Booksy</BookButton>
            <a
              href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click")}
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-5 py-4 text-[11px] font-medium uppercase tracking-widest text-primary-foreground/85 transition hover:border-accent hover:text-accent"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp enquiry
            </a>
          </div>
          <p className="text-[11px] font-light text-primary-foreground/60">
            By appointment only · WhatsApp <span className="text-accent">+44 7780 648586</span> to secure your date.
          </p>


          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-[10px] uppercase tracking-[0.3em] text-primary-foreground/45">
            <span>Burnley</span><span className="text-accent/50">◆</span><span>Manchester</span><span className="text-accent/50">◆</span><span>UK Travel</span>
          </div>



        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-3xl bg-background px-8 py-20 text-foreground">
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px w-8 bg-foreground/20" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">Services</span>
        </div>
        <h2 className="mb-12 font-display text-4xl leading-tight sm:text-5xl">
          A signature look, <span className="italic text-accent">shaped around you.</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="group border-t border-foreground/10 pt-6">
              <Sparkles className="mb-4 h-4 w-4 text-accent" />
              <h3 className="mb-3 font-display text-xl">{s.title}</h3>
              <p className="text-sm font-light leading-relaxed text-foreground/70">{s.desc}</p>
            </article>
          ))}
        </div>
        <p className="mt-12 text-xs font-light italic text-foreground/55">
          Bespoke packages available for bridal parties and full-day coverage.
        </p>
      </section>

      {/* About */}
      <section id="about" className="relative mx-auto max-w-3xl overflow-hidden bg-background px-8 pb-24 pt-8 text-foreground">
        <div
          className="pointer-events-none absolute -right-10 -top-10 select-none font-display text-[220px] leading-none text-foreground/[0.03]"
          aria-hidden
        >
          O
        </div>

        <div className="relative">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px w-8 bg-foreground/20" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">The Artist</span>
          </div>

          <h2 className="mb-12 font-display text-5xl leading-none">
            Meet <br /><span className="pl-8 italic text-accent">Ojuloge</span>
          </h2>

          <div className="space-y-8 text-[15px] font-light leading-[1.8] text-foreground/90">
            <p>
              I'm <span className="border-b border-accent/40 font-medium text-foreground">Ojuloge</span> — bridal makeup artist and Gele stylist based between Burnley and Manchester. My work lives in the quiet details: clean skin, a softly lifted eye, a Gele tied with intention.
            </p>

            <blockquote className="my-10 border-l-2 border-accent py-2 pl-6 font-display text-xl italic text-foreground/85">
              "Beauty isn't about becoming someone new — it's about uncovering the most luminous version of who you already are."
            </blockquote>

            <p>
              Every booking is treated like a private appointment. We talk through your day, your dress and the way you want to feel, and I build a look that holds — through first-look photos, the ceremony, and long after the last dance.
            </p>

            <p>
              The studio specialises in <span className="font-medium text-foreground">bridal makeup</span>, <span className="font-medium text-foreground">Bridal Gele</span>, birthday and party glam, <span className="font-medium text-foreground">microblading</span> and <span className="font-medium text-foreground">locs</span> — finishing touches that honour the richness of Yoruba heritage and the elegance of a modern bride. Travel is available across the UK for weddings and special bookings.
            </p>

            <p className="font-display text-xl italic text-foreground">
              You arrive as yourself. You leave with a quiet, unmistakable kind of confidence.
            </p>
          </div>



        </div>
      </section>

      {/* The Experience — signature service ritual */}
      <section className="bg-background px-8 py-24 text-foreground">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px w-8 bg-foreground/20" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">The Experience</span>
          </div>
          <h2 className="mb-14 font-display text-4xl leading-tight sm:text-5xl">
            A private appointment, <span className="italic text-accent">considered end to end.</span>
          </h2>
          <ol className="grid gap-10 sm:grid-cols-3">
            {[
              { n: "01", t: "Consultation", d: "We talk through your day, your dress, your inspiration. A bespoke look is mapped to your features and skin." },
              { n: "02", t: "The Sitting", d: "Calm, unhurried application using long-wear, photo-tested products. Gele tied to crown the look." },
              { n: "03", t: "Finishing Touches", d: "Set, sealed and signed off in the mirror — with a touch-up kit for the moments that matter most." },
            ].map((step) => (
              <li key={step.n} className="relative">
                <span className="font-display text-5xl italic text-accent/60">{step.n}</span>
                <h3 className="mt-3 font-display text-xl">{step.t}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-foreground/70">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative overflow-hidden bg-primary px-8 py-24 text-primary-foreground">
        <div className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px w-8 bg-primary-foreground/30" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary-foreground/70">Kind words</span>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            {[
              { q: "Ojuloge made me feel like the most beautiful version of myself on my wedding day. The Gele was perfection.", n: "A. Adebayo", r: "Bride · Manchester" },
              { q: "Skin looked flawless in every single photo — and still looked fresh at midnight. Worth every penny.", n: "T. Okafor", r: "Bride · Burnley" },
            ].map((t) => (
              <figure key={t.n} className="border-l-2 border-accent pl-6">
                <blockquote className="font-display text-xl italic leading-relaxed text-primary-foreground/90">
                  "{t.q}"
                </blockquote>
                <figcaption className="mt-5 text-[10px] uppercase tracking-[0.3em] text-accent">
                  {t.n} <span className="text-primary-foreground/50">— {t.r}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-background px-8 py-20 text-foreground">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 flex items-center gap-4">
            <div className="h-px w-8 bg-foreground/20" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">Get in touch</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={BOOKSY_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackEvent("booksy_click")}
              className="group flex items-start gap-4 border border-foreground/10 p-6 transition hover:border-accent hover:bg-foreground/[0.02]"
            >
              <Calendar className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Book online</p>
                <p className="mt-1 font-display text-lg">Booksy — instant booking</p>
              </div>
            </a>
            <a
              href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click")}
              className="group flex items-start gap-4 border border-foreground/10 p-6 transition hover:border-accent hover:bg-foreground/[0.02]"
            >
              <MessageCircle className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">WhatsApp</p>
                <p className="mt-1 font-display text-lg">Quick chat & quotes</p>
              </div>
            </a>
            <div className="group flex items-start gap-4 border border-foreground/10 p-6">
              <Mail className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Email</p>
                <p className="mt-1 font-display text-lg">Coming soon</p>
                <p className="mt-1 text-xs text-foreground/50">WhatsApp or call for the fastest reply.</p>
              </div>
            </div>
            <a
              href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              onClick={() => trackEvent("instagram_click")}
              className="group flex items-start gap-4 border border-foreground/10 p-6 transition hover:border-accent hover:bg-foreground/[0.02]"
            >
              <Instagram className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Instagram</p>
                <p className="mt-1 font-display text-lg">{INSTAGRAM_HANDLE}</p>
              </div>
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => trackEvent("call_click")}
              className="group flex items-start gap-4 border border-foreground/10 p-6 transition hover:border-accent hover:bg-foreground/[0.02]"
            >
              <Phone className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Call</p>
                <p className="mt-1 font-display text-lg">{PHONE_DISPLAY}</p>
              </div>
            </a>
            <a
              href={MAPS_URL} target="_blank" rel="noopener noreferrer"
              className="group flex items-start gap-4 border border-foreground/10 p-6 transition hover:border-accent hover:bg-foreground/[0.02]"
            >
              <MapPin className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Service area</p>
                <p className="mt-1 font-display text-lg">{ADDRESS_LINE}</p>
                <p className="mt-1 text-xs text-foreground/50">Travel available across the UK →</p>
              </div>
            </a>

          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:items-start">
            <div className="border border-foreground/10 p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-accent" />
                <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Opening hours</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex items-center justify-between gap-6 border-b border-foreground/5 pb-2 last:border-0">
                    <span className="text-foreground/70">{h.day}</span>
                    <span className="font-display text-foreground">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center gap-3 text-xs text-foreground/60">
              <p className="leading-relaxed">
                All appointments are by appointment only. Travel available across the UK for weddings and special bookings.
              </p>
              <p className="leading-relaxed text-foreground/50">
                Please note: deposits are non-refundable.
              </p>
            </div>

          </div>

          <div className="mt-16 border-t border-foreground/10 pt-12">
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/50">The bridal package</p>
              <h3 className="mt-2 font-display text-3xl">What's <span className="italic text-accent">included</span></h3>
            </div>
            <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                "Pre-booking consultation & look planning",
                "Skin prep with luxury, photo-tested products",
                "Full bridal makeup application",
                "Bridal Gele tied on the day",
                "Lashes & long-wear setting",
                "Touch-up kit for the day",
                "Travel within Burnley & Manchester",
                "Trial session available on request",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-foreground/5 pb-3 text-sm font-light text-foreground/80">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-none text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs font-light italic text-foreground/55">
              Bespoke packages built for bridal parties, destination weddings & full-day coverage — message on WhatsApp for a tailored quote.
            </p>
          </div>
        </div>
      </section>

      {/* Full booking menu — Booksy + WhatsApp per service */}
      <section id="book" className="bg-background px-8 pt-4 pb-20 text-foreground">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px w-8 bg-foreground/20" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">Book a service</span>
          </div>
          <h2 className="mb-4 font-display text-4xl leading-tight sm:text-5xl">
            Book instantly, <span className="italic text-accent">your way.</span>
          </h2>
          <p className="mb-10 max-w-xl text-sm font-light text-foreground/70">
            Every service below can be booked on Booksy in seconds — or message on WhatsApp if you'd prefer a personal chat about timing, travel or a bespoke package.
          </p>

          <ul className="grid gap-4">
            {BOOKSY_SERVICES.map((s) => (
              <li
                key={s.name}
                className="group grid gap-4 border border-foreground/10 p-5 transition hover:border-accent/60 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"
              >
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-xl">{s.name}</h3>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">{s.duration}</span>
                    <span className="text-sm font-medium text-accent">{s.price}</span>
                  </div>
                  <p className="mt-1.5 text-sm font-light text-foreground/65">{s.blurb}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <a
                    href={BOOKSY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("booksy_click")}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-primary transition hover:bg-secondary"
                  >
                    <Calendar className="h-3.5 w-3.5" /> Book on Booksy
                  </a>
                  <a
                    href={whatsappFor(s.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("whatsapp_click")}
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-foreground transition hover:border-accent hover:text-accent"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-xs font-light italic text-foreground/55">
            Prices marked "Varies" or "POA" are quoted on enquiry — message on WhatsApp with your date and look for a tailored quote.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background px-8 pb-24 text-foreground">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px w-8 bg-foreground/20" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">FAQ</span>
          </div>
          <h2 className="mb-10 font-display text-4xl leading-tight sm:text-5xl">
            Frequently <span className="italic">asked</span>
          </h2>
          <dl className="space-y-6">
            {FAQS.map((f) => (
              <div key={f.q} className="border-t border-foreground/10 pt-6">
                <dt className="font-display text-lg">{f.q}</dt>
                <dd className="mt-2 text-sm font-light leading-relaxed text-foreground/70">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>


      <footer className="bg-primary px-8 py-10 text-center text-primary-foreground/40">
        <p className="text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} Ojuloge's Beauty · Bridal Makeup · Gele · Microblading
        </p>
      </footer>

    </main>
  );
}
