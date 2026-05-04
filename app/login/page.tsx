'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

if (!process.env.NEXT_PUBLIC_APP_URL) {
  throw new Error('NEXT_PUBLIC_APP_URL is not set');
}
const APP_URL = process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '');

function redirectToDashboard(session: { access_token: string; refresh_token: string; expires_in: number }) {
  const params = new URLSearchParams({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_in: String(session.expires_in),
    token_type: 'bearer',
    type: 'recovery',
  });
  window.location.href = `${APP_URL}/auth/callback#${params.toString()}`;
}

function EyeIcon({ off }: { off?: boolean }) {
  return off ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    console.log('[LoginPage] mount');
    return () => {
      if (failsafeRef.current) clearTimeout(failsafeRef.current);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading || googleLoading) return;
    setError('');
    setLoading(true);

    failsafeRef.current = setTimeout(() => {
      setLoading(false);
      setError('Sign-in timed out. Please try again.');
    }, 10_000);

    try {
      console.log('[LoginPage] signing in');
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError || !data.session) {
        clearTimeout(failsafeRef.current!);
        setError('Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }

      console.log('[LoginPage] success → redirecting to dashboard');
      redirectToDashboard(data.session);
    } catch {
      clearTimeout(failsafeRef.current!);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  async function handleGoogle() {
    if (loading || googleLoading) return;
    setGoogleLoading(true);
    console.log('[LoginPage] Google OAuth');
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${APP_URL}/auth/callback` },
    });
    setGoogleLoading(false);
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>

      {/* Left panel — hidden below md */}
      <div className="hidden md:flex md:w-[44%] flex-shrink-0 flex-col p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, oklch(0.22 0.08 260) 0%, oklch(0.13 0.05 260) 100%)' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full" style={{ background: 'oklch(0.55 0.18 260 / 0.12)' }} />
          <div className="absolute bottom-20 -left-16 w-60 h-60 rounded-full" style={{ background: 'oklch(0.55 0.18 260 / 0.08)' }} />
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-base flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, oklch(0.65 0.18 250), oklch(0.5 0.2 255))' }}>T</div>
          <div>
            <div className="text-white font-extrabold text-base leading-none">TAMS</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: 'oklch(0.75 0.05 260)' }}>Travel Agency Management System</div>
          </div>
        </div>

        <div className="mt-14 relative z-10">
          <h1 className="text-white font-extrabold leading-tight tracking-tight mb-4" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}>
            Manage your travel agency smarter
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'oklch(0.72 0.04 260)' }}>
            Join hundreds of Malaysian travel agencies running smoother operations with TAMS.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 relative z-10">
          {['Bookings, payments & invoices in one place', 'SST-compliant invoice generation', 'Real-time reports & analytics', 'Multi-user & multi-agency support'].map((feat) => (
            <div key={feat} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: 'oklch(0.65 0.18 155 / 0.2)', color: 'oklch(0.8 0.14 155)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-sm leading-relaxed" style={{ color: 'oklch(0.88 0.03 260)' }}>{feat}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto relative z-10 rounded-2xl p-5" style={{ background: 'oklch(1 0 0 / 0.06)', border: '1px solid oklch(1 0 0 / 0.1)' }}>
          <div className="text-3xl leading-none mb-2.5 font-serif" style={{ color: 'oklch(0.65 0.18 250)' }}>&ldquo;</div>
          <p className="text-sm leading-relaxed italic mb-4" style={{ color: 'oklch(0.88 0.03 260)' }}>
            We used to lose two days a month reconciling bookings. With TAMS, it&apos;s done in one afternoon.
          </p>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
              style={{ background: 'oklch(0.65 0.16 155 / 0.3)', color: 'oklch(0.85 0.14 155)' }}>AR</div>
            <div>
              <div className="text-white font-semibold text-sm">Aisha Rahman</div>
              <div className="text-xs" style={{ color: 'oklch(0.65 0.04 260)' }}>Owner · Pelangi Tours, Shah Alam</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col" style={{ background: 'var(--surface, #fff)' }}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5">
          {/* Mobile logo */}
          <div className="flex md:hidden items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-extrabold text-sm"
              style={{ background: 'linear-gradient(135deg, var(--brand, oklch(0.55 0.18 260)), oklch(0.42 0.18 255))' }}>T</div>
            <span className="font-bold text-base" style={{ color: 'var(--ink, #111)' }}>TAMS</span>
          </div>
          <div className="md:ml-auto text-sm" style={{ color: 'var(--ink-3, #777)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold" style={{ color: 'var(--brand, oklch(0.55 0.18 260))' }}>
              Start free trial
            </Link>
          </div>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center px-8 pb-12">
          <div className="w-full max-w-sm">

            <div className="mb-8">
              <h2 className="text-2xl font-extrabold tracking-tight mb-2" style={{ color: 'var(--ink, #111)' }}>
                Welcome back
              </h2>
              <p className="text-sm" style={{ color: 'var(--ink-4, #888)' }}>
                Sign in to manage your travel agency
              </p>
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading || googleLoading}
              className="w-full flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors disabled:opacity-55 disabled:cursor-not-allowed"
              style={{ background: 'var(--surface, #fff)', borderColor: 'var(--ink-4, #ccc)', color: 'var(--ink-2, #444)' }}
            >
              {googleLoading ? <SpinnerIcon /> : <GoogleIcon />}
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-5" style={{ color: 'var(--ink-4, #aaa)', fontSize: 12 }}>
              <div className="flex-1 h-px" style={{ background: 'var(--surface-3, #e5e7eb)' }} />
              or continue with email
              <div className="flex-1 h-px" style={{ background: 'var(--surface-3, #e5e7eb)' }} />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink-2, #444)' }}>
                  Email address
                </label>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@agency.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all"
                  style={{ borderColor: 'var(--surface-3, #d1d5db)', color: 'var(--ink, #111)', background: 'var(--surface, #fff)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--brand, oklch(0.55 0.18 260))'; e.target.style.boxShadow = '0 0 0 3px oklch(0.55 0.18 260 / 0.12)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--surface-3, #d1d5db)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold" style={{ color: 'var(--ink-2, #444)' }}>Password</label>
                  <button type="button" className="text-xs font-medium" style={{ color: 'var(--brand, oklch(0.55 0.18 260))' }}>
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-lg border text-sm outline-none transition-all"
                    style={{ borderColor: 'var(--surface-3, #d1d5db)', color: 'var(--ink, #111)', background: 'var(--surface, #fff)' }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--brand, oklch(0.55 0.18 260))'; e.target.style.boxShadow = '0 0 0 3px oklch(0.55 0.18 260 / 0.12)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--surface-3, #d1d5db)'; e.target.style.boxShadow = 'none'; }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                    style={{ color: 'var(--ink-4, #aaa)' }}>
                    <EyeIcon off={showPassword} />
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: 'var(--brand, oklch(0.55 0.18 260))' }}
                />
                <span className="text-sm" style={{ color: 'var(--ink-3, #666)' }}>Remember me</span>
              </label>

              {error && (
                <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-lg border text-sm" style={{ background: '#fff1f2', borderColor: '#fecdd3', color: '#be123c' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-55 disabled:cursor-not-allowed"
                style={{ background: 'var(--brand, oklch(0.55 0.18 260))' }}
              >
                {loading && <SpinnerIcon />}
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: 'var(--ink-3, #777)' }}>
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold" style={{ color: 'var(--brand, oklch(0.55 0.18 260))' }}>
                Start free trial
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
