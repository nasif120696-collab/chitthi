// ==========================================================================
// CHITTHI (চিঠি) - Unified Postal Navbar & 3D Z-Axis Fly-Through Portal
// ==========================================================================
import { toggleLang, getLang, t } from "./i18n.js";
import { soundEngine, setupGlobalMusicControls } from "./audio.js";

let hasNativeGuideModal = false;

function cleanupStuckTransitions() {
  const stuck1 = document.getElementById("chitthi-page-flip-sheet");
  const stuck2 = document.getElementById("chitthi-3d-book-transition");
  if (stuck1) stuck1.remove();
  if (stuck2) stuck2.remove();
  document.body.classList.remove(
    "page-turning-out",
    "flipping-forward",
    "page-fading-out",
    "portal-exit"
  );
}

function openFallbackGuideModal() {
  const existingModal = document.querySelector(".modal-backdrop.guide-modal, #guide-modal");
  if (existingModal) {
    existingModal.classList.add("show");
    return;
  }

  let fallbackModal = document.getElementById("chitthi-quick-guide-modal");
  if (!fallbackModal) {
    fallbackModal = document.createElement("div");
    fallbackModal.id = "chitthi-quick-guide-modal";
    fallbackModal.className = "modal-backdrop";
    fallbackModal.innerHTML = `
      <div class="modal-card guide-modal-card">
        <div class="guide-modal-header">
          <div>
            <h3 class="serif-title" style="font-size:1.45rem; color:var(--gold-bright);">📖 কীভাবে চিঠি লিখবেন ও পাঠাবেন?</h3>
            <p style="font-size:0.86rem; color:var(--cream-aged); margin-top:0.2rem;">মাত্র ৪টি সহজ ধাপে আপনার অনুভূতির চিঠি পাঠান</p>
          </div>
          <button type="button" id="close-quick-guide-btn" class="pill-btn">✕ বন্ধ</button>
        </div>
        <div class="guide-steps-grid">
          <div class="guide-step-item">
            <div class="guide-step-num">১</div>
            <div>
              <div class="guide-step-heading">রাইটিং ডেস্কে চিঠি লিখুন</div>
              <div class="guide-step-desc">‘চিঠি লিখুন’ পেজে গিয়ে প্রাপকের নাম, ঠিকানা ও মনের কথা লিখুন। চাইলে একাধিক পাতা ও ভয়েস নোট জুড়তে পারবেন।</div>
            </div>
          </div>
          <div class="guide-step-item">
            <div class="guide-step-num">২</div>
            <div>
              <div class="guide-step-heading">কাগজ, মোমের সিল ও গান সাজান</div>
              <div class="guide-step-desc">পছন্দের কাগজের থিম, ফন্ট, কালি, মোমের সিলের রং ও পছন্দের গান বেছে নিন।</div>
            </div>
          </div>
          <div class="guide-step-item">
            <div class="guide-step-num">৩</div>
            <div>
              <div class="guide-step-heading">লিংক শেয়ার ও গোপন কোড সংরক্ষণ</div>
              <div class="guide-step-desc">‘মোমের সিল দিয়ে চিঠি পাঠান’ চাপলেই একটি লিংক ও গোপন #BD কোড পাবেন। লিংকটি প্রাপককে দিন।</div>
            </div>
          </div>
          <div class="guide-step-item">
            <div class="guide-step-num">৪</div>
            <div>
              <div class="guide-step-heading">সিল ভেঙে পড়া ও গোপন উত্তর দেখা</div>
              <div class="guide-step-desc">প্রাপক খাম ছিঁড়ে ও মোম গলিয়ে চিঠি পড়ে গোপন উত্তর দিতে পারবে, যা আপনি ‘গোপন কোড’ পেজে দেখতে পাবেন।</div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(fallbackModal);
    fallbackModal.addEventListener("click", (ev) => {
      if (ev.target === fallbackModal || ev.target.id === "close-quick-guide-btn") {
        fallbackModal.classList.remove("show");
      }
    });
  }
  fallbackModal.classList.add("show");
}

export function initUnifiedNavbar(activePage = "home") {
  cleanupStuckTransitions();
  window.addEventListener("pageshow", cleanupStuckTransitions);

  const existingNav = document.querySelector("header.postal-nav");
  const navWrapper = document.createElement("header");
  navWrapper.className = "postal-nav unified-postal-header";

  navWrapper.innerHTML = `
    <div class="nav-primary-row">
      <a href="index.html" class="brand-logo" data-page-flip>
        <img src="assets/chitthi-logo.png" alt="Chitthi Emblem" class="brand-logo-img" />
        <div class="brand-text-wrap">
          <span class="brand-name" data-i18n="brand_name">চিঠি</span>
          <span class="brand-sub" data-i18n="brand_sub">অনুভূতির ডাকঘর</span>
        </div>
      </a>

      <nav class="nav-links" aria-label="Main Navigation">
        <a href="index.html" data-page-flip class="nav-link ${activePage === "home" ? "active" : ""}" data-i18n="nav_home">ডাকঘর</a>
        <a href="write.html" data-page-flip class="nav-link ${activePage === "write" ? "active" : ""}" data-i18n="nav_write">চিঠি লিখুন</a>
        <a href="postbox.html" data-page-flip class="nav-link ${activePage === "postbox" ? "active" : ""}" data-i18n="nav_postbox">পোস্টবক্স ও উৎসব</a>
        <a href="postbox.html#track" data-page-flip class="nav-link ${activePage === "track" ? "active" : ""}" data-i18n="nav_track">গোপন কোড</a>
        <a href="#how-to-send" class="nav-link" data-open-guide="direct" data-i18n="nav_guide">নির্দেশিকা</a>
      </nav>

      <div class="nav-controls">
        <button id="sound-toggle-btn" class="pill-btn" type="button">🎵 <span data-i18n="sound_off">আবহ সঙ্গীত</span></button>
        <button id="lang-toggle-btn" class="pill-btn" type="button">বাংলা | EN</button>
      </div>
    </div>

    <div class="nav-utility-ribbon">
      <div class="ribbon-left">
        <span class="ribbon-tag">📮 ডাকঘর স্টুডিও</span>
        <select id="unified-bg-theme-select" class="ribbon-select" title="পেজের ব্যাকগ্রাউন্ড থিম">
          <option value="default">🎨 থিম: ওয়ালনাট ডেস্ক</option>
          <option value="bg-art-chitthi-box">📮 চিঠি বক্স (১১.১১)</option>
          <option value="bg-art-sunlit-window">🪟 রোদেলা জানালা</option>
          <option value="bg-art-calcutta-postbox">🏛️ পুরনো ডাকবাক্স</option>
          <option value="bg-art-kundakali">🌿 কুন্দকলি দেয়াল</option>
          <option value="bg-art-vintage-tv">📺 রেট্রো বাংলাদেশ</option>
        </select>
      </div>

      <div class="ribbon-right">
        <button id="unified-light-btn" class="ribbon-btn" type="button">🕯️ আলো: উজ্জ্বল</button>
        <button id="unified-intro-btn" class="ribbon-btn" type="button" data-i18n="replay_intro">✨ ইন্ট্রো দেখুন</button>
      </div>
    </div>
  `;

  if (existingNav) {
    existingNav.replaceWith(navWrapper);
  } else {
    document.body.insertBefore(navWrapper, document.body.firstChild);
  }

  let refreshMusicUI = () => {};
  try {
    const musicCtrl = setupGlobalMusicControls(getLang, t);
    if (musicCtrl && typeof musicCtrl.refreshUI === "function") {
      refreshMusicUI = musicCtrl.refreshUI;
    }
  } catch (err) {
    console.warn("Music controls skipped:", err);
  }

  // ডাইনামিক ইমপোর্ট: আসল guide-modal.js থাকলে ফ্ল্যাগ true হবে এবং ফলব্যাক আর দেখাবে না
  import("./guide-modal.js")
    .then((m) => {
      if (typeof m.initTutorialGuide === "function") {
        m.initTutorialGuide();
        hasNativeGuideModal = true;
      }
    })
    .catch(() => {});

  const langBtn = document.getElementById("lang-toggle-btn");
  if (langBtn && !langBtn.dataset.bound) {
    langBtn.dataset.bound = "1";
    langBtn.addEventListener("click", () => {
      toggleLang();
      refreshMusicUI();
    });
  }

  const bgSel = document.getElementById("unified-bg-theme-select");
  const bgClasses = [
    "bg-art-chitthi-box",
    "bg-art-sunlit-window",
    "bg-art-calcutta-postbox",
    "bg-art-kundakali",
    "bg-art-vintage-tv"
  ];
  const savedBg = localStorage.getItem("chitthi_bg_theme") || "default";
  if (savedBg !== "default") {
    document.body.classList.add(savedBg);
    bgSel.value = savedBg;
  }
  bgSel.addEventListener("change", () => {
    document.body.classList.remove(...bgClasses);
    if (bgSel.value !== "default") document.body.classList.add(bgSel.value);
    localStorage.setItem("chitthi_bg_theme", bgSel.value);
  });

  let roomDimmed = localStorage.getItem("chitthi_room_dim") === "1";
  const lightBtn = document.getElementById("unified-light-btn");
  const syncLightUI = () => {
    document.body.classList.toggle("candle-dim-mode", roomDimmed);
    lightBtn.textContent = roomDimmed ? "🕯️ আলো: মোমবাতি" : "🕯️ আলো: উজ্জ্বল";
    const candleLabel = document.getElementById("candle-label");
    if (candleLabel) candleLabel.textContent = roomDimmed ? "আলো জ্বালান" : "আলো নিভান";
  };
  syncLightUI();
  lightBtn.addEventListener("click", () => {
    roomDimmed = !roomDimmed;
    localStorage.setItem("chitthi_room_dim", roomDimmed ? "1" : "0");
    syncLightUI();
  });

  document.getElementById("unified-intro-btn").addEventListener("click", () => {
    sessionStorage.removeItem("chitthi_intro_seen");
    if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
      window.location.reload();
    } else {
      navigateWithPageFlip("index.html");
    }
  });

  // 3D WebGL ওয়ার্ল্ড চালু করা হচ্ছে
  import("./scene3d.js")
    .then((m) => m.initChitthi3DWorld(activePage))
    .catch((err) => console.warn("3D scene skipped:", err));

  setupPortalTransitions();
  return { refreshMusicUI };
}

export function navigateWithPageFlip(targetUrl) {
  cleanupStuckTransitions();
  try { soundEngine.playPaperRustle(); } catch (_) {}

  sessionStorage.setItem("chitthi_portal_arrival", "1");

  if (window.chitthi3D && typeof window.chitthi3D.flyThroughOut === "function") {
    window.chitthi3D.flyThroughOut();
  }
  document.body.classList.add("portal-exit");

  setTimeout(() => {
    window.location.href = targetUrl;
  }, 420);
}

function setupPortalTransitions() {
  const arrivedViaPortal = sessionStorage.getItem("chitthi_portal_arrival") === "1";
  if (arrivedViaPortal) {
    sessionStorage.removeItem("chitthi_portal_arrival");
  }

  document.body.classList.remove("portal-exit");
  document.body.classList.add(arrivedViaPortal ? "portal-enter" : "page-fading-in");
  setTimeout(() => {
    document.body.classList.remove("portal-enter", "page-fading-in");
  }, 620);

  if (document.documentElement.dataset.chitthiNavBound) return;
  document.documentElement.dataset.chitthiNavBound = "1";

  document.addEventListener("click", (e) => {
    // ১. নির্দেশিকা বাটন ক্লিক হ্যান্ডলার (আসল guide-modal.js থাকলে ফলব্যাক দেখাবে না)
    const guideTrigger = e.target.closest("[data-open-guide]");
    if (guideTrigger) {
      if (hasNativeGuideModal) return;
      e.preventDefault();
      openFallbackGuideModal();
      return;
    }

    // ২. পেজ লিংক ও 3D পোর্টাল ফ্লাই-থ্রু হ্যান্ডলার
    const link = e.target.closest("a");
    if (!link) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http")) return;

    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    const [targetPath, targetHash] = href.split("#");
    const targetFile = targetPath.split("?")[0];

    if (targetFile === currentFile && !href.includes("?")) {
      if (targetHash) {
        e.preventDefault();
        window.location.hash = targetHash;
        const targetEl = document.getElementById(targetHash);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
          targetEl.classList.add("track-highlight");
          setTimeout(() => targetEl.classList.remove("track-highlight"), 1800);
        }
        const trackInput = document.getElementById("track-code-input");
        if (targetHash === "track" && trackInput) trackInput.focus();
      }
      return;
    }

    e.preventDefault();
    navigateWithPageFlip(href);
  });
}