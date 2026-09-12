"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { useLocale } from "@/i18n/locale-provider";
import { useHamedo } from "@/content/schema-ext";
import { BRANCHES, BRANDS, SAGA_TIERS, PROFILE, MAPS_URL_BY_BRANCH } from "@/content/media";
import { Network } from "@/components/webgl/network";

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-8% 0px -8% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

function pi(i: number): CSSProperties {
  return { "--ping-i": i } as CSSProperties;
}

function Ping({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useOnScreen<HTMLDivElement>();
  return (
    <div ref={ref} data-ping="" className={className}>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------- nav -- */

export function Nav() {
  const { dir, toggleLocale } = useLocale();
  const c = useHamedo();
  return (
    <header className="sticky top-0 z-40 border-b border-cream/10 bg-ground/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="signmark flex items-center gap-2 text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-red" aria-hidden />
          HAMEDO MOTORS
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {c.nav.map((l) => (
            <a key={l.href} href={l.href} className="label hover:text-cream">
              {l.label}
            </a>
          ))}
        </nav>
        <button onClick={toggleLocale} className="chip rounded-sm border border-red/50 px-2.5 py-1.5 text-red">
          {dir === "rtl" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------- hero -- */

function Hero() {
  const c = useHamedo();
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/media/showroom-tiggo.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ground via-ground/85 to-ground/50" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-14 sm:pt-20">
        <Ping className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div data-ping-item style={pi(0)} className="min-w-0">
            <p className="label mb-4">{c.hero.eyebrow}</p>
            <h1 className="sign text-hero m-hero mb-5">{c.hero.headline}</h1>
            <p className="text-lead max-w-prose text-muted">{c.hero.sub}</p>
            <p className="fine mt-4 border-s-2 border-red ps-3 italic">{c.hero.finding}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`tel:${PROFILE.instagram.phone}`} className="rounded-sm bg-red px-5 py-2.5 text-sm font-semibold text-cream">
                {c.hero.primaryCta}
              </a>
              <a href="#roster" className="label rounded-sm border border-cream/30 px-5 py-2.5">
                {c.hero.secondaryCta}
              </a>
            </div>
          </div>
          <div data-ping-item style={pi(1)} className="grid grid-cols-2 gap-3 self-start">
            {c.hero.counts.map((s) => (
              <div key={s.label} className="rounded-sm bg-panel/90 p-4 backdrop-blur-sm">
                <p className="signmark tnum text-2xl">{s.value}</p>
                <p className="fine text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Ping>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- roster -- */

function Roster() {
  const c = useHamedo();
  const stated = BRANDS.filter((b) => b.tier === "stated");
  const also = BRANDS.filter((b) => b.tier === "alsoAdvertised");
  return (
    <section id="roster" className="border-t border-cream/10 bg-panel/40 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Ping className="max-w-3xl">
          <p data-ping-item style={pi(0)} className="label mb-3">{c.roster.eyebrow}</p>
          <h2 data-ping-item style={pi(1)} className="sign text-display m-head mb-4">{c.roster.heading}</h2>
          <p data-ping-item style={pi(2)} className="text-muted">{c.roster.intro}</p>
        </Ping>

        <Ping className="mt-8 grid gap-6 md:grid-cols-[1.3fr_1fr]">
          <div data-ping-item style={pi(0)} className="rounded-sm bg-panel p-5">
            <p className="label mb-3">{c.roster.statedLabel} · {stated.length}</p>
            <div className="flex flex-wrap gap-2">
              {stated.map((b) => (
                <span key={b.name} className="latin chip rounded-sm bg-ground px-3 py-1.5 normal-case">{b.name}</span>
              ))}
            </div>
          </div>
          <div data-ping-item style={pi(1)} className="rounded-sm bg-ground p-5 ring-1 ring-red/40">
            <p className="label mb-3 text-red">{c.roster.alsoAdvertisedLabel}</p>
            <div className="flex flex-wrap gap-2">
              {also.map((b) => (
                <span key={b.name} className="latin chip rounded-sm bg-red/15 px-3 py-1.5 normal-case text-red">{b.name}</span>
              ))}
            </div>
            <p className="fine mt-3 text-muted">{c.roster.alsoAdvertisedNote}</p>
          </div>
        </Ping>

        <Ping className="mt-6 grid gap-6 rounded-sm bg-panel p-5 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div data-ping-item style={pi(0)} className="relative aspect-[3/4] w-full min-w-0 overflow-hidden rounded-sm">
            <Image src="/media/golf-cart.jpg" alt="" fill className="object-cover" sizes="(min-width: 768px) 40vw, 90vw" />
          </div>
          <div data-ping-item style={pi(1)} className="min-w-0">
            <p className="label mb-2 text-red">{c.roster.cartEyebrow}</p>
            <h3 className="sign text-display mb-3">{c.roster.cartHeading}</h3>
            <p className="text-muted">{c.roster.cartBody}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.roster.cartSpecs.map((s) => (
                <li key={s} className="chip rounded-sm bg-ground px-2.5 py-1 normal-case text-muted">{s}</li>
              ))}
            </ul>
          </div>
        </Ping>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- network -- */

function NetworkSection() {
  const c = useHamedo();
  return (
    <section id="network" className="border-t border-cream/10 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Ping className="max-w-3xl">
          <p data-ping-item style={pi(0)} className="label mb-3">{c.network.eyebrow}</p>
          <h2 data-ping-item style={pi(1)} className="sign text-display m-head mb-4">{c.network.heading}</h2>
          <p data-ping-item style={pi(2)} className="text-muted">{c.network.intro}</p>
        </Ping>

        <Ping className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div data-ping-item style={pi(0)} className="min-w-0">
            <Network />
            <p className="fine mt-2 text-muted">{c.network.distanceNote}</p>
          </div>
          <div data-ping-item style={pi(1)} className="flex flex-col gap-2.5">
            {BRANCHES.map((b) => (
              <a
                key={b.id}
                href={MAPS_URL_BY_BRANCH[b.id]}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-sm bg-panel p-3.5 hover:bg-panel-2"
              >
                <div className="min-w-0">
                  <p className="label mb-1">{b.status === "hq" ? c.network.hqLabel : c.network.branchLabel}</p>
                  <p className="text-sm font-semibold">{c.network.names[b.id]}</p>
                  <p className="fine text-muted">{c.network.addresses[b.id]}</p>
                </div>
                <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-red" />
              </a>
            ))}
          </div>
        </Ping>

        <Ping className="mt-6">
          <div data-ping-item style={pi(0)} className="grid gap-4 rounded-sm bg-panel p-5 sm:grid-cols-[220px_1fr] sm:items-center">
            <div className="relative aspect-[3/4] w-full min-w-0 overflow-hidden rounded-sm">
              <Image src="/media/map-teaser.jpg" alt="" fill className="object-cover" sizes="220px" />
            </div>
            <p className="fine text-muted">{c.network.teaserCaption}</p>
          </div>
        </Ping>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- tradeoff -- */

function TradeOff() {
  const c = useHamedo();
  const maxDown = Math.max(...SAGA_TIERS.map((t) => t.down));
  const maxCashback = Math.max(...SAGA_TIERS.map((t) => t.cashback));
  const maxInstalment = Math.max(...SAGA_TIERS.map((t) => t.instalment));
  const fmt = (n: number) => n.toLocaleString("en-US");
  const bars: { key: keyof typeof SAGA_TIERS[number]; label: string; max: number; color: string }[] = [
    { key: "down", label: c.tradeOff.downLabel, max: maxDown, color: "bg-cream" },
    { key: "cashback", label: c.tradeOff.cashbackLabel, max: maxCashback, color: "bg-red" },
    { key: "instalment", label: c.tradeOff.instalmentLabel, max: maxInstalment, color: "bg-red/60" },
  ];
  return (
    <section id="trade-off" className="border-t border-cream/10 bg-panel/40 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Ping className="max-w-3xl">
          <p data-ping-item style={pi(0)} className="label mb-3">{c.tradeOff.eyebrow}</p>
          <h2 data-ping-item style={pi(1)} className="sign text-display m-head mb-4">{c.tradeOff.heading}</h2>
          <p data-ping-item style={pi(2)} className="text-muted">{c.tradeOff.intro}</p>
        </Ping>

        <Ping className="mt-8 grid gap-4 md:grid-cols-[220px_1fr] md:items-start">
          <div data-ping-item style={pi(0)}>
            <div className="relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-sm">
              <Image src="/media/proton-saga.jpg" alt="" fill className="object-cover" sizes="220px" />
            </div>
            <p className="fine mt-2 text-muted">{c.tradeOff.posterCaption}</p>
          </div>
          <div data-ping-item style={pi(1)} className="grid gap-4 sm:grid-cols-3">
          {SAGA_TIERS.map((t, i) => (
            <div key={t.id} data-ping-item style={pi(i)} className="rounded-sm bg-panel p-5">
              <p className="label mb-4">Proton Saga · {i + 1}/3</p>
              <div className="flex flex-col gap-3.5">
                {bars.map((bar) => {
                  const val = t[bar.key] as number;
                  const pct = Math.max(6, Math.round((val / bar.max) * 100));
                  return (
                    <div key={bar.label}>
                      <div className="fine mb-1 flex items-center justify-between text-muted">
                        <span>{bar.label}</span>
                        <span className="tnum latin">{fmt(val)}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-ground">
                        <div className={`h-1.5 rounded-full ${bar.color}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          </div>
        </Ping>
        <p className="fine mt-4 max-w-3xl text-muted">{c.tradeOff.axisNote}</p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- contact -- */

function Contact() {
  const c = useHamedo();
  return (
    <section id="contact" className="border-t border-cream/10 py-14">
      <div className="mx-auto max-w-6xl px-5">
        <Ping className="grid gap-8 md:grid-cols-2">
          <div data-ping-item style={pi(0)}>
            <h2 className="sign text-display m-head mb-4">{c.contact.heading}</h2>
            <p className="label mb-1">{c.contact.addressLabel}</p>
            <p className="bidi mb-4">{c.contact.address}</p>

            <p className="fine mb-3 text-muted">{c.contact.phoneNote}</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3 rounded-sm bg-panel p-3">
                <span className="fine text-muted">{c.contact.igPhoneLabel}</span>
                <span className="latin tnum chip normal-case">{PROFILE.instagram.phoneDisplay}</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-sm bg-panel p-3">
                <span className="fine text-muted">{c.contact.fbPhoneLabel}</span>
                <span className="latin tnum chip normal-case">{PROFILE.facebook.phoneDisplay}</span>
              </div>
            </div>

            {c.contact.hours && (
              <p className="fine mt-4 text-muted"><span className="label">{c.contact.hoursLabel}</span> — {c.contact.hours}</p>
            )}
            <p className="fine mt-3 text-muted">{c.contact.reviewNote}</p>
          </div>
          <div data-ping-item style={pi(1)} className="flex flex-col items-start gap-3">
            <a href={c.contact.mapsUrl} target="_blank" rel="noreferrer" className="rounded-sm bg-red px-5 py-2.5 text-sm font-semibold text-cream">
              {c.contact.cta}
            </a>
            <div className="flex flex-wrap gap-3">
              {c.contact.instagramUrl && (
                <a href={c.contact.instagramUrl} target="_blank" rel="noreferrer" className="label rounded-sm border border-cream/30 px-5 py-2.5">Instagram</a>
              )}
              {c.contact.facebookUrl && (
                <a href={c.contact.facebookUrl} target="_blank" rel="noreferrer" className="label rounded-sm border border-cream/30 px-5 py-2.5">Facebook</a>
              )}
            </div>
          </div>
        </Ping>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ shell -- */

export function Sections() {
  return (
    <main>
      <Hero />
      <Roster />
      <NetworkSection />
      <TradeOff />
      <Contact />
    </main>
  );
}

export function Footer() {
  const c = useHamedo();
  return (
    <footer className="border-t border-cream/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5">
        <p className="fine text-muted">{c.footer.rights}</p>
      </div>
    </footer>
  );
}
