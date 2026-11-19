// ==========================================================================
// CHITTHI (চিঠি) — Custom 9-Song Playlist + Cross-Page Persistent Audio Engine
// ==========================================================================
// আপনার ৯টি গান এখানে সেট করা আছে। MP3 ফাইলগুলো 'chitthi/songs/' ফোল্ডারে রাখুন:
//   1. songs/kichhu-manush.mp3
//   2. songs/du-haatey-mutho-bhorey.mp3
//   3. songs/borai-kore.mp3
//   4. songs/barsaat-banjaare.mp3
//   5. songs/amra-hoyto.mp3
//   6. songs/ami-tomakei-boley-debo.mp3
//   7. songs/alfaaz.mp3
//   8. songs/abar-dekha-holey.mp3
//   9. songs/jodi-abar.mp3
// ==========================================================================

// বাটন ক্লিক সাউন্ড পরিবর্তন করতে নিচের মানটি বদলান:
// "wooden"     = নরম কাঠের টোকা (Soft Wooden Tap — ডিফল্ট)
// "bell"       = মিষ্টি ঘণ্টার সুর (Soft Postal Bell Chime)
// "typewriter" = ভিন্টেজ টাইপরাইটার ক্লিক (Vintage Typewriter Key)
// "custom"     = আপনার নিজের MP3 ফাইল ('assets/click.mp3')
// "mute"       = বাটন ক্লিক সাউন্ড সম্পূর্ণ বন্ধ (Silent)
export const CLICK_SOUND_STYLE = "wooden";

export const CUSTOM_SONGS = [
  {
    id: "kichhu_manush",
    titleBn: "কিছু মানুষ মরে যায় পঁচিশে",
    titleEn: "Kichhu Manush More Jay Pochishe",
    src: "songs/kichhu-manush.mp3",
    fallbackNotes: [261.63, 329.63, 392.0, 493.88, 523.25, 392.0, 329.63, 293.66]
  },
  {
    id: "du_haatey",
    titleBn: "দু'হাতে মুঠো ভরে — দেবরাজ",
    titleEn: "Du Haatey Mutho Bhorey — Debraj",
    src: "songs/du-haatey-mutho-bhorey.mp3",
    fallbackNotes: [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 440.0, 392.0]
  },
  {
    id: "borai_kore",
    titleBn: "বড়াই করে (Pressure Cooker)",
    titleEn: "Borai Kore (From Pressure Cooker)",
    src: "songs/borai-kore.mp3",
    fallbackNotes: [246.94, 293.66, 369.99, 440.0, 493.88, 440.0, 369.99, 293.66]
  },
  {
    id: "barsaat",
    titleBn: "বরসাত — বাঞ্জারে (Barsaat)",
    titleEn: "Barsaat — Banjaare",
    src: "songs/barsaat-banjaare.mp3",
    fallbackNotes: [220.0, 261.63, 329.63, 392.0, 440.0, 392.0, 329.63, 246.94]
  },
  {
    id: "amra_hoyto",
    titleBn: "আমরা হয়তো — রকস্টার",
    titleEn: "Amra Hoyto — Rockstar",
    src: "songs/amra-hoyto.mp3",
    fallbackNotes: [261.63, 329.63, 392.0, 440.0, 523.25, 440.0, 392.0, 329.63]
  },
  {
    id: "ami_tomakei",
    titleBn: "আমি তোমাকেই বলে দেবো — সঞ্জীব",
    titleEn: "Ami Tomakei Boley Debo — Sanjeeb",
    src: "songs/ami-tomakei-boley-debo.mp3",
    fallbackNotes: [293.66, 329.63, 392.0, 440.0, 493.88, 440.0, 392.0, 329.63]
  },
  {
    id: "alfaaz",
    titleBn: "আলফাজ — হামজা মালিক ও জাইন",
    titleEn: "Alfaaz — Hamza Malik & Zain Ali",
    src: "songs/alfaaz.mp3",
    fallbackNotes: [220.0, 246.94, 293.66, 329.63, 392.0, 329.63, 293.66, 246.94]
  },
  {
    id: "abar_dekha",
    titleBn: "আবার দেখা হলে — তাপস",
    titleEn: "Abar Dekha Holey — Taposh",
    src: "songs/abar-dekha-holey.mp3",
    fallbackNotes: [261.63, 329.63, 392.0, 493.88, 523.25, 493.88, 392.0, 329.63]
  },
  {
    id: "jodi_abar",
    titleBn: "যদি আবার (Jodi Abar)",
    titleEn: "Jodi Abar",
    src: "songs/jodi-abar.mp3",
    fallbackNotes: [261.63, 329.63, 392.0, 440.0, 493.88, 523.25, 493.88, 392.0]
  }
];

export const BUILTIN_TRACKS = [
  {
    id: "piano",
    titleBn: "বৃষ্টি ও পিয়ানো (Rain & Piano)",
    titleEn: "Rain & Soft Piano",
    src: null,
    fallbackNotes: [261.63, 329.63, 392.0, 493.88, 523.25, 392.0, 329.63, 293.66]
  },
  {
    id: "rabindra",
    titleBn: "সন্ধ্যার রাগ ও সেতার",
    titleEn: "Evening Raga & Sitar",
    src: null,
    fallbackNotes: [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 440.0, 392.0]
  },
  {
    id: "nocturne",
    titleBn: "মধ্যরাতের ডাকঘর (Nocturne)",
    titleEn: "Midnight Nocturne",
    src: null,
    fallbackNotes: [220.0, 261.63, 329.63, 392.0, 440.0, 392.0, 329.63, 246.94]
  }
];

const STORAGE_KEYS = {
  ENABLED: "chitthi_music_enabled",
  TRACK: "chitthi_music_track",
  TIME: "chitthi_music_time"
};

class ChitthiAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.tracks = [...CUSTOM_SONGS, ...BUILTIN_TRACKS];
    const savedTrack = localStorage.getItem(STORAGE_KEYS.TRACK);
    this.currentTrackId = this.tracks.some((t) => t.id === savedTrack)
      ? savedTrack
      : this.tracks[0].id;
    this.loopTimer = null;
    this.savePositionTimer = null;
    this.htmlAudio = new Audio();
    this.htmlAudio.loop = true;
    this.htmlAudio.volume = 0.65;
    this.onStateChangeCallbacks = [];

    // Continuously persist currentTime so page switches continue seamlessly
    this.savePositionTimer = setInterval(() => {
      if (this.isPlaying && this.htmlAudio && !this.htmlAudio.paused) {
        localStorage.setItem(STORAGE_KEYS.TIME, String(this.htmlAudio.currentTime || 0));
      }
    }, 450);

    const flushPlaybackPosition = () => {
      if (this.isPlaying && this.htmlAudio && !this.htmlAudio.paused) {
        localStorage.setItem(STORAGE_KEYS.TIME, String(this.htmlAudio.currentTime || 0));
      }
    };
    window.addEventListener("pagehide", flushPlaybackPosition);
    window.addEventListener("beforeunload", flushPlaybackPosition);
  }

  onStateChange(cb) {
    if (typeof cb === "function") this.onStateChangeCallbacks.push(cb);
  }

  notifyStateChange() {
    this.onStateChangeCallbacks.forEach((cb) => {
      try { cb(this.isPlaying, this.currentTrackId); } catch (_) {}
    });
  }

  getAllTracks() {
    return this.tracks;
  }

  getCurrentTrack() {
    return this.tracks.find((tr) => tr.id === this.currentTrackId) || this.tracks[0];
  }

  addLocalUploadedSong(file) {
    const objectUrl = URL.createObjectURL(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, "");
    const newTrack = {
      id: "upload_" + Date.now(),
      titleBn: `🎵 ${cleanName}`,
      titleEn: `🎵 ${cleanName}`,
      src: objectUrl,
      isBlob: true,
      fallbackNotes: [261.63, 329.63, 392.0, 523.25]
    };
    this.tracks.unshift(newTrack);
    this.currentTrackId = newTrack.id;
    localStorage.setItem(STORAGE_KEYS.TIME, "0");
    this.notifyStateChange();
    return newTrack;
  }

  addExternalSongUrl(title, url) {
    const newTrack = {
      id: "url_" + Date.now(),
      titleBn: `🎵 ${title}`,
      titleEn: `🎵 ${title}`,
      src: url,
      fallbackNotes: [261.63, 329.63, 392.0, 523.25]
    };
    this.tracks.unshift(newTrack);
    this.currentTrackId = newTrack.id;
    localStorage.setItem(STORAGE_KEYS.TIME, "0");
    this.notifyStateChange();
    return newTrack;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleAmbient() {
    if (this.isPlaying) {
      this.stopAmbient(true);
    } else {
      this.startAmbient(0);
    }
    return this.isPlaying;
  }

  setTrackById(trackId, autoPlayIfStopped = false) {
    const found = this.tracks.find((tr) => tr.id === trackId);
    if (found) {
      this.currentTrackId = found.id;
      localStorage.setItem(STORAGE_KEYS.TRACK, found.id);
      localStorage.setItem(STORAGE_KEYS.TIME, "0");
    }
    if (this.isPlaying || autoPlayIfStopped) {
      this.stopAmbient(false);
      this.startAmbient(0);
    } else {
      this.notifyStateChange();
    }
  }

  nextTrack(autoPlay = true) {
    const idx = this.tracks.findIndex((tr) => tr.id === this.currentTrackId);
    const nextIdx = (idx + 1) % this.tracks.length;
    this.setTrackById(this.tracks[nextIdx].id, autoPlay);
    return this.tracks[nextIdx];
  }

  async startAmbient(resumeAtSeconds = null) {
    this.isPlaying = true;
    localStorage.setItem(STORAGE_KEYS.ENABLED, "1");
    localStorage.setItem(STORAGE_KEYS.TRACK, this.currentTrackId);
    this.notifyStateChange();

    const track = this.getCurrentTrack();

    if (track && track.src) {
      try {
        if (this.htmlAudio.src !== new URL(track.src, window.location.href).href) {
          this.htmlAudio.src = track.src;
        }
        if (typeof resumeAtSeconds === "number" && resumeAtSeconds > 0) {
          const applySeek = () => {
            try {
              if (this.htmlAudio.duration && resumeAtSeconds < this.htmlAudio.duration) {
                this.htmlAudio.currentTime = resumeAtSeconds;
              }
            } catch (_) {}
          };
          if (this.htmlAudio.readyState >= 1) {
            applySeek();
          } else {
            this.htmlAudio.addEventListener("loadedmetadata", applySeek, { once: true });
          }
        }
        await this.htmlAudio.play();
        return true;
      } catch (err) {
        if (err && err.name === "NotAllowedError") {
          this.attachGestureResume(resumeAtSeconds);
          return false;
        }
        console.info("MP3 file not found yet at", track.src, "— using built-in melody.");
      }
    }

    this.ensureContext();
    if (this.ctx.state === "suspended") {
      this.attachGestureResume(resumeAtSeconds);
    }
    let step = 0;
    const notes = (track && track.fallbackNotes) || [261.63, 329.63, 392.0, 493.88];
    const playStep = () => {
      if (!this.isPlaying) return;
      const freq = notes[step % notes.length];
      this.playWarmNote(freq, 1.8);
      step++;
      this.loopTimer = setTimeout(playStep, 1450);
    };
    playStep();
    return true;
  }

  attachGestureResume(resumeAtSeconds = 0) {
    const resumeHandler = () => {
      if (localStorage.getItem(STORAGE_KEYS.ENABLED) === "1" && this.isPlaying) {
        this.startAmbient(resumeAtSeconds);
      }
      ["pointerdown", "touchstart", "keydown", "click"].forEach((ev) =>
        window.removeEventListener(ev, resumeHandler, true)
      );
    };
    ["pointerdown", "touchstart", "keydown", "click"].forEach((ev) =>
      window.addEventListener(ev, resumeHandler, { capture: true, once: true })
    );
  }

  initPersistentPlayback() {
    const enabled = localStorage.getItem(STORAGE_KEYS.ENABLED) === "1";
    const savedTime = parseFloat(localStorage.getItem(STORAGE_KEYS.TIME) || "0") || 0;
    if (enabled) {
      this.startAmbient(savedTime);
    } else {
      this.isPlaying = false;
      this.notifyStateChange();
    }
  }

  stopAmbient(persistOff = true) {
    this.isPlaying = false;
    if (persistOff) {
      localStorage.setItem(STORAGE_KEYS.ENABLED, "0");
    }
    try {
      this.htmlAudio.pause();
    } catch (_) {}
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    this.notifyStateChange();
  }

  playWarmNote(freq, duration = 1.6) {
    if (!this.ctx || this.ctx.state !== "running") return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const sub = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = this.currentTrackId === "rabindra" ? "triangle" : "sine";
    sub.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    sub.frequency.setValueAtTime(freq * 0.5, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.036, now + 0.14);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    sub.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    sub.start(now);
    osc.stop(now + duration + 0.05);
    sub.stop(now + duration + 0.05);
  }

  // ========================================================================
  // BUTTON CLICK SOUND EFFECT (Controlled by CLICK_SOUND_STYLE at top)
  // ========================================================================
  playMailboxClick() {
    try {
      if (CLICK_SOUND_STYLE === "mute") return;

      if (CLICK_SOUND_STYLE === "custom") {
        const sfx = new Audio("assets/click.mp3");
        sfx.volume = 0.55;
        sfx.play().catch(() => {});
        return;
      }

      this.ensureContext();
      const now = this.ctx.currentTime;

      if (CLICK_SOUND_STYLE === "bell") {
        // Soft Postal Bell Chime
        const osc = this.ctx.createOscillator();
        const overtone = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        overtone.type = "sine";
        osc.frequency.setValueAtTime(880, now);
        overtone.frequency.setValueAtTime(1320, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.18);
        osc.connect(gain);
        overtone.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        overtone.start(now);
        osc.stop(now + 0.19);
        overtone.stop(now + 0.19);
        return;
      }

      if (CLICK_SOUND_STYLE === "typewriter") {
        // Vintage Mechanical Typewriter Key
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.028);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
        }
        const src = this.ctx.createBufferSource();
        src.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 1950;
        const gain = this.ctx.createGain();
        gain.gain.value = 0.09;
        src.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        src.start(now);
        return;
      }

      // Default ("wooden"): Soft Walnut Desk Tap
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(290, now);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.055);
      gain.gain.setValueAtTime(0.055, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (_) {}
  }

  playPaperRustle() {
    try {
      this.ensureContext();
      const bufferSize = this.ctx.sampleRate * 0.22;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.45));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1650;

      const gain = this.ctx.createGain();
      gain.gain.value = 0.065;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch (_) {}
  }

  playWaxCrack() {
    try {
      this.ensureContext();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.14);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
      setTimeout(() => this.playPaperRustle(), 90);
    } catch (_) {}
  }

  playPenScratch(penMode = "fountain") {
    try {
      if (!this.ctx || this.ctx.state !== "running") return;
      const dur = penMode === "pencil" ? 0.048 : penMode === "quill" ? 0.056 : 0.034;
      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.34;
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = penMode === "pencil" ? "bandpass" : "highpass";
      filter.frequency.value = penMode === "pencil" ? 1400 : penMode === "quill" ? 3100 : 2500;
      const gain = this.ctx.createGain();
      gain.gain.value = penMode === "pencil" ? 0.032 : 0.022;
      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      src.start();
    } catch (_) {}
  }

  playMatchStrike() {
    try {
      this.ensureContext();
      const now = this.ctx.currentTime;
      const dur = 0.25;
      const bufSize = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        const env = i < bufSize * 0.25 ? (i / (bufSize * 0.25)) : Math.exp(-(i - bufSize * 0.25) / (bufSize * 0.35));
        data[i] = (Math.random() * 2 - 1) * env;
      }
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 1850;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      src.start(now);
    } catch (_) {}
  }

  playTelegraphSend() {
    try {
      this.ensureContext();
      [0, 0.09, 0.24, 0.33, 0.48].forEach((offset, idx) => {
        const now = this.ctx.currentTime + offset;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(idx === 2 ? 780 : 660, now);
        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx === 2 ? 0.11 : 0.055));
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
      });
    } catch (_) {}
  }

  playPostmanBell() {
    try {
      this.ensureContext();
      [1318.5, 1661.2].forEach((freq, i) => {
        const now = this.ctx.currentTime + i * 0.16;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.075, now);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.65);
      });
    } catch (_) {}
  }

  startRainLoop() {
    try {
      this.ensureContext();
      if (this.rainNode) return;
      const bufSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
      const src = this.ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 820;
      const gain = this.ctx.createGain();
      gain.gain.value = 0.028;
      src.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      src.start();
      this.rainNode = src;
    } catch (_) {}
  }

  stopRainLoop() {
    if (this.rainNode) {
      try { this.rainNode.stop(); } catch (_) {}
      this.rainNode = null;
    }
  }
}

export const soundEngine = new ChitthiAudioEngine();

// ==========================================================================
// GLOBAL TOP NAVBAR SONG SELECTOR & PERSISTENT MUSIC SYNC HELPER
// ==========================================================================
export function setupGlobalMusicControls(getLangFn, translateFn) {
  const navControls = document.querySelector(".postal-nav .nav-controls");
  const soundBtn = document.getElementById("sound-toggle-btn");

  if (navControls && soundBtn && !document.getElementById("nav-music-group")) {
    const group = document.createElement("div");
    group.id = "nav-music-group";
    group.className = "nav-music-group";

    soundBtn.parentNode.insertBefore(group, soundBtn);
    group.appendChild(soundBtn);

    const navSelect = document.createElement("select");
    navSelect.id = "nav-track-select";
    navSelect.className = "nav-song-select";
    navSelect.title = "গান পরিবর্তন করুন / Change Song";
    group.appendChild(navSelect);

    const nextBtn = document.createElement("button");
    nextBtn.id = "nav-next-song-btn";
    nextBtn.type = "button";
    nextBtn.className = "nav-next-btn";
    nextBtn.title = "পরবর্তী গান / Next Song";
    nextBtn.textContent = "⏭";
    group.appendChild(nextBtn);

    navSelect.addEventListener("change", (e) => {
      soundEngine.setTrackById(e.target.value, true);
    });

    nextBtn.addEventListener("click", () => {
      soundEngine.nextTrack(true);
    });
  }

  const introSoundBtn = document.getElementById("intro-sound-btn");
  if (introSoundBtn && !document.getElementById("intro-track-select")) {
    const introSelect = document.createElement("select");
    introSelect.id = "intro-track-select";
    introSelect.className = "nav-song-select";
    introSoundBtn.parentNode.insertBefore(introSelect, introSoundBtn.nextSibling);
    introSelect.addEventListener("change", (e) => {
      soundEngine.setTrackById(e.target.value, true);
    });
  }

  const refreshUI = () => {
    const lang = getLangFn();
    const tracks = soundEngine.getAllTracks();
    const playing = soundEngine.isPlaying;

    ["nav-track-select", "intro-track-select", "music-track-select"].forEach((selId) => {
      const sel = document.getElementById(selId);
      if (!sel) return;
      sel.innerHTML = tracks
        .map(
          (tr) =>
            `<option value="${tr.id}" ${tr.id === soundEngine.currentTrackId ? "selected" : ""}>${
              lang === "bn" ? tr.titleBn : tr.titleEn
            }</option>`
        )
        .join("");
    });

    ["sound-toggle-btn", "intro-sound-btn"].forEach((btnId) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      btn.classList.toggle("active-sound", playing);
      btn.innerHTML = playing
        ? `🎶 <span>${translateFn("sound_on")}</span>`
        : `🎵 <span>${translateFn("sound_off")}</span>`;
    });
  };

  ["sound-toggle-btn", "intro-sound-btn"].forEach((btnId) => {
    const btn = document.getElementById(btnId);
    if (btn && !btn.dataset.musicBound) {
      btn.dataset.musicBound = "1";
      btn.addEventListener("click", () => {
        soundEngine.toggleAmbient();
      });
    }
  });

  soundEngine.onStateChange(refreshUI);
  refreshUI();
  soundEngine.initPersistentPlayback();

  return { refreshUI };
}
