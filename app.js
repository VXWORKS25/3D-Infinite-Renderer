import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';
import { GLTFExporter } from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/exporters/GLTFExporter.js';

const container = document.getElementById('app');

//
// SCENE
//
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1b2230);
scene.fog = new THREE.Fog(0x1b2230, 20, 70);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

camera.position.set(7, 5.2, 12);

//
// RENDERER
//
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

container.appendChild(renderer.domElement);

//
// LIGHTS
//
scene.add(new THREE.HemisphereLight(0xffe6c7, 0x182030, 1.8));

const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
keyLight.position.set(6, 10, 8);
scene.add(keyLight);

const warmLight = new THREE.DirectionalLight(0xffa64d, 1.1);
warmLight.position.set(-7, 6, 2);
scene.add(warmLight);

//
// MATERIALS
//
const skinMat = new THREE.MeshStandardMaterial({
  color: 0xc98f68,
  roughness: 0.85
});

const creamMat = new THREE.MeshStandardMaterial({
  color: 0xf2dfb5,
  roughness: 0.9
});

const redMat = new THREE.MeshStandardMaterial({
  color: 0x9e2028,
  roughness: 0.82
});

const blueMat = new THREE.MeshStandardMaterial({
  color: 0x173d79,
  roughness: 0.8
});

const brownMat = new THREE.MeshStandardMaterial({
  color: 0x5a341e,
  roughness: 0.9
});

const bronzeMat = new THREE.MeshStandardMaterial({
  color: 0x9f7040,
  metalness: 0.65,
  roughness: 0.35
});

const darkMat = new THREE.MeshStandardMaterial({
  color: 0x221a17,
  roughness: 0.9
});

const goldMat = new THREE.MeshStandardMaterial({
  color: 0xc59b4c,
  metalness: 0.75,
  roughness: 0.25
});

const eyeMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.4
});

const pupilMat = new THREE.MeshStandardMaterial({
  color: 0x151515,
  roughness: 0.5
});

//
// CHARACTER
//
const character = new THREE.Group();
character.name = 'Character';
scene.add(character);

//
// LOWER BODY
//
const legs = new THREE.Group();
character.add(legs);

const leftLeg = new THREE.Group();
const rightLeg = new THREE.Group();

leftLeg.position.x = -0.72;
rightLeg.position.x = 0.72;

legs.add(leftLeg, rightLeg);

const thighGeo = new THREE.CapsuleGeometry(
  0.46,
  1.75,
  6,
  12
);

const shinGeo = new THREE.CapsuleGeometry(
  0.39,
  1.55,
  6,
  12
);

const leftThigh = new THREE.Mesh(thighGeo, blueMat);
leftThigh.position.y = -2.0;

const rightThigh = new THREE.Mesh(thighGeo, blueMat);
rightThigh.position.y = -2.0;

leftLeg.add(leftThigh);
rightLeg.add(rightThigh);

const leftShin = new THREE.Mesh(shinGeo, creamMat);
leftShin.position.y = -3.6;

const rightShin = new THREE.Mesh(shinGeo, creamMat);
rightShin.position.y = -3.6;

leftLeg.add(leftShin);
rightLeg.add(rightShin);

//
// BOOTS
//
const bootGeo = new THREE.BoxGeometry(
  0.9,
  0.65,
  1.7
);

const leftBoot = new THREE.Mesh(bootGeo, brownMat);
leftBoot.position.set(0, -4.7, 0.32);

const rightBoot = new THREE.Mesh(bootGeo, brownMat);
rightBoot.position.set(0, -4.7, 0.32);

leftLeg.add(leftBoot);
rightLeg.add(rightBoot);

//
// TUNIC
//
const torso = new THREE.Group();
torso.position.y = 0.2;
character.add(torso);

const tunic = new THREE.Mesh(
  new THREE.CapsuleGeometry(
    1.35,
    2.45,
    8,
    16
  ),
  redMat
);

tunic.scale.set(1.0, 1.0, 0.7);
tunic.position.y = -0.2;
torso.add(tunic);

//
// CHEST ARMOR
//
const chestArmor = new THREE.Mesh(
  new THREE.BoxGeometry(
    1.75,
    1.45,
    0.34
  ),
  bronzeMat
);

chestArmor.position.set(0, 0.45, 0.83);
chestArmor.rotation.x = -0.05;
torso.add(chestArmor);

//
// ARMOR CENTER STRAP
//
const centerStrap = new THREE.Mesh(
  new THREE.BoxGeometry(
    0.25,
    1.5,
    0.18
  ),
  goldMat
);

centerStrap.position.set(0, 0.45, 1.04);
torso.add(centerStrap);

//
// BELT
//
const belt = new THREE.Mesh(
  new THREE.CylinderGeometry(
    1.18,
    1.18,
    0.28,
    20
  ),
  brownMat
);

belt.rotation.z = Math.PI / 2;
belt.position.y = -1.05;
torso.add(belt);

const beltBuckle = new THREE.Mesh(
  new THREE.BoxGeometry(
    0.32,
    0.32,
    0.18
  ),
  goldMat
);

beltBuckle.position.set(0, -1.05, 1.12);
torso.add(beltBuckle);

//
// NECK
//
const neck = new THREE.Mesh(
  new THREE.CylinderGeometry(
    0.4,
    0.44,
    0.55,
    12
  ),
  skinMat
);

neck.position.y = 2.1;
character.add(neck);

//
// HEAD
//
const head = new THREE.Mesh(
  new THREE.SphereGeometry(
    1.05,
    24,
    16
  ),
  skinMat
);

head.scale.set(0.95, 1.08, 0.88);
head.position.y = 3.45;
character.add(head);

//
// EARS
//
const earGeo = new THREE.SphereGeometry(
  0.2,
  12,
  8
);

const leftEar = new THREE.Mesh(earGeo, skinMat);
leftEar.position.set(-1.0, 3.45, 0);

const rightEar = new THREE.Mesh(earGeo, skinMat);
rightEar.position.set(1.0, 3.45, 0);

character.add(leftEar, rightEar);

//
// EYES
//
const eyeGeo = new THREE.SphereGeometry(
  0.16,
  12,
  10
);

const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
leftEye.position.set(-0.35, 3.65, 0.86);

const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
rightEye.position.set(0.35, 3.65, 0.86);

character.add(leftEye, rightEye);

const pupilGeo = new THREE.SphereGeometry(
  0.075,
  10,
  8
);

const leftPupil = new THREE.Mesh(
  pupilGeo,
  pupilMat
);

leftPupil.position.set(
  -0.35,
  3.65,
  0.98
);

const rightPupil = new THREE.Mesh(
  pupilGeo,
  pupilMat
);

rightPupil.position.set(
  0.35,
  3.65,
  0.98
);

character.add(leftPupil, rightPupil);

//
// NOSE
//
const nose = new THREE.Mesh(
  new THREE.ConeGeometry(
    0.12,
    0.42,
    10
  ),
  skinMat
);

nose.rotation.x = Math.PI / 2;
nose.position.set(0, 3.42, 1.0);

character.add(nose);

//
// MOUTH
//
const mouth = new THREE.Mesh(
  new THREE.BoxGeometry(
    0.48,
    0.08,
    0.04
  ),
  darkMat
);

mouth.position.set(0, 3.05, 0.96);
character.add(mouth);

//
// HELMET
//
const helmet = new THREE.Group();
helmet.position.y = 4.15;
character.add(helmet);

const helmetTop = new THREE.Mesh(
  new THREE.SphereGeometry(
    1.18,
    20,
    12
  ),
  bronzeMat
);

helmetTop.scale.set(1.05, 0.62, 0.95);
helmet.add(helmetTop);

//
// HELMET FRONT
//
const helmetFront = new THREE.Mesh(
  new THREE.BoxGeometry(
    1.7,
    0.5,
    0.35
  ),
  bronzeMat
);

helmetFront.position.set(0, -0.15, 0.88);
helmet.add(helmetFront);

//
// HELMET CREST
//
const crest = new THREE.Mesh(
  new THREE.BoxGeometry(
    0.3,
    0.95,
    0.8
  ),
  redMat
);

crest.position.set(0, 0.62, 0);
helmet.add(crest);

//
// SHOULDERS
//
const shoulders = new THREE.Group();
character.add(shoulders);

const shoulderGeo = new THREE.SphereGeometry(
  0.62,
  16,
  10
);

const leftShoulderArmor = new THREE.Mesh(
  shoulderGeo,
  bronzeMat
);

leftShoulderArmor.scale.set(1.15, 0.7, 0.95);
leftShoulderArmor.position.set(-1.55, 1.25, 0);

const rightShoulderArmor = new THREE.Mesh(
  shoulderGeo,
  bronzeMat
);

rightShoulderArmor.scale.set(1.15, 0.7, 0.95);
rightShoulderArmor.position.set(1.55, 1.25, 0);

shoulders.add(
  leftShoulderArmor,
  rightShoulderArmor
);

//
// ARMS
//
const leftArm = new THREE.Group();
const rightArm = new THREE.Group();

leftArm.position.set(-1.55, 1.05, 0);
rightArm.position.set(1.55, 1.05, 0);

character.add(leftArm, rightArm);

const upperArmGeo = new THREE.CapsuleGeometry(
  0.34,
  1.2,
  6,
  10
);

const forearmGeo = new THREE.CapsuleGeometry(
  0.31,
  1.1,
  6,
  10
);

const leftUpperArm = new THREE.Mesh(
  upperArmGeo,
  redMat
);

leftUpperArm.position.y = -0.55;

const rightUpperArm = new THREE.Mesh(
  upperArmGeo,
  redMat
);

rightUpperArm.position.y = -0.55;

leftArm.add(leftUpperArm);
rightArm.add(rightUpperArm);

const leftForearm = new THREE.Mesh(
  forearmGeo,
  bronzeMat
);

leftForearm.position.y = -1.65;

const rightForearm = new THREE.Mesh(
  forearmGeo,
  bronzeMat
);

rightForearm.position.y = -1.65;

leftArm.add(leftForearm);
rightArm.add(rightForearm);

//
// HANDS
//
const handGeo = new THREE.SphereGeometry(
  0.32,
  12,
  8
);

const leftHand = new THREE.Mesh(
  handGeo,
  skinMat
);

leftHand.position.y = -2.45;

const rightHand = new THREE.Mesh(
  handGeo,
  skinMat
);

rightHand.position.y = -2.45;

leftArm.add(leftHand);
rightArm.add(rightHand);

//
// CLOTH TAIL
//
const backCloth = new THREE.Mesh(
  new THREE.BoxGeometry(
    1.45,
    2.0,
    0.18
  ),
  blueMat
);

backCloth.position.set(
  0,
  -0.5,
  -0.78
);

character.add(backCloth);

//
// GROUND
//
const ground = new THREE.Mesh(
  new THREE.CylinderGeometry(
    5,
    5,
    0.25,
    32
  ),
  darkMat
);

ground.position.y = -5.05;
scene.add(ground);

//
// DECORATIVE GROUND RINGS
//
for (let i = 0; i < 4; i++) {
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(
      2.3 + i * 0.7,
      0.035,
      8,
      48
    ),
    bronzeMat
  );

  ring.rotation.x = Math.PI / 2;
  ring.position.y = -4.88;
  scene.add(ring);
}

//
// BACKGROUND PARTICLES
//
const particleCount = 120;
const positions = [];

for (let i = 0; i < particleCount; i++) {
  positions.push(
    (Math.random() - 0.5) * 45,
    Math.random() * 18 - 2,
    (Math.random() - 0.5) * 45
  );
}

const particleGeometry = new THREE.BufferGeometry();

particleGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(
    positions,
    3
  )
);

const particles = new THREE.Points(
  particleGeometry,
  new THREE.PointsMaterial({
    color: 0xb9965c,
    size: 0.055,
    transparent: true,
    opacity: 0.7
  })
);

scene.add(particles);

//
// EXPORT TO GLB FUNCTION
//
function exportToGLB() {
  const exporter = new GLTFExporter();
  
  exporter.parse(
    character,
    function(result) {
      saveArrayBuffer(result, 'warrior-character.glb');
    },
    { binary: true }
  );
}

function saveArrayBuffer(buffer, filename) {
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// Add export button to the page
const exportBtn = document.createElement('button');
exportBtn.textContent = '📥 Export GLB';
exportBtn.style.cssText = `
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: rgba(20, 20, 20, 0.7);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  backdrop-filter: blur(6px);
  z-index: 10;
  transition: all 0.3s ease;
`;

exportBtn.onmouseover = () => {
  exportBtn.style.background = 'rgba(40, 40, 40, 0.9)';
  exportBtn.style.borderColor = 'rgba(255, 255, 255, 0.4)';
};

exportBtn.onmouseout = () => {
  exportBtn.style.background = 'rgba(20, 20, 20, 0.7)';
  exportBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
};

exportBtn.onclick = exportToGLB;
document.body.appendChild(exportBtn);

//
// ANIMATION
//
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const t = clock.getElapsedTime();

  //
  // Character breathing
  //
  character.position.y =
    Math.sin(t * 2.0) * 0.035;

  //
  // Gentle body movement
  //
  torso.rotation.z =
    Math.sin(t * 1.5) * 0.018;

  //
  // Arms idle animation
  //
  leftArm.rotation.z =
    -0.08 + Math.sin(t * 2.2) * 0.05;

  rightArm.rotation.z =
    0.08 - Math.sin(t * 2.2) * 0.05;

  //
  // Legs subtle movement
  //
  leftLeg.rotation.x =
    Math.sin(t * 1.5) * 0.025;

  rightLeg.rotation.x =
    -Math.sin(t * 1.5) * 0.025;

  //
  // Helmet crest movement
  //
  crest.rotation.z =
    Math.sin(t * 2.0) * 0.025;

  //
  // Floating particles
  //
  particles.rotation.y = t * 0.025;

  //
  // Camera cinematic movement
  //
  camera.position.x =
    Math.sin(t * 0.35) * 2.0;

  camera.position.y =
    5.0 + Math.sin(t * 0.55) * 0.25;

  camera.position.z = 12;

  camera.lookAt(
    character.position.x,
    0,
    0
  );

  renderer.render(
    scene,
    camera
  );
}

animate();

//
// RESIZE
//
window.addEventListener(
  'resize',
  () => {
    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }
);
