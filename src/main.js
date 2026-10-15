import './style.css';
import {
  createIcons,
  ArrowRight, CircleCheck, Coffee, Frown, Grid3x3, Images, Image as ImageIcon, Layers,
  Lightbulb, MessageCircleQuestion, PersonStanding, ScanSearch, Smartphone, Smile,
  Sparkles, Sun, Trees, Users, Waves, Wifi, BatteryFull, SignalHigh, Download, Mail,
} from 'lucide';
import { POSE_SUGGESTIONS } from './poseData.js';

const ICONS = {
  ArrowRight, CircleCheck, Coffee, Frown, Grid3x3, Images, Image: ImageIcon, Layers,
  Lightbulb, MessageCircleQuestion, PersonStanding, ScanSearch, Smartphone, Smile,
  Sparkles, Sun, Trees, Users, Waves, Wifi, BatteryFull, SignalHigh, Download, Mail,
};
const renderIcons = () => createIcons({ icons: ICONS, attrs: { 'stroke-width': 1.9 } });

// The phone demo walks through one real café suggestion (pose photo + its outline line up 1:1)
const DEMO = [
  { photo: '/poses/ca-phe/nu/16-photo.jpg', outline: '/poses/ca-phe/nu/16-skeleton.png' },
  { photo: '/poses/ca-phe/nu/17-photo.jpg' },
  { photo: '/poses/ca-phe/nu/03-photo.png' },
];

const HERO_PHOTOS = [
  { src: '/poses/bien/nu/39-photo.png', label: 'Biển' },
  { src: '/poses/selfie/nam/21-photo.jpg', label: 'Selfie' },
  { src: '/poses/cong-vien/nu/34-photo.jpg', label: 'Công viên' },
  { src: '/poses/ca-phe/nam/14-photo.jpg', label: 'Cà phê' },
];

const STEPS = [
  {
    pill: 'Chạm ✦ để AI gợi ý pose',
    title: 'Mở app là vào camera',
    body: 'Không có màn hình chờ hay menu. Nút ↻ để đổi camera trước/sau, chụm hai ngón để chuyển giữa ống 0.5x, 1x và tele.',
  },
  {
    pill: 'Cà phê · Nữ',
    loadingPill: 'Đang tìm pose…',
    title: 'Chạm ✦, nhận 3 pose hợp cảnh',
    body: 'SnapPose nhận ra bạn đang ở biển, công viên, quán cà phê hay đang selfie, rồi gợi ý ngay 3 pose hợp với khung cảnh. Chưa ưng thì chạm ✦ lần nữa để xem thêm.',
  },
  {
    pill: 'Cà phê · Nữ',
    title: 'Đứng vào khung viền',
    body: 'Đường viền của pose hiện ngay trên camera. Phóng to hoặc thu nhỏ khung cho vừa khoảng cách, người được chụp chỉ việc khớp theo.',
  },
  {
    pill: 'Cà phê · Nữ',
    title: 'Bấm chụp',
    body: 'Ảnh lưu vào thư viện máy và mục Bộ sưu tập trong app.',
  },
];

const FANPAGE_URL = 'https://www.facebook.com/profile.php?id=61594910879604';
const FB_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" class="fb-icon"><path fill="currentColor" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>';

const app = document.getElementById('app');

app.innerHTML = `
  <nav class="navbar" id="navbar">
    <a href="#top" class="nav-brand">
      <img src="/logo.png" alt="" class="nav-logo-img" width="36" height="36" />
      <span class="nav-logo">SnapPose</span>
    </a>
    <ul class="nav-links">
      <li><a href="#story">Cách hoạt động</a></li>
      <li><a href="#inside">Công nghệ</a></li>
      <li><a href="#explore">Thử pose</a></li>
    </ul>
    <div class="nav-actions">
      <a href="#cta" class="nav-cta"><i data-lucide="download"></i>Dùng thử APK</a>
    </div>
  </nav>

  <!-- HERO -->
  <header class="hero" id="top">
    <div class="hero-inner">
      <div class="hero-copy">
        <div class="eyebrow-pill"><i data-lucide="sparkles"></i>Gợi ý tạo dáng ngay trên camera</div>
        <h1 class="hero-title">Hết lúng túng<br/>trước <span class="ink-gradient">ống kính.</span></h1>
        <p class="hero-subtitle">SnapPose nhận ra bạn đang ở đâu, gợi ý dáng chụp hợp cảnh và hiện khung viền ngay trên camera để bạn đứng theo.</p>
        <div class="hero-cta-group">
          <a href="#story" class="btn btn-primary">Xem cách hoạt động<i data-lucide="arrow-right"></i></a>
          <a href="#cta" class="btn btn-ghost"><i data-lucide="download"></i>Dùng thử bản APK</a>
        </div>
        <div class="hero-facts">
          <div><strong>131</strong><span>pose mẫu</span></div>
          <div><strong>4</strong><span>bối cảnh</span></div>
          <div><strong>1 chạm</strong><span>để nhận gợi ý</span></div>
        </div>
      </div>
      <div class="hero-photos" aria-hidden="true">
        ${HERO_PHOTOS.map((p, i) => `
          <figure class="hero-photo hp-${i}">
            <img src="${p.src}" alt="" />
            <figcaption>${p.label}</figcaption>
          </figure>`).join('')}
      </div>
    </div>
  </header>

  <!-- CHAPTER 0: THE PROBLEM -->
  <section class="chapter problem" id="problem">
    <div class="container">
      <div class="chapter-head" data-reveal>
        <span class="chapter-num">Vấn đề</span>
        <h2>Đứng trước ống kính mà <span class="ink-pink">không biết làm gì?</span></h2>
        <p>Cảnh đẹp, máy tốt, nhưng tay để đâu, mặt nhìn hướng nào thì không ai chỉ.</p>
      </div>
      <div class="problem-grid">
        <div class="problem-card" data-reveal>
          <div class="icon-tile tile-pink"><i data-lucide="frown"></i></div>
          <h3>Không biết tạo dáng</h3>
          <p>Đứng thẳng, cười gượng, tay buông thõng. Chụp mười tấm thì mười tấm giống nhau.</p>
        </div>
        <div class="problem-card" data-reveal>
          <div class="icon-tile tile-blue"><i data-lucide="message-circle-question"></i></div>
          <h3>Người chụp cũng không biết chỉ</h3>
          <p>“Sang trái chút… không, phải chút…”. Chỉ dáng bằng lời rất khó.</p>
        </div>
        <div class="problem-card" data-reveal>
          <div class="icon-tile tile-pink"><i data-lucide="images"></i></div>
          <h3>Chụp nhiều, ưng ít</h3>
          <p>Lướt cả album mới chọn được một tấm tạm ổn.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CHAPTERS 1-5: SCROLLYTELLING WITH PHONE -->
  <section class="story" id="story">
    <div class="container">
      <div class="chapter-head" data-reveal>
        <span class="chapter-num">Cách hoạt động</span>
        <h2>Từ lúc mở app <span class="ink-blue">đến lúc bấm chụp</span></h2>
        <p>Cuộn xuống để xem từng bước.</p>
      </div>

      <div class="story-grid">
        <div class="story-stage">
          <div class="phone" id="phone" data-step="0">
            <div class="ph-screen">
              <img class="ph-photo" src="${DEMO[0].photo}" alt="" />
              <!-- Same person before lining up with the outline (AI-edited from the pose photo) -->
              <img class="ph-photo ph-before" src="/demo/before.webp" alt="" />
              <img class="ph-outline" src="${DEMO[0].outline}" alt="" />
              <div class="ph-flash"></div>

              <div class="ph-top">
                <div class="ph-status">
                  <span>9:41</span>
                  <span class="ph-status-icons"><i data-lucide="signal-high"></i><i data-lucide="wifi"></i><i data-lucide="battery-full"></i></span>
                </div>
                <div class="ph-head">
                  <span class="ph-app">SnapPose</span>
                  <span class="ph-pill"><span class="dot"></span><span id="ph-pill-text">${STEPS[0].pill}</span></span>
                </div>
              </div>

              <div class="ph-scale"><span>+</span><b>100%</b><span>−</span></div>

              <div class="ph-dock">
                <div class="ph-zoom">1x</div>
                <div class="ph-strip">
                  <div class="ph-strip-head">
                    <b>Gợi ý</b><small>3 pose</small><span class="ph-clear">↺ Xóa</span>
                  </div>
                  <div class="ph-tiles">
                    ${DEMO.map((d, i) => `
                      <div class="ph-thumb ${i === 0 ? 'on' : ''}" style="--d:${i * 90}ms">
                        <img src="${d.photo}" alt="" /><span>${i + 1}</span>
                      </div>`).join('')}
                  </div>
                </div>
                <div class="ph-notice">Đã lưu vào thư viện ảnh</div>
                <div class="ph-controls">
                  <div class="ph-gallery"><span>▦</span><img src="${DEMO[0].photo}" alt="" /></div>
                  <div class="ph-center">
                    <div class="ph-ai"><span class="ph-ai-icon">✦</span><span class="ph-spinner"></span></div>
                    <div class="ph-shutter"><span></span></div>
                  </div>
                  <div class="ph-flip">↻</div>
                </div>
              </div>
            </div>
          </div>
          <div class="stage-progress" id="stage-progress">
            ${STEPS.map((_, i) => `<span class="${i === 0 ? 'on' : ''}"></span>`).join('')}
          </div>
          <div class="stage-caption" id="stage-caption" aria-live="polite">
            <span class="step-num" id="cap-num">01</span>
            <h3 id="cap-title">${STEPS[0].title}</h3>
            <p id="cap-body">${STEPS[0].body}</p>
          </div>
        </div>

        <div class="story-steps">
          ${STEPS.map((s, i) => `
            <article class="step ${i === 0 ? 'active' : ''}" data-step="${i}">
              <div class="step-card">
                <span class="step-num">0${i + 1}</span>
                <h3>${s.title}</h3>
                <p>${s.body}</p>
              </div>
            </article>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- INSIDE: HOW IT WORKS -->
  <section class="chapter inside" id="inside">
    <div class="container">
      <div class="chapter-head" data-reveal>
        <span class="chapter-num">Công nghệ</span>
        <h2>Gợi ý <span class="ink-blue">đúng cảnh, đúng người</span></h2>
        <p>Không cần chọn tay hay gõ tìm, chạm ✦ là xong.</p>
      </div>
      <div class="inside-flow">
        <div class="inside-card" data-reveal>
          <div class="icon-tile tile-blue"><i data-lucide="scan-search"></i></div>
          <h3>Hiểu bạn đang ở đâu</h3>
          <p>Biển, công viên, quán cà phê hay đang selfie, SnapPose tự nhận ra khung cảnh trước mặt bạn.</p>
        </div>
        <div class="inside-card" data-reveal>
          <div class="icon-tile tile-pink"><i data-lucide="users"></i></div>
          <h3>Hợp với người được chụp</h3>
          <p>Chỉ gợi ý những dáng hợp với người đứng trước ống kính, không phải lướt qua pose không dành cho mình.</p>
        </div>
        <div class="inside-card" data-reveal>
          <div class="icon-tile tile-blue"><i data-lucide="layers"></i></div>
          <h3>Pose hợp nhất lên trước</h3>
          <p>Mỗi lần chạm ✦ là 3 pose hợp cảnh nhất. Muốn thêm thì chạm tiếp.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- POSE EXPLORER -->
  <section class="chapter explore" id="explore">
    <div class="container">
      <div class="chapter-head" data-reveal>
        <span class="chapter-num">Pose gợi ý</span>
        <h2>Xem trước một vài <span class="ink-pink">pose gợi ý</span></h2>
        <p>Bấm “Khung viền” để xem đúng thứ hiện trên camera khi chụp.</p>
      </div>

      <div class="explore-box" data-reveal>
        <div class="pose-tabs" id="pose-tabs" role="tablist"></div>

        <div class="pose-showcase">
          <div class="pose-visual-card" id="pose-visual-card">
            <img src="" alt="Ảnh pose mẫu" class="pose-img-photo" id="pose-img-photo" />
            <img src="" alt="Khung viền pose" class="pose-img-skeleton" id="pose-img-skeleton" />
            <div class="pose-view-toggle">
              <button class="pose-view-btn active" id="btn-view-photo"><i data-lucide="image"></i>Ảnh mẫu</button>
              <button class="pose-view-btn" id="btn-view-skeleton"><i data-lucide="person-standing"></i>Khung viền</button>
            </div>
          </div>

          <div class="pose-info-pane">
            <div class="pose-meta-row">
              <span class="chip chip-blue" id="pose-category"></span>
              <span class="chip chip-pink" id="pose-gender"></span>
            </div>
            <h3 class="pose-name" id="pose-name"></h3>
            <div class="pose-tags-list" id="pose-tags"></div>

            <div class="pose-tips-box">
              <h4><i data-lucide="lightbulb"></i>Mẹo tạo dáng</h4>
              <p id="pose-tips"></p>
            </div>

            <div class="ai-diagnostic-block">
              <div class="ai-diag-item">
                <span class="label"><i data-lucide="sun"></i>Ánh sáng</span>
                <span class="val" id="ai-lighting"></span>
              </div>
              <div class="ai-diag-item">
                <span class="label"><i data-lucide="grid-3x3"></i>Bố cục</span>
                <span class="val" id="ai-composition"></span>
              </div>
              <div class="ai-diag-item">
                <span class="label"><i data-lucide="smile"></i>Cảm giác</span>
                <span class="val" id="ai-mood"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA + FOOTER -->
  <footer class="footer" id="cta">
    <div class="container">
      <div class="cta-box" data-reveal>
        <img src="/logo.png" alt="Logo SnapPose" class="cta-logo" width="88" height="88" />
        <h2>Dùng thử <span class="ink-gradient">bản APK</span></h2>
        <p>SnapPose đang chạy thử trên Android. Để lại email, bọn mình gửi link tải bản APK mới nhất cho bạn.</p>

        <form class="apk-form" id="apk-form" novalidate>
          <label class="apk-field">
            <i data-lucide="mail"></i>
            <input type="email" id="apk-email" name="email" placeholder="email@cua-ban.com" autocomplete="email" required />
          </label>
          <button type="submit" class="btn btn-primary"><i data-lucide="download"></i>Nhận bản APK</button>
        </form>
        <p class="apk-error" id="apk-error" role="alert"></p>
        <div class="apk-done" id="apk-done" role="status">
          <i data-lucide="circle-check"></i>
          <div>
            <b>Đã ghi nhận email</b>
            <span class="apk-done-email" id="apk-done-email"></span>
            <span>Link tải APK sẽ được gửi vào hộp thư của bạn.</span>
          </div>
        </div>


        <div class="store-label">Bản chính thức</div>
        <div class="store-buttons">
          <div class="store-btn" aria-disabled="true">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.53 2.66-.39 6.6 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.5zM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.67-.92 2.66.97.08 1.96-.49 2.56-1.21z"/></svg>
            <span><small>Sắp có trên</small>App Store</span>
          </div>
          <div class="store-btn" aria-disabled="true">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.6 2.2c-.23.24-.36.6-.36 1.07v17.46c0 .47.13.83.37 1.07l.06.05 9.78-9.78v-.23L3.66 2.15l-.06.05zm13.1 13.04-3.26-3.26v-.23l3.26-3.26.07.04 3.86 2.2c1.1.62 1.1 1.65 0 2.27l-3.86 2.2-.07.04zm.07-.04L13.44 11.87 3.6 21.8c.37.39.97.43 1.65.05l11.52-6.65m0-6.66L5.25 2.13c-.68-.38-1.28-.34-1.65.05l9.84 9.84 3.33-3.33z"/></svg>
            <span><small>Sắp có trên</small>Google Play</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-brand">
          <img src="/logo.png" alt="" width="24" height="24" />
          © 2026 SnapPose · NextWave Tech
        </div>
        <div class="footer-links">
          <a href="#story">Cách hoạt động</a>
          <a href="#explore">Thử pose</a>
          <a href="${FANPAGE_URL}" target="_blank" rel="noopener" class="footer-fb">${FB_ICON}Facebook</a>
        </div>
      </div>
    </div>
  </footer>
`;

renderIcons();

// ─── NAVBAR SHADOW ON SCROLL ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 12);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── REVEAL ON SCROLL ─────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

// ─── SCROLLYTELLING: STEP → PHONE STATE ───────────────────────────────────
const phone = document.getElementById('phone');
const pillText = document.getElementById('ph-pill-text');
const progressDots = document.querySelectorAll('#stage-progress span');
const steps = document.querySelectorAll('.step');
const caption = document.getElementById('stage-caption');
const capNum = document.getElementById('cap-num');
const capTitle = document.getElementById('cap-title');
const capBody = document.getElementById('cap-body');

let pillTimer;

function setStep(idx) {
  if (phone.dataset.step === String(idx)) return;
  phone.dataset.step = idx;
  // The suggest step briefly shows the app's "searching" state before the result
  clearTimeout(pillTimer);
  if (STEPS[idx].loadingPill) {
    pillText.textContent = STEPS[idx].loadingPill;
    pillTimer = setTimeout(() => { pillText.textContent = STEPS[idx].pill; }, 900);
  } else {
    pillText.textContent = STEPS[idx].pill;
  }
  steps.forEach((s, i) => s.classList.toggle('active', i === idx));
  progressDots.forEach((d, i) => d.classList.toggle('on', i <= idx));
  capNum.textContent = `0${idx + 1}`;
  capTitle.textContent = STEPS[idx].title;
  capBody.textContent = STEPS[idx].body;
  caption.classList.remove('swap');
  void caption.offsetWidth; // restart the fade-in
  caption.classList.add('swap');
}

const stepObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) setStep(Number(entry.target.dataset.step));
  });
}, { rootMargin: '-45% 0px -45% 0px' });
steps.forEach((s) => stepObserver.observe(s));

// ─── APK TRIAL FORM (mock: nothing is sent yet) ───────────────────────────
const apkForm = document.getElementById('apk-form');
const apkEmail = document.getElementById('apk-email');
const apkError = document.getElementById('apk-error');
const apkDone = document.getElementById('apk-done');

apkForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = apkEmail.value.trim();
  if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(email)) {
    apkError.textContent = 'Email chưa đúng định dạng, bạn kiểm tra lại nhé.';
    apkEmail.focus();
    return;
  }
  // TODO: send the email to a real signup endpoint once one exists
  apkError.textContent = '';
  document.getElementById('apk-done-email').textContent = email;
  apkForm.classList.add('hidden');
  apkDone.classList.add('show');
});

// ─── POSE EXPLORER ────────────────────────────────────────────────────────
const poseTabsContainer = document.getElementById('pose-tabs');
const poseImgPhoto = document.getElementById('pose-img-photo');
const poseImgSkeleton = document.getElementById('pose-img-skeleton');
const poseVisualCard = document.getElementById('pose-visual-card');
const poseNameEl = document.getElementById('pose-name');
const poseCategoryEl = document.getElementById('pose-category');
const poseGenderEl = document.getElementById('pose-gender');
const poseTagsEl = document.getElementById('pose-tags');
const poseTipsEl = document.getElementById('pose-tips');
const aiLightingEl = document.getElementById('ai-lighting');
const aiCompositionEl = document.getElementById('ai-composition');
const aiMoodEl = document.getElementById('ai-mood');
const btnViewPhoto = document.getElementById('btn-view-photo');
const btnViewSkeleton = document.getElementById('btn-view-skeleton');

POSE_SUGGESTIONS.forEach((pose, idx) => {
  const btn = document.createElement('button');
  btn.className = `pose-tab-btn ${idx === 0 ? 'active' : ''}`;
  btn.setAttribute('role', 'tab');
  btn.innerHTML = `<i data-lucide="${pose.icon}"></i><span>${pose.title}</span>`;
  btn.addEventListener('click', () => switchPose(idx));
  poseTabsContainer.appendChild(btn);
});
renderIcons();

function switchPose(idx) {
  const pose = POSE_SUGGESTIONS[idx];

  document.querySelectorAll('.pose-tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === idx);
  });

  poseVisualCard.classList.add('swapping');
  setTimeout(() => {
    poseImgPhoto.src = pose.photoUrl;
    poseImgSkeleton.src = pose.skeletonUrl;
    poseNameEl.textContent = pose.title;
    poseCategoryEl.textContent = pose.category;
    poseGenderEl.textContent = pose.gender;
    poseTipsEl.textContent = pose.tips;
    aiLightingEl.textContent = pose.aiAnalysis.lighting;
    aiCompositionEl.textContent = pose.aiAnalysis.composition;
    aiMoodEl.textContent = pose.aiAnalysis.mood;
    poseTagsEl.innerHTML = pose.tags
      .map(tag => `<span class="pose-tag-chip">#${tag}</span>`)
      .join('');
    poseVisualCard.classList.remove('swapping');
  }, 180);
}

switchPose(0);

btnViewPhoto.addEventListener('click', () => {
  btnViewPhoto.classList.add('active');
  btnViewSkeleton.classList.remove('active');
  poseVisualCard.classList.remove('show-skeleton');
});

btnViewSkeleton.addEventListener('click', () => {
  btnViewSkeleton.classList.add('active');
  btnViewPhoto.classList.remove('active');
  poseVisualCard.classList.add('show-skeleton');
});
