"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountryData } from "@/data/countries";

interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  types: string[];
}

interface SelectedDay {
  date: Date;
  dateStr: string;
  holiday?: Holiday;
  isWeekend: boolean;
  isToday: boolean;
}

interface HolidaysPanelProps {
  country: CountryData;
}

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const DAY_NAMES_FULL = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
const DAY_NAMES = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

function toEuDay(jsDay: number): number {
  return jsDay === 0 ? 6 : jsDay - 1;
}

function isWeekendDay(jsDay: number): boolean {
  return jsDay === 0 || jsDay === 6;
}

function makeDateStr(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export default function HolidaysPanel({ country }: HolidaysPanelProps) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);

  const today = useMemo(() => {
    const now = new Date();
    return makeDateStr(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country.code}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro");
        return res.json();
      })
      .then((data: Holiday[]) => {
        if (!cancelled) setHolidays(data.filter((h) => h.global));
      })
      .catch(() => {
        if (!cancelled) {
          setError("Não foi possível carregar os feriados.");
          setHolidays([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [country.code, year]);

  const holidayMap = useMemo(() => {
    const map = new Map<string, Holiday>();
    holidays.forEach((h) => map.set(h.date, h));
    return map;
  }, [holidays]);

  const stats = useMemo(() => {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const totalDays = isLeap ? 366 : 365;

    let weekendDays = 0;
    for (let m = 0; m < 12; m++) {
      const dim = new Date(year, m + 1, 0).getDate();
      for (let d = 1; d <= dim; d++) {
        if (isWeekendDay(new Date(year, m, d).getDay())) weekendDays++;
      }
    }

    let holidaysOnWeekday = 0;
    let holidaysOnWeekend = 0;
    const countedDates = new Set<string>();

    holidays.forEach((h) => {
      if (countedDates.has(h.date)) return;
      countedDates.add(h.date);
      const [y, m, d] = h.date.split("-").map(Number);
      if (isWeekendDay(new Date(y, m - 1, d).getDay())) holidaysOnWeekend++;
      else holidaysOnWeekday++;
    });

    const workingDays = totalDays - weekendDays - holidaysOnWeekday;

    return { totalHolidays: countedDates.size, holidaysOnWeekday, holidaysOnWeekend, workingDays };
  }, [holidays, year]);

  const calendarMonths = useMemo(() => {
    return Array.from({ length: 12 }, (_, m) => {
      const firstEuDay = toEuDay(new Date(year, m, 1).getDay());
      const daysInMonth = new Date(year, m + 1, 0).getDate();

      type Cell = { key: string; date: number; dateStr: string; isHoliday: boolean; holiday?: Holiday; isWeekend: boolean; inMonth: boolean; isToday: boolean };
      const cells: Cell[] = [];

      for (let i = 0; i < firstEuDay; i++) {
        cells.push({ key: `e-${m}-${i}`, date: 0, dateStr: "", isHoliday: false, isWeekend: false, inMonth: false, isToday: false });
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = makeDateStr(year, m, d);
        const jsDay = new Date(year, m, d).getDay();
        const holiday = holidayMap.get(dateStr);
        cells.push({
          key: dateStr,
          date: d,
          dateStr,
          isHoliday: !!holiday,
          holiday,
          isWeekend: isWeekendDay(jsDay),
          inMonth: true,
          isToday: dateStr === today,
        });
      }

      while (cells.length % 7 !== 0) {
        cells.push({ key: `p-${m}-${cells.length}`, date: 0, dateStr: "", isHoliday: false, isWeekend: false, inMonth: false, isToday: false });
      }

      return { month: m, cells };
    });
  }, [holidayMap, year, today]);

  const handleDayClick = useCallback((cell: { date: number; dateStr: string; isHoliday: boolean; holiday?: Holiday; isWeekend: boolean; inMonth: boolean; isToday: boolean }) => {
    if (!cell.inMonth) return;
    const [y, m, d] = cell.dateStr.split("-").map(Number);
    setSelectedDay({
      date: new Date(y, m - 1, d),
      dateStr: cell.dateStr,
      holiday: cell.holiday,
      isWeekend: cell.isWeekend,
      isToday: cell.isToday,
    });
  }, []);

  return (
    <div className="space-y-4">
      {/* Year selector */}
      <div className="flex items-center gap-2">
        <button onClick={() => setYear(year - 1)} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 transition-colors">&larr;</button>
        <span className="text-lg font-bold text-white font-mono min-w-[4ch] text-center">{year}</span>
        <button onClick={() => setYear(year + 1)} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 transition-colors">&rarr;</button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
          <p className="text-white/50 mt-2 text-sm">Carregando feriados...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 text-center">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-center">
              <p className="text-2xl font-bold text-amber-300 font-mono">{stats.workingDays}</p>
              <p className="text-xs text-white/50">Dias úteis no ano</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-bold text-white font-mono">{stats.totalHolidays}</p>
              <p className="text-xs text-white/50">Feriados nacionais</p>
            </div>
            <div className="p-3 rounded-xl bg-green-400/10 border border-green-400/30 text-center">
              <p className="text-2xl font-bold text-green-300 font-mono">{stats.holidaysOnWeekday}</p>
              <p className="text-xs text-white/50">Feriados em dia útil</p>
            </div>
            <div className="p-3 rounded-xl bg-red-400/10 border border-red-400/30 text-center">
              <p className="text-2xl font-bold text-red-300 font-mono">{stats.holidaysOnWeekend}</p>
              <p className="text-xs text-white/50">Perdidos (fim de semana)</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs text-white/50">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-500/40 border border-green-400/50" /> Feriado (dia útil)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500/30 border border-red-400/40" /> Feriado (fim de semana)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500/30 border border-blue-400/40" /> Hoje</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded" style={{ background: "rgba(255,255,255,0.04)" }} /> Fim de semana</span>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {calendarMonths.map(({ month, cells }) => (
              <div key={month} className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
                <p className="text-sm font-bold text-white/80 mb-2 text-center">{MONTH_NAMES[month]}</p>
                <div className="grid grid-cols-7 gap-0.5 text-center">
                  {DAY_NAMES.map((d) => (
                    <span key={d} className="text-[10px] text-white/30 py-0.5 font-medium">{d}</span>
                  ))}
                  {cells.map((cell) => {
                    let cls = "text-xs py-1 rounded cursor-default ";
                    if (!cell.inMonth) {
                      cls += "opacity-0";
                    } else if (cell.isToday) {
                      cls += "bg-blue-500/30 text-blue-200 font-bold ring-1 ring-blue-400/50 cursor-pointer";
                    } else if (cell.isHoliday && cell.isWeekend) {
                      cls += "bg-red-500/30 text-red-300 font-bold cursor-pointer";
                    } else if (cell.isHoliday) {
                      cls += "bg-green-500/40 text-green-200 font-bold cursor-pointer";
                    } else if (cell.isWeekend) {
                      cls += "text-white/20 bg-white/[0.02]";
                    } else {
                      cls += "text-white/60 hover:bg-white/5 cursor-pointer";
                    }

                    return (
                      <span
                        key={cell.key}
                        className={cls}
                        onClick={() => handleDayClick(cell)}
                      >
                        {cell.inMonth ? cell.date : ""}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Day detail popup */}
          <AnimatePresence>
            {selectedDay && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={() => setSelectedDay(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#131720] border border-white/15 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
                >
                  {/* Date header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-white font-mono">{selectedDay.date.getDate()}</p>
                      <p className="text-sm text-white/50">
                        {MONTH_NAMES[selectedDay.date.getMonth()]} {selectedDay.date.getFullYear()}
                      </p>
                      <p className="text-xs text-white/40">
                        {DAY_NAMES_FULL[selectedDay.date.getDay()]}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedDay(null)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
                    >
                      &times;
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedDay.isToday && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">Hoje</span>
                    )}
                    {selectedDay.isWeekend && (
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">Fim de semana</span>
                    )}
                    {selectedDay.holiday && !selectedDay.isWeekend && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-400/30">Feriado em dia útil</span>
                    )}
                    {selectedDay.holiday && selectedDay.isWeekend && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-400/30">Feriado perdido</span>
                    )}
                    {!selectedDay.holiday && !selectedDay.isWeekend && (
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">Dia útil</span>
                    )}
                  </div>

                  {/* Holiday info */}
                  {selectedDay.holiday ? (
                    <div className={`rounded-xl p-4 ${selectedDay.isWeekend ? "bg-red-500/10 border border-red-400/20" : "bg-green-500/10 border border-green-400/20"}`}>
                      <p className="text-lg font-bold text-white mb-1">{selectedDay.holiday.localName}</p>
                      <p className="text-sm text-white/60">{selectedDay.holiday.name}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedDay.holiday.fixed && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40">Data fixa</span>
                        )}
                        {!selectedDay.holiday.fixed && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40">Data variável</span>
                        )}
                        {selectedDay.holiday.types.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40">{t}</span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <p className="text-white/40 text-sm">
                        {selectedDay.isWeekend ? "Fim de semana — sem feriado neste dia." : "Dia útil normal — sem feriado."}
                      </p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <p className="text-xs text-white/30 text-center">
        Dados: Nager.Date API. Podem não incluir feriados regionais/locais.
      </p>
    </div>
  );
}
