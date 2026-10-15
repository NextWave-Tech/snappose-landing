import * as THREE from 'three';

/**
 * Creates high-tech atmospheric background particles and cyber grid.
 */
export function createAtmosphere(count = 250) {
  const group = new THREE.Group();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const palette = [
    new THREE.Color(0x00f0ff), // Cyan
    new THREE.Color(0xbf5af2), // Purple/Magenta
    new THREE.Color(0x30d158), // Emerald AI green
    new THREE.Color(0xffffff), // Pure photon
  ];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = 2.5 + Math.random() * 9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
    positions[i3 + 2] = radius * Math.cos(phi) - 1;

    const col = palette[Math.floor(Math.random() * palette.length)];
    colors[i3] = col.r;
    colors[i3 + 1] = col.g;
    colors[i3 + 2] = col.b;

    sizes[i] = Math.random() * 0.04 + 0.015;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.035,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);
  group.add(points);

  // Optical Axis Laser Guide Line
  const axisPoints = [
    new THREE.Vector3(0, 0, -4),
    new THREE.Vector3(0, 0, 5),
  ];
  const axisGeo = new THREE.BufferGeometry().setFromPoints(axisPoints);
  const axisMat = new THREE.LineDashedMaterial({
    color: 0x00f0ff,
    dashSize: 0.15,
    gapSize: 0.1,
    transparent: true,
    opacity: 0.25,
  });
  const axisLine = new THREE.Line(axisGeo, axisMat);
  axisLine.computeLineDistances();
  group.add(axisLine);

  return group;
}

/**
 * Creates AI Holographic Scan Radar Rings.
 */
export function createScanRings() {
  const group = new THREE.Group();

  const ringGeo = new THREE.RingGeometry(1.6, 1.62, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.2,
  });
  const ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.name = 'radarRing1';
  group.add(ring1);

  const ring2Geo = new THREE.RingGeometry(2.2, 2.22, 64);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0xbf5af2,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.15,
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.name = 'radarRing2';
  group.add(ring2);

  return group;
}
