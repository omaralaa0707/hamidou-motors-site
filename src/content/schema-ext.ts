import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";

export type HamedoContent = SiteContent & {
  hero: SiteContent["hero"] & {
    finding: string;
    counts: { value: string; label: string }[];
  };
  roster: {
    eyebrow: string;
    heading: string;
    intro: string;
    statedLabel: string;
    alsoAdvertisedLabel: string;
    alsoAdvertisedNote: string;
    cartEyebrow: string;
    cartHeading: string;
    cartBody: string;
    cartSpecs: string[];
  };
  network: {
    eyebrow: string;
    heading: string;
    intro: string;
    hqLabel: string;
    branchLabel: string;
    /** Keyed by Branch.id from media.ts. */
    names: Record<string, string>;
    /** Keyed by Branch.id from media.ts. */
    addresses: Record<string, string>;
    distanceNote: string;
    teaserCaption: string;
  };
  tradeOff: {
    eyebrow: string;
    heading: string;
    intro: string;
    downLabel: string;
    cashbackLabel: string;
    instalmentLabel: string;
    axisNote: string;
    posterCaption: string;
  };
  contact: SiteContent["contact"] & {
    phoneNote: string;
    igPhoneLabel: string;
    fbPhoneLabel: string;
    reviewNote: string;
  };
};

export function useHamedo() {
  return useContent() as HamedoContent;
}
