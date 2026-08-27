import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { menuData } from '@/data/menu';
import { Logo } from '@/components/Logo';

// Real photos
import heroImg from '@/assets/real/hero-new.jpg';
import woodBg from '@/assets/wood-bg.png';
import heroVideo from '@/assets/hero.mp4';
import atmosphereImg from '@/assets/real/interior-d.jpg';
import chefImg from '@/assets/real/chef-new.jpg';
import noodlePullImg from '@/assets/real/noodle-bundles.jpg';
import gyozaImg from '@/assets/real/gyoza-c.jpg';

// Gallery photos (compressed copies of the /real originals, sized for grid thumbnails)
import galleryMisoLobster from '@/assets/gallery/bowl-miso-lobster.jpg';
import galleryTruffle from '@/assets/gallery/bowl-truffle.jpg';
import galleryVegan from '@/assets/gallery/bowl-vegan.jpg';
import galleryTonkotsu from '@/assets/gallery/bowl-tonkotsu.jpg';
import galleryElk from '@/assets/gallery/bowl-elk.jpg';
import galleryBowlShoyu from '@/assets/gallery/bowl-shoyu.jpg';
import galleryBowlIekei from '@/assets/gallery/bowl-iekei.jpg';
import galleryBowlShio from '@/assets/gallery/bowl-shio.jpg';

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Smooth scroll for nav links
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'philosophy', label: 'Devotion' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'menu', label: 'Menu' },
    { id: 'visit', label: 'Visit' },
  ];

  // TODO: the Reserve button currently scrolls to the Visit section as a placeholder.
  // Swap onClick for a real reservation link (OpenTable, Resy, Toast, etc.)
  // or a tel: link once the client decides how they're taking reservations.

  return (
    <div className="bg-background min-h-screen text-foreground overflow-hidden selection:bg-white/20 selection:text-white">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference text-white">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
          <Logo className="w-8 h-8" />
          <span className="font-serif tracking-widest text-sm uppercase hidden sm:block">Ichizu</span>
        </div>

        {/* Desktop links (sm and up) */}
        <div className="hidden sm:flex gap-6 text-xs tracking-widest uppercase font-sans items-center">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className="hover:text-white/60 transition-colors">
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('visit')}
            className="border border-white/40 rounded-full px-4 py-1.5 normal-case tracking-normal font-sans text-xs hover:bg-white hover:text-black transition-colors"
          >
            Reserve
          </button>
        </div>

        {/* Mobile controls (below sm): Reserve button + hamburger toggle */}
        <div className="flex sm:hidden items-center gap-3 text-xs tracking-widest uppercase font-sans">
          <button
            onClick={() => scrollTo('visit')}
            className="border border-white/40 rounded-full px-3 py-1.5 normal-case tracking-normal font-sans text-xs hover:bg-white hover:text-black transition-colors"
          >
            Reserve
          </button>
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="p-1"
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-sm flex flex-col items-center justify-center gap-10 sm:hidden">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-serif text-3xl text-white/90 hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            poster={heroImg}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div className="relative z-20 text-center flex flex-col items-center">
          <FadeIn delay={0.2} direction="down">
            <div className="relative">
              <h1 className="text-8xl md:text-[12rem] font-serif leading-none tracking-tight text-white/90 font-light mb-4 flex items-center gap-4 drop-shadow-2xl">
                一途
              </h1>
            </div>
          </FadeIn>
          <FadeIn delay={0.4} direction="up">
            <p className="font-sans uppercase tracking-[0.4em] text-sm md:text-base text-white/70">
              Single-Minded Devotion
            </p>
          </FadeIn>
          <FadeIn delay={0.6} direction="up">
            <div className="mt-12 w-[1px] h-24 bg-white/30 mx-auto" />
          </FadeIn>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 px-6 relative overflow-hidden">
        {/* Wood texture background */}
        <div className="absolute inset-0 z-0">
          <img src={woodBg} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-serif mb-8 leading-tight">
                No substitutions.<br/>
                No takeout.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed text-sm md:text-base">
                <p>
                  "Ichizu" translates to single-minded devotion. It is the philosophy that drives every decision in this room.
                </p>
                <p>
                  Our noodles are crafted in-house daily. The broth simmers for hours to achieve the perfect balance of clarity and depth. Every bowl is constructed with obsessive precision.
                </p>
                <p>
                  To respect the craft and the integrity of the dish, we do not alter our recipes. The ramen is served exactly as intended, and meant to be consumed immediately.
                </p>
              </div>
            </FadeIn>
          </div>
          <FadeIn direction="left" delay={0.3} className="relative h-[60vh] md:h-[80vh] overflow-hidden">
            <img src={noodlePullImg} alt="Hand-pulled house-made ramen noodles at Ramen Ichizu Bar" className="w-full h-full object-cover object-center scale-125 filter grayscale-[20%]" loading="lazy" decoding="async" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </FadeIn>
        </div>
      </section>

      {/* The Chef Section */}
      <section className="py-32 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row-reverse gap-16 items-center">
          <div className="flex-1">
            <FadeIn>
              <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-4">The Craftsman</h3>
              <h2 className="text-4xl md:text-6xl font-serif mb-8">Chef Mike<br/>Harrison</h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-6 font-sans text-muted-foreground leading-relaxed">
                <p>
                  Studied at the prestigious Rajuku Ramen School in Tokyo under the watchful eye of Master Chef Takeshi Koitani.
                </p>
                <p>
                  Following a successful tenure at Hana Ramen Bar in Park City, Chef Harrison brought his discipline to Salt Lake City's Central Ninth neighborhood, opening a late-night counter dedicated purely to the art of the bowl.
                </p>
              </div>
            </FadeIn>
          </div>
          <FadeIn direction="right" delay={0.3} className="flex-1 w-full aspect-square md:aspect-[3/4]">
            <img src={chefImg} alt="Chef at work" className="w-full h-full object-cover" loading="lazy" decoding="async" />
          </FadeIn>
        </div>
      </section>

      {/* Interstitial Image */}
      <section className="h-[70vh] w-full relative">
        <motion.div 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="w-full h-full"
        >
          <img src={atmosphereImg} alt="Interior dining room at Ramen Ichizu Bar in Salt Lake City's Central Ninth" className="w-full h-full object-cover opacity-60" loading="lazy" decoding="async" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-serif text-2xl md:text-4xl tracking-widest text-white/90">915 WASHINGTON ST</p>
          </div>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 px-6 max-w-6xl mx-auto">
        <FadeIn className="text-center mb-20">
          <h2 className="text-5xl font-serif mb-4">Gallery</h2>
          <div className="w-8 h-[1px] bg-white/20 mx-auto" />
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { src: galleryBowlShoyu,   alt: "Shoyu ramen bowl at Ramen Ichizu Bar",        scale: "scale-150", pos: "object-[center_60%]" },
            { src: galleryBowlIekei,   alt: "Yokohama Iekei ramen at Ramen Ichizu Bar",    scale: "scale-110", pos: "object-center" },
            { src: galleryBowlShio,    alt: "Shio Supreme ramen at Ramen Ichizu Bar",       scale: "scale-110", pos: "object-center" },
            { src: galleryMisoLobster, alt: "Miso Lobster Ramen at Ramen Ichizu Bar",       scale: "scale-110", pos: "object-center" },
            { src: galleryTruffle,     alt: "Truffle ramen special at Ramen Ichizu Bar",    scale: "scale-110", pos: "object-center" },
            { src: galleryVegan,       alt: "Vegan ramen special at Ramen Ichizu Bar",      scale: "scale-110", pos: "object-center" },
            { src: galleryTonkotsu,    alt: "Gyokai Tonkotsu at Ramen Ichizu Bar",          scale: "scale-110", pos: "object-center" },
            { src: galleryElk,         alt: "Elk Ramen special at Ramen Ichizu Bar",        scale: "scale-110", pos: "object-center" },
          ].map(({ src, alt, scale, pos }, i) => (
            <FadeIn key={alt} delay={0.05 * (i % 4 + 1)}>
              <div className="overflow-hidden ring-1 ring-inset ring-white/10">
                <img
                  src={src}
                  alt={alt}
                  className={`w-full aspect-square object-cover ${scale} ${pos} transition-transform duration-700 ease-out hover:scale-125`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-32 px-6 max-w-5xl mx-auto">
        <FadeIn className="text-center mb-24">
          <h2 className="text-5xl font-serif mb-4">The Menu</h2>
          <div className="w-8 h-[1px] bg-white/20 mx-auto" />
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-x-24 gap-y-20">
          
          <div className="space-y-16">
            <MenuCategory title="Ramen" items={menuData.ramen} />
            <MenuCategory title="Seasonal" items={menuData.seasonal} />
            
            <FadeIn delay={0.2}>
              <div className="relative aspect-square w-full mt-12">
                <img src={gyozaImg} alt="Pork Gyoza" className="w-full h-full object-cover" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              </div>
            </FadeIn>
          </div>

          <div className="space-y-16">
            <MenuCategory title="Sides" items={menuData.sides} />
            <MenuCategory title="Add-Ons" items={menuData.addons} compact />
            <MenuCategory title="Mini Donburi" items={menuData.donburi} />
            
            <div className="grid grid-cols-2 gap-8">
              <MenuCategory title="Dessert" items={menuData.dessert} compact />
              <MenuCategory title="Draft Beer" items={menuData.beer} compact />
            </div>
          </div>

        </div>
      </section>

      {/* Hours & Location */}
      <section id="visit" className="py-32 px-6 border-t border-white/5 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <Logo className="w-16 h-16 mx-auto mb-12 text-white/80" />
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-12 font-sans text-sm">
            <FadeIn delay={0.1}>
              <h4 className="font-serif text-xl mb-4">Location</h4>
              <p className="text-muted-foreground leading-relaxed">
                915 Washington St<br/>
                Suite #1A<br/>
                Salt Lake City, UT 84101<br/>
                <span className="text-white/40 mt-2 block">Central Ninth Neighborhood</span>
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h4 className="font-serif text-xl mb-4">Hours</h4>
              <ul className="text-muted-foreground space-y-2">
                <li><span className="text-white/60">Mon, Wed, Thu</span><br/>11:30AM–3PM / 5PM–9PM</li>
                <li><span className="text-white/60">Fri–Sat</span><br/>11:30AM–3PM / 5PM–9:30PM</li>
                <li><span className="text-white/60">Sun</span><br/>12PM–8PM</li>
                <li><span className="text-white/60">Tue</span><br/>Closed</li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.3}>
              <h4 className="font-serif text-xl mb-4">Connect</h4>
              <p className="text-muted-foreground mb-4">
                4.3/5 Stars (342+ Reviews)
              </p>
              <a 
                href="https://www.instagram.com/ramen_ichizu/" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-white border-b border-white/20 pb-1 hover:border-white transition-colors"
              >
                @ramen_ichizu
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-xs font-sans tracking-widest uppercase text-white/30 bg-[#050505]">
        <p>&copy; {new Date().getFullYear()} Ramen Ichizu Bar. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

function MenuCategory({ title, items, compact = false }: { title: string, items: any[], compact?: boolean }) {
  return (
    <FadeIn>
      <div className="mb-10 group">
        <h3 className="font-serif text-2xl mb-8 flex items-center gap-4">
          <span className="relative">
            {title}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-900/0 group-hover:bg-red-900/60 rounded-full transition-colors duration-500" />
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
        </h3>
        <div className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex justify-between items-baseline font-sans text-sm md:text-base">
                <span className="font-medium tracking-wide text-white/90">{item.name}</span>
                <span className="text-white/60 tabular-nums">${item.price}</span>
              </div>
              {!compact && item.desc && (
                <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed max-w-[85%]">
                  {item.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
