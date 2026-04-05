import { useEffect } from 'react';
import * as THREE from 'three';

export function useHeroScene(canvasRef) {
  useEffect(() => {
    const el = canvasRef.current; if (!el) return;
    const W = el.offsetWidth, H = el.offsetHeight;
    const renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(48, W / H, 0.1, 100);
    cam.position.z = 6;

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const oL = new THREE.PointLight(0xFF6B1A, 5, 14); oL.position.set(3, 2, 3); scene.add(oL);
    const bL = new THREE.PointLight(0x2244aa, 1.8, 10); bL.position.set(-3, -2, 2); scene.add(bL);
    const dL = new THREE.DirectionalLight(0xFFB347, 0.5); dL.position.set(0, 5, -2); scene.add(dL);

    const metM = new THREE.MeshStandardMaterial({ color: 0x3D4149, metalness: 0.96, roughness: 0.12 });
    const orM  = new THREE.MeshStandardMaterial({ color: 0xFF6B1A, metalness: 0.85, roughness: 0.08, emissive: 0xFF3300, emissiveIntensity: 0.3 });

    const grp = new THREE.Group(); scene.add(grp);
    const core = new THREE.Mesh(new THREE.TorusKnotGeometry(1.1, 0.27, 160, 32, 2, 3), metM); grp.add(core);
    const r1 = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.055, 16, 90), orM); r1.rotation.x = Math.PI / 4; grp.add(r1);
    const r2 = new THREE.Mesh(new THREE.TorusGeometry(2.65, 0.035, 16, 90), new THREE.MeshStandardMaterial({ color: 0x4A5060, metalness: 0.9, roughness: 0.3 })); r2.rotation.set(-Math.PI / 5, Math.PI / 3, 0); grp.add(r2);
    const r3 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.025, 16, 90), new THREE.MeshStandardMaterial({ color: 0xFF6B1A, transparent: true, opacity: 0.35 })); r3.rotation.set(Math.PI / 6, -Math.PI / 4, 0); grp.add(r3);

    for (let i = 0; i < 20; i++) {
      const t = (i / 20) * Math.PI * 2, r = 3.4 + Math.random() * 0.9;
      const sz = Math.random() * 0.08 + 0.03;
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(sz, sz, sz),
        new THREE.MeshStandardMaterial({ color: i % 4 === 0 ? 0xFF6B1A : 0x3D4149, metalness: 0.9, roughness: 0.2 })
      );
      m.position.set(Math.cos(t) * r, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 2.5);
      m.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0);
      m.userData = { sp: Math.random() * 0.018 + 0.004, off: Math.random() * Math.PI * 2 };
      grp.add(m);
    }

    let mx = 0, my = 0;
    const onM = (e) => { mx = (e.clientX / innerWidth - 0.5) * 0.7; my = (e.clientY / innerHeight - 0.5) * 0.45; };
    addEventListener('mousemove', onM);
    const clock = new THREE.Clock(); let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick); const t = clock.getElapsedTime();
      core.rotation.x = t * 0.25; core.rotation.y = t * 0.17;
      r1.rotation.z = t * 0.42; r2.rotation.z = -t * 0.3; r3.rotation.z = t * 0.18;
      grp.children.forEach(c => {
        if (c.geometry?.type === 'BoxGeometry') {
          c.rotation.x += c.userData.sp; c.rotation.y += c.userData.sp * 0.7;
          c.position.y += Math.sin(t + c.userData.off) * 0.0022;
        }
      });
      grp.rotation.y += (mx - grp.rotation.y) * 0.04;
      grp.rotation.x += (-my - grp.rotation.x) * 0.04;
      oL.intensity = 4 + Math.sin(t * 1.8) * 0.9;
      renderer.render(scene, cam);
    }; tick();
    const onR = () => { const w = el.offsetWidth, h = el.offsetHeight; renderer.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); };
    addEventListener('resize', onR);
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', onM); removeEventListener('resize', onR); renderer.dispose(); };
  }, []);
}

export function useWhyScene(canvasRef) {
  useEffect(() => {
    const el = canvasRef.current; if (!el) return;
    const W = el.offsetWidth, H = el.offsetHeight;
    const renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(W, H);
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(46, W / H, 0.1, 100);
    cam.position.z = 5;
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pL = new THREE.PointLight(0xFF6B1A, 5, 10); pL.position.set(2, 3, 2); scene.add(pL);
    const bL = new THREE.PointLight(0x3355ff, 1.5, 8); bL.position.set(-3, -1, 1); scene.add(bL);
    const grp = new THREE.Group(); scene.add(grp);
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(1.15, 4), new THREE.MeshStandardMaterial({ color: 0x2A2D36, metalness: 1, roughness: 0.06 }));
    const wire = new THREE.Mesh(new THREE.OctahedronGeometry(1.22, 4), new THREE.MeshBasicMaterial({ color: 0xFF6B1A, wireframe: true, transparent: true, opacity: 0.12 }));
    grp.add(core, wire);
    [1.85, 2.4, 2.95].forEach((r, i) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.022, 8, 72), new THREE.MeshStandardMaterial({ color: 0xFF6B1A, emissive: 0xFF3300, emissiveIntensity: i === 0 ? 0.5 : 0.12 }));
      ring.rotation.set((i * Math.PI) / 3.5, (i * Math.PI) / 4.5, 0); grp.add(ring);
    });
    const clock = new THREE.Clock(); let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick); const t = clock.getElapsedTime();
      core.rotation.y = t * 0.35; core.rotation.x = t * 0.18;
      wire.rotation.y = -t * 0.25; wire.rotation.x = -t * 0.12;
      grp.children.forEach((c, i) => { if (c.geometry?.type === 'TorusGeometry') c.rotation.z = t * (0.25 + i * 0.09); });
      pL.intensity = 4 + Math.sin(t * 1.4) * 0.9; renderer.render(scene, cam);
    }; tick();
    const onR = () => { const w = el.offsetWidth, h = el.offsetHeight; renderer.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); };
    addEventListener('resize', onR);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', onR); renderer.dispose(); };
  }, []);
}

export function useServiceScene(canvasRef, idx) {
  useEffect(() => {
    const el = canvasRef.current; if (!el) return;
    const W = el.offsetWidth, H = el.offsetHeight;
    const renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5)); renderer.setSize(W, H);
    const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(50, W / H, 0.1, 50);
    cam.position.z = 4;
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const pL = new THREE.PointLight(0xFF6B1A, 4, 8); pL.position.set(2, 2, 2); scene.add(pL);
    const bL = new THREE.PointLight(0x2233aa, 1.2, 6); bL.position.set(-2, -2, 1); scene.add(bL);
    const metM = new THREE.MeshStandardMaterial({ color: 0x3A3D45, metalness: 0.95, roughness: 0.1 });
    const shapes = [
      () => new THREE.TorusKnotGeometry(0.9, 0.22, 120, 24, 2, 3),
      () => new THREE.OctahedronGeometry(0.95, 3),
      () => new THREE.IcosahedronGeometry(0.95, 2),
      () => new THREE.TorusGeometry(0.9, 0.28, 20, 60),
      () => new THREE.DodecahedronGeometry(0.95, 1),
    ];
    const grp = new THREE.Group(); scene.add(grp);
    const mesh = new THREE.Mesh(shapes[idx % shapes.length](), metM); grp.add(mesh);
    const wire = new THREE.Mesh(shapes[idx % shapes.length](), new THREE.MeshBasicMaterial({ wireframe: true, color: 0xFF6B1A, transparent: true, opacity: 0.1 })); grp.add(wire);
    const clock = new THREE.Clock(); let raf;
    const tick = () => {
      raf = requestAnimationFrame(tick); const t = clock.getElapsedTime();
      mesh.rotation.x = t * 0.28; mesh.rotation.y = t * 0.2;
      wire.rotation.x = -t * 0.18; wire.rotation.y = t * 0.26;
      pL.intensity = 3.5 + Math.sin(t * 1.6) * 0.8; renderer.render(scene, cam);
    }; tick();
    return () => { cancelAnimationFrame(raf); renderer.dispose(); };
  }, [idx]);
}
