import { useState } from "react";
import { motion as m } from "motion/react";
import { tokens } from "@sverg84/kkds-react";

const d = tokens.motion.duration;
const e = tokens.motion.easing;

// Semantic intents composed from the primitives
const SEMANTIC = [
  {
    name: "instant",
    duration: parseInt(d.instant),
    ease: e.standard,
    description: "Micro-state changes — icon swaps, badge count updates.",
    use: "Count badge",
  },
  {
    name: "feedback.fast",
    duration: parseInt(d.fast),
    ease: e.standard,
    description: "Quick user feedback — button press, checkbox toggle.",
    use: "Button active state, Switch flip",
  },
  {
    name: "overlay.enter",
    duration: parseInt(d.normal),
    ease: e.enter,
    description: "Dialogs, sheets, and popovers appearing.",
    use: "Dialog open, Sheet slide-in",
  },
  {
    name: "overlay.exit",
    duration: parseInt(d.fast),
    ease: e.exit,
    description: "Overlays dismissing — faster than enter for responsiveness.",
    use: "Dialog close, Sheet dismiss",
  },
  {
    name: "toast.enter",
    duration: parseInt(d.slow),
    ease: e.enter,
    description: "Notification slides in — slow enough to read.",
    use: "Toast / Sonner entry",
  },
  {
    name: "navigation.standard",
    duration: parseInt(d.slow),
    ease: e.standard,
    description: "Page or section transitions.",
    use: "Route change, tab content swap",
  },
  {
    name: "spring",
    duration: parseInt(d.normal),
    ease: e.spring,
    description: "Playful overshoot — delight moments.",
    use: "Hover card",
  },
  {
    name: "skeleton.pulse",
    duration: parseInt(d.skeleton),
    ease: e.standard,
    description: "Loading pulse — long to feel calm.",
    use: "RecipeCardSkeleton shimmer",
  },
] as const;

const DURATION_SCALE = [
  { key: "instant", label: "Instant", value: d.instant },
  { key: "fast", label: "Fast", value: d.fast },
  { key: "normal", label: "Normal", value: d.normal },
  { key: "slow", label: "Slow", value: d.slow },
  { key: "deliberate", label: "Deliberate", value: d.deliberate },
  { key: "skeleton", label: "Skeleton", value: d.skeleton },
];

const EASING_CURVES = [
  {
    key: "standard",
    label: "Standard",
    value: e.standard,
    note: "Most UI transitions",
  },
  { key: "enter", label: "Enter", value: e.enter, note: "Elements arriving" },
  { key: "exit", label: "Exit", value: e.exit, note: "Elements leaving" },
  {
    key: "spring",
    label: "Spring",
    value: e.spring,
    note: "Playful overshoot",
  },
];

function parseCubicBezier(css: string): [number, number, number, number] {
  const m = css.match(/cubic-bezier\(([^)]+)\)/);
  if (!m) return [0.4, 0, 0.2, 1];
  return m[1].split(",").map(Number) as [number, number, number, number];
}

// Live ball demo for a single semantic intent
function MotionBall({ duration, ease }: { duration: number; ease: string }) {
  const [key, setKey] = useState(0);
  const [running, setRunning] = useState(false);

  const replay = () => {
    setRunning(true);
    setKey((k) => k + 1);
    setTimeout(() => setRunning(false), duration + 100);
  };

  return (
    <button
      onClick={replay}
      disabled={running}
      className="group flex items-center gap-3 w-full text-left"
      title="Click to replay"
    >
      <div className="relative h-8 flex-1 rounded-full bg-muted overflow-hidden">
        <m.div
          key={key}
          className="absolute left-1 top-1 h-6 w-6 rounded-full bg-primary"
          initial={{ x: 0 }}
          animate={key > 0 ? { x: "calc(100cqw - 2rem - 8px)" } : { x: 0 }}
          transition={{
            duration: duration / 1000,
            ease: parseCubicBezier(ease),
          }}
          style={{ containerType: "inline-size" } as React.CSSProperties}
        />
      </div>
      <span className="text-xs text-muted-foreground w-10 shrink-0">
        {duration}ms
      </span>
    </button>
  );
}

// Easing curve SVG visualisation
function EasingCurve({ value, label }: { value: string; label: string }) {
  const [x1, y1, x2, y2] = parseCubicBezier(value);
  // Scale control points to SVG space (0–100)
  const p1x = x1 * 100;
  const p1y = 100 - y1 * 100;
  const p2x = x2 * 100;
  const p2y = 100 - y2 * 100;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 100 100" className="w-20 h-20 text-primary" fill="none">
        {/* Grid */}
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="100"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="100"
          x2="100"
          y2="100"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="0"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        <line
          x1="100"
          y1="0"
          x2="100"
          y2="100"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="1"
        />
        {/* Control point lines */}
        <line
          x1="0"
          y1="100"
          x2={p1x}
          y2={p1y}
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="3,2"
        />
        <line
          x1="100"
          y1="0"
          x2={p2x}
          y2={p2y}
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="3,2"
        />
        {/* Control point handles */}
        <circle cx={p1x} cy={p1y} r="3" fill="currentColor" fillOpacity="0.5" />
        <circle cx={p2x} cy={p2y} r="3" fill="currentColor" fillOpacity="0.5" />
        {/* The bezier curve */}
        <path
          d={`M 0 100 C ${p1x} ${p1y} ${p2x} ${p2y} 100 0`}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* End points */}
        <circle cx="0" cy="100" r="3" fill="currentColor" />
        <circle cx="100" cy="0" r="3" fill="currentColor" />
      </svg>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

export function MotionTokensPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Motion</h2>
        <p className="text-muted-foreground max-w-2xl">
          Semantic motion tokens that compose duration and easing primitives
          into named intents. Platform-neutral — the web implementation uses
          Framer Motion; a future mobile implementation maps these same values
          to Reanimated or React Native Animated.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Source:{" "}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">
            lib/kkds-common/tokens.json
          </code>{" "}
          →{" "}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">
            @sverg84/kkds-common
          </code>
        </p>
      </div>

      {/* Duration scale */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Duration scale</h3>
        <div className="rounded-xl border bg-card p-6 space-y-4">
          {DURATION_SCALE.map(({ key, label, value }) => (
            <div key={key} className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium shrink-0">{label}</span>
              <div
                className="h-3 rounded-full bg-primary"
                style={{ width: `${Math.min(parseInt(value) / 16, 200)}px` }}
              />
              <code className="text-xs text-muted-foreground">{value}</code>
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-2 border-t">
            Bar width is proportional to duration for comparison. Skeleton
            (1500ms) capped for display.
          </p>
        </div>
      </section>

      {/* Easing curves */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Easing curves</h3>
        <div className="rounded-xl border bg-card p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {EASING_CURVES.map(({ key, label, value, note }) => (
              <div key={key} className="flex flex-col items-center gap-3">
                <EasingCurve value={value} label={label} />
                <p className="text-xs text-muted-foreground text-center">
                  {note}
                </p>
                <code className="text-[10px] text-muted-foreground text-center break-all">
                  {value}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Semantic intents — live demos */}
      <section>
        <h3 className="text-lg font-semibold mb-1">Semantic intents</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click any row to replay the animation live.
        </p>
        <div className="rounded-xl border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Intent
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">
                  Description
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                  Used by
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Live
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {SEMANTIC.map((intent) => (
                <tr
                  key={intent.name}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                      motion.{intent.name}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell max-w-xs">
                    {intent.description}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell">
                    {intent.use}
                  </td>
                  <td className="px-4 py-3 w-56">
                    <MotionBall duration={intent.duration} ease={intent.ease} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Usage */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Usage</h3>
        <div className="rounded-xl border bg-card p-6 space-y-4 text-sm">
          <div>
            <p className="font-medium mb-2">Web (Framer Motion)</p>
            <pre className="bg-muted rounded-lg p-4 text-xs overflow-x-auto">
              <code>{`import { motion } from '@sverg84/kkds-react';

<motion.div
  initial={{ opacity: 0, y: 4 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: motion.overlay.enter.duration / 1000,
    ease: motion.overlay.enter.ease,
  }}
/>`}</code>
            </pre>
          </div>
          <div>
            <p className="font-medium mb-2">Mobile (Reanimated — future)</p>
            <pre className="bg-muted rounded-lg p-4 text-xs overflow-x-auto">
              <code>{`import { motion } from '@sverg84/kkds-common';
import { withTiming, Easing } from 'react-native-reanimated';

// Map the ease string to Reanimated:
const opacity = withTiming(1, {
  duration: motion.overlay.enter.duration,
  easing: Easing.bezier(0, 0, 0.2, 1),
});`}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
