"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { CountryData } from "@/data/countries";
import { useTranslation } from "@/context/LanguageContext";

type InputMode = "hour" | "month";
interface Props { country: CountryData; }

export default function SalaryCalculator({ country }: Props) {
  const { t } = useTranslation();
  const [inputMode, setInputMode] = useState<InputMode>("hour");
  const [customHourly, setCustomHourly] = useState<string>("");
  const [customMonthly, setCustomMonthly] = useState<string>("");
  const [dailyHours, setDailyHours] = useState<string>("");
  const [daysWorked, setDaysWorked] = useState<string>("");
  const [showNet, setShowNet] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const mode = localStorage.getItem(`inputMode_${country.code}`) as InputMode | null;
    if (mode) setInputMode(mode);
    const sh = localStorage.getItem(`hourly_${country.code}`);
    if (sh) setCustomHourly(sh); else setCustomHourly("");
    const sm = localStorage.getItem(`monthly_${country.code}`);
    if (sm) setCustomMonthly(sm); else setCustomMonthly("");
    const sdh = localStorage.getItem(`dailyHours_${country.code}`);
    if (sdh) setDailyHours(sdh); else setDailyHours("");
    const sd = localStorage.getItem(`days_${country.code}`);
    if (sd) setDaysWorked(sd); else setDaysWorked("");
  }, [country.code]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`inputMode_${country.code}`, inputMode);
    if (customHourly) localStorage.setItem(`hourly_${country.code}`, customHourly);
    else localStorage.removeItem(`hourly_${country.code}`);
    if (customMonthly) localStorage.setItem(`monthly_${country.code}`, customMonthly);
    else localStorage.removeItem(`monthly_${country.code}`);
    if (dailyHours) localStorage.setItem(`dailyHours_${country.code}`, dailyHours);
    else localStorage.removeItem(`dailyHours_${country.code}`);
    if (daysWorked) localStorage.setItem(`days_${country.code}`, daysWorked);
    else localStorage.removeItem(`days_${country.code}`);
  }, [inputMode, customHourly, customMonthly, dailyHours, daysWorked, country.code]);

  const { standardHours, daysPerWeek } = country.workWeek;
  const weeksPerMonth = 4.33;
  const defaultHoursPerDay = standardHours / daysPerWeek;
  const standardMonthlyHours = Math.round(standardHours * weeksPerMonth);
  const standardMonthlyDays = Math.round(daysPerWeek * weeksPerMonth);

  const defaultHourly = country.minimumWage.hourlyRate
    ? country.minimumWage.hourlyRate
    : country.minimumWage.grossMonthly / (standardHours * weeksPerMonth);

  const defaultMonthly = country.minimumWage.grossMonthly;

  const inputDailyHours = dailyHours ? parseFloat(dailyHours) : null;
  const inputDays = daysWorked ? parseFloat(daysWorked) : null;

  const calc = useMemo(() => {
    // Effective hours/day and days/month (user input or country default)
    const effectiveHpd = inputDailyHours !== null && inputDailyHours > 0 ? inputDailyHours : defaultHoursPerDay;
    const effectiveDays = inputDays !== null && inputDays > 0 ? inputDays : standardMonthlyDays;
    const effectiveTotalHours = effectiveHpd * effectiveDays;

    // Derive hourly rate based on mode
    let hourly: number;
    if (inputMode === "hour") {
      hourly = customHourly ? parseFloat(customHourly) : defaultHourly;
    } else {
      const m = customMonthly ? parseFloat(customMonthly) : defaultMonthly;
      // Use user's actual schedule to derive hourly rate
      hourly = m / effectiveTotalHours;
    }

    if (!hourly || hourly <= 0) return null;

    const daily = hourly * effectiveHpd;
    const weekly = daily * Math.min(effectiveDays / weeksPerMonth, 7);
    const monthly = hourly * effectiveTotalHours;
    const annual = monthly * country.minimumWage.annualPayments;
    const totalDeductions = country.taxes.averageEffectiveRate + country.taxes.socialContributions;

    // Custom calc card (shown when user entered hours/day or days)
    const hasCustomInput = inputDailyHours !== null || inputDays !== null;
    let customCalc = null;

    if (hasCustomInput) {
      const regularHrs = Math.min(effectiveTotalHours, standardMonthlyHours);
      const overtimeHrs = Math.max(0, effectiveTotalHours - standardMonthlyHours);

      // In month mode, the entered salary IS the total — no overtime split
      let regularPay: number, overtimePay: number, gross: number;
      if (inputMode === "month" && (customMonthly || defaultMonthly)) {
        gross = customMonthly ? parseFloat(customMonthly) : defaultMonthly;
        regularPay = gross;
        overtimePay = 0;
      } else {
        regularPay = regularHrs * hourly;
        overtimePay = overtimeHrs * hourly * 1.5;
        gross = regularPay + overtimePay;
      }

      customCalc = {
        hoursPerDay: effectiveHpd,
        days: effectiveDays,
        totalHours: Math.round(effectiveTotalHours * 10) / 10,
        regularHours: Math.round(regularHrs * 10) / 10,
        overtimeHours: Math.round(overtimeHrs * 10) / 10,
        regularPay,
        overtimePay,
        gross,
        net: gross * (1 - totalDeductions),
        dailyGross: daily,
        hourlyRate: hourly,
      };
    }

    return { hourly, daily, weekly, monthly, annual, totalDeductions, customCalc };
  }, [inputMode, customHourly, customMonthly, defaultHourly, defaultMonthly, country, inputDailyHours, inputDays, standardMonthlyHours, standardMonthlyDays, defaultHoursPerDay, weeksPerMonth]);

  const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtLocal = (v: number) => {
    if (country.currency === "EUR") return null;
    const rate = country.minimumWage.grossMonthlyLocal ? country.minimumWage.grossMonthlyLocal / country.minimumWage.grossMonthly : 1;
    return `${(v * rate).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${country.currencySymbol}`;
  };

  if (!country.hasStatutoryMinimumWage && !customHourly && !customMonthly) {
    return (
      <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6 text-center">
        <p className="text-blue-300 text-lg font-medium mb-2">{country.flag} {country.name} {t.noMinWageTitle}</p>
        <p className="text-white/60 text-sm mb-4">{country.notes}</p>
        <p className="text-white/50 text-sm">{t.noMinWageDesc}</p>
        <div className="flex gap-2 justify-center mt-3">
          <input type="number" min="0" step="0.01" placeholder="€ / h" value={customHourly} onChange={(e) => { setCustomHourly(e.target.value); setInputMode("hour"); }}
            className="w-36 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-center placeholder-white/40 focus:outline-none focus:border-blue-400/50 font-mono" />
          <span className="self-center text-white/30">{t.inputByHour}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Mode toggle + Main input */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          {/* Toggle hour/month */}
          <div className="flex gap-1 mb-2 bg-white/[0.03] p-0.5 rounded-lg">
            <button onClick={() => setInputMode("hour")}
              className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${inputMode === "hour" ? "bg-blue-500/20 text-blue-300" : "text-white/40 hover:text-white/60"}`}>
              {t.inputByHour}
            </button>
            <button onClick={() => setInputMode("month")}
              className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${inputMode === "month" ? "bg-blue-500/20 text-blue-300" : "text-white/40 hover:text-white/60"}`}>
              {t.inputByMonth}
            </button>
          </div>

          {inputMode === "hour" ? (
            <>
              <input type="number" min="0" step="0.01" placeholder={fmt(defaultHourly)} value={customHourly} onChange={(e) => setCustomHourly(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 font-mono" />
              <p className="text-xs text-white/30 mt-1">{t.minimum}: {fmt(defaultHourly)} €/{t.hour}</p>
            </>
          ) : (
            <>
              <input type="number" min="0" step="0.01" placeholder={fmt(defaultMonthly)} value={customMonthly} onChange={(e) => setCustomMonthly(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 font-mono" />
              <p className="text-xs text-white/30 mt-1">{t.minimum}: {fmt(defaultMonthly)} €/{t.month}</p>
            </>
          )}
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-2">{t.hoursPerDay}</label>
          <input type="number" min="0" step="0.5" placeholder={defaultHoursPerDay.toString()} value={dailyHours} onChange={(e) => setDailyHours(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 font-mono" />
          <p className="text-xs text-white/30 mt-1">{standardHours}h/{t.week} = {defaultHoursPerDay}h/{t.days.slice(0, 3)}</p>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-2">{t.daysWorkedMonth}</label>
          <input type="number" min="0" step="1" placeholder={standardMonthlyDays.toString()} value={daysWorked} onChange={(e) => setDaysWorked(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 font-mono" />
          <p className="text-xs text-white/30 mt-1">{daysPerWeek} {t.days}/{t.week} = ~{standardMonthlyDays} {t.days}/{t.month}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={() => setShowNet(!showNet)} className={`px-4 py-2 rounded-xl border text-sm font-medium transition-colors ${showNet ? "bg-green-500/15 border-green-400/50 text-green-300" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}>
          {showNet ? t.grossAndNet : t.grossOnly}
        </button>
      </div>

      {calc && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          {/* Standard breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { label: t.perHour, value: calc.hourly },
              { label: t.perDay, value: calc.daily },
              { label: t.perWeek, value: calc.weekly },
              { label: t.perMonth, value: calc.monthly },
              { label: `${t.perYear} (${country.minimumWage.annualPayments}x)`, value: calc.annual, hl: true },
            ].map((item) => (
              <motion.div key={item.label} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border ${item.hl ? "bg-blue-400/10 border-blue-400/30" : "bg-white/5 border-white/10"}`}>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-lg font-bold text-white font-mono">{fmt(item.value)} €</p>
                {fmtLocal(item.value) && <p className="text-xs text-blue-400/60 font-mono">{fmtLocal(item.value)}</p>}
                {showNet && <p className="text-xs text-green-400/70 font-mono mt-0.5">~{fmt(item.value * (1 - calc.totalDeductions))} €</p>}
              </motion.div>
            ))}
          </div>

          {/* Custom calculation result */}
          {calc.customCalc && (
            <div className="bg-gradient-to-r from-cyan-500/[0.08] to-transparent border border-cyan-400/20 rounded-2xl p-5">
              <p className="text-xs text-cyan-300/70 uppercase tracking-wider mb-3 font-medium">
                {t.results} — {calc.customCalc.hoursPerDay}h/{t.days.slice(0, 3)} x {calc.customCalc.days} {t.days} = {calc.customCalc.totalHours}h
                {calc.customCalc.hourlyRate && <> ({fmt(calc.customCalc.hourlyRate)} €/{t.hour})</>}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <div>
                  <p className="text-[10px] text-white/40 uppercase">{t.regularHours}</p>
                  <p className="text-lg font-bold text-white font-mono">{calc.customCalc.regularHours}h</p>
                  <p className="text-xs text-white/40 font-mono">{fmt(calc.customCalc.regularPay)} €</p>
                </div>
                {calc.customCalc.overtimeHours > 0 && (
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">{t.overtimeHours}</p>
                    <p className="text-lg font-bold text-orange-300 font-mono">{calc.customCalc.overtimeHours}h</p>
                    <p className="text-xs text-orange-300/60 font-mono">{fmt(calc.customCalc.overtimePay)} € (150%)</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-white/40 uppercase">{t.perDay}</p>
                  <p className="text-lg font-bold text-white font-mono">{fmt(calc.customCalc.dailyGross)} €</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase">{t.grossEarned}</p>
                  <p className="text-lg font-bold text-cyan-300 font-mono">{fmt(calc.customCalc.gross)} €</p>
                  {fmtLocal(calc.customCalc.gross) && <p className="text-xs text-cyan-300/50 font-mono">{fmtLocal(calc.customCalc.gross)}</p>}
                </div>
                {showNet && (
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">{t.netEstimate}</p>
                    <p className="text-lg font-bold text-green-300 font-mono">{fmt(calc.customCalc.net)} €</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-sm text-white/40">
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <span>{t.workWeek}: <strong className="text-white/60">{standardHours}h/{t.week}</strong></span>
              <span>{t.payments}: <strong className="text-white/60">{country.minimumWage.annualPayments}x/{t.perYear.toLowerCase()}</strong></span>
              <span>{t.effectiveDate}: <strong className="text-white/60">{country.minimumWage.effectiveDate}</strong></span>
            </div>
            <p className="text-xs text-white/20 mt-1">{t.source}: {country.minimumWage.source}</p>
            {showNet && <p className="text-xs text-yellow-400/40 mt-2">{country.taxes.disclaimer}</p>}
          </div>
        </motion.div>
      )}
    </div>
  );
}
