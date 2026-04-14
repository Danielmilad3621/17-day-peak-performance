export interface Task {
  cat: string;
  text: string;
}

export interface Day {
  date: string;
  label: string;
  highlight?: boolean;
  tasks: Task[];
}

export interface Phase {
  name: string;
  dates: string;
  color: string;
  days: Day[];
}

export interface Supplement {
  name: string;
  dose: string;
  timing: string;
  why: string;
}

export interface Target {
  metric: string;
  current: string;
  target: string;
}

export interface PlanData {
  phases: Phase[];
  supplements: Supplement[];
  targets: Target[];
}

export const PLAN_DATA: PlanData = {
  phases: [
    {
      name: "Phase 1: Hard Reset",
      dates: "Apr 14–20",
      color: "#E63946",
      days: [
        {
          date: "Apr 14 (Mon)", label: "Day 1",
          tasks: [
            { cat: "sleep", text: "Set phone alarm for 22:00 (wind-down) and 22:30 (lights out)" },
            { cat: "sleep", text: "No screens after 22:00 — charge phone outside bedroom" },
            { cat: "nutrition", text: "Last meal by 19:30, nothing after" },
            { cat: "nutrition", text: "Stop water intake at 17:00, sip only after" },
            { cat: "nutrition", text: "No caffeine after 12:00 noon" },
            { cat: "exercise", text: "10,000 steps — walk after lunch and dinner" },
            { cat: "lifestyle", text: "10 min morning sunlight within 30 min of waking (no sunglasses)" },
            { cat: "lifestyle", text: "Zero nicotine, zero alcohol" },
            { cat: "supplement", text: "Buy: Magnesium Glycinate 400mg, Zinc 30mg, Vitamin D3 4000IU, Omega-3 fish oil" },
          ],
        },
        {
          date: "Apr 15 (Tue)", label: "Day 2",
          tasks: [
            { cat: "exercise", text: "Strength session #1 — Squats 3×10, Bench Press 3×10, Rows 3×10, Planks 3×30s" },
            { cat: "exercise", text: "10,000 steps" },
            { cat: "nutrition", text: "Hit 160g protein — track it today (eggs, chicken, Greek yogurt, whey)" },
            { cat: "nutrition", text: "Eat: spinach, beets or beet juice, pumpkin seeds, dark chocolate (85%+)" },
            { cat: "sleep", text: "22:30 lights out, 06:00 wake — no exceptions" },
            { cat: "sleep", text: "Bedroom: cold (18°C), pitch dark, phone out of room" },
            { cat: "lifestyle", text: "Morning sunlight 10 min" },
            { cat: "lifestyle", text: "Start supplements: Mag Glycinate before bed, Zinc with dinner, D3 morning, Omega-3 with food" },
          ],
        },
        {
          date: "Apr 16 (Wed)", label: "Day 3",
          tasks: [
            { cat: "exercise", text: "Rest day — 10,000 steps only, walk after meals" },
            { cat: "sleep", text: "22:30 / 06:00 schedule" },
            { cat: "nutrition", text: "160g protein, moderate deficit (~2,100–2,300 kcal)" },
            { cat: "lifestyle", text: "5 min box breathing before bed (inhale 4s, hold 4s, exhale 4s, hold 4s)" },
            { cat: "lifestyle", text: "Morning sunlight" },
            { cat: "whoop", text: "Check recovery — target: yellow or green. Note RHR trend." },
          ],
        },
        {
          date: "Apr 17 (Thu)", label: "Day 4",
          tasks: [
            { cat: "exercise", text: "Strength session #2 — Deadlifts 3×8, Overhead Press 3×10, Lunges 3×10/leg, Pull-ups or Lat Pulldown 3×10" },
            { cat: "exercise", text: "10,000 steps" },
            { cat: "nutrition", text: "160g protein. Add salmon or sardines today (omega-3 + zinc)" },
            { cat: "sleep", text: "22:30 / 06:00. No food after 19:30, water tapered by 17:00" },
            { cat: "lifestyle", text: "Morning sunlight + 5 min breathing exercise" },
          ],
        },
        {
          date: "Apr 18 (Fri)", label: "Day 5",
          tasks: [
            { cat: "exercise", text: "10,000 steps + optional 20 min brisk walk or light jog" },
            { cat: "nutrition", text: "160g protein. Beet juice today if you can." },
            { cat: "sleep", text: "22:30 / 06:00 — night 5 of consistency. Your body is adapting." },
            { cat: "lifestyle", text: "Zero alcohol even if it's Friday. Your Apr 3–8 green streak happened with clean nights." },
            { cat: "whoop", text: "Check HRV trend — climbing from baseline mid-30s? Any improvement = it's working." },
          ],
        },
        {
          date: "Apr 19 (Sat)", label: "Day 6",
          tasks: [
            { cat: "exercise", text: "Strength session #3 — Squats 3×10 (add weight), Hip Thrusts 3×12, Push-ups 3×max, Rows 3×10" },
            { cat: "exercise", text: "10,000 steps" },
            { cat: "nutrition", text: "160g protein. Eat whole foods, no takeaway today." },
            { cat: "sleep", text: "22:30 / 06:00 — keep weekend schedule identical. This is where most people slip." },
            { cat: "lifestyle", text: "No alcohol. Morning sunlight. Evening breathing." },
          ],
        },
        {
          date: "Apr 20 (Sun)", label: "Day 7",
          tasks: [
            { cat: "exercise", text: "Active rest — long walk (60+ min), stretching, foam rolling" },
            { cat: "nutrition", text: "Meal prep for the week: cook chicken, rice, vegetables in bulk" },
            { cat: "sleep", text: "22:30 / 06:00" },
            { cat: "whoop", text: "WEEKLY REVIEW: Compare this week's avg recovery, HRV, RHR to the week before." },
            { cat: "lifestyle", text: "Reflect: energy levels improving? Fewer bathroom trips at night?" },
          ],
        },
      ],
    },
    {
      name: "Phase 2: Build & Optimize",
      dates: "Apr 21–27",
      color: "#F4A261",
      days: [
        {
          date: "Apr 21 (Mon)", label: "Day 8",
          tasks: [
            { cat: "exercise", text: "Strength session #4 — Squats 3×10 (progress weight), Bench 3×10, Rows 3×10, Planks 3×45s" },
            { cat: "exercise", text: "START kegel exercises: 3 sets of 10, hold each 5 seconds. Morning, afternoon, evening." },
            { cat: "exercise", text: "10,000 steps" },
            { cat: "nutrition", text: "160g protein. Add pumpkin seeds as a daily snack (high zinc)." },
            { cat: "sleep", text: "22:30 / 06:00. Magnesium 30 min before bed." },
            { cat: "lifestyle", text: "Morning sunlight. Breathing exercise." },
          ],
        },
        {
          date: "Apr 22 (Tue)", label: "Day 9",
          tasks: [
            { cat: "exercise", text: "Cardio day: 25 min brisk walk, cycling, or light jog. Keep HR 120–140." },
            { cat: "exercise", text: "Kegels 3×10" },
            { cat: "exercise", text: "10,000 steps" },
            { cat: "nutrition", text: "160g protein. Salmon or fatty fish today." },
            { cat: "sleep", text: "22:30 / 06:00" },
          ],
        },
        {
          date: "Apr 23 (Wed)", label: "Day 10",
          tasks: [
            { cat: "exercise", text: "Strength #5 — Deadlifts 3×8 (progress), OHP 3×10, Lunges 3×10/leg, Pull-ups 3×max" },
            { cat: "exercise", text: "Kegels 3×10" },
            { cat: "exercise", text: "10,000 steps" },
            { cat: "nutrition", text: "160g protein. Beet juice or whole beets today." },
            { cat: "sleep", text: "22:30 / 06:00" },
            { cat: "whoop", text: "Midweek check: HRV trending above 40? RHR dropping below 68? Recovery mostly green?" },
          ],
        },
        {
          date: "Apr 24 (Thu)", label: "Day 11",
          tasks: [
            { cat: "exercise", text: "Active recovery: 10,000 steps, stretching, foam rolling" },
            { cat: "exercise", text: "Kegels 3×10" },
            { cat: "nutrition", text: "160g protein. Eat: eggs, avocado, nuts, leafy greens." },
            { cat: "sleep", text: "22:30 / 06:00" },
            { cat: "lifestyle", text: "10 min meditation or breathing. Focus on letting go of performance anxiety." },
          ],
        },
        {
          date: "Apr 25 (Fri)", label: "Day 12",
          tasks: [
            { cat: "exercise", text: "Strength #6 — Squats 3×10, Hip Thrusts 3×12, Push-ups 3×max, Rows 3×10" },
            { cat: "exercise", text: "Kegels 3×10" },
            { cat: "exercise", text: "10,000 steps" },
            { cat: "nutrition", text: "160g protein. Zero alcohol — you're 6 days out." },
            { cat: "sleep", text: "22:30 / 06:00" },
          ],
        },
        {
          date: "Apr 26 (Sat)", label: "Day 13",
          tasks: [
            { cat: "exercise", text: "Cardio: 30 min moderate (walk, cycle, swim). Last harder cardio session." },
            { cat: "exercise", text: "Kegels 3×10" },
            { cat: "exercise", text: "10,000 steps" },
            { cat: "nutrition", text: "160g protein. Clean eating, lots of vegetables, stay hydrated." },
            { cat: "sleep", text: "22:30 / 06:00" },
            { cat: "lifestyle", text: "Plan something thoughtful for May 1: dinner idea, music, candles, clean sheets." },
          ],
        },
        {
          date: "Apr 27 (Sun)", label: "Day 14",
          tasks: [
            { cat: "exercise", text: "Active rest: long walk, stretching" },
            { cat: "exercise", text: "Kegels 3×10" },
            { cat: "nutrition", text: "Meal prep for final week" },
            { cat: "sleep", text: "22:30 / 06:00" },
            { cat: "whoop", text: "WEEKLY REVIEW: Compare Week 2 vs Week 1. HRV, RHR, recovery trend." },
          ],
        },
      ],
    },
    {
      name: "Phase 3: Peak",
      dates: "Apr 28 – May 1",
      color: "#2A9D8F",
      days: [
        {
          date: "Apr 28 (Mon)", label: "Day 15",
          tasks: [
            { cat: "exercise", text: "Last strength session — moderate weight, don't go heavy. Squats, Bench, Rows. 3×8 each." },
            { cat: "exercise", text: "Kegels 3×10" },
            { cat: "exercise", text: "10,000 steps" },
            { cat: "nutrition", text: "160g protein, clean food, stay hydrated" },
            { cat: "sleep", text: "22:30 / 06:00 — sleep is everything this week" },
          ],
        },
        {
          date: "Apr 29 (Tue)", label: "Day 16",
          tasks: [
            { cat: "exercise", text: "Easy day: 10,000 steps only. Let your body recover fully." },
            { cat: "exercise", text: "Kegels 3×10" },
            { cat: "nutrition", text: "160g protein. Salmon or fish. Beet juice. Dark chocolate." },
            { cat: "sleep", text: "22:30 / 06:00. Aim for 8 hours." },
            { cat: "lifestyle", text: "Prepare everything: clean sheets, grooming, dinner plan, music playlist." },
          ],
        },
        {
          date: "Apr 30 (Wed)", label: "Day 17",
          tasks: [
            { cat: "exercise", text: "Light walk only. 10,000 steps. No gym." },
            { cat: "exercise", text: "Kegels 3×10" },
            { cat: "nutrition", text: "Clean eating. No heavy/greasy food. Hydrate well during the day." },
            { cat: "sleep", text: "22:30 / 06:00 — get a full 7.5–8 hours. Most important sleep of the plan." },
            { cat: "lifestyle", text: "Relax. Stay calm. Do your breathing exercise." },
            { cat: "whoop", text: "Check recovery — you want GREEN tomorrow. If you've followed the plan, you should be." },
          ],
        },
        {
          date: "May 1 (Thu)", label: "THE DAY", highlight: true,
          tasks: [
            { cat: "morning", text: "Wake naturally around 06:00. Morning sunlight. Light exercise or walk." },
            { cat: "morning", text: "Breakfast: eggs, oats, fruit, coffee (before noon)" },
            { cat: "nutrition", text: "Lunch: chicken or fish, rice, vegetables. Normal portion." },
            { cat: "nutrition", text: "Dinner: LIGHT meal 2–3 hours before. Salmon + rice + veg, or chicken + sweet potato." },
            { cat: "nutrition", text: "Stay hydrated during the day. Taper water by evening." },
            { cat: "nutrition", text: "No caffeine after noon. ZERO alcohol (or absolute max 1 glass wine with dinner)." },
            { cat: "lifestyle", text: "Shower, groom, fresh sheets on the bed." },
            { cat: "lifestyle", text: "Set the mood: music, dim lighting/candles, clean space." },
            { cat: "mindset", text: "Focus on CONNECTION not performance. Be present. Go slow. Communicate." },
            { cat: "mindset", text: "If nerves hit: box breathe (4-4-4-4) for 2 minutes. Your body is ready." },
          ],
        },
      ],
    },
  ],
  supplements: [
    { name: "Magnesium Glycinate", dose: "400mg", timing: "30–60 min before bed", why: "Improves deep sleep, relaxes muscles, reduces night waking" },
    { name: "Zinc", dose: "30mg", timing: "With dinner", why: "Supports testosterone production — WHOOP shows recovery needs help" },
    { name: "Vitamin D3", dose: "4,000 IU", timing: "Morning with food", why: "Most people are deficient — affects energy, testosterone, mood" },
    { name: "Omega-3 Fish Oil", dose: "1,000–2,000mg EPA/DHA", timing: "With any meal", why: "Reduces inflammation, supports heart health, improves blood flow" },
  ],
  targets: [
    { metric: "RHR", current: "High 60s–low 70s", target: "Below 65 bpm" },
    { metric: "HRV", current: "Mid 30s–low 40s", target: "Consistently above 40ms" },
    { metric: "Recovery", current: "Mixed yellow/green", target: "5+ green days in a row by Apr 28" },
    { metric: "Deep Sleep", current: "1h20m–2h16m", target: "Above 1h45m nightly" },
    { metric: "Sleep Debt", current: "Up to 2 hours", target: "Under 30 minutes" },
  ],
};

export const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  sleep:      { bg: "#12121e", text: "#7B8CDE", border: "#1e1e35" },
  nutrition:  { bg: "#101c16", text: "#6BCB77", border: "#1c3025" },
  exercise:   { bg: "#1e1212", text: "#E07A5F", border: "#351e1e" },
  lifestyle:  { bg: "#1e1a10", text: "#F2CC8F", border: "#352e1a" },
  supplement: { bg: "#101620", text: "#81B4D8", border: "#1c2535" },
  whoop:      { bg: "#1c1020", text: "#C77DBA", border: "#2e1c35" },
  morning:    { bg: "#1e1e10", text: "#E8D44D", border: "#35351c" },
  mindset:    { bg: "#101e1e", text: "#4ECDC4", border: "#1c3535" },
};

export const CAT_ICONS: Record<string, string> = {
  sleep: "🌙", nutrition: "🥦", exercise: "💪",
  lifestyle: "☀️", supplement: "💊", whoop: "⌚",
  morning: "🌅", mindset: "🧠",
};

const DAY_MAP: Record<string, [number, number]> = {
  "2026-04-14": [0, 0], "2026-04-15": [0, 1], "2026-04-16": [0, 2],
  "2026-04-17": [0, 3], "2026-04-18": [0, 4], "2026-04-19": [0, 5],
  "2026-04-20": [0, 6], "2026-04-21": [1, 0], "2026-04-22": [1, 1],
  "2026-04-23": [1, 2], "2026-04-24": [1, 3], "2026-04-25": [1, 4],
  "2026-04-26": [1, 5], "2026-04-27": [1, 6], "2026-04-28": [2, 0],
  "2026-04-29": [2, 1], "2026-04-30": [2, 2], "2026-05-01": [2, 3],
};

export function getTodayDayIndex(): [number, number] {
  const today = new Date();
  const key = today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");
  return DAY_MAP[key] || [0, 0];
}
