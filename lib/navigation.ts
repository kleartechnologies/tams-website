import { ROUTES } from "@/lib/routes";

export function getAppUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL ?? 'https://tams-frontend.vercel.app').replace(/\/$/, '');
}

/** Navigate to /signup in the main app, optionally pre-selecting a plan. */
export function goToSignup(plan?: 'GROWTH' | 'PRO'): void {
  const appUrl = getAppUrl();
  const query = plan ? `?plan=${plan}` : '';
  window.location.href = `${appUrl}${ROUTES.SIGNUP}${query}`;
}

/** Navigate to /login in the main app. */
export function goToLogin(): void {
  const appUrl = getAppUrl();
  window.location.href = `${appUrl}${ROUTES.LOGIN}`;
}
