"use client";

import { useReducer, useEffect, useMemo } from "react";

// ==================== TYPES ====================
type AngleMode = "DEG" | "RAD";

interface HistoryEntry {
  expression: string;
  result: string;
}

interface CalcState {
  input: string;
  result: string;
  lastExpression: string;
  evaluated: boolean;
  angleMode: AngleMode;
  memory: number;
  hasMemory: boolean;
  history: HistoryEntry[];
  showHistory: boolean;
}

type CalcAction =
  | { type: "INPUT"; value: string }
  | { type: "EVALUATE" }
  | { type: "CLEAR" }
  | { type: "BACKSPACE" }
  | { type: "TOGGLE_ANGLE" }
  | { type: "MEM_CLEAR" }
  | { type: "MEM_RECALL" }
  | { type: "MEM_ADD" }
  | { type: "MEM_SUB" }
  | { type: "TOGGLE_SIGN" }
  | { type: "TOGGLE_HISTORY" }
  | { type: "HISTORY_ITEM"; expression: string };

// ==================== MATH ENGINE ====================
function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function formatResult(n: number): string {
  if (isNaN(n)) return "Error";
  if (!isFinite(n)) return n > 0 ? "∞" : "-∞";
  if (n === 0) return "0";

  const abs = Math.abs(n);
  if (abs >= 1e15 || (abs < 1e-10 && abs > 0)) {
    return n.toExponential(6);
  }

  const str = parseFloat(n.toPrecision(12)).toString();
  return str.length > 14 ? n.toExponential(6) : str;
}

function evaluateExpression(expr: string, mode: AngleMode): number {
  let s = expr;

  // 1. Replace display symbols
  s = s.replace(/×/g, "*");
  s = s.replace(/÷/g, "/");
  s = s.replace(/−/g, "-");

  // 2. Replace constants (before implicit multiplication)
  s = s.replace(/π/g, `(${Math.PI})`);
  s = s.replace(/(?<![a-zA-Z])e(?![a-zA-Z0-9+\-])/g, `(${Math.E})`);

  // 3. Implicit multiplication: 2( -> 2*(, )( -> )*(, )2 -> )*2
  s = s.replace(/(\d)\(/g, "$1*(");
  s = s.replace(/\)\(/g, ")*(");
  s = s.replace(/\)(\d)/g, ")*$1");

  // 4. Factorial: number!
  s = s.replace(/(\d+)!/g, (_, n) => String(factorial(parseInt(n))));

  // 5. Power
  s = s.replace(/\^/g, "**");

  // 6. Percentage
  s = s.replace(/(\d+\.?\d*)%/g, "($1/100)");

  // 7. Trig functions - use placeholders to avoid double-replacement
  const degMul = mode === "DEG" ? `(Math.PI/180)*` : "";
  const radMul = mode === "DEG" ? `(180/Math.PI)*` : "";

  // First, protect inverse trig with placeholders
  s = s.replace(/asin\(/g, `__ASIN__(`);
  s = s.replace(/acos\(/g, `__ACOS__(`);
  s = s.replace(/atan\(/g, `__ATAN__(`);

  // Replace standard trig
  s = s.replace(/sin\(/g, `Math.sin(${degMul}`);
  s = s.replace(/cos\(/g, `Math.cos(${degMul}`);
  s = s.replace(/tan\(/g, `Math.tan(${degMul}`);

  // Now replace placeholders with inverse trig
  s = s.replace(/__ASIN__\(/g, `${radMul}Math.asin(`);
  s = s.replace(/__ACOS__\(/g, `${radMul}Math.acos(`);
  s = s.replace(/__ATAN__\(/g, `${radMul}Math.atan(`);

  // 8. Other math functions
  s = s.replace(/sqrt\(/g, "Math.sqrt(");
  s = s.replace(/log\(/g, "Math.log10(");
  s = s.replace(/ln\(/g, "Math.log(");
  s = s.replace(/abs\(/g, "Math.abs(");

  try {
    const fn = new Function(`"use strict"; return (${s})`);
    const result = fn();
    if (typeof result !== "number") return NaN;
    return result;
  } catch {
    return NaN;
  }
}

// ==================== STATE REDUCER ====================
const initialState: CalcState = {
  input: "",
  result: "0",
  lastExpression: "",
  evaluated: false,
  angleMode: "DEG",
  memory: 0,
  hasMemory: false,
  history: [],
  showHistory: false,
};

function calcReducer(state: CalcState, action: CalcAction): CalcState {
  switch (action.type) {
    case "INPUT": {
      const v = action.value;
      if (state.evaluated) {
        if (/^[0-9.]$/.test(v)) {
          return { ...state, input: v, evaluated: false, lastExpression: "" };
        }
        if (/^[+\-×÷^−]$/.test(v)) {
          return {
            ...state,
            input: state.result + v,
            evaluated: false,
            lastExpression: "",
          };
        }
        return { ...state, input: v, evaluated: false, lastExpression: "" };
      }

      // Prevent consecutive binary operators
      const ops = ["+", "−", "×", "÷"];
      const last = state.input.slice(-1);
      if (ops.includes(v) && ops.includes(last)) {
        return { ...state, input: state.input.slice(0, -1) + v };
      }

      // Prevent double dots in current number segment
      if (v === ".") {
        const segments = state.input.split(/[+\-×÷^()]/);
        if (segments[segments.length - 1]?.includes(".")) return state;
      }

      return { ...state, input: state.input + v };
    }

    case "EVALUATE": {
      if (!state.input) return state;
      const val = evaluateExpression(state.input, state.angleMode);
      const res = formatResult(val);
      return {
        ...state,
        result: res,
        lastExpression: state.input,
        input: "",
        evaluated: true,
        history: [
          { expression: state.input, result: res },
          ...state.history,
        ].slice(0, 50),
      };
    }

    case "CLEAR":
      return {
        ...state,
        input: "",
        result: "0",
        lastExpression: "",
        evaluated: false,
      };

    case "BACKSPACE": {
      if (state.evaluated) {
        return {
          ...state,
          input: "",
          result: "0",
          lastExpression: "",
          evaluated: false,
        };
      }
      const fns = [
        "asin(",
        "acos(",
        "atan(",
        "sin(",
        "cos(",
        "tan(",
        "sqrt(",
        "log(",
        "abs(",
        "ln(",
      ];
      for (const fn of fns) {
        if (state.input.endsWith(fn)) {
          return { ...state, input: state.input.slice(0, -fn.length) };
        }
      }
      return { ...state, input: state.input.slice(0, -1) };
    }

    case "TOGGLE_ANGLE":
      return {
        ...state,
        angleMode: state.angleMode === "DEG" ? "RAD" : "DEG",
      };

    case "MEM_CLEAR":
      return { ...state, memory: 0, hasMemory: false };

    case "MEM_RECALL": {
      if (!state.hasMemory) return state;
      const memStr = formatResult(state.memory);
      if (state.evaluated) {
        return {
          ...state,
          input: memStr,
          evaluated: false,
          lastExpression: "",
        };
      }
      return { ...state, input: state.input + memStr };
    }

    case "MEM_ADD": {
      const val = parseFloat(state.result);
      if (isNaN(val)) return state;
      return { ...state, memory: state.memory + val, hasMemory: true };
    }

    case "MEM_SUB": {
      const val = parseFloat(state.result);
      if (isNaN(val)) return state;
      return { ...state, memory: state.memory - val, hasMemory: true };
    }

    case "TOGGLE_SIGN": {
      if (state.evaluated) {
        const val = parseFloat(state.result);
        if (isNaN(val)) return state;
        return { ...state, result: formatResult(-val) };
      }
      if (state.input.startsWith("(-")) {
        return { ...state, input: state.input.slice(2) };
      }
      return { ...state, input: "(-" + state.input };
    }

    case "TOGGLE_HISTORY":
      return { ...state, showHistory: !state.showHistory };

    case "HISTORY_ITEM":
      return {
        ...state,
        input: action.expression,
        evaluated: false,
        lastExpression: "",
        showHistory: false,
      };

    default:
      return state;
  }
}

// ==================== BUTTON COMPONENT ====================
type ButtonVariant =
  | "num"
  | "op"
  | "sci"
  | "mem"
  | "fn"
  | "eq"
  | "clear"
  | "mode";

interface ButtonDef {
  label: string;
  display?: string;
  action: () => void;
  variant: ButtonVariant;
  span?: number;
}

const variantStyles: Record<ButtonVariant, string> = {
  num: "bg-[#151c2e] text-[#c8d4e8] text-base sm:text-lg h-[44px] sm:h-[52px] hover:bg-[#1a2440]",
  op: "bg-[#1a2040] text-[#60a5fa] text-lg sm:text-xl h-[44px] sm:h-[52px] font-semibold hover:bg-[#1e2850]",
  sci: "bg-[#101828] text-[#38bdf8] text-[10px] sm:text-[11px] h-[34px] sm:h-[38px] tracking-wide hover:bg-[#152030]",
  mem: "bg-[#10161e] text-[#64748b] text-[10px] sm:text-[11px] h-[34px] sm:h-[38px] tracking-wide hover:bg-[#151d28]",
  fn: "bg-[#131a28] text-[#94a3b8] text-sm sm:text-base h-[44px] sm:h-[52px] hover:bg-[#182030]",
  eq: "bg-gradient-to-b from-[#2563eb] to-[#1d4ed8] text-white text-lg sm:text-xl h-[44px] sm:h-[52px] font-bold hover:from-[#3b82f6] hover:to-[#2563eb]",
  clear: "bg-[#1e1525] text-[#f87171] text-xs sm:text-sm h-[44px] sm:h-[52px] font-semibold hover:bg-[#251a30]",
  mode: "bg-[#101828] text-[#38bdf8] text-[10px] sm:text-[11px] h-[34px] sm:h-[38px] border border-[#1e3a5f] font-semibold hover:bg-[#152030]",
};

function CalcButton({ label, display, action, variant, span }: ButtonDef) {
  return (
    <button
      onClick={action}
      className={`btn-calc rounded-md flex items-center justify-center cursor-pointer font-[family-name:var(--font-geist-sans)] ${variantStyles[variant]} ${span === 2 ? "col-span-2" : ""}`}
    >
      {display ?? label}
    </button>
  );
}

// ==================== MAIN COMPONENT ====================
export default function Calculator() {
  const [state, dispatch] = useReducer(calcReducer, initialState);

  // Live preview of current expression
  const preview = useMemo(() => {
    if (!state.input) return null;
    const val = evaluateExpression(state.input, state.angleMode);
    if (!isNaN(val) && isFinite(val)) return formatResult(val);
    return null;
  }, [state.input, state.angleMode]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (k >= "0" && k <= "9") dispatch({ type: "INPUT", value: k });
      else if (k === ".") dispatch({ type: "INPUT", value: "." });
      else if (k === "+") dispatch({ type: "INPUT", value: "+" });
      else if (k === "-") dispatch({ type: "INPUT", value: "−" });
      else if (k === "*") dispatch({ type: "INPUT", value: "×" });
      else if (k === "/") {
        e.preventDefault();
        dispatch({ type: "INPUT", value: "÷" });
      } else if (k === "^") dispatch({ type: "INPUT", value: "^" });
      else if (k === "(") dispatch({ type: "INPUT", value: "(" });
      else if (k === ")") dispatch({ type: "INPUT", value: ")" });
      else if (k === "%") dispatch({ type: "INPUT", value: "%" });
      else if (k === "Enter" || k === "=") dispatch({ type: "EVALUATE" });
      else if (k === "Backspace") dispatch({ type: "BACKSPACE" });
      else if (k === "Escape") dispatch({ type: "CLEAR" });
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const displayValue = state.evaluated ? state.result : preview || state.result;
  const expressionLine = state.evaluated ? state.lastExpression : state.input;

  // ===== BUTTON DEFINITIONS =====
  const sciButtons: ButtonDef[] = [
    // Row 1: Trig
    {
      label: "sin",
      action: () => dispatch({ type: "INPUT", value: "sin(" }),
      variant: "sci",
    },
    {
      label: "cos",
      action: () => dispatch({ type: "INPUT", value: "cos(" }),
      variant: "sci",
    },
    {
      label: "tan",
      action: () => dispatch({ type: "INPUT", value: "tan(" }),
      variant: "sci",
    },
    {
      label: "xʸ",
      action: () => dispatch({ type: "INPUT", value: "^" }),
      variant: "sci",
    },
    {
      label: "√x",
      action: () => dispatch({ type: "INPUT", value: "sqrt(" }),
      variant: "sci",
    },
    {
      label: "x²",
      action: () => dispatch({ type: "INPUT", value: "^2" }),
      variant: "sci",
    },
    // Row 2: Inverse trig + log
    {
      label: "sin⁻¹",
      action: () => dispatch({ type: "INPUT", value: "asin(" }),
      variant: "sci",
    },
    {
      label: "cos⁻¹",
      action: () => dispatch({ type: "INPUT", value: "acos(" }),
      variant: "sci",
    },
    {
      label: "tan⁻¹",
      action: () => dispatch({ type: "INPUT", value: "atan(" }),
      variant: "sci",
    },
    {
      label: "log",
      action: () => dispatch({ type: "INPUT", value: "log(" }),
      variant: "sci",
    },
    {
      label: "ln",
      action: () => dispatch({ type: "INPUT", value: "ln(" }),
      variant: "sci",
    },
    {
      label: "n!",
      action: () => dispatch({ type: "INPUT", value: "!" }),
      variant: "sci",
    },
    // Row 3: Constants + misc
    {
      label: "π",
      action: () => dispatch({ type: "INPUT", value: "π" }),
      variant: "sci",
    },
    {
      label: "e",
      action: () => dispatch({ type: "INPUT", value: "e" }),
      variant: "sci",
    },
    {
      label: "|x|",
      action: () => dispatch({ type: "INPUT", value: "abs(" }),
      variant: "sci",
    },
    {
      label: "%",
      action: () => dispatch({ type: "INPUT", value: "%" }),
      variant: "sci",
    },
    {
      label: "(",
      action: () => dispatch({ type: "INPUT", value: "(" }),
      variant: "sci",
    },
    {
      label: ")",
      action: () => dispatch({ type: "INPUT", value: ")" }),
      variant: "sci",
    },
    // Row 4: Memory + mode
    { label: "MC", action: () => dispatch({ type: "MEM_CLEAR" }), variant: "mem" },
    { label: "MR", action: () => dispatch({ type: "MEM_RECALL" }), variant: "mem" },
    { label: "M+", action: () => dispatch({ type: "MEM_ADD" }), variant: "mem" },
    { label: "M−", action: () => dispatch({ type: "MEM_SUB" }), variant: "mem" },
    {
      label: state.angleMode,
      action: () => dispatch({ type: "TOGGLE_ANGLE" }),
      variant: "mode",
    },
    {
      label: "HIS",
      action: () => dispatch({ type: "TOGGLE_HISTORY" }),
      variant: "mem",
    },
  ];

  const mainButtons: ButtonDef[] = [
    { label: "AC", action: () => dispatch({ type: "CLEAR" }), variant: "clear" },
    {
      label: "⌫",
      action: () => dispatch({ type: "BACKSPACE" }),
      variant: "fn",
    },
    { label: "±", action: () => dispatch({ type: "TOGGLE_SIGN" }), variant: "fn" },
    {
      label: "÷",
      action: () => dispatch({ type: "INPUT", value: "÷" }),
      variant: "op",
    },

    {
      label: "7",
      action: () => dispatch({ type: "INPUT", value: "7" }),
      variant: "num",
    },
    {
      label: "8",
      action: () => dispatch({ type: "INPUT", value: "8" }),
      variant: "num",
    },
    {
      label: "9",
      action: () => dispatch({ type: "INPUT", value: "9" }),
      variant: "num",
    },
    {
      label: "×",
      action: () => dispatch({ type: "INPUT", value: "×" }),
      variant: "op",
    },

    {
      label: "4",
      action: () => dispatch({ type: "INPUT", value: "4" }),
      variant: "num",
    },
    {
      label: "5",
      action: () => dispatch({ type: "INPUT", value: "5" }),
      variant: "num",
    },
    {
      label: "6",
      action: () => dispatch({ type: "INPUT", value: "6" }),
      variant: "num",
    },
    {
      label: "−",
      action: () => dispatch({ type: "INPUT", value: "−" }),
      variant: "op",
    },

    {
      label: "1",
      action: () => dispatch({ type: "INPUT", value: "1" }),
      variant: "num",
    },
    {
      label: "2",
      action: () => dispatch({ type: "INPUT", value: "2" }),
      variant: "num",
    },
    {
      label: "3",
      action: () => dispatch({ type: "INPUT", value: "3" }),
      variant: "num",
    },
    {
      label: "+",
      action: () => dispatch({ type: "INPUT", value: "+" }),
      variant: "op",
    },

    {
      label: "0",
      action: () => dispatch({ type: "INPUT", value: "0" }),
      variant: "num",
      span: 2,
    },
    {
      label: ".",
      action: () => dispatch({ type: "INPUT", value: "." }),
      variant: "num",
    },
    { label: "=", action: () => dispatch({ type: "EVALUATE" }), variant: "eq" },
  ];

  // ===== RENDER =====
  return (
    <div className="relative w-full max-w-[520px] mx-auto text-[15px] sm:text-base">
      <div className="bg-gradient-to-b from-[#0d1425] to-[#0a0f1e] rounded-2xl border border-white/[0.06] shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_60px_rgba(37,99,235,0.05)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.06]">
          <span className="text-white/20 text-[10px] tracking-[0.35em] uppercase font-semibold">
            SALARIUM
          </span>
          <div className="flex items-center gap-3">
            {state.hasMemory && (
              <span className="text-blue-400 text-[10px] font-mono tracking-wider">MEM</span>
            )}
            <span className="text-cyan-400 text-[10px] font-mono font-medium">{state.angleMode}</span>
            <div className="w-[5px] h-[5px] rounded-full bg-blue-400 power-led" />
          </div>
        </div>

        {/* Display */}
        <div className="px-3 pt-3 pb-2">
          <div className="relative rounded-xl bg-[#080d1a] px-5 py-5 min-h-[110px] flex flex-col justify-end overflow-hidden border border-white/[0.04]">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.02] to-transparent pointer-events-none" />
            <div
              className="text-white/30 text-right text-sm font-mono font-light truncate min-h-[20px] mb-1"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {expressionLine || "\u00A0"}
            </div>
            <div
              className="text-blue-100 text-right text-[1.75rem] sm:text-[2.5rem] font-mono font-light truncate leading-tight"
              style={{ fontFamily: "var(--font-jetbrains)", textShadow: "0 0 20px rgba(96,165,250,0.15)" }}
            >
              {displayValue}
            </div>
          </div>
        </div>

        {/* Scientific panel */}
        <div className="mx-2 sm:mx-3 mb-2">
          <div className="bg-[#0a1020]/80 rounded-lg p-1 sm:p-1.5 border border-white/[0.04]">
            <div className="grid grid-cols-6 gap-[2px] sm:gap-[3px]">
              {sciButtons.map((btn, i) => (
                <CalcButton key={`sci-${i}`} {...btn} />
              ))}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="mx-5 mb-2">
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* Main buttons */}
        <div className="px-2 sm:px-3 pb-3 sm:pb-4">
          <div className="grid grid-cols-4 gap-[3px] sm:gap-[5px]">
            {mainButtons.map((btn, i) => (
              <CalcButton key={`main-${i}`} {...btn} />
            ))}
          </div>
        </div>
      </div>

      {/* History overlay */}
      {state.showHistory && (
        <div className="absolute inset-0 bg-[#0a0f1e]/97 backdrop-blur-sm rounded-2xl z-10 flex flex-col history-enter overflow-hidden border border-white/[0.06]">
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
            <span className="text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase">
              History
            </span>
            <button
              onClick={() => dispatch({ type: "TOGGLE_HISTORY" })}
              className="text-white/30 hover:text-white/70 transition-colors text-lg leading-none cursor-pointer"
            >
              &times;
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1 history-scroll">
            {state.history.length === 0 ? (
              <div className="text-white/15 text-center text-sm py-12">
                No calculations yet
              </div>
            ) : (
              state.history.map((entry, i) => (
                <button
                  key={i}
                  onClick={() => dispatch({ type: "HISTORY_ITEM", expression: entry.expression })}
                  className="w-full text-right p-3 rounded-lg cursor-pointer hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="text-white/25 text-xs font-mono truncate group-hover:text-white/40 transition-colors" style={{ fontFamily: "var(--font-jetbrains)" }}>
                    {entry.expression}
                  </div>
                  <div className="text-blue-400 text-lg font-mono font-light group-hover:text-blue-300 transition-colors" style={{ fontFamily: "var(--font-jetbrains)" }}>
                    = {entry.result}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
