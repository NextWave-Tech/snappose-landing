import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createExplodedCamera } from './cameraModel.js';
import { createAtmosphere, createScanRings } from './scene.js';
import { POSE_SUGGESTIONS } from './poseData.js';
import { loadAntiqueCamera } from './antiqueLoader.js';

gsap.registerPlugin(ScrollTrigger);

// ─── DOM INITIALIZATION ───────────────────────────────────────────────────
const app = document.getElementById('app');

app.innerHTML = `
  <!-- Loading Screen -->
  <div class="loading-screen" id="loading-screen">
    <div class="loading-logo-box">
      <div class="chip-icon"></div>
      <div class="loading-logo">SnapPose <span>AI</span></div>
    </div>
    <div class="loading-subtitle">NEURAL OPTICS ARCHITECTURE</div>
    <div class="loading-bar-track">
      <div class="loading-bar-fill" id="loading-bar"></div>
    </div>
  </div>

  <!-- Navbar -->
  <nav class="navbar" id="navbar">
    <a href="#hero" class="nav-brand">
      <div class="nav-logo">SnapPose <span>AI</span></div>
      <div class="nav-chip-badge">NEURAL CORE X1</div>
    </a>
    <ul class="nav-links">
      <li><a href="#story-1">Vấn đề</a></li>
      <li><a href="#story-2">Bóc tách Camera</a></li>
      <li><a href="#story-3">Con Chip AI</a></li>
      <li><a href="#story-4">Gợi ý Pose</a></li>
      <li><a href="#features">Công nghệ</a></li>
    </ul>
    <div class="nav-actions">
      <button class="btn-vintage-toggle" id="btn-open-vintage">
        <span>📸</span> Model Cổ Điển GLTF
      </button>
      <a href="#cta" class="nav-cta">Tải App SnapPose</a>
    </div>
  </nav>

  <!-- HERO SECTION -->
  <section class="hero" id="hero">
    <div class="hero-badge">
      <span class="pulse-dot"></span>
      THẾ HỆ MÁY ẢNH AI ĐẦU TIÊN TRÊN THẾ GIỚI
    </div>
    <h1 class="hero-title">
      Kiến trúc Quang học & <br/>
      <span class="gradient-text">Trí Tuệ Nhân Tạo</span>
    </h1>
    <p class="hero-subtitle">
      Không chỉ ghi lại ánh sáng — SnapPose phân tách cơ chế quang học truyền thống, tích hợp chip Neural Engine để nhận diện bối cảnh và gợi ý tư thế chụp hoàn hảo theo thời gian thực.
    </p>
    <div class="hero-cta-group">
      <a href="#story-2" class="btn-primary">Bóc tách Camera 3D ↓</a>
      <a href="#story-4" class="btn-secondary">Xem Gợi ý Pose</a>
    </div>

    <!-- Quick Spec Strip -->
    <div class="hero-specs">
      <div class="hero-spec-item">
        <div class="val">48 <span>TOPS</span></div>
        <div class="lbl">Sức mạnh NPU AI</div>
      </div>
      <div class="hero-spec-item">
        <div class="val">0.05 <span>giây</span></div>
        <div class="lbl">Gợi ý Pose Real-time</div>
      </div>
      <div class="hero-spec-item">
        <div class="val">99.2 <span>%</span></div>
        <div class="lbl">Chuẩn Tỷ lệ vàng</div>
      </div>
      <div class="hero-spec-item">
        <div class="val">F/1.2 <span>ED</span></div>
        <div class="lbl">Quang học Aspherical</div>
      </div>
    </div>

    <div class="scroll-indicator">
      <div class="scroll-wheel"></div>
      <span>Cuộn để phân tách</span>
    </div>
  </section>

  <!-- STORY 1: THE OPTICAL PARADOX -->
  <section class="story-section" id="story-1">
    <div class="story-card left" data-story>
      <div class="story-badge">01 — Giới Hạn Truyền Thống</div>
      <h2 class="story-title">Máy ảnh chỉ chụp,<br/><span class="highlight">nhưng không biết bạn tạo dáng ra sao</span></h2>
      <p class="story-desc">
        Dù sở hữu ống kính hàng chục triệu đồng, khoảnh khắc bấm máy vẫn thường bị lãng phí vì người đứng trước camera lúng túng, gượng gạo, không biết góc mặt nào đẹp hay bàn tay nên đặt ở đâu.
      </p>
      <div class="tech-spec-list">
        <div class="tech-spec-row">
          <span class="spec-name">Cảm biến quang học truyền thống:</span>
          <span class="spec-val">Ghi nhận photon thụ động</span>
        </div>
        <div class="tech-spec-row">
          <span class="spec-name">Khả năng hiểu bối cảnh không gian:</span>
          <span class="spec-val" style="color: #ff453a;">0% (Không hỗ trợ)</span>
        </div>
      </div>
    </div>
  </section>

  <!-- STORY 2: EXPLODED VIEW DECONSTRUCTION -->
  <section class="story-section" id="story-2">
    <div class="story-card right" data-story>
      <div class="story-badge">02 — Kiến Trúc Phân Tách</div>
      <h2 class="story-title">Bóc tách toàn bộ<br/><span class="highlight">8 tầng cơ khí & quang học</span></h2>
      <p class="story-desc">
        Khi bạn cuộn chuột, toàn bộ cấu trúc máy ảnh được tách rời dọc theo trục quang học Z: từ thấu kính ngoài Nano F/1.2, vòng xoay 9 lá khẩu độ cơ học, thấu kính phi cầu kép đến ngàm lưỡi lê bằng thép không gỉ.
      </p>
      <div class="tech-spec-list">
        <div class="tech-spec-row">
          <span class="spec-name">[Tầng 1-2] Thấu kính trước & Vòng Focus:</span>
          <span class="spec-val">Nano AR Multi-coated</span>
        </div>
        <div class="tech-spec-row">
          <span class="spec-name">[Tầng 3] Cụm Iris Aperture:</span>
          <span class="spec-val">9 lá thép siêu tốc 1/8000s</span>
        </div>
        <div class="tech-spec-row">
          <span class="spec-name">[Tầng 4] Bayonet Mount & Shutter:</span>
          <span class="spec-val">Titanium & Carbon Fiber</span>
        </div>
        <div class="tech-spec-row">
          <span class="spec-name">[Tầng 6-8] Chassis & OLED Screen:</span>
          <span class="spec-val">Hợp kim Magie đúc nguyên khối</span>
        </div>
      </div>
    </div>
  </section>

  <!-- STORY 3: THE AI CHIP AT THE CENTER -->
  <section class="story-section" id="story-3">
    <div class="story-card center" data-story>
      <div class="story-badge">03 — Trái Tim Công Nghệ</div>
      <h2 class="story-title">Ở phần giữa:<br/><span class="highlight">Con Chip AI SnapPose Neural Core</span></h2>
      <p class="story-desc">
        Ngay sau cảm biến BSI-CMOS Full-frame là bộ vi xử lý thần kinh chuyên dụng. Con chip này tự động quét 3D toàn bộ trường nhìn, phân tích góc ánh sáng mặt trời, nhận diện phối cảnh kiến trúc và cấu trúc cơ thể để đưa ra quyết định tạo dáng tối ưu.
      </p>

      <div class="chip-telemetry-grid">
        <div class="chip-telemetry-box">
          <div class="metric-label">Xử lý Thần kinh</div>
          <div class="metric-value">48 TOPS NPU</div>
        </div>
        <div class="chip-telemetry-box">
          <div class="metric-label">Độ trễ Phân tích</div>
          <div class="metric-value">0.05 Giây</div>
        </div>
        <div class="chip-telemetry-box">
          <div class="metric-label">Bộ nhớ Băng thông</div>
          <div class="metric-value">128 GB/s LPDDR5</div>
        </div>
        <div class="chip-telemetry-box">
          <div class="metric-label">Mạng Nơ-ron</div>
          <div class="metric-value">Vision Transformer</div>
        </div>
      </div>
    </div>
  </section>

  <!-- STORY 4: FROM AI CHIP -> SUGGEST POSE -->
  <section class="story-section" id="story-4" style="min-height: 140vh;">
    <div class="pose-suggestion-container" data-story>
      <div class="pose-header">
        <div class="story-badge">04 — Gợi Ý Pose Trực Tiếp</div>
        <h2>Từ Chip AI Bung Tỏa <span class="gradient-text">Gợi Ý Pose</span></h2>
        <p>Chip AI phân tích bối cảnh và ngay lập tức suggest các pose hình ảnh với tỷ lệ match hoàn mỹ</p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="pose-tabs" id="pose-tabs"></div>

      <!-- Active Pose Showcase -->
      <div class="pose-showcase">
        <div class="pose-visual-card" id="pose-visual-card">
          <img src="" alt="Pose Photo" class="pose-img-photo" id="pose-img-photo" />
          <img src="" alt="Pose Skeleton" class="pose-img-skeleton" id="pose-img-skeleton" />
          
          <div class="pose-visual-overlay-badge">
            <span class="pulse-dot"></span>
            <span id="pose-visual-badge-text">AI LIVE DETECTION</span>
          </div>

          <div class="pose-view-toggle">
            <button class="pose-view-btn active" id="btn-view-photo">Ảnh Chụp Thật</button>
            <button class="pose-view-btn" id="btn-view-skeleton">Khung Xương AI</button>
          </div>
        </div>

        <div class="pose-info-pane">
          <div class="pose-title-row">
            <div>
              <h3 class="pose-name" id="pose-name">Cà Phê Tựa Cằm Trầm Tư</h3>
              <div class="pose-tags-list" id="pose-tags"></div>
            </div>
            <div class="pose-match-badge">
              <div class="pose-match-val" id="pose-match-val">99%</div>
              <div class="pose-match-lbl">MATCH SCORE</div>
            </div>
          </div>

          <div class="pose-tips-box">
            <h4>💡 Mẹo Tạo Dáng Chuẩn AI</h4>
            <p id="pose-tips">Khuỷu tay đặt nhẹ lên mặt bàn, mắt nhìn hướng ra cửa sổ để đón trọn ánh sáng tự nhiên.</p>
          </div>

          <div class="ai-diagnostic-block">
            <div class="ai-diag-item">
              <span class="label">☀️ Phân tích Ánh sáng:</span>
              <span class="val" id="ai-lighting">Ánh sáng cửa sổ tản 45°</span>
            </div>
            <div class="ai-diag-item">
              <span class="label">📐 Bố cục Khung hình:</span>
              <span class="val" id="ai-composition">Quy tắc 1/3 góc trái</span>
            </div>
            <div class="ai-diag-item">
              <span class="label">✨ Cảm xúc (Mood):</span>
              <span class="val" id="ai-mood">Trầm ấm & Thư thái</span>
            </div>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 10px;">
            <button class="btn-primary" style="flex: 1;" id="btn-try-pose">
              📸 Áp Dụng Pose Này Lên Camera
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURES SECTION -->
  <section class="story-section" id="features" style="min-height: auto; padding: 120px 48px;">
    <div style="max-width: 1100px; margin: 0 auto; width: 100%; pointer-events: auto;">
      <div style="text-align: center; margin-bottom: 50px;">
        <div class="story-badge">CÔNG NGHỆ VƯỢT TRỘI</div>
        <h2 style="font-family: var(--font-heading); font-size: 2.6rem; color: #fff;">
          Được thiết kế cho <span class="gradient-text">Nhiếp Ảnh Gia & Người Dùng</span>
        </h2>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        <div class="chip-telemetry-box" style="padding: 28px;">
          <div style="font-size: 2rem; margin-bottom: 12px;">🧠</div>
          <h3 style="font-size: 1.2rem; color: #fff; margin-bottom: 8px;">Nhận diện Bối cảnh Real-time</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
            Tự động nhận biết bạn đang ở bãi biển, quán cà phê, công viên, hay đường phố để gợi ý tư thế tương thích nhất.
          </p>
        </div>

        <div class="chip-telemetry-box" style="padding: 28px;">
          <div style="font-size: 2rem; margin-bottom: 12px;">📐</div>
          <h3 style="font-size: 1.2rem; color: #fff; margin-bottom: 8px;">Pose Skeleton Overlay</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
            Hiển thị khung xương 3D trực tiếp lên màn hình máy ảnh, bạn chỉ cần canh dáng theo là có ngay bức ảnh chuẩn tỷ lệ vàng.
          </p>
        </div>

        <div class="chip-telemetry-box" style="padding: 28px;">
          <div style="font-size: 2rem; margin-bottom: 12px;">⚡</div>
          <h3 style="font-size: 1.2rem; color: #fff; margin-bottom: 8px;">Tốc độ Phản hồi 0.05s</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
            Sức mạnh của con chip Neural Core giúp bạn không bao giờ bỏ lỡ khoảnh khắc "vàng" (Golden Hour).
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA FOOTER -->
  <footer class="footer-section" id="cta">
    <div class="cta-box">
      <h2>Sẵn sàng có những bức ảnh <span class="gradient-text">triệu like</span>?</h2>
      <p>Trải nghiệm công nghệ AI Pose Suggestion đột phá ngay trên chiếc điện thoại của bạn với SnapPose.</p>
      <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <a href="#" class="btn-primary" style="padding: 16px 36px; font-size: 1.05rem;">
          🍏 Tải cho iOS (App Store)
        </a>
        <a href="#" class="btn-secondary" style="padding: 16px 36px; font-size: 1.05rem;">
          🤖 Tải cho Android (Google Play)
        </a>
      </div>
    </div>

    <div class="footer-bottom">
      <div>© 2026 SnapPose AI. Tất cả quyền được bảo lưu.</div>
      <div style="display: flex; gap: 20px;">
        <span>Kiến trúc Quang học Exploded Camera</span>
        <span>Neural Core 48 TOPS</span>
      </div>
    </div>
  </footer>

  <!-- VINTAGE GLTF 3D VIEWER MODAL -->
  <div class="vintage-modal" id="vintage-modal">
    <div class="vintage-modal-card">
      <button class="vintage-modal-close" id="btn-close-vintage">✕</button>
      <div class="vintage-modal-header">
        <h3>Model Máy Ảnh Cổ Điển Khronos UX3D</h3>
        <p>Model 3D máy ảnh 17MB chất lượng PBR nguyên bản cào từ thư viện quốc tế (AntiqueCamera.glb)</p>
      </div>

      <div class="vintage-canvas-holder" id="vintage-canvas-holder">
        <div id="vintage-loading" style="position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; background: rgba(0,0,0,0.7); z-index: 10;">
          <div style="font-family: var(--font-mono); color: var(--gold-accent); margin-bottom: 12px;">ĐANG TẢI 17MB MODEL GLTF...</div>
          <div style="width: 200px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; overflow: hidden;">
            <div id="vintage-bar" style="width: 0%; height: 100%; background: var(--gold-accent); transition: width 0.2s;"></div>
          </div>
        </div>
      </div>

      <div class="vintage-specs-grid">
        <div class="vintage-spec-col">
          <div class="k">Nguồn gốc Asset</div>
          <div class="v">Khronos glTF Sample Assets</div>
        </div>
        <div class="vintage-spec-col">
          <div class="k">Dung lượng Tệp</div>
          <div class="v">17.2 MB Binary GLB</div>
        </div>
        <div class="vintage-spec-col">
          <div class="k">Vật liệu Kết cấu</div>
          <div class="v">PBR Metal/Roughness 4K</div>
        </div>
      </div>
    </div>
  </div>
`;

// ─── THREE.JS 3D SCENE SETUP ──────────────────────────────────────────────
const container = document.getElementById('canvas-container');
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.35;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.2, 5.5);

// ─── STUDIO LIGHTING ──────────────────────────────────────────────────────
const ambientLight = new THREE.AmbientLight(0x222638, 0.8);
scene.add(ambientLight);

// Key Directional Studio Light
const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
keyLight.position.set(4, 5, 4);
scene.add(keyLight);

// Cyan Rim Light (Highlights metallic edges and glass)
const cyanRimLight = new THREE.PointLight(0x00f0ff, 3.5, 20);
cyanRimLight.position.set(-3.5, 1.5, 2.5);
scene.add(cyanRimLight);

// Purple/Magenta Back Light
const purpleFillLight = new THREE.PointLight(0xbf5af2, 2.8, 18);
purpleFillLight.position.set(3, -2, -2);
scene.add(purpleFillLight);

// Dedicated AI Chip Core Light (Placed inside center of camera)
const chipCoreLight = new THREE.PointLight(0x00f0ff, 1.0, 6);
chipCoreLight.position.set(0, 0, 0.25);
scene.add(chipCoreLight);

// ─── SCENE OBJECTS ────────────────────────────────────────────────────────
// 1. Exploded Camera System with AI Chip
const explodedCamera = createExplodedCamera();
scene.add(explodedCamera.group);

// 2. Cosmic Quantum Particles & Optical Axis
const atmosphere = createAtmosphere(280);
scene.add(atmosphere);

// 3. AI Scan Radar Rings
const scanRings = createScanRings();
scene.add(scanRings);

// ─── LOADING SIMULATION ───────────────────────────────────────────────────
const loadingBar = document.getElementById('loading-bar');
const loadingScreen = document.getElementById('loading-screen');
let progressVal = 0;

function runLoading() {
  progressVal += Math.random() * 25 + 10;
  if (progressVal >= 100) {
    progressVal = 100;
    loadingBar.style.width = '100%';
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      animateHeroEntrance();
    }, 450);
    return;
  }
  loadingBar.style.width = progressVal + '%';
  setTimeout(runLoading, 100 + Math.random() * 120);
}
setTimeout(runLoading, 200);

function animateHeroEntrance() {
  const tl = gsap.timeline();
  tl.from('.hero-badge', { y: 25, opacity: 0, duration: 0.7, ease: 'power3.out' })
    .from('.hero-title', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
    .from('.hero-subtitle', { y: 25, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .from('.hero-cta-group', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .from('.hero-specs', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3');
}

// ─── SCROLLTRIGGER ANIMATION SYSTEM ───────────────────────────────────────
const scrollState = { progress: 0 };

ScrollTrigger.create({
  trigger: '#app',
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    scrollState.progress = self.progress;
  },
});

// Reveal Story Cards on Scroll
document.querySelectorAll('[data-story]').forEach((el) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      end: 'top 30%',
      toggleActions: 'play none none reverse',
    },
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: 'power3.out',
  });
});

// ─── POSE SUGGESTION INTERACTIVE LOGIC ────────────────────────────────────
let currentPoseIndex = 0;
let isShowingSkeleton = false;

const poseTabsContainer = document.getElementById('pose-tabs');
const poseImgPhoto = document.getElementById('pose-img-photo');
const poseImgSkeleton = document.getElementById('pose-img-skeleton');
const poseVisualCard = document.getElementById('pose-visual-card');
const poseVisualBadgeText = document.getElementById('pose-visual-badge-text');
const poseNameEl = document.getElementById('pose-name');
const poseTagsEl = document.getElementById('pose-tags');
const poseMatchValEl = document.getElementById('pose-match-val');
const poseTipsEl = document.getElementById('pose-tips');
const aiLightingEl = document.getElementById('ai-lighting');
const aiCompositionEl = document.getElementById('ai-composition');
const aiMoodEl = document.getElementById('ai-mood');
const btnViewPhoto = document.getElementById('btn-view-photo');
const btnViewSkeleton = document.getElementById('btn-view-skeleton');
const btnTryPose = document.getElementById('btn-try-pose');

// Render Pose Tabs
POSE_SUGGESTIONS.forEach((pose, idx) => {
  const btn = document.createElement('button');
  btn.className = `pose-tab-btn ${idx === 0 ? 'active' : ''}`;
  btn.textContent = `${pose.category} • ${pose.title}`;
  btn.addEventListener('click', () => {
    switchPose(idx);
  });
  poseTabsContainer.appendChild(btn);
});

function switchPose(idx) {
  currentPoseIndex = idx;
  const pose = POSE_SUGGESTIONS[idx];

  // Update tabs active state
  document.querySelectorAll('.pose-tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === idx);
  });

  // Fade update
  poseVisualCard.style.transform = 'scale(0.96)';
  setTimeout(() => {
    poseImgPhoto.src = pose.photoUrl;
    poseImgSkeleton.src = pose.skeletonUrl;
    poseNameEl.textContent = pose.title;
    poseMatchValEl.textContent = `${pose.matchScore}%`;
    poseTipsEl.textContent = pose.tips;
    aiLightingEl.textContent = pose.aiAnalysis.lighting;
    aiCompositionEl.textContent = pose.aiAnalysis.composition;
    aiMoodEl.textContent = pose.aiAnalysis.mood;

    // Render tags
    poseTagsEl.innerHTML = pose.tags
      .map(tag => `<span class="pose-tag-chip">#${tag}</span>`)
      .join('');

    poseVisualCard.style.transform = 'scale(1)';
  }, 180);
}

// Initialise first pose
switchPose(0);

// Toggle Photo vs Skeleton
btnViewPhoto.addEventListener('click', () => {
  isShowingSkeleton = false;
  btnViewPhoto.classList.add('active');
  btnViewSkeleton.classList.remove('active');
  poseVisualCard.classList.remove('show-skeleton');
  poseVisualBadgeText.textContent = 'AI LIVE DETECTION';
});

btnViewSkeleton.addEventListener('click', () => {
  isShowingSkeleton = true;
  btnViewSkeleton.classList.add('active');
  btnViewPhoto.classList.remove('active');
  poseVisualCard.classList.add('show-skeleton');
  poseVisualBadgeText.textContent = 'MEDIAPIPE 33 KEYPOINTS ACTIVE';
});

btnTryPose.addEventListener('click', () => {
  const pose = POSE_SUGGESTIONS[currentPoseIndex];
  alert(`Đã nạp khung xương "${pose.title}" (Match ${pose.matchScore}%) vào buồng ngắm camera AI! Hãy hướng máy về mẫu để canh dáng.`);
});

// ─── VINTAGE GLTF VIEWER MODAL LOGIC ───────────────────────────────────────
const btnOpenVintage = document.getElementById('btn-open-vintage');
const btnCloseVintage = document.getElementById('btn-close-vintage');
const vintageModal = document.getElementById('vintage-modal');
const vintageCanvasHolder = document.getElementById('vintage-canvas-holder');
const vintageLoading = document.getElementById('vintage-loading');
const vintageBar = document.getElementById('vintage-bar');

let vintageRenderer, vintageScene, vintageCamera, vintageControls, vintageModelGroup;
let isVintageInitialized = false;

btnOpenVintage.addEventListener('click', () => {
  vintageModal.classList.add('active');
  if (!isVintageInitialized) {
    initVintageViewer();
  }
});

btnCloseVintage.addEventListener('click', () => {
  vintageModal.classList.remove('active');
});

function initVintageViewer() {
  isVintageInitialized = true;
  const width = vintageCanvasHolder.clientWidth || 800;
  const height = vintageCanvasHolder.clientHeight || 380;

  vintageRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  vintageRenderer.setSize(width, height);
  vintageRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  vintageRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  vintageCanvasHolder.appendChild(vintageRenderer.domElement);

  vintageScene = new THREE.Scene();
  vintageCamera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  vintageCamera.position.set(0, 0.8, 3.8);

  // Lights for Vintage scene
  const vAmb = new THREE.AmbientLight(0xffffff, 1.2);
  vintageScene.add(vAmb);
  const vDir = new THREE.DirectionalLight(0xfff5e6, 2.5);
  vDir.position.set(3, 5, 4);
  vintageScene.add(vDir);
  const vGold = new THREE.PointLight(0xffd152, 2.0, 10);
  vGold.position.set(-2, 1, 2);
  vintageScene.add(vGold);

  vintageControls = new OrbitControls(vintageCamera, vintageRenderer.domElement);
  vintageControls.enableDamping = true;
  vintageControls.autoRotate = true;
  vintageControls.autoRotateSpeed = 2.0;

  // Load AntiqueCamera.glb
  loadAntiqueCamera((percent) => {
    vintageBar.style.width = `${Math.min(100, Math.round(percent))}%`;
  })
    .then((modelGroup) => {
      vintageModelGroup = modelGroup;
      vintageModelGroup.visible = true;
      vintageScene.add(vintageModelGroup);
      vintageLoading.style.display = 'none';
    })
    .catch((err) => {
      console.warn(err);
      vintageLoading.innerHTML = `<div style="color: #ff453a;">Chưa thể tải model GLTF: ${err.message}</div>`;
    });

  function renderVintage() {
    requestAnimationFrame(renderVintage);
    if (vintageControls) vintageControls.update();
    if (vintageRenderer && vintageScene && vintageCamera) {
      vintageRenderer.render(vintageScene, vintageCamera);
    }
  }
  renderVintage();
}

// ─── MAIN RENDER LOOP ─────────────────────────────────────────────────────
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();
  const progress = scrollState.progress;

  // 1. Update Exploded Camera Model & AI Chip
  explodedCamera.update(progress, elapsed);

  // 2. Adjust PointLight at center chip according to scroll focus
  const isAiSection = progress >= 0.55 && progress <= 0.88;
  const chipIntensity = isAiSection
    ? 4.5 + Math.sin(elapsed * 8) * 1.5
    : 1.0;
  chipCoreLight.intensity = chipIntensity;
  chipCoreLight.color.setHex(progress > 0.75 ? 0xbf5af2 : 0x00f0ff);

  // 3. Move main Camera along subtle cinematic curve
  // During AI chip focus (progress ~0.65-0.80), zoom closer into the center!
  if (progress >= 0.55 && progress <= 0.85) {
    const zoomT = Math.sin(((progress - 0.55) / 0.3) * Math.PI);
    camera.position.z = 5.5 - zoomT * 1.6; // Zooms closer to chip!
    camera.position.y = 0.2 + zoomT * 0.1;
  } else {
    camera.position.z = 5.5;
    camera.position.y = 0.2;
  }

  // 4. Subtle camera float
  camera.position.x = Math.sin(elapsed * 0.4) * 0.08;
  camera.lookAt(0, 0.1, 0);

  // 5. Rotate Atmosphere & Radar Rings
  atmosphere.rotation.y = elapsed * 0.03 + progress * 0.5;
  scanRings.rotation.z = elapsed * 0.15;
  const radar1 = scanRings.getObjectByName('radarRing1');
  const radar2 = scanRings.getObjectByName('radarRing2');
  if (radar1) radar1.scale.setScalar(1 + Math.sin(elapsed * 2) * 0.05);
  if (radar2) radar2.scale.setScalar(1 + Math.cos(elapsed * 2.5) * 0.05);

  renderer.render(scene, camera);
}

animate();

// ─── RESIZE HANDLER ───────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
