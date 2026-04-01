"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountryData, countriesWithMinWage, countriesWithoutMinWage } from "@/data/countries";
import { useTranslation } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/format";

interface CountrySelectorProps {
  selected: CountryData | null;
  onSelect: (country: CountryData) => void;
}

export default function CountrySelector({ selected, onSelect }: CountrySelectorProps) {
  const { t, lang } = useTranslation();
  const [search, setSearch] = useState("");
  const [showNoMinWage, setShowNoMinWage] = useState(false);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    if (!term) return countriesWithMinWage;
    return countriesWithMinWage.filter((c) => c.name.toLowerCase().includes(term) || c.nameLocal.toLowerCase().includes(term) || c.code.toLowerCase().includes(term));
  }, [search]);

  const filteredNoMin = useMemo(() => {
    const term = search.toLowerCase();
    if (!term) return countriesWithoutMinWage;
    return countriesWithoutMinWage.filter((c) => c.name.toLowerCase().includes(term) || c.nameLocal.toLowerCase().includes(term) || c.code.toLowerCase().includes(term));
  }, [search]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <input type="text" placeholder={t.searchCountry} value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-colors" />
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((country) => (
            <motion.button key={country.code} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onSelect(country)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-colors cursor-pointer ${selected?.code === country.code ? "bg-blue-400/15 border-blue-400/50 shadow-lg shadow-blue-400/10" : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"}`}>
              <span className="text-2xl">{country.flag}</span>
              <span className="text-xs font-medium text-white/90 text-center leading-tight">{country.name}</span>
              <span className="text-[10px] text-blue-400/80 font-mono">{formatCurrency(country.minimumWage.grossMonthly, lang)} €</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      {filteredNoMin.length > 0 && (
        <div className="mt-4">
          <button onClick={() => setShowNoMinWage(!showNoMinWage)} className="text-sm text-white/50 hover:text-white/70 transition-colors flex items-center gap-2">
            <svg className={`w-4 h-4 transition-transform ${showNoMinWage ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            {t.countriesNoMinWage} ({filteredNoMin.length})
          </button>
          <AnimatePresence>
            {showNoMinWage && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-3">
                  {filteredNoMin.map((country) => (
                    <motion.button key={country.code} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onSelect(country)}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-colors cursor-pointer ${selected?.code === country.code ? "bg-blue-400/15 border-blue-400/50" : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"}`}>
                      <span className="text-2xl">{country.flag}</span>
                      <span className="text-xs font-medium text-white/90 text-center leading-tight">{country.name}</span>
                      <span className="text-[10px] text-blue-400/80 italic">{t.collectiveAgreement}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
