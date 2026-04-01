<p align="center">
  <img src="public/icon.svg" width="80" alt="Salarium" />
</p>

<h1 align="center">Salarium</h1>
<p align="center"><strong>EU Labor Calculator</strong> — Minimum wages, vacation, 13th salary & holidays for 27 European countries.</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Supabase-Postgres-3ECF8E?logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel" alt="Vercel" />
</p>

---

## About

**Salarium** (from Latin *salarium* — the origin of the word "salary", as Roman soldiers were paid in salt) is a free, open-source web tool for calculating labor costs across the European Union.

Select any of the 27 EU countries, see the official minimum wage, and instantly calculate:
- Hourly, daily, weekly, monthly and annual salary breakdowns
- Proportional 13th and 14th salary
- Vacation pay with country-specific bonuses
- National holidays with interactive calendar

All data is sourced from **Eurostat**, **Eurofound**, and official government portals.

## Features

### Salary Calculator
- Input by **hour** or by **month** — toggle between modes
- Custom **hours/day** and **days/month** for precise calculations
- Overtime detection at 150% (EU standard)
- Gross and estimated net with country tax rates
- Local currency conversion for non-EUR countries (PLN, CZK, HUF, RON, BGN)

### 13th Salary Calculator
- Proportional 13th and 14th salary with adjustable months slider (1-12)
- Country-specific rules: Portugal/Spain/Greece (14 payments), Belgium (13th), Netherlands (8% vakantiegeld)
- Shows vacation bonuses (regres, lomaraha, semestertillagg)

### Vacation Calculator
- Legal minimum and common practice days per country
- Daily rate calculation based on actual working days
- Country-specific bonuses: subsídio de férias (PT), vakantiegeld (NL), dubbel vakantiegeld (BE), Urlaubsgeld (AT)

### National Holidays
- Live data from [Nager.Date API](https://date.nager.at)
- Interactive calendar with European week format (Mon-Sun)
- Custom **days off** selector (choose your weekly rest days)
- Stats: working days/year, holidays on workdays, "lost" holidays
- Click any day for detailed popup with holiday info

### Scientific Calculator
- Floating window (draggable, minimizable, expandable)
- Full scientific functions: sin, cos, tan, log, ln, sqrt, factorial, powers
- Angle modes (DEG/RAD), memory operations, calculation history
- Keyboard support

### Internationalization
23 EU languages supported:

| Language | Language | Language |
|----------|----------|----------|
| English (default) | Nederlands | Lietuviu |
| Portugues | Polski | Latviesu |
| Deutsch | Romana | Eesti |
| Francais | Cestina | Malti |
| Espanol | Magyar | Suomi |
| Italiano | Bulgarski | Svenska |
| Ellenika | Hrvatski | Dansk |
| | Slovencina / Slovenscina | |

## Country Coverage

### 22 EU countries with statutory minimum wage
| Country | Gross/month | Defined per | Payments |
|---------|------------|-------------|----------|
| Luxembourg | 2,570.93 EUR | month | 12 |
| Germany | 2,891 EUR | hour (13.90 EUR/h) | 12 |
| Netherlands | 2,550 EUR | hour (14.71 EUR/h) | 12 |
| Ireland | 2,282 EUR | hour (13.50 EUR/h) | 12 |
| Belgium | 2,029.88 EUR | month | 13 |
| France | 1,801.80 EUR | hour (11.88 EUR/h) | 12 |
| Spain | 1,184 EUR | month | 14 |
| Slovenia | 1,277.72 EUR | month | 12 |
| Lithuania | 1,038 EUR | month | 12 |
| Poland | 4,666 PLN (~1,100 EUR) | month | 12 |
| Greece | 1,027 EUR | month | 14 |
| Portugal | 870 EUR | month | 14 |
| Cyprus | 1,000 EUR | month | 12 |
| Croatia | 970 EUR | month | 12 |
| Malta | 961.05 EUR | week | 12 |
| Estonia | 886 EUR | month | 12 |
| Czechia | 20,800 CZK (~832 EUR) | month | 12 |
| Slovakia | 816 EUR | month | 12 |
| Romania | 4,050 RON (~814 EUR) | month | 12 |
| Latvia | 740 EUR | month | 12 |
| Hungary | 290,800 HUF (~707 EUR) | month | 12 |
| Bulgaria | 1,077 BGN (~551 EUR) | month | 12 |

### 5 EU countries without statutory minimum wage
Denmark, Italy, Austria, Finland, Sweden — wages set via collective agreements.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 16](https://nextjs.org) | React framework with App Router |
| [TypeScript 5](https://typescriptlang.org) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com) | Styling |
| [Framer Motion](https://framer.com/motion) | Animations |
| [Supabase](https://supabase.com) | Database (wage data + anonymous analytics) |
| [Nager.Date API](https://date.nager.at) | Public holidays |
| [Vercel](https://vercel.com) | Deployment |

## Project Structure

```
src/
  app/
    page.tsx                          # Main page (unified app)
    layout.tsx                        # Root layout with LanguageProvider
    globals.css                       # Global styles
    components/
      Calculator.tsx                  # Scientific calculator (700+ lines)
    trabalhista/
      page.tsx                        # Redirect to /
      components/
        CountrySelector.tsx           # Country grid with flags & search
        SalaryCalculator.tsx          # Hourly/monthly salary breakdown
        ThirteenthSalaryCalculator.tsx # 13th/14th proportional calc
        VacationCalculator.tsx        # Vacation pay calculator
        HolidaysPanel.tsx             # Calendar + holidays + stats
  context/
    LanguageContext.tsx               # i18n context provider
  data/
    countries.ts                      # 27 EU countries dataset
    translations.ts                   # 23 language translations
  lib/
    format.ts                         # Shared formatting utilities
    supabase.ts                       # Supabase client + helpers
public/
  icon.svg                            # Favicon (S lettermark)
  logo.svg                            # Full logo with text
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables (optional)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Data Sources

| Source | Data | Update frequency |
|--------|------|-----------------|
| [Eurostat](https://ec.europa.eu/eurostat) | Minimum wages | Annually (January) |
| [Eurofound](https://eurofound.europa.eu) | Labor conditions | Annually |
| [Nager.Date](https://date.nager.at) | Public holidays | Real-time API |
| National legislation | Country-specific rules | As needed |

## Disclaimer

- Minimum wage values are for reference only and may not reflect the most recent changes. Always consult the official legislation of each country.
- Tax calculations are rough estimates and do not replace professional tax advice.
- Holiday data from Nager.Date API may not include regional or local holidays.

## Contributing

Found outdated data or have feature ideas? [Contact via LinkedIn](https://www.linkedin.com/in/erickydias/).

## License

MIT

---

<p align="center">
  <strong>Salarium</strong> — Because every worker deserves to know their rights.<br/>
  <sub>Built with care for the European workforce.</sub>
</p>
