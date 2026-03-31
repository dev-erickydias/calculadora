"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CountryData } from "@/data/countries";

interface ThirteenthSalaryCalculatorProps {
  country: CountryData;
}

export default function ThirteenthSalaryCalculator({ country }: ThirteenthSalaryCalculatorProps) {
  const [monthsWorked, setMonthsWorked] = useState(12);
  const [customSalary, setCustomSalary] = useState<string>("");

  const baseSalary = customSalary
    ? parseFloat(customSalary)
    : country.minimumWage.grossMonthly;

  const calculations = useMemo(() => {
    if (!baseSalary || baseSalary <= 0) return null;

    const thirteenth = (baseSalary / 12) * monthsWorked;
    const fourteenth = country.thirteenthSalary.payments >= 2 ? thirteenth : 0;
    const vakantiegeld =
      country.holidays.hasVacationBonus && country.holidays.vacationBonusRate
        ? baseSalary * 12 * country.holidays.vacationBonusRate
        : 0;

    const totalExtra = thirteenth * Math.min(country.thirteenthSalary.payments, 1) +
      fourteenth +
      (country.thirteenthSalary.payments === 0 ? 0 : 0);

    return {
      thirteenth,
      fourteenth,
      vakantiegeld,
      totalExtra: country.thirteenthSalary.mandatory
        ? thirteenth + fourteenth
        : vakantiegeld > 0
        ? vakantiegeld
        : 0,
      hasThirteenth: country.thirteenthSalary.mandatory || country.thirteenthSalary.payments > 0,
      hasVakantiegeld: country.holidays.hasVacationBonus && (country.holidays.vacationBonusRate ?? 0) > 0,
    };
  }, [baseSalary, monthsWorked, country]);

  const formatEur = (val: number) =>
    val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-4">
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="text-sm text-white/70 mb-3">{country.thirteenthSalary.description}</p>

        {!country.hasStatutoryMinimumWage && (
          <div className="mb-3">
            <label className="block text-sm text-white/60 mb-1">Salário mensal bruto (€)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Insira o salário"
              value={customSalary}
              onChange={(e) => setCustomSalary(e.target.value)}
              className="w-full max-w-xs px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-amber-400/50 font-mono text-sm"
            />
          </div>
        )}

        <div>
          <label className="block text-sm text-white/60 mb-2">
            Meses trabalhados: <strong className="text-amber-400">{monthsWorked}</strong>
          </label>
          <input
            type="range"
            min={1}
            max={12}
            value={monthsWorked}
            onChange={(e) => setMonthsWorked(parseInt(e.target.value))}
            className="w-full accent-amber-400"
          />
          <div className="flex justify-between text-xs text-white/30 mt-1">
            <span>1</span><span>3</span><span>6</span><span>9</span><span>12</span>
          </div>
        </div>
      </div>

      {calculations && baseSalary > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {calculations.hasThirteenth && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">13o Salário Proporcional</p>
                <p className="text-xl font-bold text-white font-mono">{formatEur(calculations.thirteenth)} €</p>
                <p className="text-xs text-white/40 mt-1">({monthsWorked}/12 avos)</p>
              </div>

              {calculations.fourteenth > 0 && (
                <div className="p-4 rounded-xl bg-orange-400/10 border border-orange-400/30">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">14o Salário Proporcional</p>
                  <p className="text-xl font-bold text-white font-mono">{formatEur(calculations.fourteenth)} €</p>
                  <p className="text-xs text-white/40 mt-1">({monthsWorked}/12 avos)</p>
                </div>
              )}
            </div>
          )}

          {calculations.hasVakantiegeld && (
            <div className="p-4 rounded-xl bg-blue-400/10 border border-blue-400/30">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                Subsídio de Férias (Vakantiegeld / Bonus)
              </p>
              <p className="text-xl font-bold text-white font-mono">{formatEur(calculations.vakantiegeld)} €</p>
              <p className="text-xs text-white/40 mt-1">
                {country.holidays.vacationBonusDescription}
              </p>
            </div>
          )}

          {!calculations.hasThirteenth && !calculations.hasVakantiegeld && (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-white/50">
                {country.name} não possui 13o salário obrigatório nem subsídio de férias legal.
              </p>
              <p className="text-xs text-white/40 mt-1">
                Pagamentos extras podem existir via acordo coletivo ou contrato individual.
              </p>
            </div>
          )}

          {calculations.totalExtra > 0 && (
            <div className="p-4 rounded-xl bg-green-400/10 border border-green-400/30">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Total de Pagamentos Extras</p>
              <p className="text-2xl font-bold text-green-300 font-mono">{formatEur(calculations.totalExtra)} €</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
