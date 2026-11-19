// ==========================================================================
// CHITTHI (চিঠি) — Interactive 3D WebGL Environment (Three.js)
// ==========================================================================
import * as THREE from "https://unpkg.com/three@0.169.0/build/three.module.js";

export function initChitthi3DWorld(pageType = "home") {
  if (document.getElementById("chitthi-3d-canvas")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "chitthi-3d-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.insertBefore(canvas, document.body.firstChild);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x140b06, 0.045);

  const camera = new THREE.PerspectiveCamera(
    48,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 11);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Warm Candlelight & Golden Hour Lighting
  const ambientLight = new THREE.AmbientLight(0xffdfaa, 0.55);
  const candleLight = new THREE.PointLight(0xff9d3b, 55, 28);
  candleLight.position.set(4.5, 3.2, 5);

  const crimsonRimLight = new THREE.PointLight(0xb82932, 32, 24);
  crimsonRimLight.position.set(-5.5, -3.5, 4);

  const topGoldLight = new THREE.DirectionalLight(0xf5d284, 0.9);
  topGoldLight.position.set(0, 8, 6);

  scene.add(ambientLight, candleLight, crimsonRimLight, topGoldLight);

  // Helper: Build a 3D Vintage Envelope with Flap & Crimson Wax Seal
  function create3DEnvelope(scale = 1) {
    const group = new THREE.Group();

    // Envelope Body (Aged Cream Parchment)
    const bodyGeo = new THREE.BoxGeometry(2.2, 1.42, 0.08);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xf4e4c3,
      roughness: 0.68,
      metalness: 0.08
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(bodyMesh);

    // Gold Trim Border
    const trimGeo = new THREE.BoxGeometry(2.24, 1.46, 0.05);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xc8a254,
      roughness: 0.35,
      metalness: 0.72
    });
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    group.add(trimMesh);

    // Triangular Envelope Flap
    const flapShape = new THREE.Shape();
    flapShape.moveTo(-1.08, 0.68);
    flapShape.lineTo(1.08, 0.68);
    flapShape.lineTo(0, -0.08);
    flapShape.closePath();

    const flapGeo = new THREE.ShapeGeometry(flapShape);
    const flapMat = new THREE.MeshStandardMaterial({
      color: 0xe6cfa3,
      roughness: 0.65,
      side: THREE.DoubleSide
    });
    const flapMesh = new THREE.Mesh(flapGeo, flapMat);
    flapMesh.position.z = 0.048;
    group.add(flapMesh);

    // Crimson Wax Seal Medallion
    const sealGeo = new THREE.CylinderGeometry(0.22, 0.24, 0.06, 24);
    sealGeo.rotateX(Math.PI / 2);
    const sealMat = new THREE.MeshStandardMaterial({
      color: 0x8f1d24,
      roughness: 0.32,
      metalness: 0.25
    });
    const sealMesh = new THREE.Mesh(sealGeo, sealMat);
    sealMesh.position.set(0, -0.04, 0.07);
    group.add(sealMesh);

    group.scale.setScalar(scale);
    return group;
  }

  // Spawn Floating 3D Envelopes Around the Viewport Edges
  const envelopes = [];
  const envelopeCount = pageType === "write" ? 5 : 9;

  for (let i = 0; i < envelopeCount; i++) {
    const env = create3DEnvelope(0.55 + Math.random() * 0.45);
    const side = i % 2 === 0 ? 1 : -1;
    env.position.set(
      side * (3.6 + Math.random() * 4.8),
      (Math.random() - 0.5) * 9,
      -1.5 - Math.random() * 5.5
    );
    env.rotation.set(
      (Math.random() - 0.5) * 0.6,
      (Math.random() - 0.5) * 0.8,
      (Math.random() - 0.5) * 0.5
    );
    env.userData = {
      baseY: env.position.y,
      floatSpeed: 0.6 + Math.random() * 0.7,
      rotSpeedX: (Math.random() - 0.5) * 0.35,
      rotSpeedY: (Math.random() - 0.5) * 0.45,
      phase: Math.random() * Math.PI * 2
    };
    scene.add(env);
    envelopes.push(env);
  }

  // 3D Floating Golden Dust Motes (Firefly Sparks)
  const particleCount = 160;
  const posArray = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 22;
    posArray[i + 1] = (Math.random() - 0.5) * 16;
    posArray[i + 2] = (Math.random() - 0.5) * 12;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
  const dustMat = new THREE.PointsMaterial({
    size: 0.075,
    color: 0xf2cf7e,
    transparent: true,
    opacity: 0.78
  });
  const dustPoints = new THREE.Points(dustGeo, dustMat);
  scene.add(dustPoints);

  // Interactive Mouse & Scroll Tracking
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  window.addEventListener("mousemove", (e) => {
    mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Enable 3D Interactive Tilt on Cards & Desk Elements
  enable3DCardTilt();

  // Render Loop
  const clock = new THREE.Clock();
  function animate() {
    if (!document.hidden) {
      const t = clock.getElapsedTime();
      const scrollRatio = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Smooth 3D Camera Orbit on Mouse & Scroll
      camera.position.x = mouse.x * 1.15;
      camera.position.y = mouse.y * 0.75 - scrollRatio * 2.2;
      camera.position.z = 11 - scrollRatio * 1.8;
      camera.lookAt(0, -scrollRatio * 1.5, 0);

      // Flicker Candle Point Light
      candleLight.intensity = 52 + Math.sin(t * 7.5) * 5 + Math.cos(t * 13) * 3;

      // Animate Floating 3D Envelopes
      envelopes.forEach((env) => {
        const d = env.userData;
        env.position.y = d.baseY + Math.sin(t * d.floatSpeed + d.phase) * 0.35;
        env.rotation.x += d.rotSpeedX * 0.008;
        env.rotation.y += d.rotSpeedY * 0.01;
      });

      // Slowly Drift Golden Dust
      dustPoints.rotation.y = t * 0.035;
      dustPoints.position.y = Math.sin(t * 0.4) * 0.25;

      renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// Adds Physical 3D Perspective Tilt to Vintage Cards & Art Postcards
function enable3DCardTilt() {
  const cards = document.querySelectorAll(".vintage-card, .art-gallery-card, .tutorial-step-card");
  cards.forEach((card) => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = "1";
    card.classList.add("tilt-3d-card");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
}