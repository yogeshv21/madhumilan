const fs = require('fs');
const path = require('path');
const { geoMercator, geoPath } = require('d3-geo');

const GEO_URL = 'public/india-states.json';

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

  const MAP_W = 800;
  const MAP_H = 750;
  const proj = geoMercator()
    .scale(1000)
    .center([82.0, 22.0])
    .translate([MAP_W / 2, MAP_H / 2]);
  const pathGen = geoPath().projection(proj);

  geojson.features.forEach((feature) => {
    const name = feature.properties?.NAME_1 || 'State';
    const d = pathGen(feature);
    if (!d) return;
    const numbers = d.match(/-?\d+\.?\d*/g) || [];
    let hasHugeCoords = false;
    for (let i = 0; i < numbers.length; i++) {
      const val = parseFloat(numbers[i]);
      if (val > 1000 || val < -200) {
        hasHugeCoords = true;
        break;
      }
    }
    console.log(`Rewound State: ${name}, Has huge coordinates: ${hasHugeCoords}`);
  });

} catch (err) {
  console.error('Error running test:', err.message);
}
