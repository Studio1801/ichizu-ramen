import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import * as m from 'framer-motion/m';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { Logo } from '@/components/Logo';
import { track } from '@/lib/track';

import heroImg from '@/assets/real/hero-new.jpg';
import heroVideo from '@/assets/hero.mp4';

const HomeBelowFold = lazy(() => import('./HomeBelowFold'));

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shouldLoadBelowFold, setShouldLoadBelowFold] = useState(false);
  const [belowFoldReady, setBelowFoldReady] = useState(false);
  const [pendingNavTarget, setPendingNavTarget] = useState<string | null>(null);

  const handleBelowFoldReady = useCallback(() => setBelowFoldReady(true), []);

  useEffect(() => {
    setIsScrolled(scrollY.get() > 40);
    return scrollY.on('change', (latest) => setIsScrolled(latest > 40));
  }, [scrollY]);

  useEffect(() => {
    const threshold = Math.min(window.innerHeight * 0.15, 120);
    const loadBelowFoldOnScroll = () => {
      if (window.scrollY >= threshold) {
        setShouldLoadBelowFold(true);
        window.removeEventListener('scroll', loadBelowFoldOnScroll);
      }
    };

    if (window.scrollY >= threshold) {
      setShouldLoadBelowFold(true);
    } else {
      window.addEventListener('scroll', loadBelowFoldOnScroll, { passive: true });
    }

    const initialHash = window.location.hash.slice(1);
    if (initialHash && initialHash !== 'hero') {
      setPendingNavTarget(initialHash);
      setShouldLoadBelowFold(true);
    }

    return () => window.removeEventListener('scroll', loadBelowFoldOnScroll);
  }, []);

  useEffect(() => {
    if (!belowFoldReady || !pendingNavTarget) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(pendingNavTarget)?.scrollIntoView({ behavior: 'smooth' });
      setPendingNavTarget(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [belowFoldReady, pendingNavTarget]);

  // Smooth scroll for nav links
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);

    if (id === 'hero') {
      setPendingNavTarget(null);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (belowFoldReady) {
      setPendingNavTarget(null);
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setPendingNavTarget(id);
    setShouldLoadBelowFold(true);
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
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 text-white ${isScrolled ? 'bg-background/90 backdrop-blur-md' : 'mix-blend-difference'}`}>
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
            onClick={() => {
              track('reserve_click', { placement: 'nav' });
              scrollTo('visit');
            }}
            className="border border-white/40 rounded-full px-4 py-1.5 normal-case tracking-normal font-sans text-xs hover:bg-white hover:text-black transition-colors"
          >
            Reserve
          </button>
        </div>

        {/* Mobile controls (below sm): Reserve button + hamburger toggle */}
        <div className="flex sm:hidden items-center gap-3 text-xs tracking-widest uppercase font-sans">
          <button
            onClick={() => {
              track('reserve_click', { placement: 'mobile_menu' });
              scrollTo('visit');
            }}
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
        <m.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <video
            src={heroVideo}
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
            poster={heroImg}
            className="w-full h-full object-cover object-center"
          />
        </m.div>

        <div className="relative z-20 text-center flex flex-col items-center">
          <div className="relative">
            <h1 className="text-8xl md:text-[12rem] font-serif leading-none tracking-tight text-white/90 font-light mb-4 flex items-center gap-4 drop-shadow-2xl">
              <span aria-hidden="true">一途</span>
              <span className="sr-only">Ramen Ichizu &amp; Bar, Japanese ramen in Salt Lake City</span>
            </h1>
          </div>
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

      <div>
        {shouldLoadBelowFold ? (
          <Suspense fallback={<BelowFoldPlaceholder />}>
            <HomeBelowFold onReady={handleBelowFoldReady} />
          </Suspense>
        ) : (
          <BelowFoldPlaceholder />
        )}
      </div>

    </div>
  );
}

function BelowFoldPlaceholder() {
  return (
    <div aria-hidden="true" className="min-h-screen bg-background" />
  );
}
