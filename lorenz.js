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
	10000000
);

// set scene
const scene = new THREE.Scene();

const material = new THREE.LineBasicMaterial({
	color: "red",
});

// set camera pos
camera.position.z = 100;

function lorenz(x, y, z, s = 10, r = 28, b = 2.667) {
	let x_dot = s * (y - x);
	let y_dot = r * x - y - x * z;
	let z_dot = x * y - b * z;

	return new THREE.Vector3(x_dot, y_dot, z_dot);
}

const dt = 0.01;

const XYZ = [new THREE.Vector3(0, 1, 1.05)];

let i = 0;

// // // // // // // // // // // // // // // // // // // // // // // //

let controls = new OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 0, 100);
controls.update();

// main animation loop
function animate() {
	requestAnimationFrame(animate);

	// controls.update();

	let [old_x, old_y, old_z] = [XYZ[i].x, XYZ[i].y, XYZ[i].z];

	let newCoords = lorenz(old_x, old_y, old_z);

	let [new_x, new_y, new_z] = [newCoords.x, newCoords.y, newCoords.z];

	XYZ.push(
		new THREE.Vector3(
			old_x + new_x * dt,
			old_y + new_y * dt,
			old_z + new_z * dt
		)
	);

	const geometry = new THREE.BufferGeometry().setFromPoints(
		XYZ.slice(i, i + 2)
	);

	const line = new THREE.Line(geometry, material);

	scene.add(line);

	i += 1;
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
