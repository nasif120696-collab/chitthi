// ==========================================================================
// CHITTHI (চিঠি) — Interactive "How to Write & Send" Tutorial Modal
// Works seamlessly on every page without disturbing active drafts!
// ==========================================================================

import { getLang } from "./i18n.js";

const GUIDE_CONTENT = {
  bn: {
    badge: "সহজ নির্দেশিকা • ধাপে ধাপে টিউটোরিয়াল",
    title: "কীভাবে চিঠি লিখবেন ও পাঠাবেন?",
    subtitle: "মাত্র ১ মিনিটেই আপনার অনুভূতির চিঠি সাজিয়ে প্রিয় মানুষের কাছে পৌঁছে দিন",
    tab_direct: "✉️ সরাসরি চিঠি পাঠানো",
    tab_postbox: "📬 পোস্টবক্স ও গোপন উত্তর",
    steps_direct: [
      {
        num: "০১",
        icon: "✒️",
        heading: "রাইটিং ডেস্কে চিঠি লিখুন",
        desc: "‘চিঠি লিখুন’ পেজে গিয়ে প্রাপকের নাম, আপনার নাম (অথবা বেনামী) এবং মনের কথা লিখুন। আপনি যে গতিতে লিখবেন, কলম ও হাত ঠিক সেই ছন্দেই কাগজের ওপর লিখে যাবে।"
      },
      {
        num: "০২",
        icon: "🎶",
        heading: "গান, কাগজ, আবহাওয়া ও তালা সাজান",
        desc: "ডান পাশের প্যানেল থেকে পছন্দের কাগজ, মোমের সিলের রং, শহরের লাইভ আবহাওয়া ও খামের ভেতরের গান বেছে নিন। চাইলে জন্মদিন বা ঈদের জন্য Time-Lock কিংবা গোপন কথার জন্য Burn After Reading চালু করুন।"
      },
      {
        num: "০৩",
        icon: "🕯️",
        heading: "মোমের সিল দিয়ে লিংক কপি করুন",
        desc: "‘মোমের সিল দিয়ে চিঠি পাঠান’ বাটনে ক্লিক করলে একটি শেয়ারযোগ্য লিংক এবং একটি ৬ ডিজিটের গোপন কোড (#BD-XXXX) তৈরি হবে। লিংকটি মেসেঞ্জার, হোয়াটসঅ্যাপ বা ইনস্টাগ্রামে পাঠিয়ে দিন।"
      },
      {
        num: "০৪",
        icon: "💌",
        heading: "খাম খোলা ও পরিচয় গোপন রেখে উত্তর",
        desc: "প্রাপক লিংকে ঢুকে মোমের সিল ভাঙলেই আপনার পাঠানো গান বেজে উঠবে এবং হাত ও কলম চিঠিটি লিখে দেখাবে। প্রাপক নিচ থেকে গোপন উত্তর পাঠালে আপনি #BD-XXXX কোড দিয়ে তা পড়তে পারবেন।"
      }
    ],
    steps_postbox: [
      {
        num: "০১",
        icon: "📬",
        heading: "নিজের পার্সোনাল বা উৎসব পোস্টবক্স খুলুন",
        desc: "‘পোস্টবক্স ও উৎসব’ পেজে গিয়ে আপনার ইউজারনেম (যেমন: nasif) দিয়ে পোস্টবক্স তৈরি করুন। চাইলে ক্যাম্পাস ফেয়ারওয়েল, পহেলা বৈশাখ বা ঈদ থিমও বেছে নিতে পারেন।"
      },
      {
        num: "০২",
        icon: "📲",
        heading: "ফেসবুক বা ইনস্টাগ্রাম স্টোরিতে লিংক দিন",
        desc: "তৈরি হওয়া পোস্টবক্স লিংকটি কপি করে আপনার স্টোরি বা বায়োতে শেয়ার করুন। বন্ধুরা কোনো অ্যাকাউন্ট ছাড়াই সরাসরি আপনার পোস্টবক্সে চিঠি ফেলতে পারবে।"
      },
      {
        num: "০৩",
        icon: "🔖",
        heading: "গোপন ডাকটিকিট কোড (#BD-XXXX) ট্র্যাক করুন",
        desc: "আপনি কাউকে চিঠি পাঠানোর পর প্রাপ্ত #BD-XXXX কোডটি ‘গোপন কোড’ সেকশনে বসিয়ে যেকোনো সময় চেক করতে পারবেন প্রাপক আপনার চিঠির উত্তর দিয়েছে কি না।"
      },
      {
        num: "০৪",
        icon: "📸",
        heading: "এক ক্লিকে স্টোরি কার্ড শেয়ার",
        desc: "চিঠি পড়ার পর ‘স্টোরি কার্ড ডাউনলোড’ বাটনে ক্লিক করলে চিঠির প্রথম কয়েক লাইন ও মোমের সিলসহ একটি নান্দনিক 9:16 কার্ড সেভ হবে, যা সরাসরি স্টোরিতে দেওয়া যাবে।"
      }
    ],
    cta_write: "এখনই চিঠি লিখুন ✒️",
    cta_postbox: "পোস্টবক্স তৈরি করুন 📬",
    close_btn: "বুঝেছি, বন্ধ করুন"
  },
  en: {
    badge: "Step-by-Step Postal Guide",
    title: "How to Write & Send a Letter",
    subtitle: "Craft a heartfelt digital keepsake letter and share it in under a minute",
    tab_direct: "✉️ Direct Letter Guide",
    tab_postbox: "📬 Postbox & Secret Replies",
    steps_direct: [
      {
        num: "01",
        icon: "✒️",
        heading: "Write on the Sunlit Writing Desk",
        desc: "Go to ‘Write a Letter’, enter the recipient's name, your name (or stay anonymous), and pour your thoughts onto the parchment. The hand & fountain pen record your exact typing rhythm."
      },
      {
        num: "02",
        icon: "🎶",
        heading: "Customize Song, Paper, Weather & Locks",
        desc: "Pick your parchment theme, wax seal color, live city weather postmark, and a dedicated song. Optionally enable Time-Lock (for birthdays/Eid) or Burn After Reading."
      },
      {
        num: "03",
        icon: "🕯️",
        heading: "Seal & Copy Your Shareable Link",
        desc: "Click ‘Seal & Dispatch Letter’ to generate a unique letter link plus a 6-character Secret Stamp Code (#BD-XXXX). Send the link via Messenger, WhatsApp, or Instagram DM."
      },
      {
        num: "04",
        icon: "💌",
        heading: "Break the Seal & Read Secret Replies",
        desc: "When the recipient taps the wax seal, your chosen song plays as the pen writes out your letter live. They can send an anonymous reply that you unlock using your #BD-XXXX code."
      }
    ],
    steps_postbox: [
      {
        num: "01",
        icon: "📬",
        heading: "Claim a Personal or Occasion Postbox",
        desc: "Open ‘Postboxes & Events’, choose a handle (e.g. nasif), and select Personal, Campus Farewell, Pohela Boishakh, or Eid theme."
      },
      {
        num: "02",
        icon: "📲",
        heading: "Share Your Postbox Link on Stories",
        desc: "Copy your postbox link and share it on Facebook or Instagram Stories. Friends can drop letters straight into your postbox without needing any signup."
      },
      {
        num: "03",
        icon: "🔖",
        heading: "Track Replies via Secret Stamp Code",
        desc: "Enter the #BD-XXXX code you received after sending any letter into the ‘Secret Code’ tracker to check if your recipient left an anonymous reply."
      },
      {
        num: "04",
        icon: "📸",
        heading: "One-Click 9:16 Story Card Export",
        desc: "After opening a letter, tap ‘Download Story Card’ to export a vintage parchment & wax-seal image ready to post on Instagram or Facebook Stories."
      }
    ],
    cta_write: "Write a Letter Now ✒️",
    cta_postbox: "Create Your Postbox 📬",
    close_btn: "Got It, Close"
  }
};

export function initTutorialGuide() {
  if (!document.getElementById("chitthi-guide-modal")) {
    const modal = document.createElement("div");
    modal.id = "chitthi-guide-modal";
    modal.className = "modal-backdrop";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = `
      <div class="modal-card guide-modal-card">
        <div class="guide-modal-header">
          <div>
            <div class="postmark-badge" style="margin-bottom:0.45rem;" id="guide-badge"></div>
            <h2 class="serif-title" style="font-size:1.6rem; color:var(--gold-bright);" id="guide-title"></h2>
            <p style="font-size:0.9rem; color:var(--cream-aged); margin-top:0.2rem;" id="guide-subtitle"></p>
          </div>
          <button type="button" id="guide-x-close" class="pill-btn" aria-label="Close Tutorial">✕</button>
        </div>

        <div class="guide-tabs">
          <button type="button" class="guide-tab-btn active" data-guide-tab="direct" id="guide-tab-direct"></button>
          <button type="button" class="guide-tab-btn" data-guide-tab="postbox" id="guide-tab-postbox"></button>
        </div>

        <div class="guide-steps-grid" id="guide-steps-container"></div>

        <div class="guide-modal-footer">
          <a href="write.html" class="btn-gold" style="padding:0.68rem 1.35rem; font-size:0.92rem;" id="guide-cta-write"></a>
          <a href="postbox.html" class="btn-outline" style="padding:0.68rem 1.25rem; font-size:0.9rem;" id="guide-cta-postbox"></a>
          <button type="button" class="pill-btn" id="guide-bottom-close"></button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    let activeTab = "direct";

    const renderGuide = () => {
      const lang = getLang() === "en" ? "en" : "bn";
      const data = GUIDE_CONTENT[lang];
      document.getElementById("guide-badge").textContent = data.badge;
      document.getElementById("guide-title").textContent = data.title;
      document.getElementById("guide-subtitle").textContent = data.subtitle;
      document.getElementById("guide-tab-direct").textContent = data.tab_direct;
      document.getElementById("guide-tab-postbox").textContent = data.tab_postbox;
      document.getElementById("guide-cta-write").textContent = data.cta_write;
      document.getElementById("guide-cta-postbox").textContent = data.cta_postbox;
      document.getElementById("guide-bottom-close").textContent = data.close_btn;

      const list = activeTab === "direct" ? data.steps_direct : data.steps_postbox;
      const container = document.getElementById("guide-steps-container");
      container.innerHTML = list
        .map(
          (st) => `
          <div class="guide-step-item">
            <div class="guide-step-num">${st.num}</div>
            <div>
              <div class="guide-step-heading">${st.icon} ${st.heading}</div>
              <p class="guide-step-desc">${st.desc}</p>
            </div>
          </div>
        `
        )
        .join("");
    };

    modal.querySelectorAll("[data-guide-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        modal.querySelectorAll("[data-guide-tab]").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeTab = btn.dataset.guideTab;
        renderGuide();
      });
    });

    const closeModal = () => modal.classList.remove("show");
    document.getElementById("guide-x-close").addEventListener("click", closeModal);
    document.getElementById("guide-bottom-close").addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    window.openChitthiGuide = (defaultTab = "direct") => {
      activeTab = defaultTab;
      modal.querySelectorAll("[data-guide-tab]").forEach((b) => {
        b.classList.toggle("active", b.dataset.guideTab === activeTab);
      });
      renderGuide();
      modal.classList.add("show");
    };
  }

  // Bind all triggers with [data-open-guide]
  document.querySelectorAll("[data-open-guide]").forEach((trigger) => {
    if (trigger.dataset.guideBound) return;
    trigger.dataset.guideBound = "1";
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const tab = trigger.getAttribute("data-open-guide") || "direct";
      window.openChitthiGuide(tab);
    });
  });
}
