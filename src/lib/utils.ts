export type ClassValue = string | number | false | null | undefined;

/** Minimal className joiner — keeps us dependency-light (no clsx/tailwind-merge). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
