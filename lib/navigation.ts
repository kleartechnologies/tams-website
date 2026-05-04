import { ROUTES } from "@/lib/routes";

export function getAppUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL ?? 'https://tams-frontend.vercel.app').replace(/\/$/, '');
}

/** Navigate to /signup in the main app. */
export function goToSignup(): void {
  const appUrl = getAppUrl();
  window.location.href = `${appUrl}${ROUTES.SIGNUP}`;
}

/** Navigate to /login in the main app. */
export function goToLogin(): void {
  const appUrl = getAppUrl();
  window.location.href = `${appUrl}${ROUTES.LOGIN}`;
}
