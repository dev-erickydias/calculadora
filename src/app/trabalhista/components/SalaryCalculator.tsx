"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { CountryData } from "@/data/countries";
import { useTranslation } from "@/context/LanguageContext";

interface Props { country: CountryData; }

export default function SalaryCalculator({ country }: Props) {
  const { t } = useTranslation();
  const [customHourly, setCustomHourly] = useState<string>("");
  const [hoursWorked, setHoursWorked] = useState<string>("");
  const [daysWorked, setDaysWorked] = useState<string>("");
  const [showNet, setShowNet] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`hourly_${country.code}`);
    if (saved) setCustomHourly(saved); else setCustomHourly("");
    const savedH = localStorage.getItem(`hours_${country.code}`);
    if (savedH) setHoursWorked(savedH); else setHoursWorked("");
    const savedD = localStorage.getItem(`days_${country.code}`);
    if (savedD) setDaysWorked(savedD); else setDaysWorked("");
  }, [country.code]);

  useEffect(() => {
    if (customHourly) localStorage.setItem(`hourly_${country.code}`, customHourly);
    else localStorage.removeItem(`hourly_${country.code}`);
    if (hoursWorked) localStorage.setItem(`hours_${country.code}`, hoursWorked);
    else localStorage.removeItem(`hours_${country.code}`);
    if (daysWorked) localStorage.setItem(`days_${country.code}`, daysWorked);
    else localStorage.removeItem(`days_${country.code}`);
  }, [customHourly, hoursWorked, daysWorked, country.code]);

  const { standardHours, daysPerWeek } = country.workWeek;
  const weeksPerMonth = 4.33;
  const standardMonthlyHours = Math.round(standardHours * weeksPerMonth);
  const standardMonthlyDays = Math.round(daysPerWeek * weeksPerMonth);
  const hoursPerDay = standardHours / daysPerWeek;

  // Default hourly rate from country data
  const defaultHourly = country.minimumWage.hourlyRate
    ? country.minimumWage.hourlyRate
    : country.minimumWage.grossMonthly / (standardHours * weeksPerMonth);

  const baseHourly = customHourly ? parseFloat(customHourly) : defaultHourly;
  const inputHours = hoursWorked ? parseFloat(hoursWorked) : null;
  const inputDays = daysWorked ? parseFloat(daysWorked) : null;

  const calc = useMemo(() => {
    if (!baseHourly || baseHourly <= 0) return null;

    const hourly = baseHourly;
    const daily = hourly * hoursPerDay;
    const weekly = hourly * standardHours;
    const monthly = hourly * standardHours * weeksPerMonth;
    const annual = monthly * country.minimumWage.annualPayments;
    const totalDeductions = country.taxes.averageEffectiveRate + country.taxes.socialContributions;

    // Hours worked calculation
    let hoursCalc = null;
    if (inputHours !== null && inputHours > 0) {
      const regularHrs = Math.min(inputHours, standardMonthlyHours);
      const overtimeHrs = Math.max(0, inputHours - standardMonthlyHours);
      const regularPay = regularHrs * hourly;
      const overtimePay = overtimeHrs * hourly * 1.5;
      hoursCalc = {
        totalHours: inputHours,
        regularHours: Math.round(regularHrs * 10) / 10,
        overtimeHours: Math.round(overtimeHrs * 10) / 10,
        regularPay,
        overtimePay,
        grossTotal: regularPay + overtimePay,
        netTotal: (regularPay + overtimePay) * (1 - totalDeductions),
      };
    }

    // Days worked calculation
    let daysCalc = null;
    if (inputDays !== null && inputDays > 0) {
      const totalHoursFromDays = inputDays * hoursPerDay;
      const regularHrs = Math.min(totalHoursFromDays, standardMonthlyHours);
      const overtimeHrs = Math.max(0, totalHoursFromDays - standardMonthlyHours);
      const regularPay = regularHrs * hourly;
      const overtimePay = overtimeHrs * hourly * 1.5;
      daysCalc = {
        totalDays: inputDays,
        totalHours: Math.round(totalHoursFromDays * 10) / 10,
        regularHours: Math.round(regularHrs * 10) / 10,
        overtimeHours: Math.round(overtimeHrs * 10) / 10,
        grossTotal: regularPay + overtimePay,
        netTotal: (regularPay + overtimePay) * (1 - totalDeductions),
      };
    }

    return { hourly, daily, weekly, monthly, annual, totalDeductions, hoursCalc, daysCalc };
  }, [baseHourly, country, inputHours, inputDays, standardHours, standardMonthlyHours, hoursPerDay, weeksPerMonth]);

  const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtLocal = (v: number) => {
    if (country.currency === "EUR") return null;
    const rate = country.minimumWage.grossMonthlyLocal ? country.minimumWage.grossMonthlyLocal / country.minimumWage.grossMonthly : 1;
    return `${(v * rate).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${country.currencySymbol}`;
  };

  if (!country.hasStatutoryMinimumWage && !customHourly) {
    return (
      <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6 text-center">
        <p className="text-blue-300 text-lg font-medium mb-2">{country.flag} {country.name} {t.noMinWageTitle}</p>
        <p className="text-white/60 text-sm mb-4">{country.notes}</p>
        <p className="text-white/50 text-sm">{t.noMinWageDesc}</p>
        <input type="number" min="0" step="0.01" placeholder="€ / h" value={customHourly} onChange={(e) => setCustomHourly(e.target.value)}
          className="mt-3 w-full max-w-xs mx-auto px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-center placeholder-white/40 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 font-mono" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-white/60 mb-1">€ / {t.hour}</label>
          <input type="number" min="0" step="0.01" placeholder={fmt(defaultHourly)} value={customHourly} onChange={(e) => setCustomHourly(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 font-mono" />
          <p className="text-xs text-white/30 mt-1">{t.minimum}: {fmt(defaultHourly)} €/{t.hour}</p>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">{t.hoursWorked}</label>
          <input type="number" min="0" step="0.5" placeholder={standardMonthlyHours.toString()} value={hoursWorked} onChange={(e) => setHoursWorked(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 font-mono" />
          <p className="text-xs text-white/30 mt-1">{standardHours}h/{t.week} = ~{standardMonthlyHours}h/{t.month}</p>
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">{t.daysWorkedMonth}</label>
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

          {/* Hours result */}
          {calc.hoursCalc && (
            <div className="bg-gradient-to-r from-cyan-500/[0.08] to-transparent border border-cyan-400/20 rounded-2xl p-5">
              <p className="text-xs text-cyan-300/70 uppercase tracking-wider mb-3 font-medium">{t.results} — {calc.hoursCalc.totalHours}h</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <p className="text-[10px] text-white/40 uppercase">{t.regularHours}</p>
                  <p className="text-lg font-bold text-white font-mono">{calc.hoursCalc.regularHours}h</p>
                  <p className="text-xs text-white/40 font-mono">{fmt(calc.hoursCalc.regularPay)} €</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase">{t.overtimeHours}</p>
                  <p className="text-lg font-bold text-orange-300 font-mono">{calc.hoursCalc.overtimeHours}h</p>
                  <p className="text-xs text-orange-300/60 font-mono">{fmt(calc.hoursCalc.overtimePay)} € (150%)</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase">{t.grossEarned}</p>
                  <p className="text-lg font-bold text-cyan-300 font-mono">{fmt(calc.hoursCalc.grossTotal)} €</p>
                  {fmtLocal(calc.hoursCalc.grossTotal) && <p className="text-xs text-cyan-300/50 font-mono">{fmtLocal(calc.hoursCalc.grossTotal)}</p>}
                </div>
                {showNet && (
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">{t.netEstimate}</p>
                    <p className="text-lg font-bold text-green-300 font-mono">{fmt(calc.hoursCalc.netTotal)} €</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Days result */}
          {calc.daysCalc && (
            <div className="bg-gradient-to-r from-amber-500/[0.08] to-transparent border border-amber-400/20 rounded-2xl p-5">
              <p className="text-xs text-amber-300/70 uppercase tracking-wider mb-3 font-medium">{t.results} — {calc.daysCalc.totalDays} {t.days} ({calc.daysCalc.totalHours}h)</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <p className="text-[10px] text-white/40 uppercase">{t.regularHours}</p>
                  <p className="text-lg font-bold text-white font-mono">{calc.daysCalc.regularHours}h</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase">{t.overtimeHours}</p>
                  <p className="text-lg font-bold text-orange-300 font-mono">{calc.daysCalc.overtimeHours}h</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/40 uppercase">{t.grossEarned}</p>
                  <p className="text-lg font-bold text-amber-300 font-mono">{fmt(calc.daysCalc.grossTotal)} €</p>
                  {fmtLocal(calc.daysCalc.grossTotal) && <p className="text-xs text-amber-300/50 font-mono">{fmtLocal(calc.daysCalc.grossTotal)}</p>}
                </div>
                {showNet && (
                  <div>
                    <p className="text-[10px] text-white/40 uppercase">{t.netEstimate}</p>
                    <p className="text-lg font-bold text-green-300 font-mono">{fmt(calc.daysCalc.netTotal)} €</p>
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
