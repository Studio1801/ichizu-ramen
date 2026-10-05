const CONTACT_EMAIL = "PUT_REAL_EMAIL_HERE";

import { useEffect } from 'react';

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy | Ramen Ichizu Bar';
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-12 font-sans text-white/80 md:py-20">
      <article className="mx-auto max-w-3xl">
        <a
          href="/"
          className="mb-10 inline-block text-sm text-white/60 underline underline-offset-4 decoration-white/30 transition-colors hover:text-white hover:decoration-white"
        >
          Back to home
        </a>

        <h1 className="mb-8 font-serif text-4xl text-white md:text-5xl">Privacy Policy</h1>

        <div className="space-y-8 text-base leading-relaxed">
          <p>
            Ramen Ichizu Bar is located at 915 Washington St Suite #1A, Salt Lake City, UT 84101.
          </p>

          <section>
            <h2 className="mb-2 font-serif text-2xl text-white">Analytics</h2>
            <p>
              We use Google Analytics 4 to measure visits to this site, including pages viewed,
              device and browser type, approximate location, and how people found the site.
              Google Analytics sets cookies and receives this data. We do not sell personal
              information.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-2xl text-white">Information you provide</h2>
            <p>We do not collect names, email addresses, or payments through this site.</p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-2xl text-white">Third-party links</h2>
            <p>
              This site links to third-party services, including Google Maps and Instagram.
              Those services have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-2xl text-white">Your choices</h2>
            <p>
              You can block cookies in your browser settings or use{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 decoration-white/30 transition-colors hover:text-white hover:decoration-white"
              >
                Google’s Analytics opt-out add-on
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-2xl text-white">Contact</h2>
            <p>
              For privacy questions, email{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline underline-offset-4 decoration-white/30 transition-colors hover:text-white hover:decoration-white"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <p className="text-sm text-white/50">Last updated: October 4, 2026</p>
        </div>
      </article>
    </main>
  );
}