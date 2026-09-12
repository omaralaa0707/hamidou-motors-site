import type { HamedoContent } from "./schema-ext";
import { PROFILE } from "./media";

export const en: HamedoContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "Hamedo Motors",
    shortName: "Hamedo",
    tagline: "Authorized distributor, since 1980",
  },

  nav: [
    { label: "The roster", href: "#roster" },
    { label: "The network", href: "#network" },
    { label: "The trade-off", href: "#trade-off" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    eyebrow: "Giza & the North Coast, Egypt",
    headline: "Four fronts, one hotline — mostly",
    sub: "A.H.Y Hamedo Motors has been trading since 1980. Its Facebook bio names seven brands it's an authorized distributor for; its own poster art advertises an eighth it never lists, plus a product that only looks like a car. It runs four real branches, three of them minutes apart and one almost two hundred kilometres up the coast — and its Instagram captions and its Facebook \"About\" panel don't even agree on which phone number to call.",
    primaryCta: "Call the hotline",
    secondaryCta: "See the roster",
    finding: "45 years in business. 4 branches. 7 stated brands, 1 more advertised, 1 that isn't a car at all.",
    counts: [
      { value: "1980", label: "trading since" },
      { value: "4", label: "real branches" },
      { value: PROFILE.facebook.followers, label: "Facebook followers" },
      { value: PROFILE.instagram.followers, label: "Instagram followers" },
    ],
  },

  about: { heading: "Hamedo Motors", body: [] },
  services: { heading: "The roster", items: [] },
  gallery: { heading: "The network", items: [] },

  roster: {
    eyebrow: "The roster",
    heading: "Seven brands, stated — an eighth, only advertised",
    intro: "Facebook's own \"About\" panel names Hamedo Motors an authorized distributor for seven marques, verbatim: Hyundai, Opel, Chery, MG, Chevrolet, Haval, Changan. Their own poster art tells a fuller story.",
    statedLabel: "Stated in their Facebook bio",
    alsoAdvertisedLabel: "Also advertised — absent from that list",
    alsoAdvertisedNote: "A full financing sheet for the Proton Saga, marked \"AUTHORIZED DISTRIBUTOR,\" runs on their Instagram — Proton appears nowhere in Facebook's own seven-brand line.",
    cartEyebrow: "Not actually a car",
    cartHeading: "\"DODGE - RAM\" is a golf cart",
    cartBody: "One poster, styled exactly like every other brand sheet in the feed, headlines \"DODGE - RAM\" over a full-size pickup photograph. Their own caption underneath corrects it: \"a car in appearance, a golf cart in reality.\" It's an electric, low-speed replica shaped like the truck it's named after — sold alongside the real Hyundais and Chevrolets, not instead of them.",
    cartSpecs: ["Top speed 70 km/h", "Reversing camera", "Air conditioning", "Lithium battery"],
  },

  network: {
    eyebrow: "The network",
    heading: "Three branches minutes apart, one almost 200 km away",
    intro: "Hamedo Motors publish four branch links across their captions. Resolving each one to real coordinates draws a lopsided map: Dokki, Sheikh Zayed and October sit within a 25 km radius of each other in Greater Cairo — and a fourth branch sits on the North Coast, close to 200 km up the highway.",
    hqLabel: "Head office",
    branchLabel: "Branch",
    names: {
      dokki: "Dokki",
      sheikhZayed: "Sheikh Zayed",
      october: "October",
      northCoast: "North Coast",
    },
    addresses: {
      dokki: "16 El Tahrir St, near Buhouth Metro — the address on Facebook's own \"About\" panel",
      sheikhZayed: "Sheikh Zayed City, Giza",
      october: "91 Central Axis, 3rd District, 6th of October",
      northCoast: "Before the Marina 6 gate, North Coast",
    },
    distanceNote: "Distances computed from each branch's own published Google Maps link, not estimated.",
    teaserCaption: "Their own teaser for this: \"Keep your eye on the map… the surprise is coming.\" A real aerial frame of Cairo, roads lit and radiating from a single dropped pin.",
  },

  tradeOff: {
    eyebrow: "The trade-off",
    heading: "One car, three tiers, no sticker price",
    intro: "The Proton Saga's own financing sheet publishes three tiers side by side. No tier states a total price — only what you'd pay up front, what comes back as cash, and what you'd owe monthly. Plotted against each other, the three real points draw an actual curve: a lower deposit trades for a higher cash-back incentive and a higher instalment, not a lower one.",
    downLabel: "Down payment",
    cashbackLabel: "Cash back",
    instalmentLabel: "Monthly instalment",
    axisNote: "Every value on this chart is printed on the sourced poster. Nothing here is interpolated or assumed.",
    posterCaption: "The sourced Instagram poster the three tiers above are drawn from.",
  },

  contact: {
    heading: "Find them",
    addressLabel: "Head office",
    address: PROFILE.hqAddress,
    phoneLabel: "Phone",
    phones: [PROFILE.instagram.phoneDisplay, PROFILE.facebook.phoneDisplay],
    hoursLabel: "Hours",
    hours: "Posted as 11am–9pm in most captions, 11am–11pm in a few — the account isn't consistent about it either.",
    mapsUrl: PROFILE.dokkiMapsUrl,
    instagramUrl: PROFILE.instagram.url,
    facebookUrl: PROFILE.facebook.url,
    cta: "Open head office in Maps",
    phoneNote: "Instagram's captions and Facebook's own \"About\" panel publish two different numbers. Both are quoted below, each labelled with where it actually appears.",
    igPhoneLabel: "Published on Instagram",
    fbPhoneLabel: "Published on Facebook",
    reviewNote: "88% recommend, from 23 reviews — Facebook's own review score, quoted as published.",
  },

  footer: {
    rights: "© Hamedo Motors. All rights reserved.",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
