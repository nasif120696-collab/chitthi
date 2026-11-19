// ==========================================================================
// CHITTHI (চিঠি) — Unified Postal Navbar & Safe 3D Page-Turn Transition
// ==========================================================================
import { toggleLang, getLang, t } from "./i18n.js";
import { soundEngine, setupGlobalMusicControls } from "./audio.js";
import { initTutorialGuide } from "./guide-modal.js";

export function initUnifiedNavbar(activePage = "home") {
  // আগের কোনো আটকে থাকা কার্টেন ওভারলে থাকলে সাথে সাথে মুছে ফেলবে
  const oldCurtain = document.getElementById("chitthi-page-flip-sheet");
  if (oldCurtain) oldCurtain.remove();
  document.body.classList.remove("page-turning-out", "flipping-forward");

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

  const { refreshUI: refreshMusicUI } = setupGlobalMusicControls(getLang, t);
  try { initTutorialGuide(); } catch (_) {}

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

  setupPageFlipTransitions();
  return { refreshMusicUI };
}

export function navigateWithPageFlip(targetUrl) {
  let overlay = document.getElementById("chitthi-page-flip-sheet");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "chitthi-page-flip-sheet";
    overlay.className = "page-flip-curtain";
    overlay.innerHTML = `
      <div class="page-flip-crease"></div>
      <div class="page-flip-emblem">চিঠি • CHITTHI</div>
    `;
    document.body.appendChild(overlay);
  }

  soundEngine.playPaperRustle();
  document.body.classList.add("page-turning-out");
  overlay.classList.add("flipping-forward");

  setTimeout(() => {
    window.location.href = targetUrl;
  }, 420);
}

function setupPageFlipTransitions() {
  document.body.classList.add("page-turning-in");
  setTimeout(() => {
    document.body.classList.remove("page-turning-in");
  }, 550);

  document.querySelectorAll("a[data-page-flip]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      const currentFile = window.location.pathname.split("/").pop() || "index.html";
      if (href === currentFile) return;

      e.preventDefault();
      navigateWithPageFlip(href);
    });
  });
}