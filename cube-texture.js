import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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

// set scene
const scene = new THREE.Scene();

let controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 0, 100);
controls.update();

// set camera pos
camera.position.z = 1.5;

const loader = new THREE.CubeTextureLoader();
loader.setPath("textures/");

const textureCube = loader.load([
	"cat4.png",
	"cat4.png",
	"cat4.png",
	"cat4.png",
	"cat4.png",
	"cat4.png",
]);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	envMap: textureCube,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// // // // // // // // // // // // // // // // // // // // // // // //

// main animation loop
function animate() {
	requestAnimationFrame(animate);
	// controls.update();

	cube.rotation.x += 0.0025;
	cube.rotation.y += 0.0025;
	cube.rotation.z += 0.0025;

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
