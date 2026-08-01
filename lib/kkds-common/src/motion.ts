/**
 * Semantic motion tokens for the KitchenKin Design System.
 *
 * Composes the duration + easing primitives from `tokens` into named intents
 * that describe *what* should happen, not *how* it is animated. This separation
 * lets platforms use their own animation APIs while sharing the same rhythm.
 *
 * Platform mapping guide:
 *   Web (Framer Motion):
 *     <motion.div animate={{ opacity: 1 }} transition={motion.overlay.enter} />
 *
 *   Web (CSS):
 *     transition: opacity ${motion.overlay.enter.duration}ms
 *                          ${motion.overlay.enter.ease};
 *
 *   Mobile (Reanimated, future):
 *     withTiming(1, { duration: motion.overlay.enter.duration,
 *                     easing: Easing.bezier(...) })
 *
 * Note: `ease` is a CSS cubic-bezier string. On React Native, map each curve to
 * the nearest Reanimated Easing preset — see docs/mobile-readiness.md.
 */

import tokens from './generated/tokens';

/** Platform-neutral motion specification: duration in ms + easing curve. */
export interface MotionSpec {
  /** Duration in milliseconds. */
  duration: number;
  /** CSS cubic-bezier easing string. Map to platform equivalent on mobile. */
  ease: string;
}

/** Parses a CSS time string (`"200ms"`) into a numeric millisecond value. */
function ms(cssTime: string): number {
  return parseInt(cssTime.replace(/ms$/, ''), 10);
}

const d = tokens.motion.duration;
const e = tokens.motion.easing;

/**
 * Semantic motion intents composed from the token primitives.
 * Each entry is a `{ duration, ease }` pair ready for use in any animation API.
 */
export const motion = {
  /**
   * Imperceptible — icon swaps, badge count updates.
   * So fast it reads as instant; prevents visual pop.
   */
  instant: { duration: ms(d.instant), ease: e.standard } satisfies MotionSpec,

  /** Quick user feedback — button press, checkbox toggle, switch flip. */
  feedback: {
    fast: { duration: ms(d.fast), ease: e.standard } satisfies MotionSpec,
  },

  /**
   * Overlay entry/exit — dialogs, sheets, popovers, dropdown menus.
   * Enter is slower than exit so the UI feels responsive when dismissing.
   */
  overlay: {
    enter: { duration: ms(d.normal), ease: e.enter  } satisfies MotionSpec,
    exit:  { duration: ms(d.fast),   ease: e.exit   } satisfies MotionSpec,
  },

  /**
   * Toast / notification — slides in from the edge, dismisses quickly.
   * Longer enter duration gives the user time to read the message.
   */
  toast: {
    enter: { duration: ms(d.slow),   ease: e.enter  } satisfies MotionSpec,
    exit:  { duration: ms(d.normal), ease: e.exit   } satisfies MotionSpec,
  },

  /**
   * Navigation and page-level transitions.
   * Deliberate pace signals a context change without feeling slow.
   */
  navigation: {
    standard: { duration: ms(d.slow), ease: e.standard } satisfies MotionSpec,
  },

  /**
   * Skeleton loading pulse animation.
   * Long duration feels calm; avoids anxious flickering.
   */
  skeleton: {
    pulse: { duration: ms(d.skeleton), ease: e.standard } satisfies MotionSpec,
  },

  /**
   * Playful spring — hover cards, liked/favorited state, delight moments.
   * The slight overshoot gives a tactile, physical quality.
   */
  spring: { duration: ms(d.normal), ease: e.spring } satisfies MotionSpec,
} as const;

export type Motion = typeof motion;
