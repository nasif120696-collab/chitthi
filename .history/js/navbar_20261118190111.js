export function navigateWithPageFlip(targetUrl, pageTitle = "পরবর্তী পাতা...") {
  // আগের কোনো ওভারলে থাকলে আগে মুছে ফেলুন
  const old = document.getElementById("chitthi-3d-book-transition");
  if (old) old.remove();

  const bookOverlay = document.createElement("div");
  bookOverlay.id = "chitthi-3d-book-transition";
  bookOverlay.className = "chitthi-book-overlay";
  bookOverlay.innerHTML = `
    <div class="chitthi-3d-leaf" id="chitthi-active-leaf">
      <div class="leaf-face leaf-front">
        <div class="leaf-spine-shadow"></div>
        <div class="leaf-stamp-mark">চিঠি • CHITTHI</div>
        <div class="leaf-status-text">পাতা উল্টানো হচ্ছে...</div>
      </div>
      <div class="leaf-face leaf-back">
        <div class="leaf-spine-shadow-back"></div>
        <div class="leaf-stamp-mark">অনুভূতির ডাকঘর</div>
        <div class="leaf-status-text">${pageTitle}</div>
      </div>
    </div>
  `;
  document.body.appendChild(bookOverlay);

  soundEngine.playPaperRustle();

  // পরের ফ্রেমে 3D ভাঁজ ও উল্টানোর অ্যানিমেশন শুরু হবে
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const leaf = document.getElementById("chitthi-active-leaf");
      if (leaf) leaf.classList.add("flipped");
    });
  });

  setTimeout(() => {
    window.location.href = targetUrl;
  }, 680);
}

function cleanupStuckTransitions() {
  const stuck1 = document.getElementById("chitthi-page-flip-sheet");
  const stuck2 = document.getElementById("chitthi-3d-book-transition");
  if (stuck1) stuck1.remove();
  if (stuck2) stuck2.remove();
  document.body.classList.remove("page-turning-out", "flipping-forward");
}

function setupPageFlipTransitions() {
  // পেজ লোড বা ব্রাউজার ব্যাক বাটন (bfcache) চাপলে সাথে সাথে ওভারলে রিমুভ হবে
  cleanupStuckTransitions();
  window.addEventListener("pageshow", cleanupStuckTransitions);

  document.body.classList.add("page-turning-in");
  setTimeout(() => {
    document.body.classList.remove("page-turning-in");
  }, 550);

  document.querySelectorAll("a[data-page-flip]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const currentFile = window.location.pathname.split("/").pop() || "index.html";
      const targetFile = href.split("#")[0];
      if (targetFile === currentFile) return;

      e.preventDefault();
      const label = link.textContent.trim() || "চিঠি • CHITTHI";
      navigateWithPageFlip(href, label);
    });
  });
}