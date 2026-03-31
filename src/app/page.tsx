"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountryData } from "@/data/countries";
import { langList } from "@/data/translations";
import { useTranslation } from "@/context/LanguageContext";
import { saveCalculation } from "@/lib/supabase";
import CountrySelector from "./trabalhista/components/CountrySelector";
import SalaryCalculator from "./trabalhista/components/SalaryCalculator";
import ThirteenthSalaryCalculator from "./trabalhista/components/ThirteenthSalaryCalculator";
import VacationCalculator from "./trabalhista/components/VacationCalculator";
import HolidaysPanel from "./trabalhista/components/HolidaysPanel";
import Calculator from "./components/Calculator";

type Tab = "salario" | "decimo" | "ferias" | "feriados";

export default function Home() {
  const { t, lang, setLang } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("salario");
  const [showCalculator, setShowCalculator] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [mounted, setMounted] = useState(false);

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "salario", label: t.tabSalary, icon: "💰" },
    { id: "decimo", label: t.tabThirteenth, icon: "🎄" },
    { id: "ferias", label: t.tabVacation, icon: "🏖️" },
    { id: "feriados", label: t.tabHolidays, icon: "📅" },
  ];

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const storedCode = localStorage.getItem("selectedCountryCode");
    if (storedCode && !selectedCountry) {
      import("@/data/countries").then(({ getCountryByCode }) => {
        const c = getCountryByCode(storedCode);
        if (c) setSelectedCountry(c);
      });
    }
  }, [mounted, selectedCountry]);

  const handleCountrySelect = useCallback((country: CountryData) => {
    setSelectedCountry(country);
    localStorage.setItem("selectedCountryCode", country.code);
  }, []);

  const handleTabCalc = useCallback((tab: Tab) => {
    if (selectedCountry) {
      const salary = localStorage.getItem(`salary_${selectedCountry.code}`);
      saveCalculation(
        selectedCountry.code,
        salary ? parseFloat(salary) : null,
        tab === "decimo" ? "thirteenth" : tab === "ferias" ? "vacation" : "salary",
        { tab, country: selectedCountry.code, timestamp: Date.now() }
      );
    }
  }, [selectedCountry]);

  const currentLang = langList.find((l) => l.code === lang);

  if (!mounted) return <div className="min-h-screen bg-[#0a0e1a]" />;

  return (
    <main className="min-h-screen bg-[#0a0e1a]">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#0a0e1a]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg viewBox="0 0 48 48" className="w-6 h-6" fill="none">
                <path d="M24 8C18.5 8 14 11.5 14 16c0 3.5 2.5 5.5 6 7 3 1.3 4 2.2 4 3.5 0 1.5-1.5 2.5-3.5 2.5-2.5 0-4.5-1.5-5.5-3l-3 2.5C14 31 17.5 33 21 33c5 0 9-3 9-7.5 0-4-2.5-5.8-6.5-7.5-2.5-1-3.5-2-3.5-3.2 0-1.3 1.3-2.3 3.2-2.3 2 0 3.5 1 4.5 2.5l2.8-2.3C28.5 10 26 8 24 8z" fill="white" opacity="0.95"/>
                <circle cx="10" cy="6" r="1.5" fill="#FBBF24"/><circle cx="24" cy="3" r="1.5" fill="#FBBF24"/><circle cx="38" cy="6" r="1.5" fill="#FBBF24"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white tracking-tight">Salarium</h1>
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{t.brandSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language picker */}
            <div className="relative">
              <button
                onClick={() => setShowLangPicker(!showLangPicker)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all text-xs"
              >
                <span>{currentLang?.flag}</span>
                <span className="hidden sm:inline">{currentLang?.name}</span>
                <svg className={`w-3 h-3 transition-transform ${showLangPicker ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              <AnimatePresence>
                {showLangPicker && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowLangPicker(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute right-0 top-full mt-1 z-50 bg-[#131720] border border-white/10 rounded-xl shadow-2xl p-1 max-h-80 overflow-y-auto w-48"
                    >
                      {langList.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code); setShowLangPicker(false); }}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${lang === l.code ? "bg-blue-500/15 text-blue-300" : "text-white/60 hover:bg-white/5 hover:text-white/80"}`}
                        >
                          <span>{l.flag}</span>
                          <span>{l.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Calculator button */}
            <button
              onClick={() => setShowCalculator(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 hover:bg-white/[0.08] transition-all text-xs"
            >
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
                <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm0 2h8v3H6V4zm0 5h2v2H6V9zm0 3h2v2H6v-2zm3-3h2v2H9V9zm0 3h2v2H9v-2zm3-3h2v5h-2V9z"/>
              </svg>
              <span className="hidden sm:inline">{t.calculator}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-3">{t.selectCountry}</h2>
          <CountrySelector selected={selectedCountry} onSelect={handleCountrySelect} />
        </section>

        <AnimatePresence mode="wait">
          {selectedCountry && (
            <motion.div key={selectedCountry.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500/[0.08] via-transparent to-amber-500/[0.06] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="text-5xl">{selectedCountry.flag}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCountry.name}</h2>
                    <p className="text-sm text-white/40">{selectedCountry.nameLocal}</p>
                  </div>
                  {selectedCountry.hasStatutoryMinimumWage && (
                    <div className="ml-auto text-right">
                      <p className="text-3xl font-bold text-blue-400 font-mono">
                        {selectedCountry.minimumWage.grossMonthly.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                      </p>
                      <p className="text-xs text-white/30">
                        {t.grossMonthly}
                        {selectedCountry.minimumWage.definedPer === "hour" && selectedCountry.minimumWage.hourlyRate && (<> ({selectedCountry.minimumWage.hourlyRate} €/h — {t.definedPerHour})</>)}
                      </p>
                      {selectedCountry.minimumWage.grossMonthlyLocal && (
                        <p className="text-sm text-white/40 font-mono">{selectedCountry.minimumWage.grossMonthlyLocal.toLocaleString("pt-BR")} {selectedCountry.currencySymbol}</p>
                      )}
                    </div>
                  )}
                </div>
                {selectedCountry.minimumWage.ageBasedRates && (
                  <div className="bg-white/[0.03] rounded-lg p-3 mt-2">
                    <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">{t.ratesByAge}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCountry.minimumWage.ageBasedRates.map((r) => (
                        <span key={r.age} className="text-xs bg-white/[0.04] border border-white/[0.08] rounded-lg px-2 py-1 font-mono text-white/60">
                          {r.age}: {r.percentage}%{r.hourlyRate ? ` (${r.hourlyRate} €/h)` : r.monthlyRate ? ` (${r.monthlyRate.toLocaleString("pt-BR")} €)` : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedCountry.minimumWage.skilledWorkerRate && (<p className="text-xs text-blue-400/50 mt-2">{selectedCountry.minimumWage.skilledWorkerRate.description}</p>)}
                {selectedCountry.minimumWage.probationRate && (<p className="text-xs text-orange-400/50 mt-1">{t.probationPeriod}: {selectedCountry.minimumWage.probationRate.grossMonthly.toLocaleString("pt-BR")} €/m — {selectedCountry.minimumWage.probationRate.duration}</p>)}
                {!selectedCountry.hasStatutoryMinimumWage && selectedCountry.notes && (
                  <div className="bg-blue-500/[0.08] border border-blue-400/15 rounded-xl p-3 mt-2"><p className="text-sm text-blue-300/70">{selectedCountry.notes}</p></div>
                )}
              </div>

              <div className="flex gap-1 bg-white/[0.03] p-1 rounded-xl overflow-x-auto">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => { setActiveTab(tab.id); handleTabCalc(tab.id); }}
                    className={`flex-1 min-w-[100px] px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-blue-500/15 text-blue-300 shadow-lg shadow-blue-500/5" : "text-white/40 hover:text-white/60 hover:bg-white/[0.04]"}`}>
                    <span className="mr-1.5">{tab.icon}</span>{tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                  {activeTab === "salario" && <SalaryCalculator country={selectedCountry} />}
                  {activeTab === "decimo" && <ThirteenthSalaryCalculator country={selectedCountry} />}
                  {activeTab === "ferias" && <VacationCalculator country={selectedCountry} />}
                  {activeTab === "feriados" && <HolidaysPanel country={selectedCountry} />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedCountry && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 mb-6 shadow-xl shadow-blue-500/20">
              <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
                <path d="M24 8C18.5 8 14 11.5 14 16c0 3.5 2.5 5.5 6 7 3 1.3 4 2.2 4 3.5 0 1.5-1.5 2.5-3.5 2.5-2.5 0-4.5-1.5-5.5-3l-3 2.5C14 31 17.5 33 21 33c5 0 9-3 9-7.5 0-4-2.5-5.8-6.5-7.5-2.5-1-3.5-2-3.5-3.2 0-1.3 1.3-2.3 3.2-2.3 2 0 3.5 1 4.5 2.5l2.8-2.3C28.5 10 26 8 24 8z" fill="white" opacity="0.9"/>
                <circle cx="10" cy="6" r="1.8" fill="#FBBF24"/><circle cx="24" cy="3" r="1.8" fill="#FBBF24"/><circle cx="38" cy="6" r="1.8" fill="#FBBF24"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Salarium</h2>
            <p className="text-white/40 mb-1">{t.selectCountryBelow}</p>
            <p className="text-white/20 text-sm">{t.countriesCount}</p>
          </div>
        )}
      </div>

      <footer className="border-t border-white/[0.04] mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-3">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/25">
            <span>{t.dataSource}</span><span>{t.holidaysSource}</span>
          </div>
          <div className="space-y-1 text-xs text-white/15">
            <p>{t.disclaimer1}</p><p>{t.disclaimer2}</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showCalculator && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setShowCalculator(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} onClick={(e) => e.stopPropagation()} className="relative max-h-[90vh] overflow-auto rounded-2xl">
              <button onClick={() => setShowCalculator(false)} className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-colors">&times;</button>
              <Calculator />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
