"use client";

import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import Dashboard from "./Dashboard";

export default function AuthGate() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // #region agent log
      fetch('http://127.0.0.1:7608/ingest/69984033-4014-4422-9d46-6d78f01f586c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'16e575'},body:JSON.stringify({sessionId:'16e575',location:'AuthGate.tsx:16',message:'Supabase not configured, skipping auth',data:{isSupabaseConfigured},timestamp:Date.now(),hypothesisId:'H1'})}).catch(()=>{});
      // #endregion
      setLoading(false);
      return;
    }

    // #region agent log
    fetch('http://127.0.0.1:7608/ingest/69984033-4014-4422-9d46-6d78f01f586c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'16e575'},body:JSON.stringify({sessionId:'16e575',location:'AuthGate.tsx:23',message:'Supabase configured, checking auth state',data:{origin: typeof window !== 'undefined' ? window.location.origin : 'ssr', hash: typeof window !== 'undefined' ? window.location.hash.substring(0, 50) : 'ssr'},timestamp:Date.now(),hypothesisId:'H3'})}).catch(()=>{});
    // #endregion

    supabase.auth.getUser().then(({ data, error: authErr }) => {
      // #region agent log
      fetch('http://127.0.0.1:7608/ingest/69984033-4014-4422-9d46-6d78f01f586c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'16e575'},body:JSON.stringify({sessionId:'16e575',location:'AuthGate.tsx:30',message:'getUser result',data:{hasUser:!!data.user,userId:data.user?.id,email:data.user?.email,error:authErr?.message},timestamp:Date.now(),hypothesisId:'H4'})}).catch(()=>{});
      // #endregion
      setUser(data.user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // #region agent log
      fetch('http://127.0.0.1:7608/ingest/69984033-4014-4422-9d46-6d78f01f586c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'16e575'},body:JSON.stringify({sessionId:'16e575',location:'AuthGate.tsx:39',message:'Auth state changed',data:{event,hasSession:!!session,userId:session?.user?.id},timestamp:Date.now(),hypothesisId:'H4'})}).catch(()=>{});
      // #endregion
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setError("");
    // #region agent log
    fetch('http://127.0.0.1:7608/ingest/69984033-4014-4422-9d46-6d78f01f586c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'16e575'},body:JSON.stringify({sessionId:'16e575',location:'AuthGate.tsx:50',message:'Google login initiated',data:{origin: window.location.origin, redirectTo: window.location.origin},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
    // #endregion
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      // #region agent log
      fetch('http://127.0.0.1:7608/ingest/69984033-4014-4422-9d46-6d78f01f586c',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'16e575'},body:JSON.stringify({sessionId:'16e575',location:'AuthGate.tsx:60',message:'Google login error',data:{error:error.message},timestamp:Date.now(),hypothesisId:'H2'})}).catch(()=>{});
      // #endregion
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
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
        <p className="auth-sub">Sign in with Google to sync your progress across devices.</p>

        <button className="auth-google-btn" onClick={handleGoogleLogin}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {error && <p className="auth-error" style={{ marginTop: "12px" }}>{error}</p>}
      </div>
    </div>
  );
}
