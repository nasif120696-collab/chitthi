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

  // ফিক্স: পেজ রিডিরেক্ট হওয়ার আগে বা সামান্য দেরিতে কার্টেন পুরোপুরি রিমুভ হওয়ার ফেইলসেফ টাইমআউট
  setTimeout(() => {
    window.location.href = targetUrl;
  }, 420);
}

function setupPageFlipTransitions() {
  // ফিক্স: পেজ লোড হওয়ার সাথে সাথেই যাতে কোনো ওভারলে বা কার্টেন স্ক্রিন আটকে না রাখে
  const existingCurtain = document.getElementById("chitthi-page-flip-sheet");
  if (existingCurtain) {
    existingCurtain.remove();
  }
  document.body.classList.remove("page-turning-out", "flipping-forward");

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