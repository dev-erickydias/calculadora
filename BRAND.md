# Salarium — Brand Guidelines

## Name

**Salarium** — from Latin *salarium*, the origin of the modern word "salary". In Ancient Rome, soldiers received a *salarium* — an allowance for purchasing salt (*sal*), which was a valuable commodity used as currency. The name connects the deep European roots of labor compensation to a modern tool that empowers workers across the continent.

## Tagline

**"Because every worker deserves to know their rights."**

Secondary: *EU Labor Calculator*

## Mission

Salarium exists to make European labor rights transparent and accessible. We believe that every worker — regardless of language, nationality, or education — should be able to easily understand their minimum wage, vacation entitlements, holiday calendar, and salary breakdown.

## Values

1. **Transparency** — All data comes from official sources (Eurostat, Eurofound, national legislation). No hidden calculations, no paywalls.
2. **Accessibility** — Available in 23 EU languages, responsive on any device, works offline with cached data.
3. **Accuracy** — Data is cross-referenced across multiple sources. Users can request updates via direct contact.
4. **Simplicity** — Complex labor law distilled into clear, visual calculations anyone can understand.

## Visual Identity

### Logo

The Salarium logo consists of two elements:

1. **Icon Mark** — A stylized "S" letterform inside a rounded square, with five golden stars above it referencing the European Union flag. The "S" represents both "Salarium" and the euro currency symbol.

2. **Wordmark** — "Salarium" in Inter Bold, tracked tight, with the subtitle "CALCULADORA TRABALHISTA EU" in small caps below.

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Deep Navy** | `#0a0e1a` | Primary background |
| **Midnight Blue** | `#0d1525` | Cards, elevated surfaces |
| **Royal Blue** | `#1E40AF` | Primary accent, logo gradient start |
| **Dark Blue** | `#1E3A8A` | Logo gradient end |
| **Bright Blue** | `#2563EB` | Interactive elements, buttons, active states |
| **Light Blue** | `#60A5FA` | Text highlights, operator buttons |
| **Cyan** | `#38BDF8` | Scientific functions, secondary accent |
| **Gold** | `#FBBF24` | EU stars, premium indicators |
| **White** | `#E2E8F0` | Body text |
| **Muted** | `#94A3B8` | Secondary text |
| **Green** | `#28C840` | Positive values, net salary, holiday on workday |
| **Red** | `#FF5F57` | Negative indicators, lost holidays, close button |
| **Purple** | `#8B5CF6` | Days off calendar markers |

### Color System

The application uses a layered opacity system for consistency:
- `white/[0.04]` — Subtle backgrounds
- `white/[0.06]` — Borders
- `white/[0.08]` — Hover states
- `white/15` — Disclaimer text
- `white/25` — Source text
- `white/30` — Labels
- `white/40` — Subtitles
- `white/50` — Secondary content
- `white/60` — Body text
- `white/70` — Emphasized text
- `white/80` — Highlighted text
- `white` — Primary text

### Typography

| Font | Weight | Usage |
|------|--------|-------|
| **Inter** | Regular (400) | Body text, labels |
| **Inter** | Medium (500) | Buttons, navigation |
| **Inter** | Bold (700) | Headings, country names |
| **JetBrains Mono** | Light (300) | Calculator display, monetary values |
| **JetBrains Mono** | Regular (400) | Data values, codes |
| **JetBrains Mono** | Bold (700) | Stat numbers |

### Spacing

The application uses Tailwind's spacing scale with these conventions:
- Section gaps: `space-y-8`
- Card padding: `p-4` (mobile) / `p-6` (desktop)
- Grid gaps: `gap-3`
- Border radius: `rounded-xl` (cards) / `rounded-2xl` (main containers) / `rounded-lg` (buttons)

### Animations

All animations use Framer Motion with these presets:
- **fadeUp**: `{ opacity: 0, y: 12 } → { opacity: 1, y: 0 }` — 300ms
- **Tab transitions**: `mode="wait"` with 200ms duration
- **Country switch**: 300ms with y-axis slide
- **Stagger**: Result cards appear with 100ms delay between each
- **Calculator window**: Spring animation (damping: 25, stiffness: 300)

### Iconography

- Country flags: Native emoji (e.g., `🇵🇹`, `🇩🇪`)
- Tab icons: Emoji (💰🎄🏖️📅)
- UI icons: Inline SVG with `currentColor`
- Logo stars: SVG circles with gold fill (`#FBBF24`)

## Voice & Tone

### Language
- **Clear and direct** — No jargon, no legal complexity
- **Informative** — Every number has a source and context
- **Respectful** — Workers' rights are serious; the tone reflects that
- **Multilingual** — Content adapts to the user's language, not just translated

### Writing Style
- Labels use Title Case in English, sentence case in other languages
- Numbers use locale-appropriate formatting (1,234.56 in EN, 1.234,56 in DE/PT)
- Currency always shows the symbol after the number (1,234.56 €)
- Dates in ISO format in data, localized in UI

## Target Audience

1. **Migrant workers** — People who moved to an EU country and need to understand their labor rights in their native language
2. **HR professionals** — Quick reference for minimum wages across multiple countries
3. **Job seekers** — Comparing salaries and labor conditions across EU countries
4. **Students & researchers** — Academic reference for EU labor data
5. **Employers** — Ensuring compliance with minimum wage laws

## Competitive Positioning

Salarium is **not** a payroll tool. It is a **rights awareness tool** — designed to inform, not to process. Unlike payroll services that serve employers, Salarium serves workers first.

Key differentiators:
- Free and open-source
- 23 languages (not just English)
- Country-specific nuances (age-based rates, probation periods, skilled worker rates)
- Interactive holiday calendar with custom days off
- Scientific calculator as bonus utility
- No account required, no data collection beyond anonymous analytics
