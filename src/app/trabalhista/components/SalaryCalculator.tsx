"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CountryData } from "@/data/countries";
import { useTranslation } from "@/context/LanguageContext";
import { formatCurrency, WEEKS_PER_MONTH } from "@/lib/format";

type InputMode = "hour" | "month";
interface Props { country: CountryData; }

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } };

function setLS(key: string, val: string) { if (val) localStorage.setItem(key, val); else localStorage.removeItem(key); }

export default function SalaryCalculator({ country }: Props) {
  const { t, lang } = useTranslation();
  const [inputMode, setInputMode] = useState<InputMode>("hour");
  const [customHourly, setCustomHourly] = useState<string>("");
  const [customMonthly, setCustomMonthly] = useState<string>("");
  const [dailyHours, setDailyHours] = useState<string>("");
  const [daysWorked, setDaysWorked] = useState<string>("");
  const [showNet, setShowNet] = useState(false);
  const isLoading = useRef(true);

  useEffect(() => {
    isLoading.current = true;
    const c = country.code;
    setInputMode((localStorage.getItem(`inputMode_${c}`) as InputMode) || "hour");
    setCustomHourly(localStorage.getItem(`hourly_${c}`) || "");
    setCustomMonthly(localStorage.getItem(`monthly_${c}`) || "");
    setDailyHours(localStorage.getItem(`dailyHours_${c}`) || "");
    setDaysWorked(localStorage.getItem(`days_${c}`) || "");
    requestAnimationFrame(() => { isLoading.current = false; });
  }, [country.code]);

  useEffect(() => {
    if (isLoading.current) return;
    const c = country.code;
    localStorage.setItem(`inputMode_${c}`, inputMode);
    setLS(`hourly_${c}`, customHourly);
    setLS(`monthly_${c}`, customMonthly);
    setLS(`dailyHours_${c}`, dailyHours);
    setLS(`days_${c}`, daysWorked);
  }, [inputMode, customHourly, customMonthly, dailyHours, daysWorked, country.code]);

  const { standardHours, daysPerWeek } = country.workWeek;
  const defaultHoursPerDay = standardHours / daysPerWeek;
  const standardMonthlyHours = Math.round(standardHours * WEEKS_PER_MONTH);
  const standardMonthlyDays = Math.round(daysPerWeek * WEEKS_PER_MONTH);

  const defaultHourly = country.minimumWage.hourlyRate
    ? country.minimumWage.hourlyRate
    : country.minimumWage.grossMonthly / (standardHours * WEEKS_PER_MONTH);

  const defaultMonthly = country.minimumWage.grossMonthly;

  const inputDailyHours = dailyHours ? parseFloat(dailyHours) : null;
  const inputDays = daysWorked ? parseFloat(daysWorked) : null;

  const calc = useMemo(() => {
    // User's actual schedule
    const userHpd = inputDailyHours !== null && inputDailyHours > 0 ? inputDailyHours : defaultHoursPerDay;
    const userDays = inputDays !== null && inputDays > 0 ? inputDays : standardMonthlyDays;
    const userTotalHours = userHpd * userDays;
    const hasCustomSchedule = inputDailyHours !== null || inputDays !== null;

    // Derive hourly rate
    let hourly: number;
    if (inputMode === "hour") {
      hourly = customHourly ? parseFloat(customHourly) : defaultHourly;
    } else {
      const m = customMonthly ? parseFloat(customMonthly) : defaultMonthly;
      // ALWAYS divide by user's actual total hours (not country standard)
      hourly = m / userTotalHours;
    }

    if (!hourly || hourly <= 0 || !isFinite(hourly)) return null;

    // All breakdowns use user's schedule
    const daily = hourly * userHpd;
    const weekly = daily * daysPerWeek;
    const monthly = hourly * userTotalHours;
    const annual = monthly * country.minimumWage.annualPayments;
    const totalDeductions = country.taxes.averageEffectiveRate + country.taxes.socialContributions;

    // Overtime detection (based on country legal standard)
    const regularHrs = Math.min(userTotalHours, standardMonthlyHours);
    const overtimeHrs = Math.max(0, userTotalHours - standardMonthlyHours);

    let overtimePay = 0;
    let grossWithOvertime = monthly;
    if (inputMode === "hour" && overtimeHrs > 0) {
      // In hour mode: overtime is paid at 150%
      const regularPay = regularHrs * hourly;
      overtimePay = overtimeHrs * hourly * 1.5;
      grossWithOvertime = regularPay + overtimePay;
    }

    return {
      hourly,
      daily,
      weekly,
      monthly,
      annual,
      totalDeductions,
      userHpd,
      userDays,
      userTotalHours: Math.round(userTotalHours * 10) / 10,
      regularHours: Math.round(regularHrs * 10) / 10,
      overtimeHours: Math.round(overtimeHrs * 10) / 10,
      overtimePay,
      grossWithOvertime,
      hasCustomSchedule,
    };
  }, [inputMode, customHourly, customMonthly, defaultHourly, defaultMonthly, country, inputDailyHours, inputDays, standardMonthlyHours, standardMonthlyDays, defaultHoursPerDay, daysPerWeek, WEEKS_PER_MONTH]);

  const fmt = (v: number) => formatCurrency(v, lang);
  const localRate = country.currency !== "EUR" && country.minimumWage.grossMonthlyLocal
    ? country.minimumWage.grossMonthlyLocal / country.minimumWage.grossMonthly : null;
  const fmtLocal = (v: number) => localRate ? `${formatCurrency(v * localRate, lang)} ${country.currencySymbol}` : null;

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
        <motion.div {...fadeUp} className="space-y-5">
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

          {/* Schedule details */}
          {calc.hasCustomSchedule && (
            <div className="bg-gradient-to-r from-cyan-500/[0.08] to-transparent border border-cyan-400/20 rounded-2xl p-5">
              <p className="text-xs text-cyan-300/70 uppercase tracking-wider mb-3 font-medium">
                {t.results} — {calc.userHpd}h/{t.days.slice(0, 3)} x {calc.userDays} {t.days} = {calc.userTotalHours}h ({fmt(calc.hourly)} €/{t.hour})
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <div>
                  <p className="text-[10px] text-white/40 uppercase">{t.regularHours}</p>
                  <p className="text-lg font-bold text-white font-mono">{calc.regularHours}h</p>
                </div>
                {calc.overtimeHours > 0 && (
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">{t.overtimeHours}</p>
                    <p className="text-lg font-bold text-orange-300 font-mono">{calc.overtimeHours}h</p>
                    {calc.overtimePay > 0 && <p className="text-xs text-orange-300/60 font-mono">{fmt(calc.overtimePay)} € (150%)</p>}
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-white/40 uppercase">{t.perDay}</p>
                  <p className="text-lg font-bold text-white font-mono">{fmt(calc.daily)} €</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase">{t.grossEarned}</p>
                  <p className="text-lg font-bold text-cyan-300 font-mono">{fmt(calc.grossWithOvertime)} €</p>
                  {fmtLocal(calc.grossWithOvertime) && <p className="text-xs text-cyan-300/50 font-mono">{fmtLocal(calc.grossWithOvertime)}</p>}
                </div>
                {showNet && (
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">{t.netEstimate}</p>
                    <p className="text-lg font-bold text-green-300 font-mono">{fmt(calc.grossWithOvertime * (1 - calc.totalDeductions))} €</p>
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
