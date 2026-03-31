"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { CountryData } from "@/data/countries";
import { useTranslation } from "@/context/LanguageContext";

interface SalaryCalculatorProps { country: CountryData; }

export default function SalaryCalculator({ country }: SalaryCalculatorProps) {
  const { t } = useTranslation();
  const [customSalary, setCustomSalary] = useState<string>("");
  const [showNet, setShowNet] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`salary_${country.code}`);
    if (saved) setCustomSalary(saved); else setCustomSalary("");
  }, [country.code]);

  useEffect(() => {
    if (customSalary) { localStorage.setItem(`salary_${country.code}`, customSalary); localStorage.setItem("customSalary", customSalary); }
    else localStorage.removeItem(`salary_${country.code}`);
  }, [customSalary, country.code]);

  const baseSalary = customSalary ? parseFloat(customSalary) : country.minimumWage.grossMonthly;

  const calculations = useMemo(() => {
    if (!baseSalary || baseSalary <= 0) return null;
    const { standardHours, daysPerWeek } = country.workWeek;
    const hoursPerMonth = standardHours * 4.33;
    const hourly = baseSalary / hoursPerMonth;
    const daily = hourly * (standardHours / daysPerWeek);
    const weekly = hourly * standardHours;
    const monthly = baseSalary;
    const annual = baseSalary * country.minimumWage.annualPayments;
    const totalDeductions = country.taxes.averageEffectiveRate + country.taxes.socialContributions;
    return { hourly, daily, weekly, monthly, annual, totalDeductions };
  }, [baseSalary, country]);

  const fmt = (val: number) => val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtLocal = (val: number) => {
    if (country.currency === "EUR") return null;
    const rate = country.minimumWage.grossMonthlyLocal ? country.minimumWage.grossMonthlyLocal / country.minimumWage.grossMonthly : 1;
    return `${(val * rate).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${country.currencySymbol}`;
  };

  if (!country.hasStatutoryMinimumWage && !customSalary) {
    return (
      <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6 text-center">
        <p className="text-blue-300 text-lg font-medium mb-2">{country.flag} {country.name} {t.noMinWageTitle}</p>
        <p className="text-white/60 text-sm mb-4">{country.notes}</p>
        <p className="text-white/50 text-sm">{t.noMinWageDesc}</p>
        <input type="number" min="0" step="0.01" placeholder={t.enterSalary} value={customSalary} onChange={(e) => setCustomSalary(e.target.value)}
          className="mt-3 w-full max-w-xs mx-auto px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-center placeholder-white/40 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        <div className="flex-1">
          <label className="block text-sm text-white/60 mb-1">{t.grossMonthlySalary}</label>
          <input type="number" min="0" step="0.01" placeholder={country.minimumWage.grossMonthly.toString()} value={customSalary} onChange={(e) => setCustomSalary(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 font-mono" />
          <p className="text-xs text-white/40 mt-1">{t.minimum}: {fmt(country.minimumWage.grossMonthly)} € {country.minimumWage.hourlyRate && `(${country.minimumWage.hourlyRate} €/${t.hour})`}</p>
        </div>
        <button onClick={() => setShowNet(!showNet)} className={`px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${showNet ? "bg-green-500/15 border-green-400/50 text-green-300" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}>
          {showNet ? t.grossAndNet : t.grossOnly}
        </button>
      </div>
      {calculations && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: t.perHour, value: calculations.hourly },
            { label: t.perDay, value: calculations.daily },
            { label: t.perWeek, value: calculations.weekly },
            { label: t.perMonth, value: calculations.monthly },
            { label: `${t.perYear} (${country.minimumWage.annualPayments}x)`, value: calculations.annual, highlight: true },
          ].map((item) => (
            <motion.div key={item.label} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl border ${item.highlight ? "bg-blue-400/10 border-blue-400/30 sm:col-span-2 lg:col-span-1" : "bg-white/5 border-white/10"}`}>
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-xl font-bold text-white font-mono">{fmt(item.value)} €</p>
              {fmtLocal(item.value) && <p className="text-sm text-blue-400/70 font-mono">{fmtLocal(item.value)}</p>}
              {showNet && <p className="text-sm text-green-400/80 font-mono mt-1">~{fmt(item.value * (1 - calculations.totalDeductions))} € {t.netEstimate}</p>}
            </motion.div>
          ))}
        </motion.div>
      )}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white/50">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <span>{t.workWeek}: <strong className="text-white/70">{country.workWeek.standardHours}h/{t.week}</strong></span>
          <span>{t.payments}: <strong className="text-white/70">{country.minimumWage.annualPayments}x/{t.perYear.toLowerCase()}</strong></span>
          <span>{t.definedBy}: <strong className="text-white/70">{country.minimumWage.definedPer === "hour" ? t.hour : country.minimumWage.definedPer === "week" ? t.week : t.month}</strong></span>
          <span>{t.effectiveDate}: <strong className="text-white/70">{country.minimumWage.effectiveDate}</strong></span>
        </div>
        <p className="text-xs text-white/30 mt-1">{t.source}: {country.minimumWage.source}</p>
        {showNet && <p className="text-xs text-yellow-400/60 mt-2">{country.taxes.disclaimer}</p>}
      </div>
    </div>
  );
}
