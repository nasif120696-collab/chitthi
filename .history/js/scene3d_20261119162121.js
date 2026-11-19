// ==========================================================================
// CHITTHI (চিঠি) — Interactive 3D WebGL World & Spatial Depth Engine
// ==========================================================================
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";

export function initChitthi3DWorld(pageType = "home") {
  // ১. কার্ড, পোস্টকার্ড ও ডেস্কে 3D পার্সপেক্টিভ টিল্ট সক্রিয় করা হচ্ছে
  enable3DCardTilt();

  if (document.getElementById("chitthi-3d-canvas")) return;

  // ২. ফুল-স্ক্রিন 3D WebGL ক্যানভাস তৈরি
  const canvas = document.createElement("canvas");
  canvas.id = "chitthi-3d-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x140b06, 0.032);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 10.5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ৩. উষ্ণ মোমবাতি ও সোনালি আলোকসজ্জা
  const ambientLight = new THREE.AmbientLight(0xffe6bd, 0.95);
  const candleLight = new THREE.PointLight(0xffa940, 90, 38);
  candleLight.position.set(3.5, 3.5, 6.5);

  const crimsonRimLight = new THREE.PointLight(0xd93843, 60, 32);
  crimsonRimLight.position.set(-4.5, -2.5, 5.5);

  const topLight = new THREE.DirectionalLight(0xf7d78c, 1.1);
  topLight.position.set(0, 8, 8);

  scene.add(ambientLight, candleLight, crimsonRimLight, topLight);

  // ৪. 3D মোম-সিলমোহর করা ভিন্টেজ চিঠির খাম তৈরির ফাংশন
  function create3DEnvelope(scale = 1, waxHex = 0x9e1c24) {
    const group = new THREE.Group();

    // খামের মূল কাগজ
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 1.52, 0.09),
      new THREE.MeshStandardMaterial({
        color: 0xf7e7c4,
        roughness: 0.52,
        metalness: 0.08
      })
    );
    group.add(body);

    // সোনালি বর্ডার ফ্রেম
    const border = new THREE.Mesh(
      new THREE.BoxGeometry(2.47, 1.59, 0.05),
      new THREE.MeshStandardMaterial({
        color: 0xe5c171,
        roughness: 0.28,
        metalness: 0.82
      })
    );
    group.add(border);

    // খামের ত্রিকোণ ফ্ল্যাপ
    const flapShape = new THREE.Shape();
    flapShape.moveTo(-1.18, 0.74);
    flapShape.lineTo(1.18, 0.74);
    flapShape.lineTo(0, -0.05);
    flapShape.closePath();

    const flap = new THREE.Mesh(
      new THREE.ShapeGeometry(flapShape),
      new THREE.MeshStandardMaterial({
        color: 0xe8cfa0,
        roughness: 0.58,
        side: THREE.DoubleSide
      })
    );
    flap.position.z = 0.055;
    group.add(flap);

    // লাল/সোনালি মোমের সিল (Wax Seal Medallion)
    const sealGeo = new THREE.CylinderGeometry(0.25, 0.27, 0.07, 28);
    sealGeo.rotateX(Math.PI / 2);
    const seal = new THREE.Mesh(
      sealGeo,
      new THREE.MeshStandardMaterial({
        color: waxHex,
        roughness: 0.25,
        metalness: 0.32
      })
    );
    seal.position.set(0, -0.04, 0.082);
    group.add(seal);

    // মোমের সিলের চারপাশে সোনালি রিং
    const ringGeo = new THREE.TorusGeometry(0.21, 0.022, 12, 32);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf5d487,
      roughness: 0.25,
      metalness: 0.85
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(0, -0.04, 0.116);
    group.add(ring);

    group.scale.setScalar(scale);
    return group;
  }

  // ৫. স্ক্রিনের চারপাশে দৃশ্যমান পজিশনে ভাসমান 3D খামসমূহ
  const envelopes = [];
  const waxColors = [0x9e1c24, 0x1e563f, 0x233b6e, 0xa67c2e, 0x9e1c24, 0x8f1d24];
  const layoutPositions = [
    { x: -3.9, y: 2.3, z: 1.6, s: 0.78 },
    { x: 4.0, y: 1.9, z: 1.3, s: 0.84 },
    { x: -4.3, y: -2.0, z: 0.9, s: 0.70 },
    { x: 4.2, y: -2.2, z: 1.8, s: 0.75 },
    { x: -2.7, y: 3.5, z: -1.4, s: 0.58 },
    { x: 2.9, y: -3.3, z: -1.1, s: 0.60 }
  ];

  const countToSpawn = pageType === "write" ? 4 : layoutPositions.length;
  for (let i = 0; i < countToSpawn; i++) {
    const p = layoutPositions[i];
    const env = create3DEnvelope(p.s, waxColors[i % waxColors.length]);
    env.position.set(p.x, p.y, p.z);
    env.rotation.set(0.24, i % 2 === 0 ? 0.45 : -0.45, i % 2 === 0 ? -0.18 : 0.18);
    env.userData = {
      baseY: p.y,
      baseX: p.x,
      speed: 0.75 + i * 0.14,
      phase: i * 1.15
    };
    scene.add(env);
    envelopes.push(env);
  }

  // ৬. উজ্জ্বল সোনালি জোনাকি আলোককণা (3D Particles)
  const particleCount = 240;
  const coords = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    coords[i] = (Math.random() - 0.5) * 19;
    coords[i + 1] = (Math.random() - 0.5) * 15;
    coords[i + 2] = (Math.random() - 0.5) * 10 + 2;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(coords, 3));
  const dustMat = new THREE.PointsMaterial({
    size: 0.125,
    color: 0xffd97d,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  // ৭. মাউস প্যারালাক্স ও স্ক্রল-ড্রিভেন ক্যামেরা মুভমেন্ট
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener("mousemove", (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();
  function animate() {
    if (!document.hidden) {
      const t = clock.getElapsedTime();
      const scrollY = window.scrollY * 0.0024;

      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      camera.position.x = mouse.x * 1.45;
      camera.position.y = mouse.y * 0.95 - scrollY;
      camera.position.z = 10.5 - Math.min(2.2, scrollY * 0.6);
      camera.lookAt(0, -scrollY, 0);

      candleLight.intensity = 86 + Math.sin(t * 7.5) * 8 + Math.cos(t * 13) * 4;

      envelopes.forEach((env, i) => {
        const d = env.userData;
        env.position.y = d.baseY + Math.sin(t * d.speed + d.phase) * 0.34;
        env.rotation.y += 0.0085 * (i % 2 === 0 ? 1 : -1);
        env.rotation.x = Math.sin(t * 0.72 + d.phase) * 0.24;
      });

      dust.rotation.y = t * 0.048;
      dust.position.y = Math.sin(t * 0.35) * 0.2;

      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// কার্ড ও এলিমেন্টে 3D পার্সপেক্টিভ টিল্ট
function enable3DCardTilt() {
  const targets = document.querySelectorAll(
    ".vintage-card, .art-gallery-card, .tutorial-step-card, .creator-credit-section, .hero-emblem-showcase"
  );
  targets.forEach((el) => {
    if (el.dataset.tilt3d) return;
    el.dataset.tilt3d = "1";
    el.classList.add("tilt-3d-card");

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(950px) rotateX(${(-y * 11).toFixed(2)}deg) rotateY(${(x * 13).toFixed(2)}deg) translateZ(14px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(950px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    });
  });
}