// ==========================================================================
// CHITTHI (চিঠি) — Pro 3D Spatial Environment & Z-Axis Fly-Through Engine
// ==========================================================================
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch (_) {
    return false;
  }
}

function createSoftBokehTexture() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255, 240, 195, 1)");
  grad.addColorStop(0.35, "rgba(242, 200, 118, 0.55)");
  grad.addColorStop(1, "rgba(242, 200, 118, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export function initChitthi3DWorld(pageType = "home") {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;

  if (!prefersReduced && !isTouch) {
    enableRefined3DCards();
  }

  // Fallback object so navbar.js never breaks even without WebGL
  if (!supportsWebGL() || prefersReduced) {
    window.chitthi3D = { flyThroughOut: () => {} };
    return;
  }

  if (document.getElementById("chitthi-3d-canvas")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "chitthi-3d-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);

  // Scene & Atmospheric Fog
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x130b06, 0.042);

  const baseFov = 46;
  const baseZ = 11.2;
  const isPortalArrival = sessionStorage.getItem("chitthi_portal_arrival") === "1";

  const camera = new THREE.PerspectiveCamera(
    isPortalArrival ? 56 : baseFov,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, isPortalArrival ? 15.8 : baseZ);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  // Cinematic Three-Point Vintage Lighting
  const ambient = new THREE.AmbientLight(0xffebd0, 0.72);
  const keyCandle = new THREE.PointLight(0xffa742, 75, 36);
  keyCandle.position.set(4.5, 3.8, 7);

  const rimCrimson = new THREE.PointLight(0x9e212a, 42, 28);
  rimCrimson.position.set(-5.5, -3, 5);

  const topWarm = new THREE.DirectionalLight(0xf6d893, 0.85);
  topWarm.position.set(0, 9, 6);

  scene.add(ambient, keyCandle, rimCrimson, topWarm);

  // Sculpted 3D Vintage Envelope Builder
  function buildEnvelope(scale = 1, waxColor = 0x8f1d24) {
    const group = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 1.46, 0.075),
      new THREE.MeshStandardMaterial({
        color: 0xf4e4c4,
        roughness: 0.62,
        metalness: 0.06
      })
    );
    group.add(body);

    const goldEdge = new THREE.Mesh(
      new THREE.BoxGeometry(2.35, 1.51, 0.045),
      new THREE.MeshStandardMaterial({
        color: 0xd4ad5a,
        roughness: 0.32,
        metalness: 0.78
      })
    );
    group.add(goldEdge);

    const flapShape = new THREE.Shape();
    flapShape.moveTo(-1.13, 0.71);
    flapShape.lineTo(1.13, 0.71);
    flapShape.lineTo(0, -0.04);
    flapShape.closePath();

    const flap = new THREE.Mesh(
      new THREE.ShapeGeometry(flapShape),
      new THREE.MeshStandardMaterial({
        color: 0xe6cda0,
        roughness: 0.65,
        side: THREE.DoubleSide
      })
    );
    flap.position.z = 0.046;
    group.add(flap);

    const sealGeo = new THREE.CylinderGeometry(0.22, 0.24, 0.055, 28);
    sealGeo.rotateX(Math.PI / 2);
    const seal = new THREE.Mesh(
      sealGeo,
      new THREE.MeshStandardMaterial({
        color: waxColor,
        roughness: 0.3,
        metalness: 0.22
      })
    );
    seal.position.set(0, -0.04, 0.068);
    group.add(seal);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.18, 0.018, 10, 28),
      new THREE.MeshStandardMaterial({
        color: 0xf3d184,
        roughness: 0.25,
        metalness: 0.85
      })
    );
    ring.position.set(0, -0.04, 0.098);
    group.add(ring);

    group.scale.setScalar(scale);
    return group;
  }

  // Layered Depth Composition (Clean peripheral framing, never obscures text)
  const envelopes = [];
  const isCompact = window.innerWidth < 768;
  const xSpread = isCompact ? 0.62 : 1;

  const envelopeSpecs = pageType === "write"
    ? [
        { x: -5.4, y: 2.5, z: -1.2, s: 0.68, w: 0x8f1d24 },
        { x: 5.5, y: -2.1, z: -0.8, s: 0.66, w: 0xa67c2e },
        { x: -4.8, y: -3.2, z: -3.8, s: 0.52, w: 0x1e563f }
      ]
    : [
        { x: -4.5, y: 2.4, z: 0.6, s: 0.72, w: 0x8f1d24 },
        { x: 4.7, y: 1.8, z: -0.4, s: 0.78, w: 0xa67c2e },
        { x: -4.9, y: -2.2, z: -1.6, s: 0.66, w: 0x1e563f },
        { x: 4.8, y: -2.4, z: 1.0, s: 0.64, w: 0x233b6e },
        { x: 0.2, y: 3.6, z: -4.8, s: 0.56, w: 0x8f1d24 }
      ];

  envelopeSpecs.forEach((spec, idx) => {
    const env = buildEnvelope(spec.s, spec.w);
    env.position.set(spec.x * xSpread, spec.y, spec.z);
    env.rotation.set(0.18, idx % 2 === 0 ? 0.42 : -0.42, idx % 2 === 0 ? -0.14 : 0.14);
    env.userData = {
      baseY: spec.y,
      baseRotY: env.rotation.y,
      speed: 0.45 + idx * 0.08,
      phase: idx * 1.4
    };
    scene.add(env);
    envelopes.push(env);
  });

  // Subtle Brass Depth Rings (Creates unmistakable spatial tunnel feel during fly-through)
  const portalRings = [];
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xc8a254,
    roughness: 0.35,
    metalness: 0.82,
    transparent: true,
    opacity: 0.16
  });
  [-2, -9, -16].forEach((zPos, i) => {
    const r = new THREE.Mesh(new THREE.TorusGeometry(6.8 + i * 1.1, 0.025, 12, 72), ringMat);
    r.position.set(0, 0, zPos);
    scene.add(r);
    portalRings.push(r);
  });

  // Soft Glowing Sunlit Bokeh Dust Field
  const dustCount = isCompact ? 95 : 170;
  const positions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 15;
    positions[i + 2] = (Math.random() - 0.5) * 22 - 2;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const dustMat = new THREE.PointsMaterial({
    size: 0.24,
    map: createSoftBokehTexture(),
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
  const dustField = new THREE.Points(dustGeo, dustMat);
  scene.add(dustField);

  // Smooth Camera & Portal State
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  let targetCamZ = baseZ;
  let targetFov = baseFov;
  let isFlyingOut = false;

  if (!isTouch) {
    window.addEventListener("mousemove", (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -(e.clientY / window.innerHeight) * 2 + 1;
    }, { passive: true });
  }

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Public Fly-Through API called by navbar.js right before navigation
  window.chitthi3D = {
    flyThroughOut() {
      isFlyingOut = true;
      targetCamZ = 2.2;   // Plunge camera forward through the 3D scene
      targetFov = 68;     // Subtle optical warp acceleration
    }
  };

  const clock = new THREE.Clock();
  function animate() {
    if (!document.hidden) {
      const t = clock.getElapsedTime();
      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const scrollProgress = Math.min(1, window.scrollY / maxScroll);

      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;

      // Smooth Z-axis fly-through or scroll dolly
      const desiredZ = isFlyingOut ? targetCamZ : (baseZ - scrollProgress * 2.4);
      const zLerp = isFlyingOut ? 0.11 : 0.065;
      camera.position.z += (desiredZ - camera.position.z) * zLerp;

      if (Math.abs(camera.fov - targetFov) > 0.05) {
        camera.fov += (targetFov - camera.fov) * (isFlyingOut ? 0.1 : 0.07);
        camera.updateProjectionMatrix();
      }

      const scrollOffsetY = -scrollProgress * 1.4;
      camera.position.x += (mouse.x * 1.05 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.65 + scrollOffsetY - camera.position.y) * 0.05;
      camera.lookAt(0, scrollOffsetY, -4);

      // Gentle candle light breathing
      keyCandle.intensity = 72 + Math.sin(t * 4.5) * 4.5 + Math.cos(t * 9.2) * 2.5;

      // Weighted, slow float on envelopes (zero frantic spinning)
      envelopes.forEach((env) => {
        const d = env.userData;
        env.position.y = d.baseY + Math.sin(t * d.speed + d.phase) * 0.24;
        env.rotation.y = d.baseRotY + Math.sin(t * 0.35 + d.phase) * 0.28;
        env.rotation.x = 0.16 + Math.cos(t * 0.3 + d.phase) * 0.12;
      });

      portalRings.forEach((ring, i) => {
        ring.rotation.z = t * 0.03 * (i % 2 === 0 ? 1 : -1);
      });

      dustField.rotation.y = t * 0.022;
      dustField.position.y = Math.sin(t * 0.25) * 0.18;

      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// Tasteful 3D Card Tilt + Mouse-Following Golden Specular Sheen
function enableRefined3DCards() {
  const cards = document.querySelectorAll(
    ".vintage-card, .art-gallery-card, .tutorial-step-card, .creator-credit-section"
  );
  cards.forEach((el) => {
    if (el.dataset.tilt3d) return;
    el.dataset.tilt3d = "1";
    el.classList.add("tilt-3d-card");

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 7.5; // Restrained, editorial tilt
      const ry = (px - 0.5) * 8.5;

      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-3px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}