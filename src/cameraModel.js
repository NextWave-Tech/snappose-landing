import * as THREE from 'three';

/**
 * Creates the high-precision 3D Exploded Camera System with central AI Neural Core Chip.
 * Each sub-assembly is grouped so it can animate along the optical axis (Z) and radial axes.
 */
export function createExplodedCamera() {
  const rootGroup = new THREE.Group();
  rootGroup.name = 'exploded_camera_root';

  // ─── MATERIALS PALETTE ───────────────────────────────────────────────────
  // Premium Anodized Matte Black Metal
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x18181c,
    metalness: 0.85,
    roughness: 0.25,
  });

  // Brushed Titanium / Chrome Accent
  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8e2,
    metalness: 0.95,
    roughness: 0.15,
  });

  // Gold / Champagne Brass (Electronic contacts, chip pins & trim)
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xffd152,
    metalness: 0.9,
    roughness: 0.2,
    emissive: 0x664400,
    emissiveIntensity: 0.2,
  });

  // Textured Leather Grip
  const leatherGripMat = new THREE.MeshStandardMaterial({
    color: 0x111114,
    metalness: 0.1,
    roughness: 0.85,
  });

  // Multi-Coated Optical Glass (Front Lens - Cyan/Purple Reflection)
  const frontGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x00f0ff,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.75,
    thickness: 0.5,
    transparent: true,
    opacity: 0.85,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  });

  // Inner Aspherical Lens Glass
  const innerGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x7c3aed,
    metalness: 0.05,
    roughness: 0.02,
    transmission: 0.9,
    transparent: true,
    opacity: 0.7,
    clearcoat: 1.0,
  });

  // Aperture Blades (Dark Blued Steel)
  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x242830,
    metalness: 0.7,
    roughness: 0.4,
  });

  // BSI-CMOS Sensor Surface (Deep iridescent purple/teal silicon)
  const sensorSurfaceMat = new THREE.MeshStandardMaterial({
    color: 0x1a2b4c,
    metalness: 0.9,
    roughness: 0.1,
    emissive: 0x0044aa,
    emissiveIntensity: 0.4,
  });

  // AI Chip Core Material (Ceramic Dark with Golden Laser Marking)
  const aiChipMat = new THREE.MeshStandardMaterial({
    color: 0x0c0e14,
    metalness: 0.8,
    roughness: 0.3,
  });

  // AI Glowing Core (Neon Cyan / Purple Neural Engine)
  const aiGlowMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    emissive: 0x00f0ff,
    emissiveIntensity: 2.2,
    roughness: 0.1,
  });

  const aiNeuralPulseMat = new THREE.MeshStandardMaterial({
    color: 0xbf5af2,
    emissive: 0xbf5af2,
    emissiveIntensity: 2.5,
    roughness: 0.1,
  });

  // High-Tech Circuit Board (Dark Emerald / Charcoal PCB)
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x0b1a16,
    metalness: 0.4,
    roughness: 0.5,
  });

  // Glowing Circuit Traces
  const circuitTraceMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
  });

  // OLED Screen Glass
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x050508,
    metalness: 0.9,
    roughness: 0.1,
  });

  // ─── 1. FRONT LENS HOOD & UV FILTER GROUP ───────────────────────────────
  const frontGroup = new THREE.Group();
  frontGroup.name = 'frontGroup';

  // Outer Hood Ring
  const hoodGeo = new THREE.CylinderGeometry(0.85, 0.9, 0.35, 48, 1, true);
  const hoodMesh = new THREE.Mesh(hoodGeo, darkMetalMat);
  hoodMesh.rotation.x = Math.PI / 2;
  frontGroup.add(hoodMesh);

  // Front Filter Thread Bezel
  const filterBezelGeo = new THREE.TorusGeometry(0.87, 0.04, 16, 48);
  const filterBezel = new THREE.Mesh(filterBezelGeo, titaniumMat);
  filterBezel.position.z = 0.18;
  frontGroup.add(filterBezel);

  // Big Curved Front Glass Element
  const frontGlassGeo = new THREE.SphereGeometry(0.82, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.35);
  const frontGlass = new THREE.Mesh(frontGlassGeo, frontGlassMat);
  frontGlass.rotation.x = Math.PI;
  frontGlass.position.z = 0.05;
  frontGroup.add(frontGlass);

  // Gold Ring Accent on Lens Barrel
  const goldRingGeo = new THREE.TorusGeometry(0.85, 0.02, 16, 48);
  const goldRing = new THREE.Mesh(goldRingGeo, goldMat);
  goldRing.position.z = -0.12;
  frontGroup.add(goldRing);

  rootGroup.add(frontGroup);

  // ─── 2. FOCUS BARREL & ASPHERICAL ELEMENT 1 ──────────────────────────────
  const focusGroup = new THREE.Group();
  focusGroup.name = 'focusGroup';

  // Focus Barrel Cylinder
  const barrelGeo = new THREE.CylinderGeometry(0.82, 0.82, 0.5, 48);
  const barrelMesh = new THREE.Mesh(barrelGeo, darkMetalMat);
  barrelMesh.rotation.x = Math.PI / 2;
  focusGroup.add(barrelMesh);

  // Knurled Focus Grip Texture (Ribbed rings)
  for (let i = -0.18; i <= 0.18; i += 0.06) {
    const knurlGeo = new THREE.TorusGeometry(0.835, 0.015, 8, 48);
    const knurl = new THREE.Mesh(knurlGeo, titaniumMat);
    knurl.position.z = i;
    focusGroup.add(knurl);
  }

  // ED Aspherical Lens 1
  const lens1Geo = new THREE.SphereGeometry(0.72, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45);
  const lens1 = new THREE.Mesh(lens1Geo, innerGlassMat);
  lens1.rotation.x = Math.PI;
  lens1.position.z = 0.1;
  focusGroup.add(lens1);

  rootGroup.add(focusGroup);

  // ─── 3. APERTURE IRIS & CONCAVE ELEMENT GROUP ───────────────────────────
  const apertureGroup = new THREE.Group();
  apertureGroup.name = 'apertureGroup';

  // Aperture Chamber Housing
  const apHousingGeo = new THREE.CylinderGeometry(0.78, 0.78, 0.3, 40, 1, true);
  const apHousing = new THREE.Mesh(apHousingGeo, darkMetalMat);
  apHousing.rotation.x = Math.PI / 2;
  apertureGroup.add(apHousing);

  // 9 Mechanical Aperture Blades arranged in circle
  const bladeCount = 9;
  const bladesGroup = new THREE.Group();
  bladesGroup.name = 'bladesGroup';
  for (let i = 0; i < bladeCount; i++) {
    const angle = (i / bladeCount) * Math.PI * 2;
    const bladeGeo = new THREE.BoxGeometry(0.42, 0.14, 0.01);
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.set(Math.cos(angle) * 0.35, Math.sin(angle) * 0.35, 0);
    blade.rotation.z = angle + 0.6;
    bladesGroup.add(blade);
  }
  apertureGroup.add(bladesGroup);

  // Double Concave Glass Element
  const concaveGlassGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.06, 32);
  const concaveGlass = new THREE.Mesh(concaveGlassGeo, innerGlassMat);
  concaveGlass.rotation.x = Math.PI / 2;
  concaveGlass.position.z = -0.1;
  apertureGroup.add(concaveGlass);

  rootGroup.add(apertureGroup);

  // ─── 4. LENS BAYONET MOUNT & SHUTTER GROUP ──────────────────────────────
  const mountGroup = new THREE.Group();
  mountGroup.name = 'mountGroup';

  // Heavy Stainless Steel Bayonet Flange
  const mountRingGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.15, 48);
  const mountRing = new THREE.Mesh(mountRingGeo, titaniumMat);
  mountRing.rotation.x = Math.PI / 2;
  mountGroup.add(mountRing);

  // Bayonet locking tabs (3 tabs)
  for (let i = 0; i < 3; i++) {
    const tabAngle = (i / 3) * Math.PI * 2;
    const tabGeo = new THREE.BoxGeometry(0.25, 0.1, 0.05);
    const tab = new THREE.Mesh(tabGeo, titaniumMat);
    tab.position.set(Math.cos(tabAngle) * 0.65, Math.sin(tabAngle) * 0.65, 0.06);
    tab.rotation.z = tabAngle;
    mountGroup.add(tab);
  }

  // 8 Gold Plated Electronic Contact Pins
  for (let i = 0; i < 8; i++) {
    const pinAngle = -0.6 + (i / 7) * 1.2;
    const pinGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.04, 8);
    const pin = new THREE.Mesh(pinGeo, goldMat);
    pin.rotation.x = Math.PI / 2;
    pin.position.set(Math.sin(pinAngle) * 0.6, -0.45 + Math.cos(pinAngle) * 0.1, 0.08);
    mountGroup.add(pin);
  }

  // Shutter Curtain Frame
  const shutterFrameGeo = new THREE.BoxGeometry(1.2, 0.9, 0.05);
  const shutterFrame = new THREE.Mesh(shutterFrameGeo, darkMetalMat);
  shutterFrame.position.z = -0.1;
  mountGroup.add(shutterFrame);

  // Shutter Carbon Blades
  const shutterBladeGeo = new THREE.BoxGeometry(0.9, 0.65, 0.01);
  const shutterBlade = new THREE.Mesh(shutterBladeGeo, bladeMat);
  shutterBlade.position.z = -0.08;
  mountGroup.add(shutterBlade);

  rootGroup.add(mountGroup);

  // ─── 5. TRUNG TÂM: CẢM BIẾN BSI-CMOS & CHIP AI "SNAPPOSE NEURAL CORE" ────
  // This is the absolute center of technological intelligence!
  const sensorAndChipGroup = new THREE.Group();
  sensorAndChipGroup.name = 'sensorAndChipGroup';

  // Sensor Bracket & Copper Heat Pipe Base
  const sensorBracketGeo = new THREE.BoxGeometry(1.5, 1.2, 0.1);
  const sensorBracket = new THREE.Mesh(sensorBracketGeo, darkMetalMat);
  sensorAndChipGroup.add(sensorBracket);

  // Gold Ground Ring around sensor
  const goldFrameGeo = new THREE.BoxGeometry(1.3, 0.95, 0.02);
  const goldFrame = new THREE.Mesh(goldFrameGeo, goldMat);
  goldFrame.position.z = 0.06;
  sensorAndChipGroup.add(goldFrame);

  // Full-Frame 36x24mm BSI-CMOS Sensor Plate
  const sensorPlateGeo = new THREE.BoxGeometry(1.18, 0.82, 0.03);
  const sensorPlate = new THREE.Mesh(sensorPlateGeo, sensorSurfaceMat);
  sensorPlate.position.z = 0.08;
  sensorAndChipGroup.add(sensorPlate);

  // Sensor Pixel Grid Overlay (Fine wireframe)
  const pixelGridGeo = new THREE.PlaneGeometry(1.16, 0.8, 24, 16);
  const pixelGridMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
  });
  const pixelGrid = new THREE.Mesh(pixelGridGeo, pixelGridMat);
  pixelGrid.position.z = 0.1;
  sensorAndChipGroup.add(pixelGrid);

  // ─── CON CHIP AI "SNAPPOSE NEURAL CORE X1" ───
  // Positioned directly mounted on the processing board behind the sensor
  const aiProcessorGroup = new THREE.Group();
  aiProcessorGroup.name = 'aiProcessorGroup';
  aiProcessorGroup.position.set(0, 0, 0.22); // Extends slightly forward for dramatic focus

  // Motherboard PCB substrate for the chip
  const pcbGeo = new THREE.BoxGeometry(1.4, 1.1, 0.04);
  const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
  aiProcessorGroup.add(pcbMesh);

  // Glowing circuit traces on PCB
  const circuitGeo = new THREE.PlaneGeometry(1.36, 1.06, 12, 10);
  const circuitMesh = new THREE.Mesh(circuitGeo, circuitTraceMat);
  circuitMesh.position.z = 0.025;
  aiProcessorGroup.add(circuitMesh);

  // Main AI Chip Ceramic Package
  const chipPackageGeo = new THREE.BoxGeometry(0.72, 0.72, 0.08);
  const chipPackage = new THREE.Mesh(chipPackageGeo, aiChipMat);
  chipPackage.position.z = 0.06;
  aiProcessorGroup.add(chipPackage);

  // Chip Gold Beveled Trim Frame
  const chipFrameGeo = new THREE.BoxGeometry(0.74, 0.74, 0.03);
  const chipFrame = new THREE.Mesh(chipFrameGeo, goldMat);
  chipFrame.position.z = 0.04;
  aiProcessorGroup.add(chipFrame);

  // Central Neural Engine Die (Emissive Core with pulse)
  const chipDieGeo = new THREE.BoxGeometry(0.48, 0.48, 0.02);
  const chipDie = new THREE.Mesh(chipDieGeo, aiGlowMat);
  chipDie.position.z = 0.11;
  chipDie.name = 'chipDie';
  aiProcessorGroup.add(chipDie);

  // Inner Neural Matrix Diamond
  const diamondGeo = new THREE.OctahedronGeometry(0.18, 0);
  const diamondMesh = new THREE.Mesh(diamondGeo, aiNeuralPulseMat);
  diamondMesh.position.z = 0.16;
  diamondMesh.name = 'diamondNeuralCore';
  aiProcessorGroup.add(diamondMesh);

  // 4 Surrounding LPDDR5 Memory Chips
  const memChipPositions = [
    [-0.45, 0.35, 0.04],
    [0.45, 0.35, 0.04],
    [-0.45, -0.35, 0.04],
    [0.45, -0.35, 0.04],
  ];
  memChipPositions.forEach(pos => {
    const memGeo = new THREE.BoxGeometry(0.24, 0.16, 0.04);
    const memMesh = new THREE.Mesh(memGeo, darkMetalMat);
    memMesh.position.set(...pos);
    aiProcessorGroup.add(memMesh);
  });

  // Neural Ring Halo surrounding the AI Chip (Expands and rotates with AI activity)
  const haloGeo = new THREE.TorusGeometry(0.65, 0.015, 16, 64);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.8,
  });
  const haloRing1 = new THREE.Mesh(haloGeo, haloMat);
  haloRing1.position.z = 0.14;
  haloRing1.name = 'haloRing1';
  aiProcessorGroup.add(haloRing1);

  const haloRing2 = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.01, 16, 64), new THREE.MeshBasicMaterial({
    color: 0xbf5af2,
    transparent: true,
    opacity: 0.6,
  }));
  haloRing2.position.z = 0.15;
  haloRing2.name = 'haloRing2';
  aiProcessorGroup.add(haloRing2);

  // Floating Quantum Data Particles radiating from Chip
  const chipParticleGeo = new THREE.BufferGeometry();
  const chipParticleCount = 80;
  const chipParticlePos = new Float32Array(chipParticleCount * 3);
  for (let i = 0; i < chipParticleCount; i++) {
    const i3 = i * 3;
    const r = 0.35 + Math.random() * 0.9;
    const th = Math.random() * Math.PI * 2;
    chipParticlePos[i3] = Math.cos(th) * r;
    chipParticlePos[i3 + 1] = Math.sin(th) * r;
    chipParticlePos[i3 + 2] = (Math.random() - 0.5) * 0.4 + 0.15;
  }
  chipParticleGeo.setAttribute('position', new THREE.BufferAttribute(chipParticlePos, 3));
  const chipParticleMat = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 0.04,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
  });
  const chipParticles = new THREE.Points(chipParticleGeo, chipParticleMat);
  chipParticles.name = 'chipParticles';
  aiProcessorGroup.add(chipParticles);

  sensorAndChipGroup.add(aiProcessorGroup);
  rootGroup.add(sensorAndChipGroup);

  // ─── 6. CAMERA BODY CHASSIS & HANDGRIP GROUP ─────────────────────────────
  const chassisGroup = new THREE.Group();
  chassisGroup.name = 'chassisGroup';

  // Main Cast Magnesium Alloy Body Block
  const bodyGeo = new THREE.BoxGeometry(2.8, 1.8, 0.75);
  const bodyMesh = new THREE.Mesh(bodyGeo, darkMetalMat);
  bodyMesh.position.x = 0.2; // Offset slightly for ergonomic right-hand grip
  chassisGroup.add(bodyMesh);

  // Ergonomic Right Hand Grip (Leather Wrapped)
  const gripGeo = new THREE.CylinderGeometry(0.42, 0.38, 1.76, 24, 1, false, 0, Math.PI * 1.3);
  const gripMesh = new THREE.Mesh(gripGeo, leatherGripMat);
  gripMesh.position.set(1.45, 0, 0.15);
  gripMesh.rotation.y = Math.PI * 0.85;
  chassisGroup.add(gripMesh);

  // Grip Inset Line Accent
  const gripAccentGeo = new THREE.BoxGeometry(0.04, 1.78, 0.04);
  const gripAccent = new THREE.Mesh(gripAccentGeo, goldMat);
  gripAccent.position.set(1.15, 0, 0.38);
  chassisGroup.add(gripAccent);

  // Front Lens Mount Cavity Bezel
  const cavityBezelGeo = new THREE.TorusGeometry(0.8, 0.08, 16, 40);
  const cavityBezel = new THREE.Mesh(cavityBezelGeo, titaniumMat);
  cavityBezel.position.set(0, 0, 0.38);
  chassisGroup.add(cavityBezel);

  // AF Assist Red Illuminator Window
  const afGeo = new THREE.SphereGeometry(0.06, 16, 16);
  const afMat = new THREE.MeshStandardMaterial({
    color: 0xff3b30,
    emissive: 0xff3b30,
    emissiveIntensity: 1.5,
  });
  const afMesh = new THREE.Mesh(afGeo, afMat);
  afMesh.position.set(0.9, 0.65, 0.38);
  chassisGroup.add(afMesh);

  // SnapPose Laser Engraved Badge
  const badgeGeo = new THREE.BoxGeometry(0.7, 0.14, 0.02);
  const badgeMesh = new THREE.Mesh(badgeGeo, titaniumMat);
  badgeMesh.position.set(0, 0.78, 0.39);
  chassisGroup.add(badgeMesh);

  rootGroup.add(chassisGroup);

  // ─── 7. TOP PLATE, DIALS, SHUTTER BUTTON & EVF ───────────────────────────
  const topPlateGroup = new THREE.Group();
  topPlateGroup.name = 'topPlateGroup';

  // Top Plate Housing Bar
  const topHousingGeo = new THREE.BoxGeometry(2.8, 0.22, 0.78);
  const topHousing = new THREE.Mesh(topHousingGeo, darkMetalMat);
  topHousing.position.x = 0.2;
  topPlateGroup.add(topHousing);

  // EVF Viewfinder Hump (Pentaprism style)
  const evfHumpGeo = new THREE.ConeGeometry(0.48, 0.38, 4);
  const evfHump = new THREE.Mesh(evfHumpGeo, darkMetalMat);
  evfHump.position.set(0, 0.25, 0);
  evfHump.rotation.y = Math.PI / 4;
  topPlateGroup.add(evfHump);

  // Hot Shoe Flash Mount
  const hotShoeGeo = new THREE.BoxGeometry(0.28, 0.08, 0.3);
  const hotShoe = new THREE.Mesh(hotShoeGeo, titaniumMat);
  hotShoe.position.set(0, 0.44, 0);
  topPlateGroup.add(hotShoe);

  // Mode Dial (P/A/S/M/AI)
  const modeDialGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.16, 24);
  const modeDial = new THREE.Mesh(modeDialGeo, titaniumMat);
  modeDial.position.set(-0.7, 0.16, 0);
  topPlateGroup.add(modeDial);

  // Shutter Button with Power Switch Ring
  const powerRingGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 24);
  const powerRing = new THREE.Mesh(powerRingGeo, darkMetalMat);
  powerRing.position.set(1.3, 0.14, 0.22);
  topPlateGroup.add(powerRing);

  const shutterBtnGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 24);
  const shutterBtn = new THREE.Mesh(shutterBtnGeo, titaniumMat);
  shutterBtn.position.set(1.3, 0.2, 0.22);
  topPlateGroup.add(shutterBtn);

  // Exposure Compensation Dial
  const expDialGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24);
  const expDial = new THREE.Mesh(expDialGeo, titaniumMat);
  expDial.position.set(0.85, 0.14, -0.05);
  topPlateGroup.add(expDial);

  rootGroup.add(topPlateGroup);

  // ─── 8. REAR CHASSIS & 3.2" OLED TOUCHSCREEN MONITOR ─────────────────────
  const rearGroup = new THREE.Group();
  rearGroup.name = 'rearGroup';

  // Rear Plate
  const rearPlateGeo = new THREE.BoxGeometry(2.76, 1.76, 0.08);
  const rearPlate = new THREE.Mesh(rearPlateGeo, darkMetalMat);
  rearPlate.position.x = 0.2;
  rearGroup.add(rearPlate);

  // OLED Screen Frame
  const screenFrameGeo = new THREE.BoxGeometry(1.9, 1.35, 0.04);
  const screenFrame = new THREE.Mesh(screenFrameGeo, darkMetalMat);
  screenFrame.position.set(-0.15, -0.05, -0.05);
  rearGroup.add(screenFrame);

  // OLED Screen Display Face (Live View Camera UI)
  const screenFaceGeo = new THREE.PlaneGeometry(1.8, 1.25);
  // Create dynamic canvas texture for camera UI
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 512;
  screenCanvas.height = 360;
  const ctx = screenCanvas.getContext('2d');
  
  function drawScreenUI() {
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, 512, 360);

    // Rule of thirds grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(170, 0); ctx.lineTo(170, 360);
    ctx.moveTo(342, 0); ctx.lineTo(342, 360);
    ctx.moveTo(0, 120); ctx.lineTo(512, 120);
    ctx.moveTo(0, 240); ctx.lineTo(512, 240);
    ctx.stroke();

    // AI Pose Focus Box in center
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(156, 60, 200, 240);

    // Corner targeting brackets
    const bLen = 16;
    ctx.strokeStyle = '#bf5af2';
    ctx.lineWidth = 3;
    // top-left
    ctx.beginPath();
    ctx.moveTo(140, 70); ctx.lineTo(140, 50); ctx.lineTo(160, 50);
    // top-right
    ctx.moveTo(352, 50); ctx.lineTo(372, 50); ctx.lineTo(372, 70);
    // bottom-left
    ctx.moveTo(140, 290); ctx.lineTo(140, 310); ctx.lineTo(160, 310);
    // bottom-right
    ctx.moveTo(352, 310); ctx.lineTo(372, 310); ctx.lineTo(372, 290);
    ctx.stroke();

    // AI HUD Info Header
    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('SNAPPOSE AI LIVE', 20, 35);

    ctx.fillStyle = '#bf5af2';
    ctx.font = '14px monospace';
    ctx.fillText('MATCH: 98.8% [PERFECT]', 300, 35);

    // Camera Specs Footer
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.fillText('F/1.4  1/250s  ISO 200  4K 60P', 20, 335);

    ctx.fillStyle = '#30d158';
    ctx.fillText('● REC', 440, 335);
  }
  drawScreenUI();

  const screenTex = new THREE.CanvasTexture(screenCanvas);
  screenTex.needsUpdate = true;
  const screenMatWithUI = new THREE.MeshBasicMaterial({
    map: screenTex,
  });
  const screenMesh = new THREE.Mesh(screenFaceGeo, screenMatWithUI);
  screenMesh.position.set(-0.15, -0.05, -0.08);
  screenMesh.rotation.y = Math.PI; // Face outwards to rear
  rearGroup.add(screenMesh);

  // Rear Control Dial & Joystick
  const joyGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 16);
  const joyMesh = new THREE.Mesh(joyGeo, titaniumMat);
  joyMesh.position.set(1.15, 0.4, -0.06);
  joyMesh.rotation.x = Math.PI / 2;
  rearGroup.add(joyMesh);

  // 4 Navigation buttons
  for (let i = 0; i < 4; i++) {
    const btnAngle = (i / 4) * Math.PI * 2;
    const btnGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.04, 16);
    const btn = new THREE.Mesh(btnGeo, darkMetalMat);
    btn.position.set(1.15 + Math.cos(btnAngle) * 0.22, -0.15 + Math.sin(btnAngle) * 0.22, -0.06);
    btn.rotation.x = Math.PI / 2;
    rearGroup.add(btn);
  }

  // Round EVF Eyecup
  const eyecupGeo = new THREE.CylinderGeometry(0.24, 0.2, 0.16, 24);
  const eyecup = new THREE.Mesh(eyecupGeo, leatherGripMat);
  eyecup.position.set(0, 0.65, -0.2);
  eyecup.rotation.x = Math.PI / 2;
  rearGroup.add(eyecup);

  rootGroup.add(rearGroup);

  // ─── 9. HOLOGRAM POSE PROJECTION CARDS (Attached to AI Chip) ────────────
  // When AI Chip is at maximum activity, 3D Pose cards float out into 3D space
  const poseProjectionGroup = new THREE.Group();
  poseProjectionGroup.name = 'poseProjectionGroup';
  poseProjectionGroup.visible = false;

  // Connecting laser rays from chip to cards
  const rayMat = new THREE.LineBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.7,
  });

  const cardAngles = [-0.65, -0.32, 0, 0.32, 0.65];
  const cardGroupList = [];

  cardAngles.forEach((ang, idx) => {
    const cardGroup = new THREE.Group();
    const cardRadius = 2.4;
    const cardX = Math.sin(ang * 2.2) * cardRadius;
    const cardY = (Math.random() - 0.5) * 0.4 + 0.3;
    const cardZ = Math.cos(ang * 2.2) * (cardRadius * 0.6) + 1.2;

    // Card Glass Frame
    const cardGeo = new THREE.PlaneGeometry(0.85, 1.15);
    const cardMat = new THREE.MeshStandardMaterial({
      color: 0x090e18,
      metalness: 0.2,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const cardMesh = new THREE.Mesh(cardGeo, cardMat);
    cardGroup.add(cardMesh);

    // Card Glowing Border
    const borderGeo = new THREE.EdgesGeometry(cardGeo);
    const borderMat = new THREE.LineBasicMaterial({
      color: idx === 0 ? 0x00f0ff : (idx === 1 ? 0xbf5af2 : 0x30d158),
      linewidth: 2,
    });
    const borderMesh = new THREE.LineSegments(borderGeo, borderMat);
    cardGroup.add(borderMesh);

    // Laser Guide Line from Chip (0,0,0.3) to Card
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0.3),
      new THREE.Vector3(cardX, cardY, cardZ),
    ]);
    const rayLine = new THREE.Line(lineGeo, rayMat);
    poseProjectionGroup.add(rayLine);

    cardGroup.position.set(cardX, cardY, cardZ);
    cardGroup.lookAt(0, 0.5, 4.5);
    cardGroup.userData = { originalY: cardY, index: idx };
    cardGroupList.push(cardGroup);
    poseProjectionGroup.add(cardGroup);
  });

  rootGroup.add(poseProjectionGroup);

  // ─── INITIAL POSITIONS DEFINITION (COLLAPSED VS EXPLODED) ────────────────
  // Base positions in assembled camera
  const baseTransforms = {
    frontGroup: { z: 1.15, x: 0, y: 0 },
    focusGroup: { z: 0.8, x: 0, y: 0 },
    apertureGroup: { z: 0.5, x: 0, y: 0 },
    mountGroup: { z: 0.25, x: 0, y: 0 },
    sensorAndChipGroup: { z: 0.05, x: 0, y: 0 },
    chassisGroup: { z: 0, x: 0, y: 0 },
    topPlateGroup: { z: 0, x: 0, y: 0.98 },
    rearGroup: { z: -0.38, x: 0, y: 0 },
  };

  // Exploded displacements (Relative offset when explodedFactor = 1.0)
  const explodedOffsets = {
    frontGroup: { z: 2.8, x: 0, y: 0, rotY: 0.15 },
    focusGroup: { z: 1.9, x: 0, y: 0, rotZ: 0.4 },
    apertureGroup: { z: 1.1, x: 0, y: 0, rotZ: -0.5 },
    mountGroup: { z: 0.55, x: 0, y: 0, rotY: -0.1 },
    // Sensor & AI Chip stay right at center focal depth, but lift slightly forward into view!
    sensorAndChipGroup: { z: 0.15, x: 0, y: 0.1 },
    chassisGroup: { z: -0.65, x: 0.2, y: -0.15 },
    topPlateGroup: { z: -0.4, x: 0.2, y: 1.4 },
    rearGroup: { z: -1.75, x: 0.2, y: -0.25 },
  };

  // Apply initial assembled state
  Object.keys(baseTransforms).forEach(key => {
    const group = rootGroup.getObjectByName(key);
    if (group) {
      group.position.set(
        baseTransforms[key].x,
        baseTransforms[key].y,
        baseTransforms[key].z
      );
    }
  });

  // ─── UPDATE FUNCTION BASED ON SCROLL PROGRESS ────────────────────────────
  /**
   * Updates camera exploded view, rotation, chip pulse, and pose projections.
   * @param {number} scrollProgress - Page scroll progress (0.0 to 1.0)
   * @param {number} elapsedTime - Animation clock time in seconds
   */
  function update(scrollProgress, elapsedTime) {
    // 1. Calculate Exploded Factor based on Storytelling sections:
    // 0.0 -> 0.15 (Hero): Assembled (factor = 0)
    // 0.15 -> 0.40 (Story 1 - Problem): Starting to explode slightly (0 -> 0.35)
    // 0.40 -> 0.65 (Story 2 - Deconstruction): Full Exploded View (0.35 -> 1.0)
    // 0.65 -> 0.85 (Story 3 - AI Chip Core): Camera zooms into Center Chip (factor ~1.1)
    // 0.85 -> 1.00 (Story 4 - Suggest Pose): AI Chip radiates poses (factor ~0.95)

    let explodeFactor = 0;
    if (scrollProgress < 0.12) {
      explodeFactor = 0;
    } else if (scrollProgress < 0.35) {
      // Smooth ease into initial partial explode
      const t = (scrollProgress - 0.12) / (0.35 - 0.12);
      explodeFactor = t * 0.38;
    } else if (scrollProgress < 0.62) {
      // Explode completely
      const t = (scrollProgress - 0.35) / (0.62 - 0.35);
      explodeFactor = 0.38 + t * 0.62;
    } else if (scrollProgress < 0.82) {
      // Peak exploded state, focus on AI chip
      explodeFactor = 1.05;
    } else {
      // Slight gather back to showcase pose projection
      explodeFactor = 0.9;
    }

    // Apply positions to each layer
    Object.keys(baseTransforms).forEach(key => {
      const group = rootGroup.getObjectByName(key);
      const base = baseTransforms[key];
      const offset = explodedOffsets[key];
      if (group && offset) {
        group.position.x = base.x + offset.x * explodeFactor;
        group.position.y = base.y + offset.y * explodeFactor;
        group.position.z = base.z + offset.z * explodeFactor;

        if (offset.rotY) {
          group.rotation.y = offset.rotY * explodeFactor;
        }
        if (offset.rotZ) {
          group.rotation.z = offset.rotZ * explodeFactor;
        }
      }
    });

    // 2. Rotate Iris Aperture blades dynamically
    const blades = rootGroup.getObjectByName('bladesGroup');
    if (blades) {
      blades.rotation.z = explodeFactor * Math.PI * 0.8;
    }

    // 3. AI Chip Activity & Pulsing
    const chipDie = rootGroup.getObjectByName('chipDie');
    const diamond = rootGroup.getObjectByName('diamondNeuralCore');
    const halo1 = rootGroup.getObjectByName('haloRing1');
    const halo2 = rootGroup.getObjectByName('haloRing2');
    const particles = rootGroup.getObjectByName('chipParticles');

    // Frequency & intensity rises as user reaches AI chip section (scroll > 0.6)
    const isAiFocused = scrollProgress >= 0.55;
    const aiIntensity = isAiFocused
      ? Math.min(1.0, (scrollProgress - 0.55) / 0.25)
      : 0.2;

    const pulse = 1.0 + Math.sin(elapsedTime * (3 + aiIntensity * 6)) * 0.35 * aiIntensity;

    if (chipDie) {
      chipDie.material.emissiveIntensity = 1.5 + aiIntensity * 2.5 * pulse;
      chipDie.scale.setScalar(1 + aiIntensity * 0.08 * Math.sin(elapsedTime * 8));
    }

    if (diamond) {
      diamond.rotation.x = elapsedTime * (1 + aiIntensity * 2);
      diamond.rotation.y = elapsedTime * (1.5 + aiIntensity * 2.5);
      diamond.material.emissiveIntensity = 2.0 + aiIntensity * 3.0 * pulse;
      diamond.scale.setScalar(0.9 + aiIntensity * 0.3 * pulse);
    }

    if (halo1) {
      halo1.rotation.z = elapsedTime * (0.8 + aiIntensity * 1.5);
      halo1.scale.setScalar(1 + aiIntensity * 0.25 * Math.sin(elapsedTime * 4));
      halo1.material.opacity = 0.4 + aiIntensity * 0.6;
    }

    if (halo2) {
      halo2.rotation.z = -elapsedTime * (1.1 + aiIntensity * 1.8);
      halo2.scale.setScalar(1 + aiIntensity * 0.3 * Math.cos(elapsedTime * 4.5));
      halo2.material.opacity = 0.3 + aiIntensity * 0.7;
    }

    if (particles) {
      particles.rotation.z = elapsedTime * 0.5;
      particles.material.size = 0.03 + aiIntensity * 0.03 * pulse;
    }

    // 4. Hologram Pose Cards Projection (Visible during AI chip & Suggestion sections)
    const poseGroup = rootGroup.getObjectByName('poseProjectionGroup');
    if (poseGroup) {
      if (scrollProgress >= 0.75) {
        poseGroup.visible = true;
        const poseFade = Math.min(1.0, (scrollProgress - 0.75) / 0.1);
        cardGroupList.forEach((cg, i) => {
          cg.position.y = cg.userData.originalY + Math.sin(elapsedTime * 2 + i) * 0.08;
          cg.scale.setScalar(Math.min(1.0, poseFade * (0.85 + Math.sin(elapsedTime * 1.5 + i) * 0.05)));
        });
      } else {
        poseGroup.visible = false;
      }
    }

    // 5. Cinematic Orbit & Attitude of the whole Camera based on scroll
    // Hero: Slight tilt facing front-right
    // Explode: Cinematic 42-degree isometric view showing depth of all 8 layers!
    // AI Chip Zoom: Centered view into the glowing core
    if (scrollProgress < 0.35) {
      const t = scrollProgress / 0.35;
      rootGroup.rotation.y = 0.35 + t * 0.6;
      rootGroup.rotation.x = 0.12 - t * 0.05;
      rootGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.03;
    } else if (scrollProgress < 0.65) {
      const t = (scrollProgress - 0.35) / 0.3;
      // Beautiful exploded isometric view
      rootGroup.rotation.y = 0.95 + Math.sin(t * Math.PI) * 0.25;
      rootGroup.rotation.x = 0.25 + t * 0.1;
      rootGroup.rotation.z = -0.08;
    } else if (scrollProgress < 0.85) {
      // Rotate almost face-on to the AI chip
      const t = (scrollProgress - 0.65) / 0.2;
      rootGroup.rotation.y = 0.95 * (1 - t) + 0.15 * t;
      rootGroup.rotation.x = 0.35 * (1 - t) + 0.05 * t;
      rootGroup.rotation.z = 0;
    } else {
      // Suggest pose: slight dynamic tilt
      rootGroup.rotation.y = 0.15 + Math.sin(elapsedTime * 0.8) * 0.08;
      rootGroup.rotation.x = 0.08 + Math.cos(elapsedTime * 0.6) * 0.04;
    }
  }

  return {
    group: rootGroup,
    update,
  };
}
