"use client";
import { createContext, useContext, useMemo, useRef, type ReactNode } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import {
  COLORS,
  along,
  computeGeometry,
  type Config,
  type PartId,
  type Pt,
} from "./frames";

export type ViewMode = "solid" | "xray" | "frame" | "wire";

interface ViewState {
  mode: ViewMode;
  selected: PartId | null;
  select: (p: PartId) => void;
  explode: number;
}
const ViewCtx = createContext<ViewState>({
  mode: "solid",
  selected: null,
  select: () => {},
  explode: 0,
});
const useView = () => useContext(ViewCtx);

const X_AXIS = new THREE.Vector3(1, 0, 0);
type V3 = [number, number, number];

function Mat({ color, opacity = 1, part }: { color: string; opacity?: number; part: PartId }) {
  const { mode, selected } = useView();
  const on = selected === part;
  const o = mode === "wire" ? 1 : opacity;
  return (
    <meshStandardMaterial
      color={on ? "#F97316" : color}
      emissive={on ? "#F97316" : "#000000"}
      emissiveIntensity={on ? 0.45 : 0}
      transparent={o < 1}
      opacity={o}
      roughness={0.5}
      metalness={0.35}
      wireframe={mode === "wire"}
      side={THREE.DoubleSide}
      depthWrite={o > 0.75}
    />
  );
}

/** Box stretched between two points. `h` runs across the beam, `w` through its thickness. */
function Beam({
  from,
  to,
  h = 0.5,
  w = 0.25,
  color,
  part,
  opacity = 1,
}: {
  from: V3;
  to: V3;
  h?: number;
  w?: number;
  color: string;
  part: PartId;
  opacity?: number;
}) {
  const { select } = useView();
  const { pos, quat, len } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    const l = dir.length() || 0.001;
    return {
      pos: a.clone().add(b).multiplyScalar(0.5),
      quat: new THREE.Quaternion().setFromUnitVectors(X_AXIS, dir.normalize()),
      len: l,
    };
  }, [from, to]);
  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    select(part);
  };
  return (
    <mesh position={pos} quaternion={quat} onClick={click}>
      <boxGeometry args={[len, h, w]} />
      <Mat color={color} opacity={opacity} part={part} />
    </mesh>
  );
}

function Slab({
  size,
  pos,
  color,
  part,
  opacity = 1,
}: {
  size: V3;
  pos: V3;
  color: string;
  part: PartId;
  opacity?: number;
}) {
  const { select } = useView();
  return (
    <mesh
      position={pos}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        select(part);
      }}
    >
      <boxGeometry args={size} />
      <Mat color={color} opacity={opacity} part={part} />
    </mesh>
  );
}

/** Group that drifts toward `offset` as the exploded-view slider rises. */
function Layer({ offset, children }: { offset: V3; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const { explode } = useView();
  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const k = 1 - Math.pow(0.002, Math.min(dt, 0.1));
    g.position.x = THREE.MathUtils.lerp(g.position.x, offset[0] * explode, k);
    g.position.y = THREE.MathUtils.lerp(g.position.y, offset[1] * explode, k);
    g.position.z = THREE.MathUtils.lerp(g.position.z, offset[2] * explode, k);
  });
  return <group ref={ref}>{children}</group>;
}

function DimLabel({
  pos,
  text,
  color = "#0F172A",
  factor,
}: {
  pos: V3;
  text: string;
  color?: string;
  factor: number;
}) {
  return (
    <Html position={pos} center distanceFactor={factor} zIndexRange={[10, 0]}>
      <div
        className="whitespace-nowrap rounded border px-1.5 py-0.5 text-[10px] font-bold shadow-sm"
        style={{ background: "rgba(255,255,255,.94)", borderColor: color + "40", color }}
      >
        {text}
      </div>
    </Html>
  );
}

export default function BuildingModel({
  config,
  mode,
  explode,
  selected,
  onSelect,
  showDims,
  labelFactor,
}: {
  config: Config;
  mode: ViewMode;
  explode: number;
  selected: PartId | null;
  onSelect: (p: PartId) => void;
  showDims: boolean;
  labelFactor: number;
}) {
  const g = useMemo(() => computeGeometry(config), [config]);
  const ft = config.features;
  const { width, length, columnXs, columnTops, rafters, apexes, frameZs, profile } = g;
  const spans = config.spans;
  const half = width / 2;
  const hz = length / 2;

  const skin = mode === "xray" ? 0.16 : 0.94;
  const showSkin = mode !== "frame";

  const view = useMemo<ViewState>(
    () => ({ mode, selected, select: onSelect, explode }),
    [mode, selected, onSelect, explode]
  );

  const endShape = useMemo(() => {
    const s = new THREE.Shape();
    profile.forEach(([x, y], i) => (i === 0 ? s.moveTo(x, y) : s.lineTo(x, y)));
    s.closePath();
    return s;
  }, [profile]);

  const purlinPts = useMemo(() => {
    const pts: Pt[] = [];
    rafters.forEach(([a, b]) => {
      pts.push(a, ...along(a, b, 1.7));
    });
    pts.push(rafters[rafters.length - 1][1]);
    return pts;
  }, [rafters]);

  const girtYs = useMemo(() => {
    const ys: number[] = [];
    for (let y = 1.6; y < config.eave - 0.6; y += 1.8) ys.push(y);
    return ys;
  }, [config.eave]);

  const craneY = Math.max(2.5, config.eave - 2.2);
  const mezY = Math.min(config.eave - 1.5, 4.2);
  const mezL = columnXs[Math.max(0, spans - 1)];
  const mezR = columnXs[spans];

  return (
    <ViewCtx.Provider value={view}>
      <group position={[0, 0, 0]}>
        {/* Concrete apron */}
        <mesh position={[0, -0.14, 0]} receiveShadow>
          <boxGeometry args={[width + 6, 0.28, length + 6]} />
          <meshStandardMaterial color="#E7E5E4" roughness={0.95} metalness={0} />
        </mesh>

        {/* ── Primary frame ── */}
        <Layer offset={[0, 0, 0]}>
          {frameZs.map((z, fi) => (
            <group key={`f${fi}`}>
              {columnXs.map((x, i) => {
                const top = columnTops[i][1];
                const outer = i === 0 || i === spans;
                if (ft.rcc && outer)
                  return (
                    <Slab
                      key={`c${i}`}
                      size={[0.55, top, 0.55]}
                      pos={[x, top / 2, z]}
                      color={COLORS.concrete}
                      part="rcc"
                    />
                  );
                return (
                  <group key={`c${i}`}>
                    <Beam
                      from={[x, 0.1, z]}
                      to={[x, top, z]}
                      h={0.62}
                      w={0.3}
                      color={COLORS.primary}
                      part="column"
                    />
                    <Slab
                      size={[0.95, 0.12, 0.8]}
                      pos={[x, 0.06, z]}
                      color={COLORS.primaryDark}
                      part="base"
                    />
                  </group>
                );
              })}
              {rafters.map(([a, b], i) => (
                <Beam
                  key={`r${i}`}
                  from={[a[0], a[1], z]}
                  to={[b[0], b[1], z]}
                  h={0.55}
                  w={0.26}
                  color={COLORS.primary}
                  part="rafter"
                />
              ))}
              {apexes.map(([ax, ay], i) => (
                <Slab
                  key={`a${i}`}
                  size={[0.5, 0.7, 0.36]}
                  pos={[ax, ay - 0.1, z]}
                  color={COLORS.primaryDark}
                  part="ridge"
                />
              ))}
            </group>
          ))}
        </Layer>

        {/* ── Secondary steel: purlins, girts, bracing ── */}
        <Layer offset={[0, 2.4, 0]}>
          {purlinPts.map(([px, py], i) => (
            <Beam
              key={`p${i}`}
              from={[px, py + 0.42, -hz]}
              to={[px, py + 0.42, hz]}
              h={0.24}
              w={0.09}
              color={COLORS.secondary}
              part="purlin"
            />
          ))}
          {[0, spans].map((ci) =>
            girtYs.map((y, i) => (
              <Beam
                key={`g${ci}-${i}`}
                from={[columnXs[ci], y, -hz]}
                to={[columnXs[ci], y, hz]}
                h={0.22}
                w={0.08}
                color={COLORS.secondary}
                part="girt"
              />
            ))
          )}
          {[0, frameZs.length - 2].map((bi) => {
            const z1 = frameZs[bi];
            const z2 = frameZs[bi + 1];
            return [0, spans].map((ci) => {
              const x = columnXs[ci];
              const top = columnTops[ci][1];
              return (
                <group key={`br${bi}-${ci}`}>
                  <Beam
                    from={[x, 0.2, z1]}
                    to={[x, top, z2]}
                    h={0.09}
                    w={0.09}
                    color={COLORS.bracing}
                    part="bracing"
                  />
                  <Beam
                    from={[x, top, z1]}
                    to={[x, 0.2, z2]}
                    h={0.09}
                    w={0.09}
                    color={COLORS.bracing}
                    part="bracing"
                  />
                </group>
              );
            });
          })}
        </Layer>

        {/* ── Roof sheeting, skylights, insulation ── */}
        {showSkin && (
          <Layer offset={[0, 5.5, 0]}>
            {rafters.map(([a, b], i) => {
              const first = i === 0;
              const last = i === rafters.length - 1;
              const dx = b[0] - a[0];
              const dy = b[1] - a[1];
              const L = Math.hypot(dx, dy) || 1;
              const ox = (dx / L) * 0.5;
              const oy = (dy / L) * 0.5;
              const s: V3 = [a[0] - (first ? ox : 0), a[1] + 0.66 - (first ? oy : 0), 0];
              const e: V3 = [b[0] + (last ? ox : 0), b[1] + 0.66 + (last ? oy : 0), 0];
              return (
                <group key={`rs${i}`}>
                  <Beam
                    from={s}
                    to={e}
                    h={0.1}
                    w={length + 0.9}
                    color={COLORS.roof}
                    part="roof-sheet"
                    opacity={skin}
                  />
                  {ft.insulation && (
                    <Beam
                      from={[s[0], s[1] - 0.16, 0]}
                      to={[e[0], e[1] - 0.16, 0]}
                      h={0.16}
                      w={length + 0.4}
                      color={COLORS.insulation}
                      part="insulation"
                      opacity={0.4}
                    />
                  )}
                </group>
              );
            })}
            {ft.skylight &&
              rafters.map(([a, b], i) => {
                if (i % 2 !== 0) return null;
                const seg = 0.36;
                const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
                const sPt: V3 = [
                  mid[0] - (b[0] - a[0]) * (seg / 2),
                  mid[1] - (b[1] - a[1]) * (seg / 2) + 0.74,
                  0,
                ];
                const ePt: V3 = [
                  mid[0] + (b[0] - a[0]) * (seg / 2),
                  mid[1] + (b[1] - a[1]) * (seg / 2) + 0.74,
                  0,
                ];
                return [-length * 0.26, length * 0.26].map((zc, j) => (
                  <group key={`sky${i}-${j}`} position={[0, 0, zc]}>
                    <Beam
                      from={sPt}
                      to={ePt}
                      h={0.12}
                      w={length * 0.26}
                      color={COLORS.skylight}
                      part="skylight"
                      opacity={0.7}
                    />
                  </group>
                ));
              })}
            {apexes.map(([ax, ay], i) => (
              <Beam
                key={`rc${i}`}
                from={[ax, ay + 0.78, -hz - 0.4]}
                to={[ax, ay + 0.78, hz + 0.4]}
                h={0.16}
                w={0.9}
                color={COLORS.roof}
                part="ridge"
                opacity={skin}
              />
            ))}
          </Layer>
        )}

        {/* ── Wall cladding ── */}
        {showSkin && (
          <>
            <Layer offset={[-6, 0, 0]}>
              <Beam
                from={[columnXs[0] - 0.2, 0, 0]}
                to={[columnXs[0] - 0.2, columnTops[0][1], 0]}
                h={0.1}
                w={length}
                color={COLORS.cladding}
                part="cladding"
                opacity={skin}
              />
            </Layer>
            <Layer offset={[6, 0, 0]}>
              <Beam
                from={[columnXs[spans] + 0.2, 0, 0]}
                to={[columnXs[spans] + 0.2, columnTops[spans][1], 0]}
                h={0.1}
                w={length}
                color={COLORS.cladding}
                part="cladding"
                opacity={skin}
              />
            </Layer>
            {[hz + 0.2, -hz - 0.32].map((z, i) => (
              <Layer key={`ew${i}`} offset={[0, 0, i === 0 ? 6 : -6]}>
                <mesh
                  position={[0, 0, z]}
                  onClick={(e: ThreeEvent<MouseEvent>) => {
                    e.stopPropagation();
                    onSelect("cladding");
                  }}
                >
                  <extrudeGeometry args={[endShape, { depth: 0.12, bevelEnabled: false }]} />
                  <Mat color={COLORS.cladding} opacity={skin} part="cladding" />
                </mesh>
              </Layer>
            ))}
          </>
        )}

        {/* ── Accessories ── */}
        <Layer offset={[0, 9, 0]}>
          {ft.crane && spans >= 1 && (
            <group>
              {[columnXs[0] + 0.55, columnXs[Math.min(1, spans)] - 0.55].map((x, i) => (
                <Beam
                  key={`cr${i}`}
                  from={[x, craneY, -hz]}
                  to={[x, craneY, hz]}
                  h={0.45}
                  w={0.35}
                  color={COLORS.crane}
                  part="crane"
                />
              ))}
              <Beam
                from={[columnXs[0] + 0.55, craneY + 0.75, 0]}
                to={[columnXs[Math.min(1, spans)] - 0.55, craneY + 0.75, 0]}
                h={0.9}
                w={1.6}
                color={COLORS.crane}
                part="crane"
              />
              <Slab
                size={[2.2, 1.1, 2.2]}
                pos={[(columnXs[0] + columnXs[Math.min(1, spans)]) / 2, craneY + 0.4, 0]}
                color="#9333EA"
                part="crane"
              />
              <Beam
                from={[(columnXs[0] + columnXs[Math.min(1, spans)]) / 2, craneY + 0.3, 0]}
                to={[(columnXs[0] + columnXs[Math.min(1, spans)]) / 2, craneY - 3.2, 0]}
                h={0.12}
                w={0.12}
                color="#7E22CE"
                part="crane"
              />
              <Slab
                size={[1, 0.5, 0.5]}
                pos={[(columnXs[0] + columnXs[Math.min(1, spans)]) / 2, craneY - 3.4, 0]}
                color="#7E22CE"
                part="crane"
              />
              {frameZs.map((z, i) =>
                [columnXs[0], columnXs[Math.min(1, spans)]].map((x, j) => (
                  <Slab
                    key={`cb${i}-${j}`}
                    size={[1.2, 0.35, 0.5]}
                    pos={[x + (j === 0 ? 0.5 : -0.5), craneY - 0.35, z]}
                    color="#A21CAF"
                    part="crane"
                  />
                ))
              )}
            </group>
          )}

          {ft.mezzanine && (
            <group>
              <Slab
                size={[Math.abs(mezR - mezL) - 0.6, 0.28, length - 0.6]}
                pos={[(mezL + mezR) / 2, mezY, 0]}
                color={COLORS.mezzanine}
                part="mezzanine"
                opacity={0.85}
              />
              {frameZs.map((z, i) => (
                <Beam
                  key={`mz${i}`}
                  from={[(mezL + mezR) / 2, 0.1, z]}
                  to={[(mezL + mezR) / 2, mezY - 0.15, z]}
                  h={0.3}
                  w={0.3}
                  color={COLORS.mezzanine}
                  part="mezzanine"
                />
              ))}
            </group>
          )}

          {ft.ventilator &&
            apexes.map(([ax, ay], i) =>
              [-length * 0.3, 0, length * 0.3].map((z, j) => (
                <group key={`v${i}-${j}`}>
                  <Slab
                    size={[1.8, 0.7, 2.2]}
                    pos={[ax, ay + 1.25, z]}
                    color={COLORS.vent}
                    part="ventilator"
                    opacity={0.9}
                  />
                  <Slab
                    size={[2.2, 0.12, 2.6]}
                    pos={[ax, ay + 1.66, z]}
                    color="#B91C1C"
                    part="ventilator"
                  />
                </group>
              ))
            )}

          {ft.valley &&
            columnXs.slice(1, -1).map((vx, i) => (
              <Beam
                key={`vg${i}`}
                from={[vx, columnTops[i + 1][1] + 0.55, -hz - 0.3]}
                to={[vx, columnTops[i + 1][1] + 0.55, hz + 0.3]}
                h={0.4}
                w={1.3}
                color={COLORS.valley}
                part="valley"
                opacity={0.92}
              />
            ))}

          {ft.canopy && (
            <group>
              <Beam
                from={[columnXs[0], columnTops[0][1] - 0.4, 0]}
                to={[columnXs[0] - 3.2, columnTops[0][1] - 1.3, 0]}
                h={0.12}
                w={length * 0.7}
                color={COLORS.canopy}
                part="canopy"
                opacity={0.85}
              />
              {[-length * 0.3, length * 0.3].map((z, i) => (
                <Beam
                  key={`cs${i}`}
                  from={[columnXs[0], columnTops[0][1] - 0.4, z]}
                  to={[columnXs[0] - 3.2, columnTops[0][1] - 1.3, z]}
                  h={0.2}
                  w={0.16}
                  color="#6D28D9"
                  part="canopy"
                />
              ))}
            </group>
          )}
        </Layer>

        {/* ── Dimensions ── */}
        {showDims && (
          <group>
            <Beam
              from={[-half, 0.02, hz + 3]}
              to={[half, 0.02, hz + 3]}
              h={0.07}
              w={0.07}
              color="#334155"
              part="base"
            />
            <DimLabel factor={labelFactor} pos={[0, 0.9, hz + 3]} text={`Width ${config.width} m`} />
            <Beam
              from={[half + 2.4, 0, hz]}
              to={[half + 2.4, config.eave, hz]}
              h={0.07}
              w={0.07}
              color="#334155"
              part="base"
            />
            <DimLabel factor={labelFactor} pos={[half + 2.4, config.eave / 2, hz]} text={`Eave ${config.eave} m`} />
            <DimLabel factor={labelFactor}
              pos={[
                apexes.length ? apexes[Math.floor(apexes.length / 2)][0] : 0,
                g.maxHeight + 2.4,
                0,
              ]}
              text={
                config.roof === "pitched"
                  ? `Ridge +${g.ridgeHeight} m`
                  : `Slope rise +${g.ridgeHeight} m`
              }
              color="#B91C1C"
            />
            <Beam
              from={[-half - 4, 0.02, -hz]}
              to={[-half - 4, 0.02, hz]}
              h={0.07}
              w={0.07}
              color="#334155"
              part="base"
            />
            <DimLabel factor={labelFactor}
              pos={[-half - 4, 1.4, 0]}
              text={`Length ${length} m — ${config.bays} bays @ ${config.baySpacing} m`}
            />
          </group>
        )}
      </group>
    </ViewCtx.Provider>
  );
}
