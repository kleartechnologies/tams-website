import { ROUTES } from "@/lib/routes";

export function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL;
  if (!url) throw new Error('NEXT_PUBLIC_APP_URL is not set');
  return url.replace(/\/$/, '');
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
