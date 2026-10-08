import { computed, type MaybeRefOrGetter } from "vue";

const bankLogosMap: Record<string, string> = {
  kjk: "/bank_logos/kjk_logo.png",
  bcc: "/bank_logos/bcc_logo.png",
  eubank: "/bank_logos/eubank_logo.png",
  forte: "/bank_logos/forte_logo.png",
  halyk: "/bank_logos/halyk_logo.png",
  kaspi: "/bank_logos/kaspi_logo.png",
  otbasy: "/bank_logos/otbasy_logo.png",
  'otbasy-dark': "/bank_logos/otbasy_logo1.png",
  altyn: "/bank_logos/altyn_bank_logo.png",
  nur: "/bank_logos/nurbank_logo.png",
  rbk: "/bank_logos/rbk_logo.png",
  bereke: "/bank_logos/berekebank_logo.png",
  freedom: "/bank_logos/freedom_logo.png",
};

const complexImagesMap: Record<string, string> = {
  house: "/images/house.png",
  plan: "/images/plan.png",
  section: "/images/section.png",
};

export function useBankLogo(bankName: MaybeRefOrGetter<string>, useDark?: boolean) {
  const logo = computed(() => {
    let path = "default";
    if (typeof bankName === "function") path = (useDark && bankLogosMap[`${bankName()}-dark`] ? bankLogosMap[`${bankName()}-dark`] : bankLogosMap[bankName()]) || '';
    else if (typeof bankName === "string") path = (useDark && bankLogosMap[`${bankName}-dark`] ? bankLogosMap[`${bankName}-dark`] : bankLogosMap[bankName]) || '';

    if (!path) return null;
    return new URL(path, import.meta.url);
  });

  return logo;
}

export function useComplexImage(imageName: MaybeRefOrGetter<string>) {
  const logo = computed(() => {
    let path = "default";
    if (typeof imageName === "function") path = complexImagesMap[imageName()] || '';
    else if (typeof imageName === "string") path = complexImagesMap[imageName] || '';

    if (!path) path = complexImagesMap["default"] || '';
    return new URL(path, import.meta.url);
  });

  return logo;
}