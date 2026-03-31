import Link from "next/link";
import Calculator from "./components/Calculator";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center min-h-screen bg-[#0c0a07] p-4 relative">
      <Link
        href="/trabalhista"
        className="absolute top-4 right-4 text-xs text-[#c0b8a0]/40 hover:text-[#c0b8a0]/70 transition-colors border border-[#c0b8a0]/10 px-3 py-1.5 rounded-lg hover:bg-[#c0b8a0]/5"
      >
        Calculadora Trabalhista EU
      </Link>
      <Calculator />
    </main>
  );
}
