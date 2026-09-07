/**
 * Hamedo Motors publish across two very different registers: Instagram
 * (8,324 followers, thin sample) and Facebook (58K followers, the official
 * "About" panel). The two disagree in specific, checkable ways -- a
 * different phone number, and a brand roster that Facebook's own bio
 * undercounts against what their own poster art actually advertises.
 */

export type BranchStatus = "hq" | "branch";

export type Branch = {
  id: string;
  /** Real coordinates, resolved from the dealer's own published Maps links. */
  lat: number;
  lon: number;
  status: BranchStatus;
};

/** Reference point for the flat local projection in network.tsx is the HQ (Dokki). */
export const BRANCHES: Branch[] = [
  { id: "dokki", lat: 30.0358791, lon: 31.2006283, status: "hq" },
  { id: "sheikhZayed", lat: 29.9891682, lon: 30.9533024, status: "branch" },
  { id: "october", lat: 29.9646759, lon: 30.9337692, status: "branch" },
  { id: "northCoast", lat: 30.8350449, lon: 28.9621429, status: "branch" },
];

export type Brand = {
  name: string;
  tier: "stated" | "alsoAdvertised";
};

/** Facebook's own "About" bio names seven marques as its authorized-distributor
 *  line, verbatim: "Hyundai, Opel, Chery, MG, Chevrolet, Haval, Changan."
 *  Proton is advertised just as prominently in the dealer's own poster art
 *  (a whole Proton Saga financing sheet, "AUTHORIZED DISTRIBUTOR") but is
 *  absent from that official list -- the inverse of the usual overclaim. */
export const BRANDS: Brand[] = [
  { name: "Hyundai", tier: "stated" },
  { name: "Opel", tier: "stated" },
  { name: "Chery", tier: "stated" },
  { name: "MG", tier: "stated" },
  { name: "Chevrolet", tier: "stated" },
  { name: "Haval", tier: "stated" },
  { name: "Changan", tier: "stated" },
  { name: "Proton", tier: "alsoAdvertised" },
];

/** The Proton Saga's own three published financing tiers -- one car, three
 *  real (down payment, cash-back, instalment) points, no invented figures.
 *  As the down payment drops, both the cash-back incentive and the monthly
 *  instalment rise -- a real trade-off curve, not a flat table. */
export type FinancingTier = {
  id: string;
  down: number;
  cashback: number;
  instalment: number;
};

export const SAGA_TIERS: FinancingTier[] = [
  { id: "a", down: 342500, cashback: 27400, instalment: 7800 },
  { id: "b", down: 205000, cashback: 34000, instalment: 11500 },
  { id: "c", down: 157000, cashback: 36400, instalment: 12500 },
];

export const PROFILE = {
  instagram: {
    handle: "hamedomotors",
    url: "https://www.instagram.com/hamedomotors/",
    followers: "8,324",
    posts: "178",
    phone: "01288333633",
    phoneDisplay: "012-88-333-633",
  },
  facebook: {
    handle: "HamedoMotors",
    url: "https://www.facebook.com/HamedoMotors/",
    followers: "58K",
    phone: "01211012234",
    phoneDisplay: "012 11 01 22 34",
    recommendPct: "88%",
    reviewCount: "23",
  },
  since: 1980,
  hqAddress: "16 El Tahrir St, Dokki, Giza",
  sheikhZayedMapsUrl: "https://maps.app.goo.gl/7oJW3SLs2FC5CviB7",
  dokkiMapsUrl: "https://maps.app.goo.gl/WeMwEUPKee898Cik8",
  octoberMapsUrl: "https://maps.app.goo.gl/deTFk5R68rR5y6bj8",
  northCoastMapsUrl: "https://maps.app.goo.gl/pA5vh6ocf46jYcKZA",
} as const;

export const MAPS_URL_BY_BRANCH: Record<string, string> = {
  dokki: PROFILE.dokkiMapsUrl,
  sheikhZayed: PROFILE.sheikhZayedMapsUrl,
  october: PROFILE.octoberMapsUrl,
  northCoast: PROFILE.northCoastMapsUrl,
};
