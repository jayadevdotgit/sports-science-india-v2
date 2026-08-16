import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Smoothly scrolls to an absolute Y position (page-relative, in CSS px).
 * Falls back to the browser's native smooth scroll if Lenis isn't running.
 */
export function smoothScrollToY(targetY: number) {
  const target = Math.max(0, targetY);
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      force: true,
      duration: Math.min(1.6, Math.max(0.6, Math.abs(window.scrollY - target) / 1500)),
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    return;
  }
  window.scrollTo({ top: target, behavior: "smooth" });
}

/**
 * Smoothly scrolls to a target element, leaving `offset` px of clearance
 * above it so fixed headers don't overlap the section. Computes the absolute
 * target Y manually because the site uses `html { zoom: 90% }`, which makes
 * Lenis's internal element math drift from window.scroll position.
 */
export function smoothScrollToEl(el: HTMLElement | null, offset = 0) {
  if (!el) return;
  const y = window.scrollY + el.getBoundingClientRect().top - offset;
  const target = Math.max(0, y);
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      force: true,
      duration: Math.min(1.6, Math.max(0.6, Math.abs(window.scrollY - target) / 1500)),
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    return;
  }
  window.scrollTo({ top: target, behavior: "smooth" });
}