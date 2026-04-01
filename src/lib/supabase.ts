import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fwttbxyhxxbntynwjsdp.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dHRieHloeHhibnR5bndqc2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzMTM0MTEsImV4cCI6MjA4NTg4OTQxMX0.lvV3OcJCqGTaAd4w6VjXSpTigUOoXT42KzmslvMhxhA";

export const supabase = createClient(supabaseUrl, supabaseKey);

let cachedSessionId: string | null = null;

function getSessionId(): string {
  if (cachedSessionId) return cachedSessionId;
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("salarium_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("salarium_session_id", id);
  }
  cachedSessionId = id;
  return id;
}

export async function saveCalculation(
  countryCode: string,
  customSalary: number | null,
  calculationType: "salary" | "thirteenth" | "vacation",
  results: Record<string, unknown>
) {
  const sessionId = getSessionId();
  if (!sessionId) return;

  try {
    await supabase.from("salarium_user_calculations").insert({
      session_id: sessionId,
      country_code: countryCode,
      custom_salary: customSalary,
      calculation_type: calculationType,
      results,
    });
  } catch {
    // Analytics failure should not affect UX
  }
}
