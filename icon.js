import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// set renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// set camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

//const textureLoader = new THREE.TextureLoader();

// set scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe3dac9);
// scene.background = textureLoader.load("../textures/pic (8).jpg");

let controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 0, 100);
controls.update();

const light = new THREE.AmbientLight("white"); // soft white light
scene.add(light);

const tsGroup = new THREE.Group();
const electronGroup = new THREE.Group();
const threeGroup = new THREE.Group();
const viteGroup = new THREE.Group();
const tailwindGroup = new THREE.Group();

let loader = new GLTFLoader();

loader.load("../models/TS_final2.glb", function (glb) {
	let tsModel = glb.scene;
	tsModel.scale.set(1 / 3, 1 / 3, 1 / 3);

	tsModel.rotation.x = Math.PI / 2;

	tsGroup.add(tsModel);

	let tsModel2 = tsModel.clone();
	tsModel2.rotation.z = Math.PI;
	tsModel2.position.z += 0.05;

	tsGroup.add(tsModel2);

	scene.add(tsGroup);
});

loader.load("../models/electron.glb", function (glb) {
	let electronModel = glb.scene;
	electronModel.scale.set(1 / 3, 1 / 3, 1 / 3);

	electronModel.rotation.x = Math.PI / 2;

	electronGroup.add(electronModel);

	let electronModel2 = electronModel.clone();
	electronModel2.rotation.z = Math.PI;
	electronModel2.position.z += 0.05;

	electronGroup.add(electronModel2);

	electronGroup.position.x = 3;

	scene.add(electronGroup);
});

loader.load("../models/three.glb", function (glb) {
	let threeModel = glb.scene;
	threeModel.scale.set(1 / 3, 1 / 3, 1 / 3);

	threeModel.rotation.x = Math.PI / 2;

	threeGroup.add(threeModel);

	threeGroup.position.x = -3;

	scene.add(threeGroup);
});

loader.load("../models/vite.gltf", function (gltf) {
	let viteModel = gltf.scene;
	viteModel.scale.set(1 / 3, 1 / 3, 1 / 3);

	viteModel.rotation.x = Math.PI / 2;

	viteGroup.add(viteModel);

	let viteModel2 = viteModel.clone();
	viteModel2.rotation.z = Math.PI;
	viteModel2.position.z += 0.05;
	viteModel2.scale.x *= -1;

	viteGroup.add(viteModel2);

	viteGroup.position.y = 2.5;

	scene.add(viteGroup);
});

loader.load("../models/tailwind.gltf", function (gltf) {
	let tailwindModel = gltf.scene;
	tailwindModel.scale.set(1 / 3, 1 / 3, 1 / 3);

	tailwindModel.rotation.x = Math.PI / 2;

	tailwindGroup.add(tailwindModel);

	tailwindGroup.position.y = -2.5;

	scene.add(tailwindGroup);
});

// set camera pos
camera.position.z = 5;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// // // // // // // // // // // // // // // // // // // // // // // //

// main animation loop
function animate() {
	requestAnimationFrame(animate);
	// controls.update();

	threeGroup.rotation.y -= 0.01;
	viteGroup.rotation.y -= 0.01;
	tsGroup.rotation.y += 0.01;
	tailwindGroup.rotation.y -= 0.01;
	electronGroup.rotation.y -= 0.01;

	threeGroup.rotation.x -= 0.01;
	viteGroup.rotation.x -= 0.01;
	tsGroup.rotation.x += 0.01;
	tailwindGroup.rotation.x -= 0.01;
	electronGroup.rotation.x -= 0.01;

	threeGroup.rotation.z -= 0.02;
	viteGroup.rotation.z -= 0.02;
	tsGroup.rotation.z += 0.02;
	tailwindGroup.rotation.z -= 0.02;
	electronGroup.rotation.z -= 0.02;

	// tsModel.rotation.z += 0.01;
	// electronModel.rotation.y += 0.01;

	renderer.render(scene, camera);
}

// // // // // // // // // // // // // // // // // // // // // // // //

// check for compatibility
if (WebGL.isWebGLAvailable()) {
	// Initiate function or other initializations here
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById("container").appendChild(warning);
}
