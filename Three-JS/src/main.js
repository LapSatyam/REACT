import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

const canvas = document.getElementById("canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Loading materials
const loader = new THREE.TextureLoader();
const color = loader.load("./text/color.jpg");
color.colorSpace = THREE.SRGBColorSpace;
color.anisotropy = renderer.capabilities.getMaxAnisotropy();
const rough = loader.load("./text/roughness.jpg");
rough.anisotropy = renderer.capabilities.getMaxAnisotropy();
const normal = loader.load("./text/normal.png");
normal.anisotropy = renderer.capabilities.getMaxAnisotropy();
const height = loader.load("./text/height.png");
height.anisotropy = renderer.capabilities.getMaxAnisotropy();

// Creating a rectangle Geometry
const geometry = new THREE.BoxGeometry(1.8, 0.9, 1, 32, 32, 32);

// Applying materials
const material = new THREE.MeshStandardMaterial({
  map: color,
  roughnessMap: rough,
  normalMap: normal,
  displacementMap: height,
  displacementScale: 0.01,
  metalness: 0.5,
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 2.5;

// Main / Key Light
const keyLight = new THREE.DirectionalLight(0xffffff, 3);
keyLight.position.set(5, 8, 6);
keyLight.target.position.set(0, 0, 0);

scene.add(keyLight);
scene.add(keyLight.target);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
fillLight.position.set(-5, 3, 2);
fillLight.target.position.set(0, 0, 0);

scene.add(fillLight);
scene.add(fillLight.target);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

// Resizer
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.025;
controls.autoRotate = true;

// GUI
const gui = new GUI();

const settings = {
  color: "#00ff00",
  scale: 1,
};

// Change color
gui.addColor(settings, "color").onChange((value) => {
  cube.material.color.set(value);
});

// rotation
gui.add(controls, "autoRotate").name("Auto Rotate");
gui.add(controls, "autoRotateSpeed", 0, 10, 0.1).name("Rotate Speed");

// Change scale
gui.add(settings, "scale", 0.1, 3).onChange((value) => {
  cube.scale.set(value, value, value);
});

// Material
const materialFolder = gui.addFolder("Material");

materialFolder.add(material, "metalness", 0, 2, 0.01);
materialFolder.add(material, "roughness", 0, 1, 0.01);
materialFolder.add(material, "displacementScale", 0, 0.1, 0.001);

// Lighting
const lightFolder = gui.addFolder("Lighting").close();

// ====================
// Key Light
// ====================

const keyFolder = lightFolder.addFolder("Key Light");

keyFolder.add(keyLight, "intensity", 0, 10, 0.1);

keyFolder.addColor(keyLight, "color").name("Color");

keyFolder.add(keyLight.position, "x", -20, 20, 0.1).name("Position X");
keyFolder.add(keyLight.position, "y", -20, 20, 0.1).name("Position Y");
keyFolder.add(keyLight.position, "z", -20, 20, 0.1).name("Position Z");

// ====================
// Fill Light
// ====================

const fillFolder = lightFolder.addFolder("Fill Light").close();

fillFolder.add(fillLight, "intensity", 0, 5, 0.1);

fillFolder.addColor(fillLight, "color").name("Color");

fillFolder.add(fillLight.position, "x", -20, 20, 0.1).name("Position X");
fillFolder.add(fillLight.position, "y", -20, 20, 0.1).name("Position Y");
fillFolder.add(fillLight.position, "z", -20, 20, 0.1).name("Position Z");

// ====================
// Ambient Light
// ====================

const ambientFolder = lightFolder.addFolder("Ambient Light").close();

ambientFolder.add(ambientLight, "intensity", 0, 2, 0.05);

ambientFolder.addColor(ambientLight, "color").name("Color");

// Animation
function animate(time) {
  renderer.render(scene, camera);
  // cube.rotation.x = time / 2000;
  // cube.rotation.y = time / 1000;
  controls.update();
}
renderer.setAnimationLoop(animate);
