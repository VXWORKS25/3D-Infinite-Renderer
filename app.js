import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';

const container = document.getElementById('app');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);
scene.fog = new THREE.Fog(0xf0f0f0, 18, 60);

const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 4.5, 11);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
container.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambient);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const rimLight = new THREE.DirectionalLight(0xffb347, 0.9);
rimLight.position.set(-8, 6, -4);
scene.add(rimLight);

const groundGroup = new THREE.Group();
scene.add(groundGroup);

const laneMaterial = new THREE.MeshStandardMaterial({
  color: 0x171717,
  roughness: 0.9,
  metalness: 0.1,
});

const glowMaterial = new THREE.MeshStandardMaterial({
  color: 0x8b1f1f,
  emissive: 0x3b0b0b,
  metalness: 0.2,
  roughness: 0.7,
});

for (let i = 0; i < 90; i++) {
  const lane = new THREE.Mesh(new THREE.BoxGeometry(18, 0.35, 4), laneMaterial);
  lane.position.set(0, -0.7, -i * 8);
  groundGroup.add(lane);

  const strip = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.02, 0.5), glowMaterial);
  strip.position.set(0, -0.3, -i * 8);
  groundGroup.add(strip);
}

const character = new THREE.Group();
scene.add(character);

const skullMat = new THREE.MeshStandardMaterial({
  color: 0xe5dcc5,
  roughness: 0.75,
  metalness: 0.12,
});

const boneMat = new THREE.MeshStandardMaterial({
  color: 0xf1e3bf,
  roughness: 0.8,
  metalness: 0.08,
});

const suitMat = new THREE.MeshStandardMaterial({
  color: 0x8d0d10,
  roughness: 0.8,
  metalness: 0.18,
});

const tieMat = new THREE.MeshStandardMaterial({
  color: 0x4d0a0a,
  roughness: 0.5,
  metalness: 0.1,
});

const shirtMat = new THREE.MeshStandardMaterial({
  color: 0xf6f4f0,
  roughness: 0.9,
  metalness: 0.04,
});

const shoeMat = new THREE.MeshStandardMaterial({
  color: 0x331a0d,
  roughness: 0.85,
  metalness: 0.08,
});

const head = new THREE.Mesh(new THREE.SphereGeometry(1.34, 48, 48), skullMat);
head.scale.set(1.15, 1.22, 1.05);
head.position.y = 5.8;
character.add(head);

const jaw = new THREE.Mesh(new THREE.SphereGeometry(1.02, 36, 36), boneMat);
jaw.scale.set(1.1, 0.5, 1.1);
jaw.position.set(0, 4.65, 0.1);
character.add(jaw);

const eyeGeo = new THREE.SphereGeometry(0.18, 18, 18);
const eyeMat = new THREE.MeshStandardMaterial({
  color: 0xff8d00,
  emissive: 0xff5d00,
  emissiveIntensity: 1.3,
  roughness: 0.5,
});

const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
leftEye.position.set(-0.42, 6.05, 1.1);
const rightEye = leftEye.clone();
rightEye.position.x = 0.42;
character.add(leftEye, rightEye);

const nose = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.8, 20), boneMat);
nose.rotation.x = Math.PI / 2;
nose.position.set(0, 5.3, 1.15);
character.add(nose);

const torso = new THREE.Mesh(new THREE.CapsuleGeometry(1.9, 4.4, 8, 20), suitMat);
torso.position.y = 2.1;
character.add(torso);

const shirt = new THREE.Mesh(new THREE.BoxGeometry(1.75, 3.6, 1.8), shirtMat);
shirt.position.set(0, 2.15, 0.8);
character.add(shirt);

const tie = new THREE.Mesh(new THREE.ConeGeometry(0.35, 2.0, 20), tieMat);
tie.rotation.x = Math.PI / 2;
tie.position.set(0, 1.8, 1.28);
character.add(tie);

const abdomen = new THREE.Mesh(new THREE.SphereGeometry(1.7, 30, 30), suitMat);
abdomen.scale.set(1.3, 1.05, 1.1);
abdomen.position.set(0, 0.1, 0.15);
character.add(abdomen);

const leftArm = new THREE.Group();
const leftUpperArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 2.3, 8, 18), suitMat);
leftUpperArm.rotation.z = 0.4;
leftUpperArm.position.set(-2.3, 2.8, 0.1);
leftArm.add(leftUpperArm);

const leftForearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.52, 2.6, 8, 18), boneMat);
leftForearm.rotation.z = 0.2;
leftForearm.position.set(-3.1, 0.9, 0.2);
leftArm.add(leftForearm);

const leftHand = new THREE.Mesh(new THREE.SphereGeometry(0.48, 16, 16), boneMat);
leftHand.position.set(-3.4, -0.5, 0.3);
leftArm.add(leftHand);
character.add(leftArm);

const rightArm = leftArm.clone();
rightArm.position.x = 0;
rightArm.scale.x = -1;
rightArm.position.z = 0;
character.add(rightArm);

const leftLeg = new THREE.Group();
const leftThigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.72, 3.5, 8, 18), suitMat);
leftThigh.position.set(-0.8, -2.6, 0.1);
leftLeg.add(leftThigh);

const leftCalf = new THREE.Mesh(new THREE.CapsuleGeometry(0.7, 3.8, 8, 18), suitMat);
leftCalf.position.set(-0.85, -5.7, 0.2);
leftLeg.add(leftCalf);

const leftFoot = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.7, 2.2), shoeMat);
leftFoot.position.set(-0.9, -8.15, 0.55);
leftLeg.add(leftFoot);
character.add(leftLeg);

const rightLeg = leftLeg.clone();
rightLeg.position.x = 1.6;
rightLeg.scale.x = -1;
character.add(rightLeg);

const shoulders = new THREE.Mesh(new THREE.SphereGeometry(1.7, 32, 32), suitMat);
shoulders.scale.set(1.2, 0.7, 1.1);
shoulders.position.set(0, 3.9, 0.1);
character.add(shoulders);

const collar = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.18, 12, 32, Math.PI), shirtMat);
collar.rotation.x = Math.PI / 2;
collar.position.set(0, 3.35, 1.0);
character.add(collar);

const chestButtons = [];
for (let i = 0; i < 4; i++) {
  const button = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), new THREE.MeshStandardMaterial({ color: 0x3c0d0d }));
  button.position.set(-0.48 + i * 0.32, 2.25 - i * 0.15, 1.46);
  chestButtons.push(button);
  character.add(button);
}

const leftHandBone = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.8, 4, 10), boneMat);
leftHandBone.rotation.z = -0.5;
leftHandBone.position.set(-3.65, -0.6, 0.15);
character.add(leftHandBone);

const rightHandBone = leftHandBone.clone();
rightHandBone.position.x = 3.65;
rightHandBone.rotation.z = 0.5;
character.add(rightHandBone);

character.position.set(0, 0.4, 0);
character.rotation.y = Math.PI;

const particleCount = 180;
const particleGeo = new THREE.BufferGeometry();
const positions = [];
for (let i = 0; i < particleCount; i++) {
  positions.push((Math.random() - 0.5) * 60, Math.random() * 20, (Math.random() - 0.5) * 60);
}
particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const particles = new THREE.Points(
  particleGeo,
  new THREE.PointsMaterial({ color: 0x8a8a8a, size: 0.08, transparent: true, opacity: 0.9 })
);
scene.add(particles);

const clock = new THREE.Clock();

function animate() {
  const t = clock.getElapsedTime();

  camera.position.x = Math.sin(t * 0.55) * 2.6;
  camera.position.y = 4.6 + Math.sin(t * 0.9) * 0.45;
  camera.lookAt(0, 1.6, 0);

  character.rotation.y = Math.PI + Math.sin(t * 0.8) * 0.4;
  character.position.y = 0.2 + Math.sin(t * 1.8) * 0.12;

  leftArm.rotation.z = -0.8 + Math.sin(t * 1.8) * 0.12;
  rightArm.rotation.z = 0.8 - Math.sin(t * 1.8) * 0.12;

  groundGroup.position.z = (t * 12) % 8;
  particles.rotation.y = t * 0.06;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
