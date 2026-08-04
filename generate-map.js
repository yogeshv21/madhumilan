const fs = require('fs');
const path = require('path');
const { geoMercator, geoPath } = require('d3-geo');

const GEO_URL = path.join(__dirname, './public/india-states.json');
const DEST_PATH = path.join(__dirname, './public/india-map.svg');

const MAP_W = 800;
const MAP_H = 750;
const BASE_SCALE = 1000;

const STATE_PALETTE = [
  "#bbf7d0",
  "#fef08a",
  "#fbcfe8",
  "#bfdbfe",
  "#ddd6fe",
  "#a7f3d0",
  "#fde68a",
  "#fecdd3",
  "#c7d2fe",
  "#e9d5ff"
];

function ringArea(ring) {
  let area = 0;
  for (let i = 0, l = ring.length, j = l - 1; i < l; j = i++) {
    area += (ring[j][0] - ring[i][0]) * (ring[j][1] + ring[i][1]);
  }
  return area;
}

function rewindRing(ring, clockwise) {
  const area = ringArea(ring);
  if ((area > 0) !== clockwise) {
    ring.reverse();
  }
}

function rewindPolygon(poly) {
  if (poly.length > 0) {
    rewindRing(poly[0], false);
    for (let i = 1; i < poly.length; i++) {
      rewindRing(poly[i], true);
    }
  }
}

try {
  const geojson = JSON.parse(fs.readFileSync(GEO_URL, 'utf8'));

  geojson.features.forEach((feature) => {
    const coords = feature.geometry.coordinates;
    if (feature.geometry.type === 'Polygon') {
      rewindPolygon(coords);
    } else if (feature.geometry.type === 'MultiPolygon') {
      coords.forEach(rewindPolygon);
    }
  });

  const proj = geoMercator()
    .scale(BASE_SCALE)
    .center([82.0, 22.0])
    .translate([MAP_W / 2, MAP_H / 2]);

  const pathGen = geoPath().projection(proj);
  
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MAP_W} ${MAP_H}" width="100%" height="100%">\n`;
  svgContent += `  <!-- Background Canvas -->\n`;
  svgContent += `  <rect width="${MAP_W}" height="${MAP_H}" fill="#f8fafc" rx="24" />\n`;
  svgContent += `  <g>\n`;

  geojson.features.forEach((feature, idx) => {
    const name = feature.properties?.ST_NM || feature.properties?.NAME_1 || 'State';
    const d = pathGen(feature);
    if (d) {
      const fillColor = STATE_PALETTE[idx % STATE_PALETTE.length];
      svgContent += `    <path d="${d}" fill="${fillColor}" stroke="#475569" stroke-width="0.8" stroke-linejoin="round" data-name="${name}" />\n`;
    }
  });

  svgContent += `  </g>\n`;
  svgContent += `</svg>\n`;

  fs.writeFileSync(DEST_PATH, svgContent, 'utf8');
  console.log('Successfully generated public/india-map.svg with rewound state paths');
} catch (err) {
  console.error('Error generating map:', err.message);
}
