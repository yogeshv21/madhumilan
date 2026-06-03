"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Mail, 
  User, 
  Phone, 
  MapPin, 
  Building, 
  CheckCircle2, 
  ArrowRight,
  Cpu
} from "lucide-react";

// Predefined color palettes
const roofColors = [
  { name: "Slate Blue", hex: "#1e3a8a", tailwind: "bg-blue-900" },
  { name: "Emerald Green", hex: "#065f46", tailwind: "bg-emerald-800" },
  { name: "Off-White", hex: "#f8fafc", tailwind: "bg-slate-50 border border-slate-200" },
  { name: "Terracotta Red", hex: "#991b1b", tailwind: "bg-red-800" },
  { name: "Charcoal Gray", hex: "#374151", tailwind: "bg-gray-700" }
];

const wallColors = [
  { name: "Off-White", hex: "#f8fafc", tailwind: "bg-slate-50 border border-slate-200" },
  { name: "Mist Gray", hex: "#cbd5e1", tailwind: "bg-slate-300" },
  { name: "Sandy Gold", hex: "#eab308", tailwind: "bg-yellow-500" },
  { name: "Slate Blue", hex: "#1e3a8a", tailwind: "bg-blue-900" },
  { name: "Olive Green", hex: "#3f6212", tailwind: "bg-lime-800" }
];

export default function ConfiguratorPage() {
  // Configurator states
  const [width, setWidth] = useState(30); // 10m to 80m
  const [length, setLength] = useState(60); // 20m to 150m
  const [height, setHeight] = useState(8); // 5m to 20m
  const [slope, setSlope] = useState(10); // 5 to 20 deg (represents 1:10, 1:20 etc)
  const [buildingType, setBuildingType] = useState("Clear Span"); // "Clear Span" | "Multi-Span"
  const [craneRequired, setCraneRequired] = useState(false);
  const [craneCapacity, setCraneCapacity] = useState(5); // 1 to 30 tons
  const [selectedRoofColor, setSelectedRoofColor] = useState(roofColors[0]);
  const [selectedWallColor, setSelectedWallColor] = useState(wallColors[1]);

  // Lead Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Structural calculations
  const roofSlopeRad = (slope * Math.PI) / 180;
  const ridgeHeight = height + (width / 2) * Math.tan(roofSlopeRad);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setLocation("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
            Interactive Design Tool
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-brand-blue leading-tight">
            Build Your Pre-Engineered Building
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Customize your warehouse, factory, or commercial steel building in real-time. Review the engineering schematic and request an immediate cost estimation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Schematic Preview (SVG) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h3 className="text-sm font-bold text-brand-blue uppercase tracking-wider">
                    Structural Cross-Section View
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Live engineering blueprint visualization
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-gray px-2.5 py-1 text-[10px] font-semibold text-brand-blue">
                    <Building2 className="h-3 w-3 text-brand-orange" />
                    {buildingType}
                  </span>
                  {craneRequired && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange/10 px-2.5 py-1 text-[10px] font-semibold text-brand-orange animate-pulse">
                      <Cpu className="h-3 w-3" />
                      Crane: {craneCapacity}T
                    </span>
                  )}
                </div>
              </div>

              {/* Dynamic SVG Schematic */}
              <div className="relative w-full aspect-video bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-4">
                <svg
                  viewBox="0 0 800 450"
                  className="w-full h-full max-h-[380px]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* Sky/Atmosphere Gradient */}
                  <rect x="0" y="0" width="800" height="360" fill="transparent" />

                  {/* Ground Level Line */}
                  <line x1="50" y1="360" x2="750" y2="360" stroke="#94a3b8" strokeWidth="3" />

                  {/* Concrete Footing Pads */}
                  <rect x="90" y="360" width="40" height="15" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
                  <rect x="670" y="360" width="40" height="15" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
                  {buildingType === "Multi-Span" && (
                    <rect x="380" y="360" width="40" height="15" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
                  )}

                  {/* 1. Wall Panels (Skin) */}
                  <rect
                    x="110"
                    y={360 - height * 15}
                    width="15"
                    height={height * 15}
                    fill={selectedWallColor.hex}
                    stroke="#475569"
                    strokeWidth="1"
                    opacity="0.85"
                  />
                  <rect
                    x="675"
                    y={360 - height * 15}
                    width="15"
                    height={height * 15}
                    fill={selectedWallColor.hex}
                    stroke="#475569"
                    strokeWidth="1"
                    opacity="0.85"
                  />

                  {/* 2. Primary Steel Columns (Tapered) */}
                  <polygon
                    points={`100,${360} 115,${360} 125,${360 - height * 15} 100,${360 - height * 15}`}
                    fill="#334155"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points={`700,${360} 685,${360} 675,${360 - height * 15} 700,${360 - height * 15}`}
                    fill="#334155"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                  />

                  {/* Center Column if Multi-Span */}
                  {buildingType === "Multi-Span" && (
                    <rect
                      x="395"
                      y={360 - height * 15 - (width / 2) * Math.tan(roofSlopeRad) * 15}
                      width="10"
                      height={height * 15 + (width / 2) * Math.tan(roofSlopeRad) * 15}
                      fill="#475569"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Crane Support Brackets & Gantry (if active) */}
                  {craneRequired && (
                    <>
                      {/* Left bracket & rail */}
                      <polygon
                        points={`115,${360 - height * 8} 130,${360 - height * 8} 125,${360 - height * 8 - 15} 115,${360 - height * 8 - 15}`}
                        fill="#f26419"
                      />
                      <rect x="122" y={360 - height * 8 - 30} width="10" height="15" fill="#1e293b" />
                      
                      {/* Right bracket & rail */}
                      <polygon
                        points={`685,${360 - height * 8} 670,${360 - height * 8} 675,${360 - height * 8 - 15} 685,${360 - height * 8 - 15}`}
                        fill="#f26419"
                      />
                      <rect x="668" y={360 - height * 8 - 30} width="10" height="15" fill="#1e293b" />

                      {/* Crane Bridge Girder */}
                      <rect
                        x="132"
                        y={360 - height * 8 - 30}
                        width="536"
                        height="12"
                        fill="#eab308"
                        stroke="#ca8a04"
                        strokeWidth="1"
                        rx="2"
                      />
                      <line x1="132" y1={360 - height * 8 - 24} x2="668" y2={360 - height * 8 - 24} stroke="#f26419" strokeWidth="1" strokeDasharray="4 4" />
                      
                      {/* Crane Trolley Hoist */}
                      <rect x="375" y={360 - height * 8 - 18} width="50" height="10" fill="#1e293b" rx="1" />
                      <line x1="400" y1={360 - height * 8 - 8} x2="400" y2={360 - height * 8 + 8} stroke="#94a3b8" strokeWidth="2" />
                      <circle cx="400" cy={360 - height * 8 + 12} r="4" fill="none" stroke="#f26419" strokeWidth="1.5" />
                    </>
                  )}

                  {/* 3. Roof Rafters (Rake Beams) */}
                  <polygon
                    points={`100,${360 - height * 15} 400,${360 - ridgeHeight * 15} 400,${360 - ridgeHeight * 15 + 15} 125,${360 - height * 15 + 10}`}
                    fill="#334155"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                  />
                  <polygon
                    points={`700,${360 - height * 15} 400,${360 - ridgeHeight * 15} 400,${360 - ridgeHeight * 15 + 15} 675,${360 - height * 15 + 10}`}
                    fill="#334155"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                  />

                  {/* 4. Roof Cladding Panels (Skin) */}
                  <polygon
                    points={`95,${360 - height * 15 - 5} 400,${360 - ridgeHeight * 15 - 5} 400,${360 - ridgeHeight * 15} 95,${360 - height * 15}`}
                    fill={selectedRoofColor.hex}
                    stroke="#475569"
                    strokeWidth="1"
                  />
                  <polygon
                    points={`705,${360 - height * 15 - 5} 400,${360 - ridgeHeight * 15 - 5} 400,${360 - ridgeHeight * 15} 705,${360 - height * 15}`}
                    fill={selectedRoofColor.hex}
                    stroke="#475569"
                    strokeWidth="1"
                  />

                  {/* Eaves Gutter detail */}
                  <circle cx="95" cy={360 - height * 15} r="4.5" fill="#f26419" />
                  <circle cx="705" cy={360 - height * 15} r="4.5" fill="#f26419" />

                  {/* 5. Dimension Annotation Overlay (Structural Drawing Style) */}
                  {/* Ground Width Dimension */}
                  <line x1="100" y1="395" x2="700" y2="395" stroke="#0f172a" strokeWidth="1" strokeDasharray="3 3" />
                  <polygon points="100,395 106,392 106,398" fill="#0f172a" />
                  <polygon points="700,395 694,392 694,398" fill="#0f172a" />
                  <rect x="360" y="385" width="80" height="20" fill="#ffffff" rx="4" />
                  <text x="400" y="399" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#0f172a" textAnchor="middle">
                    Span: {width}m
                  </text>

                  {/* Left Height Dimension */}
                  <line x1="60" y1="360" x2="60" y2={360 - height * 15} stroke="#0f172a" strokeWidth="1" strokeDasharray="3 3" />
                  <polygon points={`60,360 57,354 63,354`} fill="#0f172a" />
                  <polygon points={`60,${360 - height * 15} 57,${360 - height * 15 + 6} 63,${360 - height * 15 + 6}`} fill="#0f172a" />
                  <rect x="25" y={360 - (height * 15) / 2 - 10} width="45" height="20" fill="#ffffff" rx="4" />
                  <text x="47" y={360 - (height * 15) / 2 + 4} fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#0f172a" textAnchor="middle">
                    Ht: {height}m
                  </text>

                  {/* Center Peak Height Dimension */}
                  <line x1="400" y1="360" x2="400" y2={360 - ridgeHeight * 15} stroke="#0f172a" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="420" y1="360" x2="420" y2={360 - ridgeHeight * 15} stroke="#64748b" strokeWidth="0.8" />
                  <polygon points={`420,360 417,366 423,366`} fill="#64748b" />
                  <polygon points={`420,${360 - ridgeHeight * 15} 417,${360 - ridgeHeight * 15 + 6} 423,${360 - ridgeHeight * 15 + 6}`} fill="#64748b" />
                  <rect x="425" y={360 - (ridgeHeight * 15) / 2 - 10} width="65" height="20" fill="#ffffff" rx="4" />
                  <text x="457" y={360 - (ridgeHeight * 15) / 2 + 4} fontFamily="sans-serif" fontSize="9" fontWeight="semibold" fill="#475569" textAnchor="middle">
                    Peak: {ridgeHeight.toFixed(1)}m
                  </text>

                  {/* Roof Slope Indicator */}
                  <path d={`M 170,${360 - height * 15 - 5} A 30,30 0 0,1 198,${360 - height * 15 - 10}`} fill="none" stroke="#f26419" strokeWidth="1.5" />
                  <text x="210" y={360 - height * 15 - 12} fontFamily="sans-serif" fontSize="10" fontWeight="bold" fill="#f26419">
                    {slope}° Slope
                  </text>
                </svg>
              </div>

              {/* Live Technical Details cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Building Area</span>
                  <span className="block text-sm font-black text-brand-blue mt-1">{(width * length).toLocaleString()} m²</span>
                  <span className="block text-[8px] text-slate-400">{(width * length * 10.764).toLocaleString(undefined, {maximumFractionDigits: 0})} sq.ft</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Total Volume</span>
                  <span className="block text-sm font-black text-brand-blue mt-1">{((height + ridgeHeight) / 2 * width * length).toLocaleString(undefined, {maximumFractionDigits: 0})} m³</span>
                  <span className="block text-[8px] text-slate-400">Clear air displacement</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Main Frame Span</span>
                  <span className="block text-sm font-black text-brand-blue mt-1">{width} meters</span>
                  <span className="block text-[8px] text-emerald-600 font-bold">100% Clear Span</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-center">
                  <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">Roof Panel Length</span>
                  <span className="block text-sm font-black text-brand-blue mt-1">{(width / 2 / Math.cos(roofSlopeRad)).toFixed(1)}m x 2</span>
                  <span className="block text-[8px] text-slate-400">Ridge-to-eave panels</span>
                </div>
              </div>
            </div>

            {/* Quick explanation of structural design */}
            <div className="bg-gradient-to-r from-brand-blue to-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange">
                Standard Engineering Configuration
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Madhu Ratna PEBs integrate primary tapered built-up frames with cold-formed Z purlins and high-tensile wall girts. High strength structural bolts connect segments for accelerated onsite assembly. Our components conform to MBMA and AISC quality guidelines.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10 text-[10px] text-slate-400">
                <div>• Primary Framing: ASTM A572 Grade 50</div>
                <div>• Secondary Framing: Cold-formed 275 GSM galvanized steel</div>
                <div>• Bolted connections: ASTM A325 / A490 structural bolts</div>
                <div>• Corrosion protection: Shot blast Sa 2.5 + primer + polyurethane</div>
              </div>
            </div>
          </div>

          {/* Right Column: Configuration Panel & RFQ Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-brand-blue border-b border-slate-100 pb-3 uppercase tracking-wider">
                1. Configure Dimensions
              </h3>

              {/* Sliders */}
              <div className="space-y-5">
                {/* Width */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Building Width (Span)</span>
                    <span className="text-brand-orange">{width} meters</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={width}
                    onChange={(e) => setWidth(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>10m (Min)</span>
                    <span>80m (Max)</span>
                  </div>
                </div>

                {/* Length */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Building Length (Depth)</span>
                    <span className="text-brand-orange">{length} meters</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    step="5"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>20m (Min)</span>
                    <span>150m (Max)</span>
                  </div>
                </div>

                {/* Eave Height */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Eave Height</span>
                    <span className="text-brand-orange">{height} meters</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="1"
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>5m (Min)</span>
                    <span>20m (Max)</span>
                  </div>
                </div>

                {/* Roof Slope */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">Roof Slope Degree</span>
                    <span className="text-brand-orange">{slope}° (1:{(100 / Math.tan(roofSlopeRad) / 10).toFixed(0)})</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    step="1"
                    value={slope}
                    onChange={(e) => setSlope(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>5° (Low slope)</span>
                    <span>20° (High runoff)</span>
                  </div>
                </div>
              </div>

              {/* Building & Framing Type */}
              <div className="space-y-3 pt-2">
                <span className="block text-xs font-bold text-slate-700">Framing Configuration</span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBuildingType("Clear Span")}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                      buildingType === "Clear Span"
                        ? "border-brand-orange bg-brand-orange/5 text-brand-orange shadow-xs"
                        : "border-slate-200 bg-white text-slate-650 hover:bg-slate-50"
                    }`}
                  >
                    Clear Span (Standard)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuildingType("Multi-Span")}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                      buildingType === "Multi-Span"
                        ? "border-brand-orange bg-brand-orange/5 text-brand-orange shadow-xs"
                        : "border-slate-200 bg-white text-slate-650 hover:bg-slate-50"
                    }`}
                  >
                    Multi-Span (1 Column)
                  </button>
                </div>
              </div>

              {/* Crane options */}
              <div className="border-t border-slate-100 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="block text-xs font-bold text-slate-700">Overhead Crane Support</span>
                    <span className="block text-[10px] text-slate-400">Include brackets and runway beams</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={craneRequired}
                    onChange={(e) => setCraneRequired(e.target.checked)}
                    className="h-4.5 w-4.5 rounded-sm border-slate-300 text-brand-orange focus:ring-brand-orange cursor-pointer"
                  />
                </div>

                {craneRequired && (
                  <div className="space-y-2 p-3 bg-slate-50 border border-slate-100 rounded-xl animate-fadeIn">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-slate-600">Crane Lift Capacity</span>
                      <span className="text-brand-orange">{craneCapacity} Metric Tons</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={craneCapacity}
                      onChange={(e) => setCraneCapacity(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                    />
                    <div className="flex justify-between text-[8px] text-slate-400">
                      <span>1T Light duty</span>
                      <span>30T Heavy industrial</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Color selectors */}
              <div className="border-t border-slate-100 pt-4 space-y-4">
                <h4 className="text-xs font-bold text-slate-700">2. External Aesthetics</h4>
                
                {/* Roof Color */}
                <div className="space-y-2">
                  <span className="block text-[11px] text-slate-450">Roof Panels Color: <strong className="text-slate-700">{selectedRoofColor.name}</strong></span>
                  <div className="flex gap-2">
                    {roofColors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedRoofColor(color)}
                        className={`h-6 w-6 rounded-full cursor-pointer transition-transform ${color.tailwind} ${
                          selectedRoofColor.name === color.name ? "ring-2 ring-brand-orange scale-110" : "hover:scale-105"
                        }`}
                        aria-label={`Select ${color.name} roof`}
                      />
                    ))}
                  </div>
                </div>

                {/* Wall Color */}
                <div className="space-y-2">
                  <span className="block text-[11px] text-slate-450">Wall Cladding Color: <strong className="text-slate-700">{selectedWallColor.name}</strong></span>
                  <div className="flex gap-2">
                    {wallColors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedWallColor(color)}
                        className={`h-6 w-6 rounded-full cursor-pointer transition-transform ${color.tailwind} ${
                          selectedWallColor.name === color.name ? "ring-2 ring-brand-orange scale-110" : "hover:scale-105"
                        }`}
                        aria-label={`Select ${color.name} wall`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Request Estimate Form */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              {submitted ? (
                <div className="text-center py-8 space-y-4 animate-fadeIn">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-blue uppercase tracking-wider">
                    Estimation Request Received
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                    Thank you! Our structural engineering desk has received your building configuration parameters. We will compile a custom layout and price sheet and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-slate-250 px-4 py-2 text-xs font-bold text-slate-650 hover:bg-slate-50 transition-all focus:outline-none"
                  >
                    Configure Another Project
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-brand-blue uppercase tracking-wider">
                      3. Request Structural Pricing
                    </h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Submit configuration to our engineering desk
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 relative">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Your Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full rounded-lg bg-slate-50 border border-slate-200 p-2.5 pl-9 text-xs focus:bg-white focus:border-brand-orange outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 relative">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Work Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@company.com"
                          className="w-full rounded-lg bg-slate-50 border border-slate-200 p-2.5 pl-9 text-xs focus:bg-white focus:border-brand-orange outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 relative">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-lg bg-slate-50 border border-slate-200 p-2.5 pl-9 text-xs focus:bg-white focus:border-brand-orange outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 relative">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Company Name</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Steel Builders Ltd"
                          className="w-full rounded-lg bg-slate-50 border border-slate-200 p-2.5 pl-9 text-xs focus:bg-white focus:border-brand-orange outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Project Site Location *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Mundra Port GIDC, Gujarat"
                        className="w-full rounded-lg bg-slate-50 border border-slate-200 p-2.5 pl-9 text-xs focus:bg-white focus:border-brand-orange outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Message / Specific Requirements</label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Need 3 multi-tier mezzanine floors or high humidity specifications..."
                      className="w-full rounded-lg bg-slate-50 border border-slate-200 p-2.5 text-xs focus:bg-white focus:border-brand-orange outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange hover:bg-brand-orange-light disabled:bg-slate-400 text-white font-bold uppercase tracking-wider text-xs py-3.5 transition-colors shadow-sm focus:outline-none"
                  >
                    {isSubmitting ? "Processing Inquiry..." : "Submit Inquiry to Engineering"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
