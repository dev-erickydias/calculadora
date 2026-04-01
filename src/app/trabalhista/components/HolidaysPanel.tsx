"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CountryData } from "@/data/countries";
import { useTranslation } from "@/context/LanguageContext";

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
  isDayOff: boolean;
  isToday: boolean;
}

interface HolidaysPanelProps {
  country: CountryData;
}

function toEuDay(jsDay: number): number {
  return jsDay === 0 ? 6 : jsDay - 1;
}

function makeDateStr(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function checkDayOff(jsDay: number, offSet: Set<number>): boolean {
  return offSet.has(toEuDay(jsDay));
}

const fadeUp = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 } };

export default function HolidaysPanel({ country }: HolidaysPanelProps) {
  const { t } = useTranslation();
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);
  const [daysOff, setDaysOff] = useState<Set<number>>(new Set([5, 6]));

  useEffect(() => {
    const saved = localStorage.getItem(`daysOff_${country.code}`);
    if (saved) {
      try { setDaysOff(new Set(JSON.parse(saved))); } catch { /* ignore */ }
    }
  }, [country.code]);

  const toggleDayOff = useCallback((euIdx: number) => {
    setDaysOff((prev) => {
      const next = new Set(prev);
      if (next.has(euIdx)) next.delete(euIdx);
      else next.add(euIdx);
      localStorage.setItem(`daysOff_${country.code}`, JSON.stringify([...next]));
      return next;
    });
  }, [country.code]);

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

    let offDays = 0;
    for (let m = 0; m < 12; m++) {
      const dim = new Date(year, m + 1, 0).getDate();
      for (let d = 1; d <= dim; d++) {
        if (checkDayOff(new Date(year, m, d).getDay(), daysOff)) offDays++;
      }
    }

    let holidaysOnWorkday = 0;
    let holidaysOnDayOff = 0;
    const countedDates = new Set<string>();

    holidays.forEach((h) => {
      if (countedDates.has(h.date)) return;
      countedDates.add(h.date);
      const [y, m, d] = h.date.split("-").map(Number);
      if (checkDayOff(new Date(y, m - 1, d).getDay(), daysOff)) holidaysOnDayOff++;
      else holidaysOnWorkday++;
    });

    const workingDays = totalDays - offDays - holidaysOnWorkday;

    return { totalHolidays: countedDates.size, holidaysOnWorkday, holidaysOnDayOff, workingDays };
  }, [holidays, year, daysOff]);

  const calendarMonths = useMemo(() => {
    return Array.from({ length: 12 }, (_, m) => {
      const firstEuDay = toEuDay(new Date(year, m, 1).getDay());
      const daysInMonth = new Date(year, m + 1, 0).getDate();

      type Cell = { key: string; date: number; dateStr: string; isHoliday: boolean; holiday?: Holiday; isDayOff: boolean; inMonth: boolean; isToday: boolean };
      const cells: Cell[] = [];

      for (let i = 0; i < firstEuDay; i++) {
        cells.push({ key: `e-${m}-${i}`, date: 0, dateStr: "", isHoliday: false, isDayOff: false, inMonth: false, isToday: false });
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
          isDayOff: checkDayOff(jsDay, daysOff),
          inMonth: true,
          isToday: dateStr === today,
        });
      }

      while (cells.length % 7 !== 0) {
        cells.push({ key: `p-${m}-${cells.length}`, date: 0, dateStr: "", isHoliday: false, isDayOff: false, inMonth: false, isToday: false });
      }

      return { month: m, cells };
    });
  }, [holidayMap, year, today, daysOff]);

  const handleDayClick = useCallback((cell: { date: number; dateStr: string; isHoliday: boolean; holiday?: Holiday; isDayOff: boolean; inMonth: boolean; isToday: boolean }) => {
    if (!cell.inMonth) return;
    const [y, m, d] = cell.dateStr.split("-").map(Number);
    setSelectedDay({
      date: new Date(y, m - 1, d),
      dateStr: cell.dateStr,
      holiday: cell.holiday,
      isWeekend: cell.isDayOff,
      isDayOff: cell.isDayOff,
      isToday: cell.isToday,
    });
  }, []);

  return (
    <motion.div {...fadeUp} className="space-y-4">
      {/* Year selector + Day off picker */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setYear(year - 1)} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 transition-colors">&larr;</button>
            <span className="text-lg font-bold text-white font-mono min-w-[4ch] text-center">{year}</span>
            <button onClick={() => setYear(year + 1)} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 transition-colors">&rarr;</button>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="text-xs text-white/40 mr-1 shrink-0">{t.daysOff}</span>
          {t.dayNames.map((name, euIdx) => (
            <button
              key={euIdx}
              onClick={() => toggleDayOff(euIdx)}
              className={`flex-1 min-w-0 h-8 rounded-lg text-[9px] sm:text-[10px] font-medium transition-all ${daysOff.has(euIdx) ? "bg-purple-500/30 text-purple-200 border border-purple-400/40" : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"}`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
          <p className="text-white/50 mt-2 text-sm">Loading...</p>
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
              <p className="text-xs text-white/50">{t.workingDaysYear}</p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-center">
              <p className="text-2xl font-bold text-cyan-300 font-mono">{stats.totalHolidays}</p>
              <p className="text-xs text-white/50">{t.nationalHolidays}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-400/10 border border-green-400/30 text-center">
              <p className="text-2xl font-bold text-green-300 font-mono">{stats.holidaysOnWorkday}</p>
              <p className="text-xs text-white/50">{t.holidaysOnWorkday}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-400/10 border border-red-400/30 text-center">
              <p className="text-2xl font-bold text-red-300 font-mono">{stats.holidaysOnDayOff}</p>
              <p className="text-xs text-white/50">{t.lostDaysOff}</p>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] sm:text-xs text-white/50">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-cyan-500/40 border border-cyan-400/50" /> {t.legendHolidayWorkday}</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500/30 border border-red-400/40" /> {t.legendHolidayDayOff}</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-purple-500/25 border border-purple-400/30" /> {t.legendDayOff}</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500/30 border border-blue-400/40" /> {t.legendToday}</span>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {calendarMonths.map(({ month, cells }) => (
              <div key={month} className="bg-white/[0.03] border border-white/10 rounded-xl p-3">
                <p className="text-sm font-bold text-white/80 mb-2 text-center">{t.months[month]}</p>
                <div className="grid grid-cols-7 gap-0.5 text-center">
                  {t.dayNames.map((d, i) => (
                    <span key={d} className={`text-[10px] py-0.5 font-medium ${daysOff.has(i) ? "text-purple-400/50" : "text-white/30"}`}>{d}</span>
                  ))}
                  {cells.map((cell) => {
                    let cls = "text-xs py-1 rounded transition-colors ";
                    if (!cell.inMonth) {
                      cls += "opacity-0";
                    } else if (cell.isToday) {
                      cls += "bg-blue-500/30 text-blue-200 font-bold ring-1 ring-blue-400/50 cursor-pointer";
                    } else if (cell.isHoliday && cell.isDayOff) {
                      cls += "bg-red-500/25 text-red-300 font-bold cursor-pointer";
                    } else if (cell.isHoliday) {
                      cls += "bg-cyan-500/30 text-cyan-200 font-bold cursor-pointer";
                    } else if (cell.isDayOff) {
                      cls += "text-purple-300/30 bg-purple-500/[0.08]";
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
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-3xl font-bold text-white font-mono">{selectedDay.date.getDate()}</p>
                      <p className="text-sm text-white/50">
                        {t.months[selectedDay.date.getMonth()]} {selectedDay.date.getFullYear()}
                      </p>
                      <p className="text-xs text-white/40">
                        {t.dayNamesFull[selectedDay.date.getDay()]}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedDay(null)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedDay.isToday && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">{t.today}</span>
                    )}
                    {selectedDay.isDayOff && (
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">{t.dayOff}</span>
                    )}
                    {selectedDay.holiday && !selectedDay.isDayOff && (
                      <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">{t.holidayOnWorkday}</span>
                    )}
                    {selectedDay.holiday && selectedDay.isDayOff && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-400/30">{t.lostHoliday}</span>
                    )}
                    {!selectedDay.holiday && !selectedDay.isDayOff && (
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">{t.normalWorkday.split("—")[0].trim()}</span>
                    )}
                  </div>

                  {selectedDay.holiday ? (
                    <div className={`rounded-xl p-4 ${selectedDay.isDayOff ? "bg-red-500/10 border border-red-400/20" : "bg-cyan-500/10 border border-cyan-400/20"}`}>
                      <p className="text-lg font-bold text-white mb-1">{selectedDay.holiday.localName}</p>
                      <p className="text-sm text-white/60">{selectedDay.holiday.name}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40">
                          {selectedDay.holiday.fixed ? t.fixedDate : t.variableDate}
                        </span>
                        {selectedDay.holiday.types.map((type) => (
                          <span key={type} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-white/40">{type}</span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                      <p className="text-white/40 text-sm">
                        {selectedDay.isDayOff ? `${t.dayOff}.` : t.normalWorkday}
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
        {t.nagerDisclaimer}
      </p>
    </motion.div>
  );
}
