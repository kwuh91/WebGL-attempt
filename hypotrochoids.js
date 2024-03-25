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
camera.position.z = 45;

const material = new THREE.LineBasicMaterial({
	color: 0x0000ff,
});

const points = [];

let t = 0;
// let R = THREE.MathUtils.randFloat(1, 100);
// let r = THREE.MathUtils.randFloat(1, 100);
// let d = THREE.MathUtils.randFloat(1, 100);

let R = 7;
let r = 4;
let d = 1;

let increment = THREE.MathUtils.randFloat(1.1, 100);
let limit = increment * 60 * 10 * 2;

points.push(hypotrochoid(t, R, r, d));

// // // // // // // // // // // // // // // // // // // // // // // //

// main animation loop
function animate() {
	requestAnimationFrame(animate);

	if (t >= limit) {
		t = 0;
		increment = THREE.MathUtils.randFloat(1.1, 100);
		limit = increment * 60 * 10 * 2;

		// R = THREE.MathUtils.randFloat(1, 100);
		// r = THREE.MathUtils.randFloat(1, 100);
		// d = THREE.MathUtils.randFloat(1, 100);

		while (scene.children.length > 0) {
			scene.remove(scene.children[0]);
		}
	}

	t += increment;
	points.push(hypotrochoid(t, R, r, d));

	let len = points.length;

	const geometry = new THREE.BufferGeometry().setFromPoints(
		points.slice(len - 2, len)
	);

	const line = new THREE.Line(geometry, material);
	scene.add(line);

	renderer.render(scene, camera);
}

// // // // // // // // // // // // // // // // // // // // // // // //

function hypotrochoid(t, R, r, d) {
	let x = (R - r) * Math.cos(t) + d * Math.cos(((R - r) * t) / r);
	let y = (R - r) * Math.sin(t) - d * Math.sin(((R - r) * t) / r);

	return new THREE.Vector3(x, y, 0);
}

// check for compatibility
if (WebGL.isWebGLAvailable()) {
	// Initiate function or other initializations here
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById("container").appendChild(warning);
}
