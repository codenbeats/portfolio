"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const TILE_SIZE = 1;
const TILE_GAP = 0.08;
const TILE_HEIGHT = 0.15;
const COLS = 80;
const ROWS = 50;
const CURSOR_RADIUS = 6;
const MAX_LIFT = 1.8;
const EASE_UP = 0.1;
const EASE_DOWN = 0.03;
const WAVE_SPEED = 0.0008;
const WAVE_SCALE = 0.35;

interface TileData {
    elevation: number;
    targetElevation: number;
}

export function InteractiveGrid({ className }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cleanupRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(40, el.clientWidth / el.clientHeight, 0.1, 300);
        camera.position.set(2, 3, 5);
        camera.lookAt(0, 0, -1);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(el.clientWidth, el.clientHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        el.appendChild(renderer.domElement);
        renderer.domElement.style.pointerEvents = "none";

        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambient);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(15, 20, 10);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.set(1024, 1024);
        dirLight.shadow.camera.near = 1;
        dirLight.shadow.camera.far = 80;
        dirLight.shadow.camera.left = -60;
        dirLight.shadow.camera.right = 60;
        dirLight.shadow.camera.top = 60;
        dirLight.shadow.camera.bottom = -60;
        scene.add(dirLight);

        const groundGeo = new THREE.PlaneGeometry(200, 200);
        const groundMat = new THREE.ShadowMaterial({ opacity: 0.15 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.01;
        ground.receiveShadow = true;
        scene.add(ground);

        const step = TILE_SIZE + TILE_GAP;
        const gridW = COLS * step;
        const gridH = ROWS * step;
        const offsetX = -gridW / 2;
        const offsetZ = -gridH / 2;

        const tileGeo = new THREE.BoxGeometry(TILE_SIZE, TILE_HEIGHT, TILE_SIZE);
        tileGeo.translate(0, TILE_HEIGHT / 2, 0);

        let isDark = document.documentElement.classList.contains("dark-mode");

        const lightMat = new THREE.MeshStandardMaterial({
            color: 0xf3f4f9,
            roughness: 0.8,
            metalness: 0.0,
        });
        const darkMat = new THREE.MeshStandardMaterial({
            color: 0x2a2f42,
            roughness: 0.55,
            metalness: 0.1,
        });
        const lightActiveMat = new THREE.MeshStandardMaterial({
            color: 0xe8eaf5,
            roughness: 0.6,
            metalness: 0.0,
        });
        const darkActiveMat = new THREE.MeshStandardMaterial({
            color: 0x3d4568,
            roughness: 0.4,
            metalness: 0.15,
        });

        const tileData: TileData[] = [];
        const meshes: THREE.Mesh[] = [];

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const mesh = new THREE.Mesh(tileGeo, isDark ? darkMat : lightMat);
                mesh.position.set(offsetX + c * step + TILE_SIZE / 2, 0, offsetZ + r * step + TILE_SIZE / 2);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                scene.add(mesh);
                meshes.push(mesh);
                tileData.push({ elevation: 0, targetElevation: 0 });
            }
        }

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2(-9999, -9999);
        const hitPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
        const hitPoint = new THREE.Vector3();
        let cursorWorld = new THREE.Vector3(-9999, 0, -9999);

        const applyTheme = () => {
            isDark = document.documentElement.classList.contains("dark-mode");
            scene.background = null;
            ambient.intensity = isDark ? 0.4 : 1.5;
            dirLight.intensity = isDark ? 0.6 : 1.2;
            groundMat.opacity = isDark ? 0.25 : 0.12;
        };
        applyTheme();

        const themeObserver = new MutationObserver(applyTheme);
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        const heroContainer = el.parentElement;

        const onMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(pointer, camera);
            if (raycaster.ray.intersectPlane(hitPlane, hitPoint)) {
                cursorWorld = hitPoint.clone();
            }
        };

        const onMouseLeave = () => {
            cursorWorld = new THREE.Vector3(-9999, 0, -9999);
        };

        if (heroContainer) {
            heroContainer.addEventListener("mousemove", onMouseMove);
            heroContainer.addEventListener("mouseleave", onMouseLeave);
        }

        const onResize = () => {
            const w = el.clientWidth;
            const h = el.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        const startTime = Date.now();
        let rafId = 0;

        const animate = () => {
            rafId = requestAnimationFrame(animate);
            const elapsed = Date.now() - startTime;

            for (let i = 0; i < meshes.length; i++) {
                const mesh = meshes[i];
                const data = tileData[i];
                const wx = mesh.position.x;
                const wz = mesh.position.z;

                const w1 = Math.sin(wx * 0.3 + elapsed * WAVE_SPEED) *
                    Math.cos(wz * 0.25 + elapsed * WAVE_SPEED * 0.8);
                const w2 = Math.sin((wx + wz) * 0.15 + elapsed * WAVE_SPEED * 0.6);
                const w3 = Math.sin(wx * 0.2 - elapsed * WAVE_SPEED * 0.4) *
                    Math.sin(wz * 0.35 + elapsed * WAVE_SPEED * 1.1);
                const ambientTarget = Math.max(0, w1 * WAVE_SCALE + w2 * WAVE_SCALE * 0.4 + w3 * WAVE_SCALE * 0.25);

                const dx = cursorWorld.x - wx;
                const dz = cursorWorld.z - wz;
                const dist = Math.sqrt(dx * dx + dz * dz);
                let cursorTarget = 0;
                if (dist < CURSOR_RADIUS) {
                    const t = 1 - dist / CURSOR_RADIUS;
                    cursorTarget = t * t * MAX_LIFT;
                }

                data.targetElevation = Math.max(cursorTarget, ambientTarget);
                const ease = data.targetElevation > data.elevation ? EASE_UP : EASE_DOWN;
                data.elevation += (data.targetElevation - data.elevation) * ease;

                mesh.position.y = data.elevation;
                mesh.scale.y = 1 + data.elevation * 0.5;

                const isActive = data.elevation > 0.15;
                const baseMat = isDark ? darkMat : lightMat;
                const activeMat = isDark ? darkActiveMat : lightActiveMat;
                if (isActive && mesh.material !== activeMat) {
                    mesh.material = activeMat;
                } else if (!isActive && mesh.material !== baseMat) {
                    mesh.material = baseMat;
                }
            }

            renderer.render(scene, camera);
        };

        animate();

        cleanupRef.current = () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", onResize);
            if (heroContainer) {
                heroContainer.removeEventListener("mousemove", onMouseMove);
                heroContainer.removeEventListener("mouseleave", onMouseLeave);
            }
            themeObserver.disconnect();
            renderer.dispose();
            tileGeo.dispose();
            lightMat.dispose();
            darkMat.dispose();
            lightActiveMat.dispose();
            darkActiveMat.dispose();
            groundMat.dispose();
            groundGeo.dispose();
            if (el.contains(renderer.domElement)) {
                el.removeChild(renderer.domElement);
            }
        };

        return () => {
            cleanupRef.current?.();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={className}
            aria-hidden="true"
        />
    );
}
