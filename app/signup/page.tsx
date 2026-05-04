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
    type: 'signup',
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

export default function SignupPage() {
  const [agencyName, setAgencyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const failsafeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    console.log('[SignupPage] mount');
    return () => {
      if (failsafeRef.current) clearTimeout(failsafeRef.current);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading || googleLoading) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setError('');
    setInfo('');
    setLoading(true);

    failsafeRef.current = setTimeout(() => {
      setLoading(false);
      setError('Sign-up timed out. Please try again.');
    }, 15_000);

    try {
      console.log('[SignupPage] signing up');
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

      if (signUpError) {
        clearTimeout(failsafeRef.current!);
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Email confirmation required — session is null
      if (!data.session) {
        clearTimeout(failsafeRef.current!);
        setInfo('Account created! Check your email to confirm, then sign in.');
        setLoading(false);
        return;
      }

      // Immediate session — redirect to dashboard; onboarding will handle agency setup
      console.log('[SignupPage] success → redirecting to dashboard');
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
    console.log('[SignupPage] Google OAuth');
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${APP_URL}/auth/callback` },
    });
    setGoogleLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: 'var(--surface-2, #f9fafb)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' }}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-base"
            style={{ background: 'linear-gradient(135deg, oklch(0.65 0.18 250), oklch(0.5 0.2 255))' }}>T</div>
          <span className="font-extrabold text-lg" style={{ color: 'var(--ink, #111)' }}>TAMS</span>
        </div>

        <div className="rounded-2xl p-8 shadow-sm border" style={{ background: 'var(--surface, #fff)', borderColor: 'var(--surface-3, #e5e7eb)' }}>
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-extrabold tracking-tight mb-1.5" style={{ color: 'var(--ink, #111)' }}>
              Start your free trial
            </h1>
            <p className="text-sm" style={{ color: 'var(--ink-4, #888)' }}>
              Set up TAMS for your travel agency — no credit card required
            </p>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors disabled:opacity-55 disabled:cursor-not-allowed mb-5"
            style={{ background: 'var(--surface, #fff)', borderColor: 'var(--surface-3, #d1d5db)', color: 'var(--ink-2, #444)' }}
          >
            {googleLoading ? <SpinnerIcon /> : <GoogleIcon />}
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5" style={{ color: 'var(--ink-4, #aaa)', fontSize: 12 }}>
            <div className="flex-1 h-px" style={{ background: 'var(--surface-3, #e5e7eb)' }} />
            or sign up with email
            <div className="flex-1 h-px" style={{ background: 'var(--surface-3, #e5e7eb)' }} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink-2, #444)' }}>
                Agency name
              </label>
              <input
                type="text"
                required
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                placeholder="Ahmad Travels Sdn Bhd"
                className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-all"
                style={{ borderColor: 'var(--surface-3, #d1d5db)', color: 'var(--ink, #111)', background: 'var(--surface, #fff)' }}
                onFocus={(e) => { e.target.style.borderColor = 'var(--brand, oklch(0.55 0.18 260))'; e.target.style.boxShadow = '0 0 0 3px oklch(0.55 0.18 260 / 0.12)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'var(--surface-3, #d1d5db)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

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
              <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink-2, #444)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
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

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink-2, #444)' }}>
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border text-sm outline-none transition-all"
                  style={{ borderColor: 'var(--surface-3, #d1d5db)', color: 'var(--ink, #111)', background: 'var(--surface, #fff)' }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--brand, oklch(0.55 0.18 260))'; e.target.style.boxShadow = '0 0 0 3px oklch(0.55 0.18 260 / 0.12)'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--surface-3, #d1d5db)'; e.target.style.boxShadow = 'none'; }}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                  style={{ color: 'var(--ink-4, #aaa)' }}>
                  <EyeIcon off={showConfirm} />
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-lg border text-sm" style={{ background: '#fff1f2', borderColor: '#fecdd3', color: '#be123c' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            {info && (
              <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-lg border text-sm" style={{ background: '#f0fdf4', borderColor: '#bbf7d0', color: '#15803d' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" /><polyline points="9 11 12 14 22 4" />
                </svg>
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-55 disabled:cursor-not-allowed"
              style={{ background: 'var(--brand, oklch(0.55 0.18 260))' }}
            >
              {loading && <SpinnerIcon />}
              {loading ? 'Creating account…' : 'Start free trial'}
            </button>

            <p className="text-center text-xs leading-relaxed" style={{ color: 'var(--ink-4, #aaa)' }}>
              By signing up you agree to our{' '}
              <span className="underline cursor-pointer" style={{ color: 'var(--ink-3, #777)' }}>Terms</span>
              {' '}and{' '}
              <span className="underline cursor-pointer" style={{ color: 'var(--ink-3, #777)' }}>Privacy Policy</span>.
            </p>
          </form>
        </div>

        <p className="mt-6 text-center text-sm" style={{ color: 'var(--ink-3, #777)' }}>
          Already have an account?{' '}
          <Link href="/login" className="font-semibold" style={{ color: 'var(--brand, oklch(0.55 0.18 260))' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
