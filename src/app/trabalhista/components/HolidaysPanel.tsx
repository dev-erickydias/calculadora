"use client";

import { useState, useEffect, useMemo } from "react";
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

interface HolidaysPanelProps {
  country: CountryData;
}

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const DAY_NAMES = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function HolidaysPanel({ country }: HolidaysPanelProps) {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  useEffect(() => {
    const fetchHolidays = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/${country.code}`
        );
        if (!res.ok) throw new Error("Erro ao buscar feriados");
        const data: Holiday[] = await res.json();
        setHolidays(data.filter((h) => h.global));
      } catch {
        setError("Não foi possível carregar os feriados. Tente novamente.");
        setHolidays([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHolidays();
  }, [country.code, year]);

  const stats = useMemo(() => {
    if (!holidays.length) return null;

    const totalHolidays = holidays.length;
    let holidaysOnWeekday = 0;
    let holidaysOnWeekend = 0;

    holidays.forEach((h) => {
      const day = new Date(h.date + "T00:00:00").getDay();
      if (day === 0 || day === 6) holidaysOnWeekend++;
      else holidaysOnWeekday++;
    });

    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const totalDays = isLeapYear ? 366 : 365;

    let weekendDays = 0;
    for (let d = new Date(year, 0, 1); d.getFullYear() === year; d.setDate(d.getDate() + 1)) {
      if (d.getDay() === 0 || d.getDay() === 6) weekendDays++;
    }

    const workingDays = totalDays - weekendDays - holidaysOnWeekday;

    return {
      totalHolidays,
      holidaysOnWeekday,
      holidaysOnWeekend,
      workingDays,
      weekendDays,
    };
  }, [holidays, year]);

  const calendarData = useMemo(() => {
    const months: { month: number; days: { date: number; isHoliday: boolean; holidayName?: string; isWeekend: boolean; isCurrentMonth: boolean }[][] }[] = [];

    for (let m = 0; m < 12; m++) {
      const firstDay = new Date(year, m, 1).getDay();
      const daysInMonth = new Date(year, m + 1, 0).getDate();
      const weeks: { date: number; isHoliday: boolean; holidayName?: string; isWeekend: boolean; isCurrentMonth: boolean }[][] = [];
      let week: { date: number; isHoliday: boolean; holidayName?: string; isWeekend: boolean; isCurrentMonth: boolean }[] = [];

      for (let i = 0; i < firstDay; i++) {
        week.push({ date: 0, isHoliday: false, isWeekend: false, isCurrentMonth: false });
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const holiday = holidays.find((h) => h.date === dateStr);
        const dayOfWeek = new Date(year, m, d).getDay();

        week.push({
          date: d,
          isHoliday: !!holiday,
          holidayName: holiday?.localName,
          isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
          isCurrentMonth: true,
        });

        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }

      if (week.length > 0) {
        while (week.length < 7) {
          week.push({ date: 0, isHoliday: false, isWeekend: false, isCurrentMonth: false });
        }
        weeks.push(week);
      }

      months.push({ month: m, days: weeks });
    }

    return months;
  }, [holidays, year]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setYear(year - 1)}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 transition-colors"
          >
            &larr;
          </button>
          <span className="text-lg font-bold text-white font-mono min-w-[4ch] text-center">{year}</span>
          <button
            onClick={() => setYear(year + 1)}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 transition-colors"
          >
            &rarr;
          </button>
        </div>

        <div className="flex gap-1 ml-auto">
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${viewMode === "list" ? "bg-amber-400/15 border border-amber-400/50 text-amber-300" : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"}`}
          >
            Lista
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${viewMode === "calendar" ? "bg-amber-400/15 border border-amber-400/50 text-amber-300" : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"}`}
          >
            Calendário
          </button>
        </div>
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

      {!loading && !error && stats && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl font-bold text-white font-mono">{stats.totalHolidays}</p>
              <p className="text-xs text-white/50">Feriados</p>
            </div>
            <div className="p-3 rounded-xl bg-green-400/10 border border-green-400/30 text-center">
              <p className="text-2xl font-bold text-green-300 font-mono">{stats.holidaysOnWeekday}</p>
              <p className="text-xs text-white/50">Em dia útil</p>
            </div>
            <div className="p-3 rounded-xl bg-red-400/10 border border-red-400/30 text-center">
              <p className="text-2xl font-bold text-red-300 font-mono">{stats.holidaysOnWeekend}</p>
              <p className="text-xs text-white/50">&quot;Perdidos&quot; (fim de semana)</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-center">
              <p className="text-2xl font-bold text-amber-300 font-mono">{stats.workingDays}</p>
              <p className="text-xs text-white/50">Dias úteis no ano</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "list" ? (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                {holidays.map((h, i) => {
                  const date = new Date(h.date + "T00:00:00");
                  const dayOfWeek = date.getDay();
                  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                  return (
                    <motion.div
                      key={h.date}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${isWeekend ? "bg-red-400/5 border-red-400/20" : "bg-white/5 border-white/10"}`}
                    >
                      <div className="w-14 text-center shrink-0">
                        <p className="text-lg font-bold text-white font-mono">{date.getDate()}</p>
                        <p className="text-[10px] text-white/40 uppercase">{MONTH_NAMES[date.getMonth()].slice(0, 3)}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/90 font-medium truncate">{h.localName}</p>
                        <p className="text-xs text-white/40 truncate">{h.name}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-xs font-medium ${isWeekend ? "text-red-400/80" : "text-green-400/80"}`}>
                          {DAY_NAMES[dayOfWeek]}
                        </p>
                        {isWeekend && (
                          <p className="text-[10px] text-red-400/60">Fim de semana</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="calendar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {calendarData.map(({ month, days }) => (
                  <div key={month} className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-sm font-bold text-white/80 mb-2 text-center">{MONTH_NAMES[month]}</p>
                    <div className="grid grid-cols-7 gap-0.5 text-center">
                      {DAY_NAMES.map((d) => (
                        <span key={d} className="text-[10px] text-white/30 py-0.5">{d}</span>
                      ))}
                      {days.flat().map((day, i) => (
                        <span
                          key={i}
                          title={day.holidayName}
                          className={`text-xs py-1 rounded ${!day.isCurrentMonth ? "" : day.isHoliday ? "bg-amber-400/20 text-amber-300 font-bold" : day.isWeekend ? "text-white/25" : "text-white/60"}`}
                        >
                          {day.isCurrentMonth ? day.date : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <p className="text-xs text-white/30 text-center">
        Dados fornecidos pela Nager.Date API. Podem não incluir feriados regionais/locais.
      </p>
    </div>
  );
}
