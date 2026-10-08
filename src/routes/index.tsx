import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, Mail, MessageCircle, Instagram, MapPin, Sparkles, Phone, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { GalleryViewer, type GallerySelection } from "@/components/gallery-viewer";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/tracking";
import { installExternalLinkHandler } from "@/lib/open-external";
import makeupTools from "@/assets/luxury-makeup-tools.png";
function portfolioAsset(number: string) {
  return { asset_id: number, url: `/portfolio/ojuloge-${number}.webp` };
}

const yellowGele = portfolioAsset("7579");
const softMakeup = portfolioAsset("7580");
const goldGele = portfolioAsset("7581");
const bridalMorning = portfolioAsset("7582");
const occasionMakeup = portfolioAsset("7583");
const traditionalWedding = portfolioAsset("7584");
const browDetail = portfolioAsset("7585");
const blueGele = portfolioAsset("7586");
const browComparison = portfolioAsset("7587");
const blueSequin = portfolioAsset("7588");
const bridalRobe = portfolioAsset("7589");
const lilacGlam = portfolioAsset("7590");
const blushWedding = portfolioAsset("7591");
const goldenCouple = portfolioAsset("7592");
const aseOkeGele = portfolioAsset("7593");
const browBeforeAfter = portfolioAsset("7594");
const evenGlam = portfolioAsset("7595");
const tealGlow = portfolioAsset("7596");


const BOOKSY_URL = "https://ojulogemakeupprofessional.booksy.com/a/";
const WHATSAPP_NUMBER = "447780648586";
const PHONE_DISPLAY = "+44 7780 648586";
const PHONE_TEL = "+447780648586";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Ojuloge, I'd love to book a session."
)}`;
const INSTAGRAM_URL = "https://instagram.com/ojuloge_makeuppro";
const INSTAGRAM_HANDLE = "@ojuloge_makeuppro";
const ADDRESS_LINE = "Burnley town centre";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_LINE)}`;
const HOURS: { day: string; hours: string }[] = [
  { day: "Mon – Sun", hours: "By appointment only" },
];

// Live service menu — mirrors Booksy so clients can book either way
const BOOKSY_SERVICES: { name: string; price: string; duration: string; blurb: string }[] = [
  { name: "Makeup", price: "From £POA", duration: "1h 30min", blurb: "Professional makeup tailored to your features, occasion and preferred finish." },
  { name: "Microblading", price: "£150", duration: "1h 15min", blurb: "Carefully placed hair-like strokes for naturally defined brows." },
  { name: "Brow lamination", price: "From £POA", duration: "1h", blurb: "A lifted, groomed finish that gives the brows a fuller appearance." },
  { name: "Brow tint", price: "£20", duration: "20min", blurb: "Added colour and definition for a neat, polished brow shape." },
  { name: "Eyebrow tinting", price: "£30", duration: "20min", blurb: "A deeper tint designed to enhance the natural brows." },
  { name: "Brow wax", price: "£30", duration: "30min", blurb: "Precise waxing for a clean and defined finish." },
  { name: "Eyebrow waxing", price: "£20", duration: "25min", blurb: "A tidy brow wax to refine the natural shape." },
  { name: "Eyebrow shaping", price: "£20", duration: "30min", blurb: "Professional shaping suited to your face and natural brow growth." },
  { name: "Lip wax", price: "£15", duration: "15min", blurb: "A quick upper-lip waxing treatment." },
];

function whatsappFor(service: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Ojuloge, I'd like to book: ${service}. Could you share your next availability?`,
  )}`;
}


const FAQS: { q: string; a: string }[] = [
  {
    q: "Where are you based?",
    a: "Ojuloge's Beauty is based in Burnley town centre. Appointments are arranged in advance.",
  },
  {
    q: "Do you do wedding makeup in Burnley?",
    a: "Yes. Ojuloge provides professional bridal makeup appointments from Burnley town centre, with each look tailored to the bride's features and preferences.",
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
      { title: "Bridal Makeup Artist in Burnley Town Centre | Ojuloge's Beauty" },
      {
        name: "description",
        content:
          "Ojuloge's Beauty offers professional bridal makeup, Gele styling, microblading and locs from Burnley town centre. View services and book through Booksy or WhatsApp.",
      },
      { name: "keywords", content: "bridal makeup artist Burnley town centre, wedding makeup Burnley, makeup artist Burnley, bridal makeup Burnley, MUA Burnley, Gele stylist Burnley, Gele artist Burnley, microblading Burnley, locs Burnley, Ojuloge makeup pro" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "Ojuloge's Beauty" },
      { name: "geo.region", content: "GB-LAN" },
      { name: "geo.placename", content: "Burnley town centre" },
      { property: "og:title", content: "Bridal Makeup Artist in Burnley Town Centre | Ojuloge's Beauty" },
      { property: "og:description", content: "Professional bridal makeup, Gele styling, microblading and locs in Burnley town centre." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GB" },
      { property: "og:site_name", content: "Ojuloge's Beauty" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ojuloge's Beauty — Burnley Town Centre" },
      { name: "twitter:description", content: "Professional bridal makeup, Gele styling and microblading in Burnley town centre." },
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
            "Professional bridal makeup, Gele styling, microblading and locs by Ojuloge in Burnley town centre.",
          areaServed: "Burnley town centre",
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
      : "rounded-full border border-current px-6 py-3 text-xs hover:bg-foreground hover:text-background";
  return (
    <a
      href={BOOKSY_URL}
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

async function sharePage() {
  trackEvent("share_click");
  const data = {
    title: "Ojuloge's Beauty — Bridal Makeup Artist, Burnley",
    text: "Bridal makeup, Gele styling and microblading in Burnley town centre.",
    url: "https://beauty-unfold-grace.lovable.app/",
  };
  try {
    if (navigator.share) await navigator.share(data);
    else {
      await navigator.clipboard.writeText(data.url);
      alert("Link copied — paste it anywhere to share.");
    }
  } catch {
    /* user cancelled */
  }
}

function Index() {
  const [gallery, setGallery] = useState<GallerySelection | null>(null);
  useEffect(() => installExternalLinkHandler(), []);
  useEffect(() => trackEvent("page_view"), []);

  const services = [
    { title: "Bridal Makeup", desc: "A polished bridal look created around your features, style and preferred finish." },
    { title: "Bridal Gele", desc: "Carefully styled Gele with clean pleats and a shape designed to complete your bridal look." },
    { title: "Birthday Shoot", desc: "Professional makeup prepared with photography and your chosen style in mind." },
    { title: "Party Guest", desc: "Fresh, polished makeup for parties, celebrations and special occasions." },
    { title: "Microblading", desc: "Precise hair-like strokes used to create naturally defined brows." },
    { title: "Locs", desc: "Professional loc styling for a neat, finished look." },
  ];



  return (
    <main className="min-h-screen bg-background">
      {/* Sticky top bar — always-visible book button */}
      <header className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-primary/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3 text-primary-foreground sm:gap-3 sm:px-5">
          <a href="#top" className="min-w-0 truncate font-display text-sm tracking-wide sm:text-lg">
            Ojuloge's <span className="italic text-accent">Beauty</span>
          </a>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <a
              href={INSTAGRAM_URL}
              onClick={() => trackEvent("instagram_click")}
              aria-label="See my work on Instagram @ojuloge_makeuppro"
              title="See my work · @ojuloge_makeuppro"
              className="group relative inline-flex items-center gap-1.5 rounded-full border-2 border-accent bg-accent/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_18%,transparent)] transition hover:bg-accent hover:text-primary sm:px-4 sm:text-xs sm:tracking-[0.18em]"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span className="hidden min-[380px]:inline">See My Work</span>
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            </a>
            <a
              href={BOOKSY_URL}
              onClick={() => trackEvent("booksy_click")}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-primary transition hover:bg-secondary sm:px-4 sm:text-xs"
            >
              <Calendar className="h-3.5 w-3.5" />
              Book
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative mx-auto flex min-h-[88vh] max-w-5xl flex-col justify-end overflow-hidden px-5 pb-16 pt-16 text-primary-foreground sm:px-12 sm:pb-20 sm:pt-20 lg:px-16">
        <div className="absolute inset-0" style={{ background: "var(--hero-gradient)" }} />
        <div className="absolute inset-x-5 top-6 h-px bg-accent/35 sm:inset-x-12 sm:top-8 lg:inset-x-16" />
        <div className="absolute bottom-0 right-0 top-0 hidden w-[44%] border-l border-accent/20 bg-luxe/35 lg:block" />
        <img
          src={makeupTools}
          alt="Professional makeup brushes and powder compact"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -bottom-10 -right-16 hidden w-[52%] rotate-[-5deg] drop-shadow-2xl lg:block"
        />
        <img
          src={makeupTools}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -right-24 top-32 w-64 rotate-[-12deg] opacity-[0.09] lg:hidden"
        />
        <div
          className="pointer-events-none absolute right-4 top-16 select-none font-display text-[180px] italic leading-none text-accent/10 sm:text-[260px] lg:right-[34%]"
          aria-hidden
        >
          O
        </div>
        <div className="pointer-events-none absolute left-1/2 top-24 h-px w-24 -translate-x-1/2 bg-accent/40 sm:top-28" aria-hidden />

        <div className="relative z-10 max-w-xl space-y-6 sm:space-y-8">
          <p className="font-display text-sm font-medium uppercase tracking-[0.22em] text-accent drop-shadow-[0_0_18px_color-mix(in_oklab,var(--accent)_45%,transparent)] sm:text-lg sm:tracking-[0.35em]">
            Bridal Makeup · Gele Styling · Microblading
          </p>
          <h1 className="font-display text-4xl leading-[1.05] sm:text-6xl sm:leading-[1.02]">
            Soft glam.<br />
            <span className="italic font-light text-accent">Bridal royalty.</span>
          </h1>
          <p className="max-w-[380px] text-base font-light leading-relaxed text-primary-foreground/90">
            I'm <span className="text-accent">Ojuloge</span>, a professional makeup artist, Gele stylist and microblading artist based in Burnley town centre. Every appointment is approached with care, skill and close attention to detail.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <BookButton className="w-full sm:w-auto">Book on Booksy</BookButton>
            <a
              href={WHATSAPP_URL}
              onClick={() => trackEvent("whatsapp_click")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-5 py-4 text-xs font-medium uppercase tracking-widest text-primary-foreground transition hover:border-accent hover:text-accent sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp enquiry
            </a>
          </div>
          <p className="text-sm font-light text-primary-foreground/80">
            By appointment only · WhatsApp <span className="font-medium text-accent">+44 7780 648586</span> to secure your date.
          </p>


          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-primary-foreground/15 pt-5 text-[10px] uppercase tracking-[0.2em] text-primary-foreground/75 sm:gap-x-4 sm:text-xs sm:tracking-[0.3em]">
            <span>Based in Burnley town centre</span><span className="text-accent">◆</span><span>By appointment only</span>
          </div>



        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative mx-auto max-w-5xl overflow-hidden bg-background px-5 py-16 text-foreground sm:px-12 sm:py-24 lg:px-16">
        <img
          src={makeupTools}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -right-24 -top-20 w-72 rotate-12 opacity-[0.12] sm:-right-14 sm:w-80"
        />
        <div className="relative mb-12 flex items-center gap-4">
          <div className="h-px w-10 bg-accent" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/70">Services</span>
        </div>
        <h2 className="relative mb-10 max-w-2xl font-display text-3xl leading-tight sm:mb-12 sm:text-5xl">
          A signature look, <span className="italic text-accent">shaped around you.</span>
        </h2>

        <div className="relative grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="group bg-card border border-border p-5 shadow-[var(--shadow-luxe)] transition-all hover:-translate-y-1 hover:border-accent sm:p-6">
              <Sparkles className="mb-3 h-4 w-4 text-accent sm:mb-4" />
              <h3 className="mb-2 font-display text-lg sm:mb-3 sm:text-xl">{s.title}</h3>
              <p className="text-sm font-light leading-relaxed text-foreground/75">{s.desc}</p>
            </article>
          ))}
        </div>
        <p className="relative mt-12 text-sm font-light italic text-foreground/65">
          View current services, prices and appointment times on Booksy.
        </p>
        <p className="relative mt-4 text-sm font-light leading-relaxed text-foreground/65">
          All services are provided by appointment from Burnley town centre.
        </p>
      </section>

      {/* About */}
      <section id="about" className="relative mx-auto max-w-5xl overflow-hidden bg-muted px-5 py-16 text-foreground sm:px-12 sm:py-24 lg:px-16">
        <div
          className="pointer-events-none absolute -right-10 -top-10 select-none font-display text-[220px] leading-none text-foreground/[0.03]"
          aria-hidden
        >
          O
        </div>

        <div className="relative">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px w-10 bg-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/70">About Me</span>
          </div>

          <h2 className="mb-10 font-display text-4xl leading-none sm:mb-12 sm:text-5xl">
            Meet <br /><span className="pl-8 italic text-accent">Ojuloge</span>
          </h2>

          <div className="space-y-6 text-[15px] font-light leading-[1.8] text-foreground/90 sm:space-y-8 sm:text-base">
            <p>
              Hello, I'm <span className="border-b border-accent/40 font-medium text-foreground">Ojuloge</span>, the founder and lead Makeup Artist behind Ojuloge's Beauty.
            </p>

            <p>
              Beauty has always been my passion, and for over nine years, I have dedicated my career to helping women look and feel their absolute best. As a professional Makeup Artist, Gele Stylist, and Microblading Artist, I believe that beauty is not about changing who you are — it's about enhancing your natural features and celebrating your individuality.
            </p>

            <p>
              At Ojuloge's Beauty, we specialise in luxury makeup artistry, flawless Gele styling, and precision microblading services. Our signature approach combines elegance, creativity, and attention to detail to create timeless looks that complement each client's unique beauty. Whether you're preparing for your wedding day, a special event, a photoshoot, or any memorable occasion, every service is tailored to suit your personal style and vision.
            </p>

            <p>
              Based in Burnley town centre, UK, Ojuloge's Beauty has built a reputation for delivering clean, soft, sophisticated, and long-lasting looks, alongside beautifully crafted Gele styles that honour the rich cultural heritage of the Yoruba tradition. We take pride in creating an experience that is both professional and personal, ensuring every client feels relaxed, valued, and confident from the moment they arrive.
            </p>

            <blockquote className="my-10 border-l-2 border-accent py-2 pl-6 font-display text-xl italic text-foreground/85">
              "Every brushstroke, every Gele fold, and every detail is carefully designed to enhance your beauty while allowing your true self to shine through."
            </blockquote>

            <p>
              More than makeup, Ojuloge's Beauty is about transformation, confidence, and self-expression. Every brushstroke, every Gele fold, and every detail is carefully designed to enhance your beauty while allowing your true self to shine through.
            </p>

            <p>
              Our mission is simple: to help you look radiant, feel empowered, and leave with a renewed sense of confidence that lasts long after your appointment.
            </p>

            <p className="font-display text-xl italic text-foreground">
              Because when you feel beautiful, you carry that confidence everywhere you go.
            </p>
          </div>

        </div>
      </section>

      {/* The Experience — signature service ritual */}
      <section className="relative overflow-hidden bg-card px-5 py-16 text-foreground sm:px-8 sm:py-24">
        <img
          src={makeupTools}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -bottom-24 -left-28 w-72 -rotate-[18deg] opacity-[0.1] sm:w-96"
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px w-10 bg-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/70">The Experience</span>
          </div>
          <h2 className="mb-10 font-display text-3xl leading-tight sm:mb-14 sm:text-5xl">
            A private appointment, <span className="italic text-accent">considered end to end.</span>
          </h2>
          <ol className="grid gap-8 sm:grid-cols-3 sm:gap-10">
            {[
              { n: "01", t: "Choose your service", d: "View the available services and appointment times through Booksy." },
              { n: "02", t: "Share your preferences", d: "Let Ojuloge know the occasion and the type of look you would like." },
              { n: "03", t: "Attend your appointment", d: "Arrive at the agreed time in Burnley town centre for your professional beauty appointment." },
            ].map((step) => (
              <li key={step.n} className="relative">
                <span className="font-display text-5xl italic text-accent">{step.n}</span>
                <h3 className="mt-3 font-display text-xl">{step.t}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-foreground/75">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Client portfolio — each photograph appears once, in full */}
      <section id="portfolio" className="bg-muted px-4 py-16 text-foreground sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px w-10 bg-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/70">Selected work</span>
          </div>
          <h2 className="font-display text-3xl leading-tight sm:text-5xl">
            Beauty in every <span className="italic text-accent">detail.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-foreground/80">
            A selection of makeup, Gele styling and brow work by Ojuloge — from bridal moments to beautifully finished occasion looks.
          </p>

          <div className="mt-10 grid items-start gap-8 sm:mt-12 md:grid-cols-3 md:gap-6">
            {[
              { title: "Bridal moments", photos: [
                { asset: blueGele, width: 886, height: 1235, caption: "Sculpted Gele & statement makeup", alt: "Detailed navy Gele styling with defined eye makeup and a soft pink lip" },
                { asset: traditionalWedding, width: 886, height: 1167, caption: "Traditional wedding elegance", alt: "Wedding couple in coordinated traditional outfits with navy Gele and bridal makeup" },
                { asset: bridalMorning, width: 886, height: 1531, caption: "The bridal morning", alt: "Bride in a white robe with finished wedding makeup, surrounded by her bridal party" },
                { asset: blushWedding, width: 886, height: 1322, caption: "", alt: "Couple in blush pink wedding outfits beneath a floral arch, bride with soft radiant makeup" },
                { asset: bridalRobe, width: 886, height: 1550, caption: "", alt: "Bride with a crystal hairpiece, pearl necklace and glowing bridal makeup" },
                { asset: goldenCouple, width: 886, height: 1193, caption: "", alt: "Couple posing together, she wears a pearl-embellished golden headwrap and soft glam makeup" },
              ] },
              { title: "Makeup & Gele", photos: [
                { asset: yellowGele, width: 886, height: 1297, caption: "Golden tones & a polished finish", alt: "Client wearing a yellow headwrap and matching outfit with softly glowing makeup" },
                { asset: goldGele, width: 886, height: 1103, caption: "Beautifully shaped Gele", alt: "Client wearing pleated gold Gele with warm eye makeup and a coral lip" },
                { asset: softMakeup, width: 886, height: 1464, caption: "Soft glam, individual style", alt: "Soft glam makeup with defined brows, full lashes and a neutral pink lip" },
                { asset: aseOkeGele, width: 886, height: 1207, caption: "", alt: "Client in a navy and burgundy Gele with light blue lace and a gold bag" },
                { asset: lilacGlam, width: 886, height: 1497, caption: "", alt: "Lilac eye makeup with sculpted brows and a nude lip" },
                { asset: tealGlow, width: 886, height: 1330, caption: "", alt: "Client in teal satin with warm glowing eye makeup and a glossy peach lip" },
              ] },
              { title: "The finishing touches", photos: [
                { asset: occasionMakeup, width: 886, height: 1546, caption: "Occasion-ready makeup", alt: "Finished occasion makeup with pink eye shadow, defined lashes and a glossy neutral lip" },
                { asset: browDetail, width: 886, height: 955, caption: "Brow detail, up close", alt: "Two close-up photographs showing defined brows and eye makeup" },
                { asset: browComparison, width: 886, height: 886, caption: "Brow shaping & definition", alt: "Two close-up views showing brow outlines and the finished defined brow shape" },
                { asset: blueSequin, width: 886, height: 1480, caption: "", alt: "Smoky eye glam with sculpted skin, worn with a blue disc top" },
                { asset: browBeforeAfter, width: 886, height: 876, caption: "", alt: "Brow outline and finished filled brow shape, shown one above the other" },
                { asset: evenGlam, width: 886, height: 1547, caption: "", alt: "Evening glam makeup with full lashes and a nude lip, worn with a black pearl-trimmed outfit" },
              ] },
            ].map((collection) => (
              <div key={collection.title} className="min-w-0">
                <h3 className="mb-5 border-b border-border pb-3 font-display text-xl sm:mb-6 sm:pb-4 sm:text-2xl">{collection.title}</h3>
                <div className="grid grid-cols-2 items-start gap-3 md:block md:space-y-8">
                  {collection.photos.map((photo) => (
                    <figure key={photo.asset.asset_id}>
                      <Button variant="ghost" onClick={() => setGallery({ photos: collection.photos, index: collection.photos.indexOf(photo) })}
                        aria-label={`View photograph: ${photo.alt}`} className="block h-auto w-full overflow-hidden rounded-none p-0 focus-visible:ring-2 focus-visible:ring-accent">
                        <img src={photo.asset.url} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" className="block h-auto w-full bg-card transition-transform duration-300 hover:scale-[1.02]" />
                      </Button>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a
              href={INSTAGRAM_URL}
              onClick={() => trackEvent("instagram_click")}
              className="group inline-flex items-center gap-3 rounded-full border-2 border-accent px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition hover:bg-accent hover:text-primary"
            >
              <Instagram className="h-4 w-4" />
              See the full portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="mt-4 text-sm font-light text-foreground/70">
              By appointment only · A deposit secures your date · Bookings are non-refundable.
            </p>
          </div>

        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative overflow-hidden bg-background px-5 py-16 text-foreground sm:px-8 sm:py-20">
        <img
          src={makeupTools}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -bottom-32 -right-32 w-80 rotate-[16deg] opacity-[0.08] sm:w-[28rem]"
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-12 flex items-center gap-4">
            <div className="h-px w-10 bg-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/70">Get in touch</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <a
              href={BOOKSY_URL}
              onClick={() => trackEvent("booksy_click")}
              className="group flex items-start gap-4 border border-foreground/10 p-5 transition hover:border-accent hover:bg-foreground/[0.02] sm:p-6"
            >
              <Calendar className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-foreground/70">Book online</p>
                <p className="mt-1 font-display text-lg">Booksy — instant booking</p>
              </div>
            </a>
            <a
              href={WHATSAPP_URL}
              onClick={() => trackEvent("whatsapp_click")}
              className="group flex items-start gap-4 border border-foreground/10 p-6 transition hover:border-accent hover:bg-foreground/[0.02]"
            >
              <MessageCircle className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-foreground/70">WhatsApp</p>
                <p className="mt-1 font-display text-lg">Quick chat & quotes</p>
              </div>
            </a>
            <div className="group flex items-start gap-4 border border-foreground/10 p-6">
              <Mail className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-foreground/70">Email</p>
                <p className="mt-1 font-display text-lg">Coming soon</p>
                <p className="mt-1 text-xs text-foreground/70">WhatsApp or call for the fastest reply.</p>
              </div>
            </div>
            <a
              href={INSTAGRAM_URL}
              onClick={() => trackEvent("instagram_click")}
              className="group flex items-start gap-4 border border-foreground/10 p-6 transition hover:border-accent hover:bg-foreground/[0.02]"
            >
              <Instagram className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-foreground/70">Instagram</p>
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
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-foreground/70">Call</p>
                <p className="mt-1 font-display text-lg">{PHONE_DISPLAY}</p>
              </div>
            </a>
            <a
              href={MAPS_URL}
              className="group flex items-start gap-4 border border-foreground/10 p-6 transition hover:border-accent hover:bg-foreground/[0.02]"
            >
              <MapPin className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-foreground/70">Location</p>
                <p className="mt-1 font-display text-lg">{ADDRESS_LINE}</p>
                <p className="mt-1 text-xs text-foreground/70">Open in Google Maps →</p>
              </div>
            </a>

          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:items-start">
            <div className="border border-foreground/10 p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-accent" />
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-foreground/70">Opening hours</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex items-center justify-between gap-6 border-b border-foreground/5 pb-2 last:border-0">
                    <span className="text-foreground/80">{h.day}</span>
                    <span className="font-display text-foreground">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center gap-3 text-sm text-foreground/75">
              <p className="leading-relaxed">
                Ojuloge's Beauty is based in Burnley town centre. All appointments must be booked in advance.
              </p>
              <p className="leading-relaxed text-foreground/70">
                Please note: deposits are non-refundable.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Full booking menu — Booksy + WhatsApp per service */}
      <section id="book" className="bg-background px-5 pt-4 pb-16 text-foreground sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px w-10 bg-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/70">Book a service</span>
          </div>
          <h2 className="mb-4 font-display text-3xl leading-tight sm:text-5xl">
            Book instantly, <span className="italic text-accent">your way.</span>
          </h2>
          <p className="mb-10 max-w-xl text-base font-light text-foreground/75">
            Use Booksy to view available appointments, or message on WhatsApp if you would like to ask a question before booking.
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
                    <span className="text-xs font-medium uppercase tracking-[0.25em] text-foreground/70">{s.duration}</span>
                    <span className="text-sm font-medium text-accent">{s.price}</span>
                  </div>
                  <p className="mt-1.5 text-sm font-light text-foreground/75">{s.blurb}</p>
                </div>
                <div className="grid grid-cols-1 gap-2 min-[390px]:grid-cols-2 sm:flex sm:flex-wrap sm:justify-end">
                  <a
                    href={BOOKSY_URL}
                    onClick={() => trackEvent("booksy_click")}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-xs font-semibold uppercase text-primary transition hover:bg-secondary sm:w-auto"
                  >
                    <Calendar className="h-3.5 w-3.5" /> Book on Booksy
                  </a>
                  <a
                    href={whatsappFor(s.name)}
                    onClick={() => trackEvent("whatsapp_click")}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground/20 px-5 py-3 text-xs font-semibold uppercase text-foreground transition hover:border-accent hover:text-accent sm:w-auto"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm font-light italic text-foreground/70">
            Prices marked "POA" are confirmed on enquiry. Message on WhatsApp with the service and date you are interested in.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-background px-5 pb-16 text-foreground sm:px-8 sm:pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px w-10 bg-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-foreground/70">FAQ</span>
          </div>
          <h2 className="mb-10 font-display text-4xl leading-tight sm:text-5xl">
            Frequently <span className="italic">asked</span>
          </h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group border-t border-border py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                  {f.q}<span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>


      <footer className="bg-primary px-8 py-10 text-center text-primary-foreground/70">
        <Button variant="outline"
          type="button"
          onClick={sharePage}
          className="mb-5 border-accent/60 bg-transparent px-5 text-xs font-semibold uppercase text-accent hover:bg-accent hover:text-primary"
        >
          Share with a friend
        </Button>
        <p className="text-xs font-medium uppercase tracking-widest">
          © {new Date().getFullYear()} Ojuloge's Beauty · Bridal Makeup · Gele · Microblading
        </p>
      </footer>

      <GalleryViewer selection={gallery} onChange={setGallery} />
    </main>
  );
}
