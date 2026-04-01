export interface Translation {
  // Meta
  langName: string;
  langFlag: string;
  // Header
  brandSubtitle: string;
  calculator: string;
  // Country selector
  selectCountry: string;
  searchCountry: string;
  countriesNoMinWage: string;
  collectiveAgreement: string;
  // Country header
  grossMonthly: string;
  definedPerHour: string;
  ratesByAge: string;
  skilledWorkers: string;
  probationPeriod: string;
  // Tabs
  tabSalary: string;
  tabThirteenth: string;
  tabVacation: string;
  tabHolidays: string;
  // Salary calculator
  grossMonthlySalary: string;
  minimum: string;
  perHour: string;
  perDay: string;
  perWeek: string;
  perMonth: string;
  perYear: string;
  grossOnly: string;
  grossAndNet: string;
  netEstimate: string;
  workWeek: string;
  payments: string;
  definedBy: string;
  hour: string;
  week: string;
  month: string;
  effectiveDate: string;
  source: string;
  hoursPerDay: string;
  daysWorkedMonth: string;
  customHoursPerWeek: string;
  customDaysPerWeek: string;
  totalHoursMonth: string;
  totalDaysMonth: string;
  grossEarned: string;
  overtimeHours: string;
  regularHours: string;
  results: string;
  inputByHour: string;
  inputByMonth: string;
  grossMonthlyInput: string;
  noMinWageTitle: string;
  noMinWageDesc: string;
  enterSalary: string;
  // 13th salary
  monthsWorked: string;
  thirteenthProportional: string;
  fourteenthProportional: string;
  twelfths: string;
  vacationBonus: string;
  totalExtraPayments: string;
  noThirteenthTitle: string;
  noThirteenthDesc: string;
  // Vacation
  minLegal: string;
  commonPractice: string;
  days: string;
  hasVacationBonus: string;
  vacationDays: string;
  dailyValue: string;
  vacationValue: string;
  vacationBonusLabel: string;
  totalGrossVacation: string;
  baseDailyCalc: string;
  // Holidays
  workingDaysYear: string;
  nationalHolidays: string;
  holidaysOnWorkday: string;
  lostDaysOff: string;
  daysOff: string;
  legendHolidayWorkday: string;
  legendHolidayDayOff: string;
  legendDayOff: string;
  legendToday: string;
  today: string;
  dayOff: string;
  holidayOnWorkday: string;
  lostHoliday: string;
  normalWorkday: string;
  fixedDate: string;
  variableDate: string;
  weekend: string;
  nagerDisclaimer: string;
  // Empty state
  selectCountryBelow: string;
  countriesCount: string;
  // Footer
  dataSource: string;
  holidaysSource: string;
  disclaimer1: string;
  disclaimer2: string;
  // Months
  months: string[];
  // Days
  dayNames: string[];
  dayNamesFull: string[];
}

const en: Translation = {
  langName: "English",
  langFlag: "🇬🇧",
  brandSubtitle: "EU LABOR CALCULATOR",
  calculator: "Calculator",
  selectCountry: "Select a country",
  searchCountry: "Search country...",
  countriesNoMinWage: "Countries without statutory minimum wage",
  collectiveAgreement: "Collective agreement",
  grossMonthly: "Gross minimum wage/month",
  definedPerHour: "defined per hour",
  ratesByAge: "Rates by age",
  skilledWorkers: "Skilled workers",
  probationPeriod: "Probation period",
  tabSalary: "Salary",
  tabThirteenth: "13th Salary",
  tabVacation: "Vacation",
  tabHolidays: "Holidays",
  grossMonthlySalary: "Gross monthly salary (€)",
  minimum: "Minimum",
  perHour: "Per Hour",
  perDay: "Per Day",
  perWeek: "Per Week",
  perMonth: "Per Month",
  perYear: "Per Year",
  grossOnly: "Gross Only",
  grossAndNet: "Gross + Net",
  netEstimate: "net est.",
  workWeek: "Work week",
  payments: "Payments",
  definedBy: "Defined by",
  hour: "hour",
  week: "week",
  month: "month",
  effectiveDate: "Effective",
  source: "Source",
  hoursPerDay: "Hours per day",
  daysWorkedMonth: "Days worked (this month)",
  customHoursPerWeek: "Hours/week",
  customDaysPerWeek: "Days/week",
  totalHoursMonth: "Total hours this month",
  totalDaysMonth: "Total days this month",
  grossEarned: "Gross earned",
  overtimeHours: "Overtime hours",
  regularHours: "Regular hours",
  results: "Results",
  inputByHour: "Per hour",
  inputByMonth: "Per month",
  grossMonthlyInput: "Gross monthly (€)",
  noMinWageTitle: "does not have a statutory minimum wage",
  noMinWageDesc: "Enter a value below to calculate:",
  enterSalary: "Gross monthly salary in €",
  monthsWorked: "Months worked",
  thirteenthProportional: "13th Salary (proportional)",
  fourteenthProportional: "14th Salary (proportional)",
  twelfths: "twelfths",
  vacationBonus: "Vacation Bonus / Allowance",
  totalExtraPayments: "Total Extra Payments",
  noThirteenthTitle: "has no mandatory 13th salary or vacation bonus.",
  noThirteenthDesc: "Extra payments may exist via collective agreement or individual contract.",
  minLegal: "Legal minimum",
  commonPractice: "Common practice",
  days: "days",
  hasVacationBonus: "Has vacation bonus",
  vacationDays: "Vacation days",
  dailyValue: "Daily Value",
  vacationValue: "Vacation Pay",
  vacationBonusLabel: "Vacation Bonus / Allowance",
  totalGrossVacation: "Total Gross Vacation",
  baseDailyCalc: "Base: salary / 22 working days",
  workingDaysYear: "Working days/year",
  nationalHolidays: "National holidays",
  holidaysOnWorkday: "Holidays on workday",
  lostDaysOff: "Lost (day off)",
  daysOff: "Days off:",
  legendHolidayWorkday: "Holiday (workday)",
  legendHolidayDayOff: "Holiday (day off)",
  legendDayOff: "Day off",
  legendToday: "Today",
  today: "Today",
  dayOff: "Day off",
  holidayOnWorkday: "Holiday on workday",
  lostHoliday: "Lost holiday",
  normalWorkday: "Normal workday — no holiday.",
  fixedDate: "Fixed date",
  variableDate: "Variable date",
  weekend: "Weekend",
  nagerDisclaimer: "Data: Nager.Date API. May not include regional/local holidays.",
  selectCountryBelow: "Select a country above to start calculating",
  countriesCount: "22 EU countries with minimum wage + 5 with collective agreements",
  dataSource: "Data: Eurostat / Eurofound (2025-2026)",
  holidaysSource: "Holidays: Nager.Date API",
  disclaimer1: "Minimum wage values are for reference and may not reflect recent changes. Always consult the official legislation.",
  disclaimer2: "Tax calculations are estimates and do not replace professional tax advice.",
  months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  dayNames: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
  dayNamesFull: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
};

const pt: Translation = {
  langName: "Português",
  langFlag: "🇵🇹",
  brandSubtitle: "CALCULADORA TRABALHISTA EU",
  calculator: "Calculadora",
  selectCountry: "Selecione um país",
  searchCountry: "Buscar país...",
  countriesNoMinWage: "Países sem salário mínimo estatutário",
  collectiveAgreement: "Acordo coletivo",
  grossMonthly: "Salário mínimo bruto/mês",
  definedPerHour: "definido por hora",
  ratesByAge: "Taxas por idade",
  skilledWorkers: "Trabalhadores qualificados",
  probationPeriod: "Período probatório",
  tabSalary: "Salário",
  tabThirteenth: "13º Salário",
  tabVacation: "Férias",
  tabHolidays: "Feriados",
  grossMonthlySalary: "Salário mensal bruto (€)",
  minimum: "Mínimo",
  perHour: "Por Hora",
  perDay: "Por Dia",
  perWeek: "Por Semana",
  perMonth: "Por Mês",
  perYear: "Por Ano",
  grossOnly: "Apenas Bruto",
  grossAndNet: "Bruto + Líquido",
  netEstimate: "líq. est.",
  workWeek: "Jornada",
  payments: "Pagamentos",
  definedBy: "Definido por",
  hour: "hora",
  week: "semana",
  month: "mês",
  effectiveDate: "Vigência",
  source: "Fonte",
  hoursPerDay: "Horas por dia",
  daysWorkedMonth: "Dias trabalhados (este mês)",
  customHoursPerWeek: "Horas/semana",
  customDaysPerWeek: "Dias/semana",
  totalHoursMonth: "Total de horas no mês",
  totalDaysMonth: "Total de dias no mês",
  grossEarned: "Bruto ganho",
  overtimeHours: "Horas extra",
  regularHours: "Horas normais",
  results: "Resultados",
  inputByHour: "Por hora",
  inputByMonth: "Por mês",
  grossMonthlyInput: "Bruto mensal (€)",
  noMinWageTitle: "não possui salário mínimo estatutário",
  noMinWageDesc: "Insira um valor abaixo para calcular:",
  enterSalary: "Salário mensal bruto em €",
  monthsWorked: "Meses trabalhados",
  thirteenthProportional: "13º Salário Proporcional",
  fourteenthProportional: "14º Salário Proporcional",
  twelfths: "avos",
  vacationBonus: "Subsídio de Férias (Vakantiegeld / Bonus)",
  totalExtraPayments: "Total de Pagamentos Extras",
  noThirteenthTitle: "não possui 13º salário obrigatório nem subsídio de férias legal.",
  noThirteenthDesc: "Pagamentos extras podem existir via acordo coletivo ou contrato individual.",
  minLegal: "Mínimo legal",
  commonPractice: "Prática comum",
  days: "dias",
  hasVacationBonus: "Tem subsídio de férias",
  vacationDays: "Dias de férias",
  dailyValue: "Valor Diário",
  vacationValue: "Valor das Férias",
  vacationBonusLabel: "Subsídio / Adicional de Férias",
  totalGrossVacation: "Total Bruto de Férias",
  baseDailyCalc: "Base: salário / 22 dias úteis",
  workingDaysYear: "Dias úteis no ano",
  nationalHolidays: "Feriados nacionais",
  holidaysOnWorkday: "Feriados em dia útil",
  lostDaysOff: "Perdidos (dia de folga)",
  daysOff: "Folgas:",
  legendHolidayWorkday: "Feriado (dia útil)",
  legendHolidayDayOff: "Feriado (dia de folga)",
  legendDayOff: "Dia de folga",
  legendToday: "Hoje",
  today: "Hoje",
  dayOff: "Dia de folga",
  holidayOnWorkday: "Feriado em dia útil",
  lostHoliday: "Feriado perdido",
  normalWorkday: "Dia útil normal — sem feriado.",
  fixedDate: "Data fixa",
  variableDate: "Data variável",
  weekend: "Fim de semana",
  nagerDisclaimer: "Dados: Nager.Date API. Podem não incluir feriados regionais/locais.",
  selectCountryBelow: "Selecione um país acima para começar os cálculos",
  countriesCount: "22 países da UE com salário mínimo + 5 com acordo coletivo",
  dataSource: "Dados: Eurostat / Eurofound (2025-2026)",
  holidaysSource: "Feriados: Nager.Date API",
  disclaimer1: "Os valores de salário mínimo são referência e podem não refletir alterações recentes. Consulte sempre a legislação oficial do país.",
  disclaimer2: "Os cálculos de impostos são estimativas e não substituem consultoria fiscal profissional.",
  months: ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
  dayNames: ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"],
  dayNamesFull: ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],
};

const de: Translation = { ...en, langName: "Deutsch", langFlag: "🇩🇪", brandSubtitle: "EU-ARBEITSRECHNER", calculator: "Rechner", selectCountry: "Land auswählen", searchCountry: "Land suchen...", countriesNoMinWage: "Länder ohne gesetzlichen Mindestlohn", collectiveAgreement: "Tarifvertrag", grossMonthly: "Brutto-Mindestlohn/Monat", definedPerHour: "pro Stunde definiert", ratesByAge: "Sätze nach Alter", tabSalary: "Gehalt", tabThirteenth: "13. Gehalt", tabVacation: "Urlaub", tabHolidays: "Feiertage", grossMonthlySalary: "Bruttomonatsgehalt (€)", minimum: "Minimum", perHour: "Pro Stunde", perDay: "Pro Tag", perWeek: "Pro Woche", perMonth: "Pro Monat", perYear: "Pro Jahr", grossOnly: "Nur Brutto", grossAndNet: "Brutto + Netto", netEstimate: "netto gesch.", workWeek: "Arbeitswoche", payments: "Zahlungen", definedBy: "Definiert nach", hour: "Stunde", week: "Woche", month: "Monat", effectiveDate: "Gültig ab", source: "Quelle", noMinWageTitle: "hat keinen gesetzlichen Mindestlohn", noMinWageDesc: "Geben Sie einen Wert ein:", enterSalary: "Bruttomonatsgehalt in €", monthsWorked: "Gearbeitete Monate", thirteenthProportional: "13. Gehalt (anteilig)", fourteenthProportional: "14. Gehalt (anteilig)", twelfths: "Zwölftel", vacationBonus: "Urlaubsgeld", totalExtraPayments: "Gesamte Sonderzahlungen", noThirteenthTitle: "hat kein gesetzliches 13. Gehalt.", noThirteenthDesc: "Sonderzahlungen können über Tarifverträge bestehen.", minLegal: "Gesetzliches Minimum", commonPractice: "Übliche Praxis", days: "Tage", hasVacationBonus: "Hat Urlaubsgeld", vacationDays: "Urlaubstage", dailyValue: "Tageswert", vacationValue: "Urlaubsgeld", vacationBonusLabel: "Urlaubszuschuss", totalGrossVacation: "Bruttourlaub gesamt", baseDailyCalc: "Basis: Gehalt / 22 Arbeitstage", workingDaysYear: "Arbeitstage/Jahr", nationalHolidays: "Feiertage", holidaysOnWorkday: "Feiertage an Werktagen", lostDaysOff: "Verloren (freier Tag)", daysOff: "Freie Tage:", legendHolidayWorkday: "Feiertag (Werktag)", legendHolidayDayOff: "Feiertag (freier Tag)", legendDayOff: "Freier Tag", legendToday: "Heute", today: "Heute", dayOff: "Freier Tag", holidayOnWorkday: "Feiertag am Werktag", lostHoliday: "Verlorener Feiertag", normalWorkday: "Normaler Arbeitstag.", fixedDate: "Festes Datum", variableDate: "Variables Datum", weekend: "Wochenende", nagerDisclaimer: "Daten: Nager.Date API.", selectCountryBelow: "Wählen Sie ein Land aus", countriesCount: "22 EU-Länder mit Mindestlohn + 5 mit Tarifverträgen", dataSource: "Daten: Eurostat / Eurofound (2025-2026)", holidaysSource: "Feiertage: Nager.Date API", disclaimer1: "Mindestlohnwerte dienen als Referenz. Konsultieren Sie immer die offizielle Gesetzgebung.", disclaimer2: "Steuerberechnungen sind Schätzungen.", months: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"], dayNames: ["Mo","Di","Mi","Do","Fr","Sa","So"], dayNamesFull: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"] };

const fr: Translation = { ...en, langName: "Français", langFlag: "🇫🇷", brandSubtitle: "CALCULATEUR SOCIAL EU", calculator: "Calculatrice", selectCountry: "Sélectionner un pays", searchCountry: "Rechercher un pays...", countriesNoMinWage: "Pays sans salaire minimum légal", collectiveAgreement: "Convention collective", grossMonthly: "Salaire minimum brut/mois", definedPerHour: "défini à l'heure", ratesByAge: "Taux par âge", tabSalary: "Salaire", tabThirteenth: "13e Mois", tabVacation: "Congés", tabHolidays: "Jours fériés", grossMonthlySalary: "Salaire mensuel brut (€)", minimum: "Minimum", perHour: "Par Heure", perDay: "Par Jour", perWeek: "Par Semaine", perMonth: "Par Mois", perYear: "Par An", grossOnly: "Brut seul", grossAndNet: "Brut + Net", netEstimate: "net est.", workWeek: "Semaine de travail", payments: "Versements", definedBy: "Défini par", hour: "heure", week: "semaine", month: "mois", effectiveDate: "En vigueur", source: "Source", noMinWageTitle: "n'a pas de salaire minimum légal", noMinWageDesc: "Entrez une valeur ci-dessous :", enterSalary: "Salaire mensuel brut en €", monthsWorked: "Mois travaillés", thirteenthProportional: "13e Mois (proportionnel)", fourteenthProportional: "14e Mois (proportionnel)", twelfths: "douzièmes", vacationBonus: "Prime de vacances", totalExtraPayments: "Total des paiements supplémentaires", noThirteenthTitle: "n'a pas de 13e mois obligatoire.", noThirteenthDesc: "Des paiements supplémentaires peuvent exister via convention collective.", minLegal: "Minimum légal", commonPractice: "Pratique courante", days: "jours", hasVacationBonus: "A une prime de vacances", vacationDays: "Jours de congé", dailyValue: "Valeur Journalière", vacationValue: "Indemnité de Congé", vacationBonusLabel: "Prime de Vacances", totalGrossVacation: "Total Brut Congés", baseDailyCalc: "Base : salaire / 22 jours ouvrés", workingDaysYear: "Jours ouvrés/an", nationalHolidays: "Jours fériés", holidaysOnWorkday: "Fériés en jour ouvré", lostDaysOff: "Perdus (jour de repos)", daysOff: "Repos :", legendHolidayWorkday: "Férié (jour ouvré)", legendHolidayDayOff: "Férié (jour de repos)", legendDayOff: "Jour de repos", legendToday: "Aujourd'hui", today: "Aujourd'hui", dayOff: "Jour de repos", holidayOnWorkday: "Férié en jour ouvré", lostHoliday: "Férié perdu", normalWorkday: "Jour ouvré normal.", fixedDate: "Date fixe", variableDate: "Date variable", weekend: "Week-end", nagerDisclaimer: "Données : API Nager.Date.", selectCountryBelow: "Sélectionnez un pays pour commencer", countriesCount: "22 pays UE avec salaire minimum + 5 avec conventions collectives", dataSource: "Données : Eurostat / Eurofound (2025-2026)", holidaysSource: "Jours fériés : API Nager.Date", disclaimer1: "Les valeurs de salaire minimum sont indicatives. Consultez toujours la législation officielle.", disclaimer2: "Les calculs fiscaux sont des estimations.", months: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"], dayNames: ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"], dayNamesFull: ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"] };

const es: Translation = { ...en, langName: "Español", langFlag: "🇪🇸", brandSubtitle: "CALCULADORA LABORAL UE", calculator: "Calculadora", selectCountry: "Seleccionar un país", searchCountry: "Buscar país...", countriesNoMinWage: "Países sin salario mínimo legal", collectiveAgreement: "Convenio colectivo", grossMonthly: "Salario mínimo bruto/mes", definedPerHour: "definido por hora", ratesByAge: "Tarifas por edad", tabSalary: "Salario", tabThirteenth: "Paga Extra", tabVacation: "Vacaciones", tabHolidays: "Festivos", grossMonthlySalary: "Salario mensual bruto (€)", minimum: "Mínimo", perHour: "Por Hora", perDay: "Por Día", perWeek: "Por Semana", perMonth: "Por Mes", perYear: "Por Año", grossOnly: "Solo Bruto", grossAndNet: "Bruto + Neto", netEstimate: "neto est.", workWeek: "Jornada", payments: "Pagas", definedBy: "Definido por", hour: "hora", week: "semana", month: "mes", effectiveDate: "Vigencia", source: "Fuente", noMinWageTitle: "no tiene salario mínimo legal", noMinWageDesc: "Introduzca un valor:", enterSalary: "Salario mensual bruto en €", monthsWorked: "Meses trabajados", thirteenthProportional: "Paga Extra (proporcional)", fourteenthProportional: "14ª Paga (proporcional)", twelfths: "doceavos", vacationBonus: "Plus de Vacaciones", totalExtraPayments: "Total Pagos Extras", noThirteenthTitle: "no tiene paga extra obligatoria.", noThirteenthDesc: "Pueden existir pagos extra por convenio colectivo.", minLegal: "Mínimo legal", commonPractice: "Práctica común", days: "días", hasVacationBonus: "Tiene plus vacacional", vacationDays: "Días de vacaciones", dailyValue: "Valor Diario", vacationValue: "Pago Vacacional", vacationBonusLabel: "Plus de Vacaciones", totalGrossVacation: "Total Bruto Vacaciones", baseDailyCalc: "Base: salario / 22 días laborables", workingDaysYear: "Días laborables/año", nationalHolidays: "Festivos nacionales", holidaysOnWorkday: "Festivos en día laboral", lostDaysOff: "Perdidos (día libre)", daysOff: "Días libres:", legendHolidayWorkday: "Festivo (día laboral)", legendHolidayDayOff: "Festivo (día libre)", legendDayOff: "Día libre", legendToday: "Hoy", today: "Hoy", dayOff: "Día libre", holidayOnWorkday: "Festivo en día laboral", lostHoliday: "Festivo perdido", normalWorkday: "Día laboral normal.", fixedDate: "Fecha fija", variableDate: "Fecha variable", weekend: "Fin de semana", nagerDisclaimer: "Datos: API Nager.Date.", selectCountryBelow: "Seleccione un país para empezar", countriesCount: "22 países UE con salario mínimo + 5 con convenios colectivos", dataSource: "Datos: Eurostat / Eurofound (2025-2026)", holidaysSource: "Festivos: API Nager.Date", disclaimer1: "Los valores de salario mínimo son orientativos. Consulte siempre la legislación oficial.", disclaimer2: "Los cálculos fiscales son estimaciones.", months: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"], dayNames: ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"], dayNamesFull: ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"] };

const it: Translation = { ...en, langName: "Italiano", langFlag: "🇮🇹", brandSubtitle: "CALCOLATORE LAVORO UE", calculator: "Calcolatrice", selectCountry: "Seleziona un paese", searchCountry: "Cerca paese...", countriesNoMinWage: "Paesi senza salario minimo legale", collectiveAgreement: "Contratto collettivo", grossMonthly: "Salario minimo lordo/mese", definedPerHour: "definito a ore", ratesByAge: "Tariffe per età", tabSalary: "Stipendio", tabThirteenth: "Tredicesima", tabVacation: "Ferie", tabHolidays: "Festività", grossMonthlySalary: "Stipendio mensile lordo (€)", minimum: "Minimo", perHour: "All'Ora", perDay: "Al Giorno", perWeek: "A Settimana", perMonth: "Al Mese", perYear: "All'Anno", grossOnly: "Solo Lordo", grossAndNet: "Lordo + Netto", netEstimate: "netto stim.", workWeek: "Settimana lavorativa", payments: "Mensilità", definedBy: "Definito per", hour: "ora", week: "settimana", month: "mese", effectiveDate: "In vigore", source: "Fonte", noMinWageTitle: "non ha un salario minimo legale", noMinWageDesc: "Inserisci un valore:", enterSalary: "Stipendio mensile lordo in €", monthsWorked: "Mesi lavorati", thirteenthProportional: "Tredicesima (proporzionale)", fourteenthProportional: "Quattordicesima (proporzionale)", twelfths: "dodicesimi", vacationBonus: "Indennità Ferie", totalExtraPayments: "Totale Pagamenti Extra", noThirteenthTitle: "non ha tredicesima obbligatoria.", noThirteenthDesc: "Pagamenti extra possono esistere tramite CCNL.", minLegal: "Minimo legale", commonPractice: "Pratica comune", days: "giorni", hasVacationBonus: "Ha indennità ferie", vacationDays: "Giorni di ferie", dailyValue: "Valore Giornaliero", vacationValue: "Indennità Ferie", vacationBonusLabel: "Bonus Ferie", totalGrossVacation: "Totale Lordo Ferie", baseDailyCalc: "Base: stipendio / 22 giorni lavorativi", workingDaysYear: "Giorni lavorativi/anno", nationalHolidays: "Festività nazionali", holidaysOnWorkday: "Festività in giorno lavorativo", lostDaysOff: "Persi (giorno libero)", daysOff: "Giorni liberi:", legendHolidayWorkday: "Festività (giorno lavorativo)", legendHolidayDayOff: "Festività (giorno libero)", legendDayOff: "Giorno libero", legendToday: "Oggi", today: "Oggi", dayOff: "Giorno libero", holidayOnWorkday: "Festività in giorno lavorativo", lostHoliday: "Festività persa", normalWorkday: "Giorno lavorativo normale.", fixedDate: "Data fissa", variableDate: "Data variabile", weekend: "Fine settimana", nagerDisclaimer: "Dati: API Nager.Date.", selectCountryBelow: "Seleziona un paese per iniziare", countriesCount: "22 paesi UE con salario minimo + 5 con contratti collettivi", dataSource: "Dati: Eurostat / Eurofound (2025-2026)", holidaysSource: "Festività: API Nager.Date", disclaimer1: "I valori del salario minimo sono indicativi. Consultare sempre la legislazione ufficiale.", disclaimer2: "I calcoli fiscali sono stime.", months: ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"], dayNames: ["Lun","Mar","Mer","Gio","Ven","Sab","Dom"], dayNamesFull: ["Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"] };

const nl: Translation = { ...en, langName: "Nederlands", langFlag: "🇳🇱", brandSubtitle: "EU-ARBEIDSCALCULATOR", calculator: "Rekenmachine", selectCountry: "Selecteer een land", searchCountry: "Land zoeken...", countriesNoMinWage: "Landen zonder wettelijk minimumloon", collectiveAgreement: "Cao", grossMonthly: "Bruto minimumloon/maand", definedPerHour: "per uur gedefinieerd", ratesByAge: "Tarieven per leeftijd", tabSalary: "Salaris", tabThirteenth: "13e Maand", tabVacation: "Vakantie", tabHolidays: "Feestdagen", grossMonthlySalary: "Bruto maandsalaris (€)", minimum: "Minimum", perHour: "Per Uur", perDay: "Per Dag", perWeek: "Per Week", perMonth: "Per Maand", perYear: "Per Jaar", grossOnly: "Alleen Bruto", grossAndNet: "Bruto + Netto", netEstimate: "netto gesch.", workWeek: "Werkweek", payments: "Betalingen", definedBy: "Gedefinieerd per", hour: "uur", week: "week", month: "maand", effectiveDate: "Ingangsdatum", source: "Bron", noMinWageTitle: "heeft geen wettelijk minimumloon", noMinWageDesc: "Voer een waarde in:", enterSalary: "Bruto maandsalaris in €", monthsWorked: "Gewerkte maanden", thirteenthProportional: "13e Maand (evenredig)", fourteenthProportional: "14e Maand (evenredig)", twelfths: "twaalfden", vacationBonus: "Vakantiegeld", totalExtraPayments: "Totaal Extra Betalingen", noThirteenthTitle: "heeft geen verplichte 13e maand.", noThirteenthDesc: "Extra betalingen kunnen bestaan via cao.", minLegal: "Wettelijk minimum", commonPractice: "Gangbare praktijk", days: "dagen", hasVacationBonus: "Heeft vakantiegeld", vacationDays: "Vakantiedagen", dailyValue: "Dagwaarde", vacationValue: "Vakantiegeld", vacationBonusLabel: "Vakantietoeslag", totalGrossVacation: "Totaal Bruto Vakantie", baseDailyCalc: "Basis: salaris / 22 werkdagen", workingDaysYear: "Werkdagen/jaar", nationalHolidays: "Feestdagen", holidaysOnWorkday: "Feestdagen op werkdag", lostDaysOff: "Verloren (vrije dag)", daysOff: "Vrije dagen:", legendHolidayWorkday: "Feestdag (werkdag)", legendHolidayDayOff: "Feestdag (vrije dag)", legendDayOff: "Vrije dag", legendToday: "Vandaag", today: "Vandaag", dayOff: "Vrije dag", holidayOnWorkday: "Feestdag op werkdag", lostHoliday: "Verloren feestdag", normalWorkday: "Normale werkdag.", fixedDate: "Vaste datum", variableDate: "Variabele datum", weekend: "Weekend", nagerDisclaimer: "Data: Nager.Date API.", selectCountryBelow: "Selecteer een land om te beginnen", countriesCount: "22 EU-landen met minimumloon + 5 met cao's", dataSource: "Data: Eurostat / Eurofound (2025-2026)", holidaysSource: "Feestdagen: Nager.Date API", disclaimer1: "Minimumloonwaarden zijn indicatief. Raadpleeg altijd de officiële wetgeving.", disclaimer2: "Belastingberekeningen zijn schattingen.", months: ["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"], dayNames: ["Ma","Di","Wo","Do","Vr","Za","Zo"], dayNamesFull: ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"] };

const pl: Translation = { ...en, langName: "Polski", langFlag: "🇵🇱", brandSubtitle: "KALKULATOR PRACY UE", calculator: "Kalkulator", selectCountry: "Wybierz kraj", searchCountry: "Szukaj kraju...", countriesNoMinWage: "Kraje bez ustawowej płacy minimalnej", collectiveAgreement: "Układ zbiorowy", grossMonthly: "Płaca minimalna brutto/mies.", definedPerHour: "za godzinę", ratesByAge: "Stawki wg wieku", tabSalary: "Wynagrodzenie", tabThirteenth: "13. pensja", tabVacation: "Urlop", tabHolidays: "Święta", grossMonthlySalary: "Wynagrodzenie brutto (€)", minimum: "Minimum", perHour: "Za Godzinę", perDay: "Za Dzień", perWeek: "Za Tydzień", perMonth: "Za Miesiąc", perYear: "Za Rok", grossOnly: "Tylko Brutto", grossAndNet: "Brutto + Netto", netEstimate: "netto sza.", workWeek: "Tydzień pracy", payments: "Wypłaty", definedBy: "Zdefiniowane przez", hour: "godzinę", week: "tydzień", month: "miesiąc", effectiveDate: "Od", source: "Źródło", noMinWageTitle: "nie ma ustawowej płacy minimalnej", noMinWageDesc: "Wprowadź wartość:", enterSalary: "Miesięczne brutto w €", monthsWorked: "Przepracowane miesiące", thirteenthProportional: "13. pensja (proporcjonalna)", fourteenthProportional: "14. pensja (proporcjonalna)", twelfths: "dwunastych", vacationBonus: "Dodatek urlopowy", totalExtraPayments: "Łączne dodatkowe wypłaty", noThirteenthTitle: "nie ma obowiązkowej 13. pensji.", noThirteenthDesc: "Dodatkowe wypłaty mogą istnieć na mocy układów zbiorowych.", minLegal: "Minimum ustawowe", commonPractice: "Powszechna praktyka", days: "dni", hasVacationBonus: "Ma dodatek urlopowy", vacationDays: "Dni urlopu", dailyValue: "Wartość Dzienna", vacationValue: "Wynagrodzenie Urlopowe", vacationBonusLabel: "Dodatek Urlopowy", totalGrossVacation: "Łączny Brutto Urlop", baseDailyCalc: "Baza: pensja / 22 dni robocze", workingDaysYear: "Dni robocze/rok", nationalHolidays: "Święta państwowe", holidaysOnWorkday: "Święta w dzień roboczy", lostDaysOff: "Stracone (dzień wolny)", daysOff: "Dni wolne:", legendHolidayWorkday: "Święto (dzień roboczy)", legendHolidayDayOff: "Święto (dzień wolny)", legendDayOff: "Dzień wolny", legendToday: "Dziś", today: "Dziś", dayOff: "Dzień wolny", holidayOnWorkday: "Święto w dzień roboczy", lostHoliday: "Stracone święto", normalWorkday: "Normalny dzień roboczy.", fixedDate: "Stała data", variableDate: "Zmienna data", weekend: "Weekend", nagerDisclaimer: "Dane: Nager.Date API.", selectCountryBelow: "Wybierz kraj, aby rozpocząć", countriesCount: "22 kraje UE z płacą minimalną + 5 z układami zbiorowymi", dataSource: "Dane: Eurostat / Eurofound (2025-2026)", holidaysSource: "Święta: Nager.Date API", disclaimer1: "Wartości płacy minimalnej mają charakter orientacyjny.", disclaimer2: "Obliczenia podatkowe są szacunkowe.", months: ["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"], dayNames: ["Pn","Wt","Śr","Cz","Pt","So","Nd"], dayNamesFull: ["Niedziela","Poniedziałek","Wtorek","Środa","Czwartek","Piątek","Sobota"] };

const ro: Translation = { ...en, langName: "Română", langFlag: "🇷🇴", brandSubtitle: "CALCULATOR SALARIAL UE", calculator: "Calculator", selectCountry: "Selectați o țară", searchCountry: "Căutați o țară...", countriesNoMinWage: "Țări fără salariu minim legal", collectiveAgreement: "Contract colectiv", grossMonthly: "Salariu minim brut/lună", tabSalary: "Salariu", tabThirteenth: "Al 13-lea", tabVacation: "Concediu", tabHolidays: "Sărbători", grossMonthlySalary: "Salariu brut lunar (€)", perHour: "Pe Oră", perDay: "Pe Zi", perWeek: "Pe Săptămână", perMonth: "Pe Lună", perYear: "Pe An", grossOnly: "Doar Brut", grossAndNet: "Brut + Net", monthsWorked: "Luni lucrate", workingDaysYear: "Zile lucrătoare/an", nationalHolidays: "Sărbători naționale", days: "zile", today: "Azi", months: ["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"], dayNames: ["Lu","Ma","Mi","Jo","Vi","Sâ","Du"], dayNamesFull: ["Duminică","Luni","Marți","Miercuri","Joi","Vineri","Sâmbătă"], selectCountryBelow: "Selectați o țară pentru a începe", countriesCount: "22 țări UE cu salariu minim + 5 cu contracte colective" };

const cs: Translation = { ...en, langName: "Čeština", langFlag: "🇨🇿", brandSubtitle: "PRACOVNÍ KALKULAČKA EU", calculator: "Kalkulačka", selectCountry: "Vyberte zemi", searchCountry: "Hledat zemi...", tabSalary: "Plat", tabThirteenth: "13. plat", tabVacation: "Dovolená", tabHolidays: "Svátky", grossMonthlySalary: "Hrubý měsíční plat (€)", perHour: "Za Hodinu", perDay: "Za Den", perWeek: "Za Týden", perMonth: "Za Měsíc", perYear: "Za Rok", grossOnly: "Pouze Hrubý", grossAndNet: "Hrubý + Čistý", monthsWorked: "Odpracované měsíce", workingDaysYear: "Pracovní dny/rok", nationalHolidays: "Státní svátky", days: "dní", today: "Dnes", months: ["Leden","Únor","Březen","Duben","Květen","Červen","Červenec","Srpen","Září","Říjen","Listopad","Prosinec"], dayNames: ["Po","Út","St","Čt","Pá","So","Ne"], dayNamesFull: ["Neděle","Pondělí","Úterý","Středa","Čtvrtek","Pátek","Sobota"], selectCountryBelow: "Vyberte zemi pro zahájení", countriesCount: "22 zemí EU s minimální mzdou + 5 s kolektivními smlouvami" };

const hu: Translation = { ...en, langName: "Magyar", langFlag: "🇭🇺", brandSubtitle: "EU MUNKAÜGYI KALKULÁTOR", calculator: "Számológép", selectCountry: "Válasszon országot", searchCountry: "Ország keresése...", tabSalary: "Bér", tabThirteenth: "13. havi", tabVacation: "Szabadság", tabHolidays: "Ünnepnapok", grossMonthlySalary: "Bruttó havi bér (€)", perHour: "Óránként", perDay: "Naponta", perWeek: "Hetente", perMonth: "Havonta", perYear: "Évente", grossOnly: "Csak Bruttó", grossAndNet: "Bruttó + Nettó", monthsWorked: "Ledolgozott hónapok", workingDaysYear: "Munkanapok/év", nationalHolidays: "Ünnepnapok", days: "nap", today: "Ma", months: ["Január","Február","Március","Április","Május","Június","Július","Augusztus","Szeptember","Október","November","December"], dayNames: ["Hé","Ke","Sze","Csü","Pé","Szo","Va"], dayNamesFull: ["Vasárnap","Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat"], selectCountryBelow: "Válasszon országot a számításokhoz", countriesCount: "22 EU-ország minimálbérrel + 5 kollektív szerződéssel" };

const bg: Translation = { ...en, langName: "Български", langFlag: "🇧🇬", brandSubtitle: "ТРУДОВ КАЛКУЛАТОР ЕС", calculator: "Калкулатор", selectCountry: "Изберете държава", searchCountry: "Търсене на държава...", tabSalary: "Заплата", tabThirteenth: "13-та заплата", tabVacation: "Отпуск", tabHolidays: "Празници", perHour: "На Час", perDay: "На Ден", perWeek: "На Седмица", perMonth: "На Месец", perYear: "На Година", monthsWorked: "Отработени месеци", workingDaysYear: "Работни дни/год.", nationalHolidays: "Национални празници", days: "дни", today: "Днес", months: ["Януари","Февруари","Март","Април","Май","Юни","Юли","Август","Септември","Октомври","Ноември","Декември"], dayNames: ["Пн","Вт","Ср","Чт","Пт","Сб","Нд"], dayNamesFull: ["Неделя","Понеделник","Вторник","Сряда","Четвъртък","Петък","Събота"], selectCountryBelow: "Изберете държава, за да започнете", countriesCount: "22 страни от ЕС с минимална заплата + 5 с колективни договори" };

const el: Translation = { ...en, langName: "Ελληνικά", langFlag: "🇬🇷", brandSubtitle: "ΕΡΓΑΣΙΑΚΟΣ ΥΠΟΛΟΓΙΣΤΗΣ ΕΕ", calculator: "Αριθμομηχανή", selectCountry: "Επιλέξτε χώρα", searchCountry: "Αναζήτηση χώρας...", tabSalary: "Μισθός", tabThirteenth: "Δώρα", tabVacation: "Άδεια", tabHolidays: "Αργίες", perHour: "Ανά Ώρα", perDay: "Ανά Ημέρα", perWeek: "Ανά Εβδομάδα", perMonth: "Ανά Μήνα", perYear: "Ανά Έτος", monthsWorked: "Μήνες εργασίας", workingDaysYear: "Εργάσιμες ημέρες/έτος", nationalHolidays: "Εθνικές αργίες", days: "ημέρες", today: "Σήμερα", months: ["Ιανουάριος","Φεβρουάριος","Μάρτιος","Απρίλιος","Μάιος","Ιούνιος","Ιούλιος","Αύγουστος","Σεπτέμβριος","Οκτώβριος","Νοέμβριος","Δεκέμβριος"], dayNames: ["Δε","Τρ","Τε","Πέ","Πα","Σά","Κυ"], dayNamesFull: ["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"], selectCountryBelow: "Επιλέξτε μια χώρα για να ξεκινήσετε", countriesCount: "22 χώρες ΕΕ με κατώτατο μισθό + 5 με συλλογικές συμβάσεις" };

const hr: Translation = { ...en, langName: "Hrvatski", langFlag: "🇭🇷", brandSubtitle: "EU KALKULATOR PLAĆA", calculator: "Kalkulator", selectCountry: "Odaberite državu", searchCountry: "Pretraži državu...", tabSalary: "Plaća", tabThirteenth: "13. plaća", tabVacation: "Godišnji", tabHolidays: "Blagdani", perHour: "Po Satu", perDay: "Po Danu", perWeek: "Po Tjednu", perMonth: "Po Mjesecu", perYear: "Po Godini", monthsWorked: "Odrađeni mjeseci", workingDaysYear: "Radni dani/god.", nationalHolidays: "Državni blagdani", days: "dana", today: "Danas", months: ["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"], dayNames: ["Po","Ut","Sr","Če","Pe","Su","Ne"], dayNamesFull: ["Nedjelja","Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subota"], selectCountryBelow: "Odaberite državu za početak", countriesCount: "22 EU zemlje s minimalnom plaćom + 5 s kolektivnim ugovorima" };

const sk: Translation = { ...en, langName: "Slovenčina", langFlag: "🇸🇰", brandSubtitle: "PRACOVNÁ KALKULAČKA EÚ", calculator: "Kalkulačka", selectCountry: "Vyberte krajinu", searchCountry: "Hľadať krajinu...", tabSalary: "Plat", tabThirteenth: "13. plat", tabVacation: "Dovolenka", tabHolidays: "Sviatky", perHour: "Za Hodinu", perDay: "Za Deň", perWeek: "Za Týždeň", perMonth: "Za Mesiac", perYear: "Za Rok", monthsWorked: "Odpracované mesiace", workingDaysYear: "Pracovné dni/rok", nationalHolidays: "Štátne sviatky", days: "dní", today: "Dnes", months: ["Január","Február","Marec","Apríl","Máj","Jún","Júl","August","September","Október","November","December"], dayNames: ["Po","Ut","St","Št","Pi","So","Ne"], dayNamesFull: ["Nedeľa","Pondelok","Utorok","Streda","Štvrtok","Piatok","Sobota"], selectCountryBelow: "Vyberte krajinu pre začatie", countriesCount: "22 krajín EÚ s minimálnou mzdou + 5 s kolektívnymi zmluvami" };

const sl: Translation = { ...en, langName: "Slovenščina", langFlag: "🇸🇮", brandSubtitle: "EU DELOVNI KALKULATOR", calculator: "Kalkulator", selectCountry: "Izberite državo", searchCountry: "Iskanje države...", tabSalary: "Plača", tabThirteenth: "13. plača", tabVacation: "Dopust", tabHolidays: "Prazniki", perHour: "Na Uro", perDay: "Na Dan", perWeek: "Na Teden", perMonth: "Na Mesec", perYear: "Na Leto", monthsWorked: "Opravljeni meseci", workingDaysYear: "Delovni dnevi/leto", nationalHolidays: "Državni prazniki", days: "dni", today: "Danes", months: ["Januar","Februar","Marec","April","Maj","Junij","Julij","Avgust","September","Oktober","November","December"], dayNames: ["Po","To","Sr","Če","Pe","So","Ne"], dayNamesFull: ["Nedelja","Ponedeljek","Torek","Sreda","Četrtek","Petek","Sobota"], selectCountryBelow: "Izberite državo za začetek", countriesCount: "22 držav EU z minimalno plačo + 5 s kolektivnimi pogodbami" };

const lt: Translation = { ...en, langName: "Lietuvių", langFlag: "🇱🇹", brandSubtitle: "ES DARBO SKAIČIUOKLĖ", calculator: "Skaičiuotuvas", selectCountry: "Pasirinkite šalį", searchCountry: "Ieškoti šalies...", tabSalary: "Atlyginimas", tabThirteenth: "13-as atlyg.", tabVacation: "Atostogos", tabHolidays: "Šventės", perHour: "Per Valandą", perDay: "Per Dieną", perWeek: "Per Savaitę", perMonth: "Per Mėnesį", perYear: "Per Metus", monthsWorked: "Dirbtų mėnesių", workingDaysYear: "Darbo dienos/metai", nationalHolidays: "Valstybinės šventės", days: "dienos", today: "Šiandien", months: ["Sausis","Vasaris","Kovas","Balandis","Gegužė","Birželis","Liepa","Rugpjūtis","Rugsėjis","Spalis","Lapkritis","Gruodis"], dayNames: ["Pr","An","Tr","Kt","Pn","Šš","Sk"], dayNamesFull: ["Sekmadienis","Pirmadienis","Antradienis","Trečiadienis","Ketvirtadienis","Penktadienis","Šeštadienis"], selectCountryBelow: "Pasirinkite šalį, kad pradėtumėte", countriesCount: "22 ES šalys su minimalia alga + 5 su kolektyvinėmis sutartimis" };

const lv: Translation = { ...en, langName: "Latviešu", langFlag: "🇱🇻", brandSubtitle: "ES DARBA KALKULATORS", calculator: "Kalkulators", selectCountry: "Izvēlieties valsti", searchCountry: "Meklēt valsti...", tabSalary: "Alga", tabThirteenth: "13. alga", tabVacation: "Atvaļinājums", tabHolidays: "Svētki", perHour: "Stundā", perDay: "Dienā", perWeek: "Nedēļā", perMonth: "Mēnesī", perYear: "Gadā", monthsWorked: "Nostrādātie mēneši", workingDaysYear: "Darba dienas/gadā", nationalHolidays: "Valsts svētki", days: "dienas", today: "Šodien", months: ["Janvāris","Februāris","Marts","Aprīlis","Maijs","Jūnijs","Jūlijs","Augusts","Septembris","Oktobris","Novembris","Decembris"], dayNames: ["Pr","Ot","Tr","Ce","Pk","Se","Sv"], dayNamesFull: ["Svētdiena","Pirmdiena","Otrdiena","Trešdiena","Ceturtdiena","Piektdiena","Sestdiena"], selectCountryBelow: "Izvēlieties valsti, lai sāktu", countriesCount: "22 ES valstis ar minimālo algu + 5 ar koplīgumiem" };

const et: Translation = { ...en, langName: "Eesti", langFlag: "🇪🇪", brandSubtitle: "EL TÖÖKALKULAATOR", calculator: "Kalkulaator", selectCountry: "Valige riik", searchCountry: "Otsi riiki...", tabSalary: "Palk", tabThirteenth: "13. palk", tabVacation: "Puhkus", tabHolidays: "Pühad", perHour: "Tunnis", perDay: "Päevas", perWeek: "Nädalas", perMonth: "Kuus", perYear: "Aastas", monthsWorked: "Töötatud kuud", workingDaysYear: "Tööpäevad/aastas", nationalHolidays: "Riigipühad", days: "päeva", today: "Täna", months: ["Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni","Juuli","August","September","Oktoober","November","Detsember"], dayNames: ["E","T","K","N","R","L","P"], dayNamesFull: ["Pühapäev","Esmaspäev","Teisipäev","Kolmapäev","Neljapäev","Reede","Laupäev"], selectCountryBelow: "Valige riik arvutuste alustamiseks", countriesCount: "22 EL riiki miinimumpalgaga + 5 kollektiivlepingutega" };

const mt: Translation = { ...en, langName: "Malti", langFlag: "🇲🇹", brandSubtitle: "KALKULATUR TAX-XOGĦOL UE", calculator: "Kalkulatur", selectCountry: "Agħżel pajjiż", searchCountry: "Fittex pajjiż...", tabSalary: "Salarju", tabThirteenth: "13-il Salarju", tabVacation: "Vaganzi", tabHolidays: "Festi", perHour: "Fis-Siegħa", perDay: "Fil-Ġurnata", perWeek: "Fil-Ġimgħa", perMonth: "Fix-Xahar", perYear: "Fis-Sena", monthsWorked: "Xhur maħduma", workingDaysYear: "Jiem tax-xogħol/sena", nationalHolidays: "Festi nazzjonali", days: "jiem", today: "Illum", months: ["Jannar","Frar","Marzu","April","Mejju","Ġunju","Lulju","Awwissu","Settembru","Ottubru","Novembru","Diċembru"], dayNames: ["Tn","Tl","Er","Ħa","Ġi","Si","Ħa"], dayNamesFull: ["Il-Ħadd","It-Tnejn","It-Tlieta","L-Erbgħa","Il-Ħamis","Il-Ġimgħa","Is-Sibt"], selectCountryBelow: "Agħżel pajjiż biex tibda", countriesCount: "22 pajjiż tal-UE b'salarju minimu + 5 b'ftehim kollettiv" };

const fi: Translation = { ...en, langName: "Suomi", langFlag: "🇫🇮", brandSubtitle: "EU TYÖLASKURI", calculator: "Laskin", selectCountry: "Valitse maa", searchCountry: "Hae maata...", tabSalary: "Palkka", tabThirteenth: "13. palkka", tabVacation: "Loma", tabHolidays: "Pyhäpäivät", perHour: "Tunnissa", perDay: "Päivässä", perWeek: "Viikossa", perMonth: "Kuukaudessa", perYear: "Vuodessa", monthsWorked: "Työkuukaudet", workingDaysYear: "Työpäivät/vuosi", nationalHolidays: "Pyhäpäivät", days: "päivää", today: "Tänään", months: ["Tammikuu","Helmikuu","Maaliskuu","Huhtikuu","Toukokuu","Kesäkuu","Heinäkuu","Elokuu","Syyskuu","Lokakuu","Marraskuu","Joulukuu"], dayNames: ["Ma","Ti","Ke","To","Pe","La","Su"], dayNamesFull: ["Sunnuntai","Maanantai","Tiistai","Keskiviikko","Torstai","Perjantai","Lauantai"], selectCountryBelow: "Valitse maa aloittaaksesi", countriesCount: "22 EU-maata minimipalkalla + 5 työehtosopimuksilla" };

const sv: Translation = { ...en, langName: "Svenska", langFlag: "🇸🇪", brandSubtitle: "EU ARBETSKALKYLATOR", calculator: "Kalkylator", selectCountry: "Välj ett land", searchCountry: "Sök land...", tabSalary: "Lön", tabThirteenth: "13:e lön", tabVacation: "Semester", tabHolidays: "Helgdagar", perHour: "Per Timme", perDay: "Per Dag", perWeek: "Per Vecka", perMonth: "Per Månad", perYear: "Per År", monthsWorked: "Arbetade månader", workingDaysYear: "Arbetsdagar/år", nationalHolidays: "Helgdagar", days: "dagar", today: "Idag", months: ["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"], dayNames: ["Mån","Tis","Ons","Tor","Fre","Lör","Sön"], dayNamesFull: ["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"], selectCountryBelow: "Välj ett land för att börja", countriesCount: "22 EU-länder med minimilön + 5 med kollektivavtal" };

const da: Translation = { ...en, langName: "Dansk", langFlag: "🇩🇰", brandSubtitle: "EU ARBEJDSBEREGNER", calculator: "Lommeregner", selectCountry: "Vælg et land", searchCountry: "Søg land...", tabSalary: "Løn", tabThirteenth: "13. løn", tabVacation: "Ferie", tabHolidays: "Helligdage", perHour: "Per Time", perDay: "Per Dag", perWeek: "Per Uge", perMonth: "Per Måned", perYear: "Per År", monthsWorked: "Arbejdede måneder", workingDaysYear: "Arbejdsdage/år", nationalHolidays: "Helligdage", days: "dage", today: "I dag", months: ["Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","Oktober","November","December"], dayNames: ["Man","Tir","Ons","Tor","Fre","Lør","Søn"], dayNamesFull: ["Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"], selectCountryBelow: "Vælg et land for at begynde", countriesCount: "22 EU-lande med mindsteløn + 5 med overenskomster" };

export type LangCode = "en"|"pt"|"de"|"fr"|"es"|"it"|"nl"|"pl"|"ro"|"cs"|"hu"|"bg"|"el"|"hr"|"sk"|"sl"|"lt"|"lv"|"et"|"mt"|"fi"|"sv"|"da";

export const translations: Record<LangCode, Translation> = { en, pt, de, fr, es, it, nl, pl, ro, cs, hu, bg, el, hr, sk, sl, lt, lv, et, mt, fi, sv, da };

export const langList: { code: LangCode; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "ro", name: "Română", flag: "🇷🇴" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "bg", name: "Български", flag: "🇧🇬" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
  { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
  { code: "sk", name: "Slovenčina", flag: "🇸🇰" },
  { code: "sl", name: "Slovenščina", flag: "🇸🇮" },
  { code: "lt", name: "Lietuvių", flag: "🇱🇹" },
  { code: "lv", name: "Latviešu", flag: "🇱🇻" },
  { code: "et", name: "Eesti", flag: "🇪🇪" },
  { code: "mt", name: "Malti", flag: "🇲🇹" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
  { code: "da", name: "Dansk", flag: "🇩🇰" },
];
