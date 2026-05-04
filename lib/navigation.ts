import { ROUTES } from "@/lib/routes";

export function getAppUrl(): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!appUrl) {
    throw new Error('NEXT_PUBLIC_APP_URL is not set');
  }
  return appUrl.replace(/\/$/, "");
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
