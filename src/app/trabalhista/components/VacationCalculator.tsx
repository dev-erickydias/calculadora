"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { CountryData } from "@/data/countries";
import { useTranslation } from "@/context/LanguageContext";
import { formatCurrency, WEEKS_PER_MONTH } from "@/lib/format";

interface Props { country: CountryData; }

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } };

export default function VacationCalculator({ country }: Props) {
  const { t, lang } = useTranslation();
  const [vacationDays, setVacationDays] = useState(country.holidays.vacationDaysMin);
  const [customSalary, setCustomSalary] = useState<string>("");

  useEffect(() => { setVacationDays(country.holidays.vacationDaysMin); setCustomSalary(""); }, [country.code, country.holidays.vacationDaysMin]);

  const baseSalary = customSalary ? parseFloat(customSalary) : country.minimumWage.grossMonthly;
  const fmt = (v: number) => formatCurrency(v, lang);
  const standardMonthlyDays = Math.round(country.workWeek.daysPerWeek * WEEKS_PER_MONTH);

  const calc = useMemo(() => {
    if (!baseSalary || baseSalary <= 0) return null;
    const dailyRate = baseSalary / standardMonthlyDays;
    const vacationPay = dailyRate * vacationDays;
    let vacationBonus = 0;
    if (country.holidays.hasVacationBonus && country.holidays.vacationBonusRate) {
      if (country.holidays.vacationBonusRate === 1) vacationBonus = baseSalary;
      else if (country.holidays.vacationBonusRate >= 0.5) vacationBonus = vacationPay * country.holidays.vacationBonusRate;
      else vacationBonus = baseSalary * 12 * country.holidays.vacationBonusRate;
    }
    return { dailyRate, vacationPay, vacationBonus, total: vacationPay + vacationBonus };
  }, [baseSalary, vacationDays, country.holidays, standardMonthlyDays]);

  const maxDays = Math.max(40, country.holidays.vacationDaysCommon + 10);

  return (
    <motion.div {...fadeUp} className="space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
        <div className="flex flex-wrap gap-3 text-sm text-white/60">
          <span>{t.minLegal}: <strong className="text-white/80">{country.holidays.vacationDaysMin} {t.days}</strong></span>
          <span>{t.commonPractice}: <strong className="text-white/80">{country.holidays.vacationDaysCommon} {t.days}</strong></span>
          {country.holidays.hasVacationBonus && <span className="text-green-400/80">{t.hasVacationBonus}</span>}
        </div>
        {!country.hasStatutoryMinimumWage && (
          <div>
            <label className="block text-sm text-white/60 mb-1">{t.grossMonthlySalary}</label>
            <input type="number" min="0" step="0.01" placeholder={t.enterSalary} value={customSalary} onChange={(e) => setCustomSalary(e.target.value)}
              className="w-full max-w-xs px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 font-mono text-sm" />
          </div>
        )}
        <div>
          <label className="block text-sm text-white/60 mb-2">{t.vacationDays}: <strong className="text-blue-400">{vacationDays}</strong></label>
          <input type="range" min={1} max={maxDays} value={vacationDays} onChange={(e) => setVacationDays(parseInt(e.target.value))} className="w-full accent-blue-400" />
          <div className="flex justify-between text-xs text-white/30 mt-1">
            <span>1</span><span>{country.holidays.vacationDaysMin}</span><span>{country.holidays.vacationDaysCommon}</span><span>{maxDays}</span>
          </div>
        </div>
      </div>
      {calc && baseSalary > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.div {...fadeUp} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{t.dailyValue}</p>
              <p className="text-xl font-bold text-white font-mono">{fmt(calc.dailyRate)} €</p>
              <p className="text-xs text-white/40">{t.baseDailyCalc}</p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="p-4 rounded-xl bg-blue-400/10 border border-blue-400/30">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{t.vacationValue}</p>
              <p className="text-xl font-bold text-white font-mono">{fmt(calc.vacationPay)} €</p>
              <p className="text-xs text-white/40">{vacationDays} {t.days} x {fmt(calc.dailyRate)} €</p>
            </motion.div>
          </div>
          {calc.vacationBonus > 0 && (
            <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="p-4 rounded-xl bg-green-400/10 border border-green-400/30">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{t.vacationBonusLabel}</p>
              <p className="text-xl font-bold text-green-300 font-mono">{fmt(calc.vacationBonus)} €</p>
              <p className="text-xs text-white/40">{country.holidays.vacationBonusDescription}</p>
            </motion.div>
          )}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/30">
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{t.totalGrossVacation}</p>
            <p className="text-2xl font-bold text-cyan-300 font-mono">{fmt(calc.total)} €</p>
          </motion.div>
          {country.holidays.vacationBonusDescription && !calc.vacationBonus && <p className="text-xs text-white/40 italic">{country.holidays.vacationBonusDescription}</p>}
        </motion.div>
      )}
    </motion.div>
  );
}
