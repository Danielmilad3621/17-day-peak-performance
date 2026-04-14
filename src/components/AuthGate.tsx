"use client";

import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import Dashboard from "./Dashboard";

export default function AuthGate() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-spinner" />
      </div>
    );
  }

  if (!isSupabaseConfigured || user) {
    return <Dashboard user={user} />;
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header-label">17-Day Protocol</div>
        <h1 className="auth-title">Peak Performance Plan</h1>
        <p className="auth-sub">Sign in with a magic link to sync your progress across devices.</p>

        {sent ? (
          <div className="auth-sent">
            <div className="auth-sent-icon">✉️</div>
            <p className="auth-sent-text">
              Check <strong>{email}</strong> for a magic link.
            </p>
            <button className="auth-resend" onClick={() => setSent(false)}>
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="auth-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="auth-input"
              autoFocus
            />
            <button type="submit" className="auth-submit">
              Send Magic Link
            </button>
            {error && <p className="auth-error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
