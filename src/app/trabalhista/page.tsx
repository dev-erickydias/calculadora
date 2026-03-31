"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountryData } from "@/data/countries";
import CountrySelector from "./components/CountrySelector";
import SalaryCalculator from "./components/SalaryCalculator";
import ThirteenthSalaryCalculator from "./components/ThirteenthSalaryCalculator";
import VacationCalculator from "./components/VacationCalculator";
import HolidaysPanel from "./components/HolidaysPanel";

type Tab = "salario" | "decimo" | "ferias" | "feriados";

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "salario", label: "Salário", icon: "💰" },
  { id: "decimo", label: "13º Salário", icon: "🎄" },
  { id: "ferias", label: "Férias", icon: "🏖️" },
  { id: "feriados", label: "Feriados", icon: "📅" },
];

export default function TrabalhistaPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("salario");

  return (
    <main className="min-h-screen bg-[#0a0d14]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0d14]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-lg font-bold text-[#0a0d14]">
              EU
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Calculadora Trabalhista Europeia</h1>
              <p className="text-xs text-white/40">Salários mínimos, férias e feriados na Europa</p>
            </div>
          </div>
          <a
            href="/"
            className="text-xs text-white/40 hover:text-white/70 transition-colors border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            Calculadora Científica
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Country Selector */}
        <section>
          <h2 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
            Selecione um país
          </h2>
          <CountrySelector selected={selectedCountry} onSelect={setSelectedCountry} />
        </section>

        {/* Country Dashboard */}
        <AnimatePresence mode="wait">
          {selectedCountry && (
            <motion.div
              key={selectedCountry.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Country Header Card */}
              <div className="bg-gradient-to-r from-amber-400/10 via-transparent to-blue-400/10 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{selectedCountry.flag}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCountry.name}</h2>
                    <p className="text-sm text-white/50">{selectedCountry.nameLocal}</p>
                  </div>
                  {selectedCountry.hasStatutoryMinimumWage && (
                    <div className="ml-auto text-right">
                      <p className="text-3xl font-bold text-amber-400 font-mono">
                        {selectedCountry.minimumWage.grossMonthly.toLocaleString("pt-BR")} €
                      </p>
                      <p className="text-xs text-white/40">Salário mínimo bruto/mês</p>
                      {selectedCountry.minimumWage.grossMonthlyLocal && (
                        <p className="text-sm text-white/50 font-mono">
                          {selectedCountry.minimumWage.grossMonthlyLocal.toLocaleString("pt-BR")} {selectedCountry.currencySymbol}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {!selectedCountry.hasStatutoryMinimumWage && selectedCountry.notes && (
                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-3 mt-2">
                    <p className="text-sm text-blue-300/80">{selectedCountry.notes}</p>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-white/5 p-1 rounded-xl overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[100px] px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-amber-400/15 text-amber-300 shadow-lg shadow-amber-400/5" : "text-white/50 hover:text-white/70 hover:bg-white/5"}`}
                  >
                    <span className="mr-1.5">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "salario" && <SalaryCalculator country={selectedCountry} />}
                  {activeTab === "decimo" && <ThirteenthSalaryCalculator country={selectedCountry} />}
                  {activeTab === "ferias" && <VacationCalculator country={selectedCountry} />}
                  {activeTab === "feriados" && <HolidaysPanel country={selectedCountry} />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!selectedCountry && (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🇪🇺</p>
            <p className="text-white/50 text-lg">Selecione um país acima para começar os cálculos</p>
            <p className="text-white/30 text-sm mt-2">22 países da UE com salário mínimo + 5 países com acordo coletivo</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-3">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/30">
            <span>Dados: Eurostat / Eurofound (Jan 2026)</span>
            <span>Feriados: Nager.Date API</span>
          </div>
          <div className="space-y-1 text-xs text-white/20">
            <p>Os valores de salário mínimo são referência e podem não refletir alterações recentes. Consulte sempre a legislação oficial do país.</p>
            <p>Os cálculos de impostos são estimativas e não substituem consultoria fiscal profissional.</p>
            <p>Dados de feriados fornecidos pela Nager.Date API. Podem não incluir feriados regionais/locais.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
