"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import {
  PLAN_DATA, CAT_COLORS, CAT_ICONS, getTodayDayIndex,
} from "@/lib/plan-data";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useWhoop } from "@/lib/use-whoop";
import type { User } from "@supabase/supabase-js";

import type { WhoopMetrics } from "@/lib/use-whoop";

const STORAGE_KEY = "peak-plan-tasks-v2";

function getLiveValue(metric: string, data: WhoopMetrics): string | null {
  switch (metric) {
    case "RHR": return data.rhr != null ? `${data.rhr} bpm` : null;
    case "HRV": return data.hrv != null ? `${data.hrv} ms` : null;
    case "Recovery": return data.recovery_score != null ? `${data.recovery_score}%` : null;
    case "Deep Sleep": return data.deep_sleep_minutes != null
      ? `${Math.floor(data.deep_sleep_minutes / 60)}h${data.deep_sleep_minutes % 60}m` : null;
    case "Sleep Debt": return data.sleep_debt_minutes != null
      ? `${Math.floor(data.sleep_debt_minutes / 60)}h${data.sleep_debt_minutes % 60}m` : null;
    default: return null;
  }
}

interface DayProgress {
  done: number;
  total: number;
}

export default function Dashboard({ user }: { user: User | null }) {
  const [todayPhase, todayDay] = getTodayDayIndex();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [activePhase, setActivePhase] = useState(todayPhase);
  const [activeDay, setActiveDay] = useState(todayDay);
  const [showSupplements, setShowSupplements] = useState(false);
  const [showTargets, setShowTargets] = useState(false);
  const [showWeekly, setShowWeekly] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const whoop = useWhoop();
  const prevDayComplete = useRef<Set<string>>(new Set());

  const loadTasks = useCallback(async () => {
    if (isSupabaseConfigured && user) {
      const { data } = await supabase
        .from("task_completions")
        .select("task_key")
        .eq("user_id", user.id);
      if (data) {
        const map: Record<string, boolean> = {};
        data.forEach((row) => { map[row.task_key] = true; });
        setCompletedTasks(map);
      }
    } else {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setCompletedTasks(JSON.parse(saved));
      } catch {}
    }
  }, [user]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const toggleTask = async (pi: number, di: number, ti: number) => {
    const key = `${pi}-${di}-${ti}`;
    const wasDone = !!completedTasks[key];
    const next = { ...completedTasks, [key]: !wasDone };
    if (!next[key]) delete next[key];
    setCompletedTasks(next);

    if (isSupabaseConfigured && user) {
      setSyncing(true);
      if (wasDone) {
        await supabase.from("task_completions").delete()
          .eq("user_id", user.id).eq("task_key", key);
      } else {
        await supabase.from("task_completions")
          .upsert({ user_id: user.id, task_key: key });
      }
      setSyncing(false);
    } else {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
    }

    if (!wasDone) {
      const dayKey = `${pi}-${di}`;
      const day = PLAN_DATA.phases[pi].days[di];
      const doneCount = day.tasks.filter((_, ti2) => {
        const k = `${pi}-${di}-${ti2}`;
        return k === key ? true : !!next[k];
      }).length;
      if (doneCount === day.tasks.length && !prevDayComplete.current.has(dayKey)) {
        prevDayComplete.current.add(dayKey);
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ["#2A9D8F", "#E63946", "#F4A261"] });
      }
    }
  };

  const getProgress = () => {
    let total = 0, done = 0;
    PLAN_DATA.phases.forEach((phase, pi) => {
      phase.days.forEach((day, di) => {
        day.tasks.forEach((_, ti) => {
          total++;
          if (completedTasks[`${pi}-${di}-${ti}`]) done++;
        });
      });
    });
    return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const getDayProgress = (pi: number, di: number): DayProgress => {
    const day = PLAN_DATA.phases[pi].days[di];
    let done = 0;
    day.tasks.forEach((_, ti) => {
      if (completedTasks[`${pi}-${di}-${ti}`]) done++;
    });
    return { done, total: day.tasks.length };
  };

  const isToday = (pi: number, di: number) => pi === todayPhase && di === todayDay;

  const handleSignOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
      window.location.reload();
    }
  };

  const progress = getProgress();
  const currentPhase = PLAN_DATA.phases[activePhase];
  const currentDay = currentPhase.days[activeDay];
  const dayProg = getDayProgress(activePhase, activeDay);

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <div className="header-top-row">
          <div className="header-label">17-Day Protocol</div>
          {user && (
            <button className="sign-out-btn" onClick={handleSignOut}>
              Sign out
            </button>
          )}
        </div>
        <div className="header-title">Peak Performance Plan</div>
        <div className="header-sub">
          Apr 14 → May 1 · Based on your WHOOP data
          {syncing && <span className="sync-dot" title="Syncing..." />}
        </div>
        <div className="progress-wrap">
          <div className="progress-info">
            <span>{progress.done}/{progress.total} tasks</span>
            <span>{progress.pct}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress.pct}%`,
                background: `linear-gradient(90deg, ${currentPhase.color}, ${currentPhase.color}88)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Quick access */}
      <div className="quick-btns">
        <button
          className={`quick-btn ${showSupplements ? "active-supp" : ""}`}
          onClick={() => { setShowSupplements(!showSupplements); setShowTargets(false); }}
        >
          💊 Supplements
        </button>
        <button
          className={`quick-btn ${showTargets ? "active-tgt" : ""}`}
          onClick={() => { setShowTargets(!showTargets); setShowSupplements(false); }}
        >
          ⌚ WHOOP Targets
        </button>
      </div>

      {/* Supplements */}
      {showSupplements && (
        <div className="panel">
          {PLAN_DATA.supplements.map((s, i) => (
            <div key={i} className="panel-card">
              <div className="supp-name">{s.name}</div>
              <div className="supp-detail">{s.dose} · {s.timing}</div>
              <div className="supp-why">{s.why}</div>
            </div>
          ))}
        </div>
      )}

      {/* Targets */}
      {showTargets && (
        <div className="panel">
          {whoop.configured && whoop.data && (
            <div className="panel-card whoop-live-card">
              <div className="whoop-live-header">
                <span className="whoop-live-dot" />
                LIVE from WHOOP
              </div>
              <div className="whoop-live-grid">
                {whoop.data.rhr != null && (
                  <div className="whoop-stat">
                    <div className="whoop-stat-value">{whoop.data.rhr}</div>
                    <div className="whoop-stat-label">RHR</div>
                  </div>
                )}
                {whoop.data.hrv != null && (
                  <div className="whoop-stat">
                    <div className="whoop-stat-value">{whoop.data.hrv}</div>
                    <div className="whoop-stat-label">HRV</div>
                  </div>
                )}
                {whoop.data.recovery_score != null && (
                  <div className="whoop-stat">
                    <div className="whoop-stat-value">{whoop.data.recovery_score}%</div>
                    <div className="whoop-stat-label">Recovery</div>
                  </div>
                )}
                {whoop.data.deep_sleep_minutes != null && (
                  <div className="whoop-stat">
                    <div className="whoop-stat-value">
                      {Math.floor(whoop.data.deep_sleep_minutes / 60)}h{whoop.data.deep_sleep_minutes % 60}m
                    </div>
                    <div className="whoop-stat-label">Deep Sleep</div>
                  </div>
                )}
              </div>
              {whoop.fetchedAt && (
                <div className="whoop-live-time">
                  Updated {new Date(whoop.fetchedAt).toLocaleTimeString()}
                </div>
              )}
            </div>
          )}
          {whoop.configured && whoop.loading && (
            <div className="panel-card" style={{ textAlign: "center", padding: "16px" }}>
              <div className="auth-spinner" style={{ margin: "0 auto" }} />
            </div>
          )}
          {PLAN_DATA.targets.map((t, i) => {
            const liveValue = whoop.data ? getLiveValue(t.metric, whoop.data) : null;
            return (
              <div key={i} className="panel-card target-card">
                <div>
                  <div className="target-metric">{t.metric}</div>
                  <div className="target-current">
                    {liveValue ? `Live: ${liveValue}` : `Baseline: ${t.current}`}
                  </div>
                </div>
                <div className="target-goal">→ {t.target}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Phase tabs */}
      <div className="phase-tabs">
        {PLAN_DATA.phases.map((phase, idx) => (
          <button
            key={idx}
            className={`phase-tab ${activePhase === idx ? "active" : ""}`}
            style={activePhase === idx ? {
              background: `${phase.color}12`,
              color: phase.color,
              borderColor: `${phase.color}35`,
              borderBottomColor: phase.color,
            } : undefined}
            onClick={() => { setActivePhase(idx); setActiveDay(0); }}
          >
            {phase.name.split(":")[0]}
            <div className="phase-tab-dates">{phase.dates}</div>
          </button>
        ))}
      </div>

      {/* Day selector */}
      <div className="day-selector">
        {currentPhase.days.map((day, idx) => {
          const dp = getDayProgress(activePhase, idx);
          const isComplete = dp.done === dp.total && dp.total > 0;
          const isActive = activeDay === idx;
          const isTodayDay = isToday(activePhase, idx);
          return (
            <button
              key={idx}
              className="day-btn"
              style={{
                background: isActive ? `${currentPhase.color}18` : isComplete ? "#0a160a" : undefined,
                color: isActive ? currentPhase.color : isComplete ? "var(--green)" : undefined,
                borderColor: isActive ? `${currentPhase.color}45` : isComplete ? "#1a3a1a" : undefined,
              }}
              onClick={() => setActiveDay(idx)}
            >
              <div className="day-label">
                {day.label}
                {isTodayDay && <span className="today-badge">TODAY</span>}
              </div>
              {dp.done > 0 && <div className="day-progress-label">{dp.done}/{dp.total}</div>}
              {isComplete && <div className="day-check">✅</div>}
            </button>
          );
        })}
      </div>

      {/* Tasks */}
      <div className="day-content">
        <div className="day-header">
          <div>
            <div className={`day-date ${currentDay.highlight ? "highlight" : ""}`}>
              {currentDay.date}
            </div>
            {currentDay.highlight && <div className="game-day-label">GAME DAY</div>}
          </div>
          <div className="day-counter">{dayProg.done}/{dayProg.total}</div>
        </div>
        {currentDay.tasks.map((task, ti) => {
          const key = `${activePhase}-${activeDay}-${ti}`;
          const done = !!completedTasks[key];
          const catStyle = CAT_COLORS[task.cat] || CAT_COLORS.lifestyle;
          return (
            <div
              key={ti}
              className={`task-item ${done ? "done" : ""}`}
              style={{
                background: done ? "#080808" : catStyle.bg,
                borderColor: done ? "var(--border)" : catStyle.border,
              }}
              onClick={() => toggleTask(activePhase, activeDay, ti)}
            >
              <div
                className="task-check"
                style={{
                  borderColor: done ? "var(--green)" : `${catStyle.text}40`,
                  background: done ? "rgba(42,157,143,0.15)" : "transparent",
                  color: "var(--green)",
                }}
              >
                {done ? "✓" : ""}
              </div>
              <div style={{ flex: 1 }}>
                <div className="task-cat" style={{ color: catStyle.text }}>
                  {CAT_ICONS[task.cat] || ""} {task.cat}
                </div>
                <div className="task-text">{task.text}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Summary Toggle */}
      <div className="quick-btns" style={{ borderTop: "1px solid var(--border)", borderBottom: "none" }}>
        <button
          className={`quick-btn ${showWeekly ? "active-tgt" : ""}`}
          onClick={() => setShowWeekly(!showWeekly)}
        >
          📊 Weekly Summary
        </button>
      </div>

      {showWeekly && (
        <div className="panel">
          {PLAN_DATA.phases.map((phase, pi) => {
            let phaseTotal = 0, phaseDone = 0;
            phase.days.forEach((day, di) => {
              day.tasks.forEach((_, ti) => {
                phaseTotal++;
                if (completedTasks[`${pi}-${di}-${ti}`]) phaseDone++;
              });
            });
            const phasePct = phaseTotal > 0 ? Math.round((phaseDone / phaseTotal) * 100) : 0;
            return (
              <div key={pi} className="panel-card weekly-phase-card">
                <div className="weekly-phase-header">
                  <span style={{ color: phase.color, fontWeight: 500 }}>{phase.name}</span>
                  <span className="weekly-phase-pct" style={{ color: phase.color }}>{phasePct}%</span>
                </div>
                <div className="weekly-phase-bar">
                  <div
                    className="weekly-phase-fill"
                    style={{ width: `${phasePct}%`, background: phase.color }}
                  />
                </div>
                <div className="weekly-phase-detail">
                  {phase.days.map((day, di) => {
                    const dp = getDayProgress(pi, di);
                    const complete = dp.done === dp.total && dp.total > 0;
                    return (
                      <div
                        key={di}
                        className="weekly-day-dot"
                        title={`${day.label}: ${dp.done}/${dp.total}`}
                        style={{
                          background: complete ? phase.color : dp.done > 0 ? `${phase.color}40` : "var(--border)",
                        }}
                      />
                    );
                  })}
                  <span className="weekly-phase-count">{phaseDone}/{phaseTotal}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        Non-negotiables every day: Sleep 22:30–06:00 · 160g protein · 10K steps · Zero nicotine · Zero alcohol · Morning sunlight
      </div>
    </div>
  );
}
