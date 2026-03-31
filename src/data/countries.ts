export interface AgeBasedRate {
  age: string;
  percentage: number;
  hourlyRate?: number;
  monthlyRate?: number;
}

export interface CountryData {
  code: string;
  name: string;
  nameLocal: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  minimumWage: {
    grossMonthly: number;
    grossMonthlyLocal?: number;
    hourlyRate?: number;
    definedPer: "hour" | "month" | "week";
    annualPayments: number;
    lastUpdated: string;
    source: string;
    effectiveDate: string;
    ageBasedRates?: AgeBasedRate[];
    skilledWorkerRate?: { grossMonthly?: number; grossMonthlyLocal?: number; hourlyRate?: number; description: string };
    probationRate?: { grossMonthly: number; duration: string };
  };
  workWeek: {
    standardHours: number;
    maxHours: number;
    daysPerWeek: number;
  };
  holidays: {
    vacationDaysMin: number;
    vacationDaysCommon: number;
    vacationDaysType: "working" | "calendar";
    hasVacationBonus: boolean;
    vacationBonusRate?: number;
    vacationBonusDescription?: string;
  };
  thirteenthSalary: {
    mandatory: boolean;
    payments: number;
    description: string;
  };
  taxes: {
    averageEffectiveRate: number;
    socialContributions: number;
    disclaimer: string;
  };
  hasStatutoryMinimumWage: boolean;
  notes?: string;
}

const taxDisclaimer =
  "Estimativa média. Valores reais variam conforme situação individual. Consulte um profissional fiscal.";

export const countries: CountryData[] = [
  // ============================================================
  // Grupo 1 — Acima de €1.500/mês
  // ============================================================
  {
    code: "LU",
    name: "Luxemburgo",
    nameLocal: "Lëtzebuerg",
    flag: "🇱🇺",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 2570.93,
      hourlyRate: 14.86,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Gouvernement du Luxembourg / Eurostat",
      effectiveDate: "2025-01-01",
      ageBasedRates: [
        { age: "18+", percentage: 100, monthlyRate: 2570.93 },
        { age: "17–18", percentage: 80, monthlyRate: 2056.74 },
        { age: "15–17", percentage: 75, monthlyRate: 1928.20 },
      ],
      skilledWorkerRate: {
        grossMonthly: 3085.11,
        description: "Trabalhadores qualificados (+20%): €3.085,11/mês",
      },
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 26,
      vacationDaysCommon: 26,
      vacationDaysType: "working",
      hasVacationBonus: false,
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description:
        "Não obrigatório por lei, mas muito comum via acordo coletivo.",
    },
    taxes: {
      averageEffectiveRate: 0.22,
      socialContributions: 0.1295,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "IE",
    name: "Irlanda",
    nameLocal: "Ireland",
    flag: "🇮🇪",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 2282,
      hourlyRate: 13.50,
      definedPer: "hour",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Gov.ie / Eurostat",
      effectiveDate: "2025-01-01",
      ageBasedRates: [
        { age: "20+", percentage: 100, hourlyRate: 13.50 },
        { age: "19", percentage: 90, hourlyRate: 12.15 },
        { age: "18", percentage: 80, hourlyRate: 10.80 },
        { age: "<18", percentage: 70, hourlyRate: 9.45 },
      ],
    },
    workWeek: { standardHours: 39, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 20,
      vacationDaysType: "working",
      hasVacationBonus: false,
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description: "Não há 13º salário obrigatório na Irlanda.",
    },
    taxes: {
      averageEffectiveRate: 0.2,
      socialContributions: 0.04,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "NL",
    name: "Holanda",
    nameLocal: "Nederland",
    flag: "🇳🇱",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 2550,
      hourlyRate: 14.71,
      definedPer: "hour",
      annualPayments: 12,
      lastUpdated: "2026-01-01",
      source: "Rijksoverheid / Eurostat",
      effectiveDate: "2026-01-01",
      ageBasedRates: [
        { age: "21+", percentage: 100, hourlyRate: 14.71 },
        { age: "20", percentage: 80, hourlyRate: 11.77 },
        { age: "19", percentage: 60, hourlyRate: 8.83 },
        { age: "18", percentage: 50, hourlyRate: 7.36 },
        { age: "17", percentage: 40, hourlyRate: 5.88 },
        { age: "16", percentage: 35, hourlyRate: 5.15 },
        { age: "15", percentage: 30, hourlyRate: 4.41 },
      ],
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 25,
      vacationDaysType: "working",
      hasVacationBonus: true,
      vacationBonusRate: 0.08,
      vacationBonusDescription:
        "Vakantiegeld: 8% do salário anual bruto, obrigatório, pago geralmente em maio.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description:
        "Sem 13º obrigatório, mas o vakantiegeld (8% subsídio de férias) é obrigatório por lei. Desde Jan/2024, o salário mínimo é definido por hora.",
    },
    taxes: {
      averageEffectiveRate: 0.3675,
      socialContributions: 0.2765,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
    notes: "Desde janeiro de 2024, o salário mínimo é definido por hora (antes era mensal). Taxas variam por idade (15–21+).",
  },
  {
    code: "DE",
    name: "Alemanha",
    nameLocal: "Deutschland",
    flag: "🇩🇪",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 2891,
      hourlyRate: 13.90,
      definedPer: "hour",
      annualPayments: 12,
      lastUpdated: "2026-01-01",
      source: "Bundesregierung / Eurostat",
      effectiveDate: "2026-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 28,
      vacationDaysType: "working",
      hasVacationBonus: false,
      vacationBonusDescription: "Urlaubsgeld não é obrigatório por lei, mas é comum via acordo coletivo.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description:
        "Weihnachtsgeld (bônus de Natal) não é obrigatório por lei, mas é muito comum via acordo coletivo. Não se aplica a menores de 18 sem formação profissional, aprendizes, e estagiários obrigatórios <3 meses.",
    },
    taxes: {
      averageEffectiveRate: 0.35,
      socialContributions: 0.2,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "BE",
    name: "Bélgica",
    nameLocal: "België / Belgique",
    flag: "🇧🇪",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 2029.88,
      hourlyRate: 12.40,
      definedPer: "month",
      annualPayments: 13,
      lastUpdated: "2024-11-01",
      source: "SPF Emploi / Eurostat",
      effectiveDate: "2024-11-01",
    },
    workWeek: { standardHours: 38, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 20,
      vacationDaysType: "working",
      hasVacationBonus: true,
      vacationBonusRate: 0.92,
      vacationBonusDescription:
        "Dubbel vakantiegeld: duplo subsídio de férias obrigatório (~92% de um mês de salário), pago em junho.",
    },
    thirteenthSalary: {
      mandatory: true,
      payments: 1,
      description:
        "Eindejaarspremie (prime de fin d'année) obrigatória na maioria dos setores via acordo coletivo. Dubbel vakantiegeld também é obrigatório.",
    },
    taxes: {
      averageEffectiveRate: 0.4,
      socialContributions: 0.1307,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
    notes: "Salário indexado automaticamente à inflação. Sem taxa diferenciada por idade desde 2015.",
  },
  {
    code: "FR",
    name: "França",
    nameLocal: "France",
    flag: "🇫🇷",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 1801.80,
      hourlyRate: 11.88,
      definedPer: "hour",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Service-Public.fr / Eurostat",
      effectiveDate: "2025-01-01",
      ageBasedRates: [
        { age: "18+", percentage: 100, hourlyRate: 11.88 },
        { age: "17–18", percentage: 90, hourlyRate: 10.69 },
        { age: "<17", percentage: 80, hourlyRate: 9.50 },
      ],
    },
    workWeek: { standardHours: 35, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 25,
      vacationDaysCommon: 25,
      vacationDaysType: "working",
      hasVacationBonus: false,
      vacationBonusDescription: "Prime de vacances não é obrigatória por lei, mas existe em alguns acordos coletivos.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description:
        "Prime de 13ème mois não obrigatória por lei, mas muito comum via acordo coletivo. SMIC baseado em 151,67h/mês (35h × 52/12). Taxas reduzidas por idade só nos primeiros 6 meses.",
    },
    taxes: {
      averageEffectiveRate: 0.28,
      socialContributions: 0.22,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },

  // ============================================================
  // Grupo 2 — Entre €900 e €1.500/mês
  // ============================================================
  {
    code: "ES",
    name: "Espanha",
    nameLocal: "España",
    flag: "🇪🇸",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 1184,
      hourlyRate: 9.26,
      definedPer: "month",
      annualPayments: 14,
      lastUpdated: "2025-02-01",
      source: "BOE (Real Decreto 87/2025) / SEPE",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 22,
      vacationDaysCommon: 22,
      vacationDaysType: "working",
      hasVacationBonus: false,
      vacationBonusDescription: "30 dias corridos de férias por lei (~22 úteis). A paga extra de verão (14º) cobre o período de férias.",
    },
    thirteenthSalary: {
      mandatory: true,
      payments: 2,
      description:
        "14 pagamentos anuais obrigatórios: Paga extra de Natal (13º, dezembro) e Paga extra de Verão (14º, junho). €1.184/mês × 14 = €16.576/ano. Sem diferenciação por idade.",
    },
    taxes: {
      averageEffectiveRate: 0.15,
      socialContributions: 0.0635,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "SI",
    name: "Eslovênia",
    nameLocal: "Slovenija",
    flag: "🇸🇮",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 1277.72,
      hourlyRate: 7.38,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Gov.si / Eurostat",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 20,
      vacationDaysType: "working",
      hasVacationBonus: true,
      vacationBonusRate: 1,
      vacationBonusDescription:
        "Regres za letni dopust (subsídio de férias): obrigatório, mínimo igual ao salário mínimo (€1.277,72 em 2025). Pago até 1 de julho. Isento de imposto até limite legal.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description:
        "Sem 13º obrigatório, mas o regres (subsídio de férias obrigatório) funciona como pagamento extra. Desde nov/2025: bônus de inverno obrigatório (50% do salário mínimo).",
    },
    taxes: {
      averageEffectiveRate: 0.22,
      socialContributions: 0.2206,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "LT",
    name: "Lituânia",
    nameLocal: "Lietuva",
    flag: "🇱🇹",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 1038,
      hourlyRate: 6.35,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Eurostat / Governo da Lituânia",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 20,
      vacationDaysType: "working",
      hasVacationBonus: false,
      vacationBonusDescription: "+3 dias após 10 anos com o mesmo empregador, +1 dia a cada 5 anos depois.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description: "Não há 13º salário obrigatório. Bônus por desempenho são comuns mas discricionários.",
    },
    taxes: {
      averageEffectiveRate: 0.2,
      socialContributions: 0.1983,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "PL",
    name: "Polônia",
    nameLocal: "Polska",
    flag: "🇵🇱",
    currency: "PLN",
    currencySymbol: "zł",
    minimumWage: {
      grossMonthly: 1100,
      grossMonthlyLocal: 4666,
      hourlyRate: 7.19,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Ministerstwo Rodziny / Gov.pl",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 26,
      vacationDaysType: "working",
      hasVacationBonus: false,
      vacationBonusDescription:
        "20 dias para <10 anos de experiência, 26 dias para 10+ anos. Diploma universitário conta como 8 anos.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description:
        "Não obrigatório no setor privado. Obrigatório no setor público (trzynastka = 8,5% da remuneração anual do ano anterior). Taxa horária: 30,50 zł/hora.",
    },
    taxes: {
      averageEffectiveRate: 0.12,
      socialContributions: 0.1371,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
    notes: "1 EUR ≈ 4,24 PLN (média 2025). Sem diferenciação por idade.",
  },
  {
    code: "PT",
    name: "Portugal",
    nameLocal: "Portugal",
    flag: "🇵🇹",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 870,
      definedPer: "month",
      annualPayments: 14,
      lastUpdated: "2025-01-01",
      source: "Diário da República / DGERT",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 22,
      vacationDaysCommon: 22,
      vacationDaysType: "working",
      hasVacationBonus: true,
      vacationBonusRate: 1,
      vacationBonusDescription:
        "Subsídio de férias: obrigatório, igual a 1 mês de salário, pago antes do período de férias (junho). Este é o 14º salário.",
    },
    thirteenthSalary: {
      mandatory: true,
      payments: 2,
      description:
        "14 pagamentos obrigatórios: Subsídio de Natal (13º, dezembro) + Subsídio de Férias (14º, junho). Cada um igual a 1 mês de salário. €870 × 14 = €12.180/ano. Podem ser rateados nos 12 meses. Madeira: €915, Açores: €913,50.",
    },
    taxes: {
      averageEffectiveRate: 0.15,
      socialContributions: 0.11,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "CY",
    name: "Chipre",
    nameLocal: "Κύπρος / Kıbrıs",
    flag: "🇨🇾",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 1000,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Ministry of Labour Cyprus / Eurostat",
      effectiveDate: "2025-01-01",
      probationRate: {
        grossMonthly: 900,
        duration: "Primeiros 6 meses com o mesmo empregador",
      },
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 20,
      vacationDaysType: "working",
      hasVacationBonus: false,
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description:
        "13º salário não é obrigatório por lei, mas é amplamente praticado (especialmente em dezembro). Torna-se obrigatório se estabelecido em contrato ou acordo coletivo. A partir de Jan/2026: €1.088/mês (pós-período probatório).",
    },
    taxes: {
      averageEffectiveRate: 0.1,
      socialContributions: 0.083,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "HR",
    name: "Croácia",
    nameLocal: "Hrvatska",
    flag: "🇭🇷",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 970,
      hourlyRate: 6.05,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Vlada RH / Eurostat",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 20,
      vacationDaysType: "working",
      hasVacationBonus: false,
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description:
        "Não obrigatório. Bônus de Natal é comum via acordo coletivo ou regras internas. Croácia adotou o EUR em 1 de janeiro de 2023.",
    },
    taxes: {
      averageEffectiveRate: 0.2,
      socialContributions: 0.2,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "GR",
    name: "Grécia",
    nameLocal: "Ελλάδα",
    flag: "🇬🇷",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 1027,
      definedPer: "month",
      annualPayments: 14,
      lastUpdated: "2025-04-01",
      source: "Υπουργείο Εργασίας / Eurostat",
      effectiveDate: "2025-04-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 22,
      vacationDaysType: "working",
      hasVacationBonus: true,
      vacationBonusRate: 0.5,
      vacationBonusDescription:
        "Επίδομα αδείας (subsídio de férias): obrigatório, meio mês de salário, pago com o início das férias.",
    },
    thirteenthSalary: {
      mandatory: true,
      payments: 2,
      description:
        "14 pagamentos via 3 bônus obrigatórios: Δώρο Χριστουγέννων (Natal, 1 mês) + Δώρο Πάσχα (Páscoa, ½ mês) + Επίδομα αδείας (Férias, ½ mês) = 2 meses extras. €880 × 14 = €12.320/ano. Taxa sub-25 abolida em 2019. Trabalhadores diários: €39,30/dia.",
    },
    taxes: {
      averageEffectiveRate: 0.22,
      socialContributions: 0.1412,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },

  // ============================================================
  // Grupo 3 — Abaixo de €900/mês
  // ============================================================
  {
    code: "MT",
    name: "Malta",
    nameLocal: "Malta",
    flag: "🇲🇹",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 961.05,
      hourlyRate: 5.54,
      definedPer: "week",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "DIER Gov.mt / Eurostat",
      effectiveDate: "2025-01-01",
      ageBasedRates: [
        { age: "18+", percentage: 100, monthlyRate: 961.05 },
        { age: "17", percentage: 97, monthlyRate: 930 },
        { age: "<17", percentage: 96, monthlyRate: 918 },
      ],
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 24,
      vacationDaysCommon: 24,
      vacationDaysType: "working",
      hasVacationBonus: false,
      vacationBonusDescription: "COLA (Cost of Living Allowance): €5,24/semana (€272,48/ano) aplicado automaticamente.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description: "Não há 13º salário obrigatório. Definido como €221,78/semana.",
    },
    taxes: {
      averageEffectiveRate: 0.15,
      socialContributions: 0.1,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "EE",
    name: "Estônia",
    nameLocal: "Eesti",
    flag: "🇪🇪",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 886,
      hourlyRate: 5.31,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Sotsiaalministeerium / Eurostat",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 28,
      vacationDaysCommon: 28,
      vacationDaysType: "calendar",
      hasVacationBonus: false,
      vacationBonusDescription: "28 dias corridos (não úteis). Férias calculadas pela média diária dos últimos 6 meses.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description: "Não há 13º salário obrigatório. Sem diferenciação por idade.",
    },
    taxes: {
      averageEffectiveRate: 0.2,
      socialContributions: 0.016,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "CZ",
    name: "Tchéquia",
    nameLocal: "Česko",
    flag: "🇨🇿",
    currency: "CZK",
    currencySymbol: "Kč",
    minimumWage: {
      grossMonthly: 832,
      grossMonthlyLocal: 20800,
      hourlyRate: 5.10,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "MPSV ČR / Eurostat",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 25,
      vacationDaysType: "working",
      hasVacationBonus: false,
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description: "Não obrigatório. Bônus anuais por desempenho são comuns no setor privado. Taxa horária: 124,40 Kč. Sem diferenciação por idade. 1 EUR ≈ 25 CZK.",
    },
    taxes: {
      averageEffectiveRate: 0.15,
      socialContributions: 0.11,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "SK",
    name: "Eslováquia",
    nameLocal: "Slovensko",
    flag: "🇸🇰",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 816,
      hourlyRate: 4.69,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Ministerstvo práce SR / Eurostat",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 25,
      vacationDaysType: "working",
      hasVacationBonus: false,
      vacationBonusDescription: "20 dias para <33 anos, 25 dias para 33+ anos.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description:
        "Não obrigatório, mas 13º e 14º são comuns e têm benefício fiscal. 13º (junho, requer 2+ anos) e 14º (dezembro, requer 4+ anos). 6 níveis de dificuldade: 1x a 2x o salário mínimo base.",
    },
    taxes: {
      averageEffectiveRate: 0.19,
      socialContributions: 0.134,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "RO",
    name: "Romênia",
    nameLocal: "România",
    flag: "🇷🇴",
    currency: "RON",
    currencySymbol: "lei",
    minimumWage: {
      grossMonthly: 814,
      grossMonthlyLocal: 4050,
      hourlyRate: 5.00,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Guvernul României / Romania Insider",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 21,
      vacationDaysType: "working",
      hasVacationBonus: false,
      vacationBonusDescription: "Indemnizație de concediu: calculada com base na média dos últimos 3 meses. Setor construção: 4.582 RON/mês.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description: "Não obrigatório no setor privado. Bônus de Natal é comum. Taxa horária: 24,50 RON. Líquido: ~2.430 RON (~€500). 1 EUR ≈ 4,97 RON.",
    },
    taxes: {
      averageEffectiveRate: 0.1,
      socialContributions: 0.25,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "LV",
    name: "Letônia",
    nameLocal: "Latvija",
    flag: "🇱🇻",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 740,
      hourlyRate: 4.62,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Labklājības ministrija / Eurostat",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 20,
      vacationDaysType: "working",
      hasVacationBonus: false,
      vacationBonusDescription: "+3 dias para trabalho perigoso, +3 dias para 3+ filhos <16 anos ou filho com deficiência, +1 dia para <3 filhos <14 anos. Menores de 18: 1 mês corrido.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description: "Não há 13º obrigatório. Bônus de Natal discricionários. Sem diferenciação por idade.",
    },
    taxes: {
      averageEffectiveRate: 0.2,
      socialContributions: 0.105,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "HU",
    name: "Hungria",
    nameLocal: "Magyarország",
    flag: "🇭🇺",
    currency: "HUF",
    currencySymbol: "Ft",
    minimumWage: {
      grossMonthly: 707,
      grossMonthlyLocal: 290800,
      hourlyRate: 3.72,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Kormány.hu / Eurostat",
      effectiveDate: "2025-01-01",
      skilledWorkerRate: {
        grossMonthlyLocal: 348800,
        grossMonthly: 848,
        hourlyRate: 4.47,
        description: "Garantált bérminimum (trabalhadores qualificados): 348.800 Ft/mês (~€848). Taxa horária: 2.005 Ft.",
      },
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 25,
      vacationDaysType: "working",
      hasVacationBonus: false,
      vacationBonusDescription: "Férias aumentam com idade: +1 dia a cada faixa etária (25, 28, 31, 33, 35, 37, 39, 41, 43, 45 anos), até máx 30 dias. +2 a +7 dias para pais conforme nº de filhos.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description: "13º abolido no setor público em 2009. Não obrigatório no privado. Diferenciação por qualificação, não por idade. 1 EUR ≈ 400 HUF.",
    },
    taxes: {
      averageEffectiveRate: 0.15,
      socialContributions: 0.185,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },
  {
    code: "BG",
    name: "Bulgária",
    nameLocal: "България",
    flag: "🇧🇬",
    currency: "BGN",
    currencySymbol: "лв",
    minimumWage: {
      grossMonthly: 551,
      grossMonthlyLocal: 1077,
      hourlyRate: 3.32,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Министерски съвет / TPA Bulgaria",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 20,
      vacationDaysType: "working",
      hasVacationBonus: false,
      vacationBonusDescription: "Requer mín. 4 meses de experiência. Férias não utilizadas expiram após 2 anos.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description: "Não obrigatório. Bônus a critério do empregador. Câmbio fixo: 1 EUR = 1,95583 BGN. Sem diferenciação por idade. Taxa horária: 6,49 лв.",
    },
    taxes: {
      averageEffectiveRate: 0.1,
      socialContributions: 0.1378,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: true,
  },

  // ============================================================
  // Países SEM salário mínimo estatutário
  // ============================================================
  {
    code: "DK",
    name: "Dinamarca",
    nameLocal: "Danmark",
    flag: "🇩🇰",
    currency: "DKK",
    currencySymbol: "kr",
    minimumWage: {
      grossMonthly: 0,
      definedPer: "hour",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Eurostat",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 37, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 25,
      vacationDaysCommon: 25,
      vacationDaysType: "working",
      hasVacationBonus: true,
      vacationBonusRate: 0.125,
      vacationBonusDescription:
        "Feriepenge: 12,5% do salário anual acumulado como férias pagas. Muitos acordos coletivos adicionam ~1% de ferietillæg (suplemento), totalizando ~13,5%.",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description: "Não há 13º obrigatório. O modelo dinamarquês (overenskomster) define salários via negociação entre sindicatos e empregadores. ~80-84% dos trabalhadores são cobertos. Salário mínimo típico via acordo: ~135-145 DKK/hora (~€18-19,50).",
    },
    taxes: {
      averageEffectiveRate: 0.35,
      socialContributions: 0.08,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: false,
    notes:
      "Sem salário mínimo por lei. Salários definidos por acordos coletivos (overenskomster). Cobertura: ~80-84%. Típico mínimo via acordo: ~135-145 DKK/hora (~€18-19,50/hora).",
  },
  {
    code: "IT",
    name: "Itália",
    nameLocal: "Italia",
    flag: "🇮🇹",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 0,
      definedPer: "month",
      annualPayments: 13,
      lastUpdated: "2025-01-01",
      source: "Eurostat",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 20,
      vacationDaysCommon: 22,
      vacationDaysType: "working",
      hasVacationBonus: false,
      vacationBonusDescription: "A quattordicesima (14º), quando aplicável, é paga em junho/julho e funciona como bônus de férias.",
    },
    thirteenthSalary: {
      mandatory: true,
      payments: 1,
      description:
        "Tredicesima (13ª) obrigatória por lei, paga em dezembro. Quattordicesima (14ª) obrigatória em muitos CCNL (Commercio, Turismo), mas não universal. Salários via CCNL: Comércio ~€1.550-1.650, Metal ~€1.550-1.700, Turismo ~€1.350-1.500/mês (nível mais baixo).",
    },
    taxes: {
      averageEffectiveRate: 0.25,
      socialContributions: 0.0919,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: false,
    notes:
      "Sem salário mínimo por lei. Art. 36 da Constituição garante 'salário justo'. Valores definidos por CCNL (Contratti Collettivi Nazionali). Proposta de €9/hora não aprovada. Faixas típicas: €1.350-1.700/mês.",
  },
  {
    code: "AT",
    name: "Áustria",
    nameLocal: "Österreich",
    flag: "🇦🇹",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 0,
      definedPer: "month",
      annualPayments: 14,
      lastUpdated: "2025-01-01",
      source: "Eurostat",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 25,
      vacationDaysCommon: 25,
      vacationDaysType: "working",
      hasVacationBonus: true,
      vacationBonusRate: 1,
      vacationBonusDescription: "Urlaubsgeld/Urlaubszuschuss (14º salário): obrigatório, pago em junho/julho antes das férias de verão. Tributado a taxa preferencial de apenas 6%.",
    },
    thirteenthSalary: {
      mandatory: true,
      payments: 2,
      description:
        "14 pagamentos obrigatórios: Weihnachtsgeld (13º, Natal, nov/dez) + Urlaubsgeld (14º, férias, jun/jul). Ambos com taxa de imposto preferencial de 6%. Cobertura por acordo coletivo: ~98% (filiação à WKO é obrigatória). Piso de facto: ~€2.000/mês. Após 25 anos: +5 dias de férias (30 total).",
    },
    taxes: {
      averageEffectiveRate: 0.33,
      socialContributions: 0.1812,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: false,
    notes:
      "Sem salário mínimo por lei. Cobertura por Kollektivverträge: ~98% (a mais alta da UE, pois filiação à WKO é obrigatória). Piso de facto: ~€2.000/mês. 14 pagamentos com imposto preferencial de 6%.",
  },
  {
    code: "FI",
    name: "Finlândia",
    nameLocal: "Suomi",
    flag: "🇫🇮",
    currency: "EUR",
    currencySymbol: "€",
    minimumWage: {
      grossMonthly: 0,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Eurostat",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 24,
      vacationDaysCommon: 30,
      vacationDaysType: "working",
      hasVacationBonus: true,
      vacationBonusRate: 0.5,
      vacationBonusDescription:
        "Lomaraha (bônus de férias): ~50% do salário de férias, obrigatório via praticamente todos os acordos coletivos. 2 dias/mês no 1º ano, 2,5 dias/mês após 1 ano (até 30 dias = 6 semanas, entre os mais generosos da UE).",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description: "Não há 13º obrigatório. O lomaraha (~50% do salário de férias) funciona como bônus. Acordos coletivos (TES) universalmente vinculantes cobrem ~89-90% dos trabalhadores. Faixas: Varejo ~€1.800-1.900, Hotel ~€1.700-1.850, Metal ~€1.900-2.100/mês.",
    },
    taxes: {
      averageEffectiveRate: 0.3,
      socialContributions: 0.1,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: false,
    notes:
      "Sem salário mínimo por lei. Acordos coletivos (TES) universalmente vinculantes. Cobertura: ~89-90%. Piso de facto: ~€1.800-2.000/mês.",
  },
  {
    code: "SE",
    name: "Suécia",
    nameLocal: "Sverige",
    flag: "🇸🇪",
    currency: "SEK",
    currencySymbol: "kr",
    minimumWage: {
      grossMonthly: 0,
      definedPer: "month",
      annualPayments: 12,
      lastUpdated: "2025-01-01",
      source: "Eurostat",
      effectiveDate: "2025-01-01",
    },
    workWeek: { standardHours: 40, maxHours: 48, daysPerWeek: 5 },
    holidays: {
      vacationDaysMin: 25,
      vacationDaysCommon: 25,
      vacationDaysType: "working",
      hasVacationBonus: true,
      vacationBonusRate: 0.008,
      vacationBonusDescription:
        "Semestertillägg: suplemento de ~0,8% do salário mensal por dia de férias (ou valor fixo de ~600-900 SEK/dia via acordo coletivo, total ~15.000-22.500 SEK).",
    },
    thirteenthSalary: {
      mandatory: false,
      payments: 0,
      description: "Não há 13º obrigatório. Salários via kollektivavtal. Sindicalização: ~70%, cobertura: ~88-90%. Piso típico: ~24.000-25.000 SEK/mês (~€2.100-2.200). Suécia resistiu ativamente à Diretiva de Salário Mínimo da UE.",
    },
    taxes: {
      averageEffectiveRate: 0.3,
      socialContributions: 0.07,
      disclaimer: taxDisclaimer,
    },
    hasStatutoryMinimumWage: false,
    notes:
      "Sem salário mínimo por lei. Kollektivavtal (acordos coletivos). Cobertura: ~88-90%. Piso típico: ~24.000-25.000 SEK/mês (~€2.100-2.200).",
  },
];

export const countriesWithMinWage = countries.filter(
  (c) => c.hasStatutoryMinimumWage
);

export const countriesWithoutMinWage = countries.filter(
  (c) => !c.hasStatutoryMinimumWage
);

export function getCountryByCode(code: string): CountryData | undefined {
  return countries.find((c) => c.code === code);
}
