"use client";
import { useMemo } from "react";
import { DEF_FEATURES, computeGeometry, type FrameType } from "./frames";

/** Scaled cross-section of a frame type, drawn from the same geometry the 3D model uses. */
export default function FrameThumb({
  type,
  active = false,
  height = 46,
}: {
  type: FrameType;
  active?: boolean;
  height?: number;
}) {
  const g = useMemo(
    () =>
      computeGeometry({
        width: type.width,
        eave: type.eave,
        pitch: type.pitch,
        spans: type.spans,
        bays: type.bays,
        baySpacing: type.baySpacing,
        roof: type.roof,
        features: { ...DEF_FEATURES, ...type.features },
      }),
    [type]
  );
  const W = 120;
  const H = 54;
  const pad = 7;
  const s = Math.min((W - pad * 2) / type.width, (H - pad * 2) / Math.max(g.maxHeight, 1));
  const px = (x: number) => W / 2 + x * s;
  const py = (y: number) => H - pad - y * s;
  const stroke = active ? "#B91C1C" : "#64748B";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height }}>
      <line x1={0} y1={py(0)} x2={W} y2={py(0)} stroke="#CBD5E1" strokeWidth="1.5" />
      <polygon
        points={g.profile.map(([x, y]) => `${px(x)},${py(y)}`).join(" ")}
        fill={active ? "#FEE2E2" : "#F1F5F9"}
      />
      <polyline
        points={[g.columnTops[0], ...g.rafters.map(([, b]) => b)]
          .map(([x, y]) => `${px(x)},${py(y)}`)
          .join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
      {g.columnXs.map((x, i) => (
        <line
          key={i}
          x1={px(x)}
          y1={py(0)}
          x2={px(x)}
          y2={py(g.columnTops[i][1])}
          stroke={stroke}
          strokeWidth="2.2"
        />
      ))}
    </svg>
  );
}
