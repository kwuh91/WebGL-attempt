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
	0.00001,
	100000000
);

// set scene
const scene = new THREE.Scene();

let controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 0, 5);
controls.update();

// set camera pos
camera.position.z = 20;

const material = new THREE.LineBasicMaterial({
	color: 0x0000ff,
});

let axiom = "F";
let tempAx = "";
let logic = {
	F: "-F++F-",
};
let i = 0;

let initialState = new THREE.Vector3(-100, 0, 0);

for (let i = 0; i < 15; i++) {
	for (let j of axiom) {
		if (j in logic) tempAx += logic[j];
		else tempAx += j;
	}
	axiom = tempAx;
	tempAx = "";
}

const lines = [];
let geometry;

for (let k of axiom) {
	// console.log(k);
	if (k == "+") {
		// console.log("плюс блядь");
		geometry = new THREE.Vector3(initialState.x + 45, initialState.y, 0);

		initialState = new THREE.Vector3(
			initialState.x + 45,
			initialState.y,
			0
		);
	} else if (k == "-") {
		geometry = new THREE.Vector3(initialState.x - 45, initialState.y, 0);
		initialState = new THREE.Vector3(
			initialState.x - 45,
			initialState.y,
			0
		);
	} else {
		geometry = new THREE.Vector3(initialState.x, initialState.y + 1, 0);

		initialState = new THREE.Vector3(initialState.x, initialState.y + 1, 0);
	}
	lines.push(geometry);
	// console.log(initialState);
}

// // // // // // // // // // // // // // // // // // // // // // // //
i = 0;
let len = lines.length;
// main animation loop
function animate() {
	requestAnimationFrame(animate);

	const geometry = new THREE.BufferGeometry().setFromPoints(
		lines.slice(i, i + 2)
	);

	// console.log(lines.slice(i, i + 2));

	const line = new THREE.Line(geometry, material);
	scene.add(line);

	if (i + 2 < len) i += 1;

	// console.log(i);

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
