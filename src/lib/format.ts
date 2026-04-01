const LOCALE_MAP: Record<string, string> = {
  en: "en-GB", pt: "pt-PT", de: "de-DE", fr: "fr-FR", es: "es-ES",
  it: "it-IT", nl: "nl-NL", pl: "pl-PL", ro: "ro-RO", cs: "cs-CZ",
  hu: "hu-HU", bg: "bg-BG", el: "el-GR", hr: "hr-HR", sk: "sk-SK",
  sl: "sl-SI", lt: "lt-LT", lv: "lv-LV", et: "et-EE", mt: "mt-MT",
  fi: "fi-FI", sv: "sv-SE", da: "da-DK",
};

export function getLocale(lang: string): string {
  return LOCALE_MAP[lang] || "en-GB";
}

export function formatCurrency(value: number, lang: string): string {
  return value.toLocaleString(getLocale(lang), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const WEEKS_PER_MONTH = 4.33;
