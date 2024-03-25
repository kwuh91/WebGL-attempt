import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

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

// set camera pos
camera.position.z = 2.5;
camera.position.y = -0.5;

const material = new THREE.LineBasicMaterial({
	color: 0x0000ff,
});

const points = [];
let T = 0;
let increment = 2;
let limit = 300;

points.push(heartXY(T));

// // // // // // // // // // // // // // // // // // // // // // // //

// main animation loop
function animate() {
	requestAnimationFrame(animate);
	if (T >= limit) {
		T = 0;
		increment *= 2;
		limit *= 2;

		while (scene.children.length > 0) {
			scene.remove(scene.children[0]);
		}
	}

	T += increment;
	points.push(heartXY(T));

	let len = points.length;

	const geometry = new THREE.BufferGeometry().setFromPoints(
		points.slice(len - 2, len)
	);

	const line = new THREE.Line(geometry, material);
	scene.add(line);

	renderer.render(scene, camera);
}

// // // // // // // // // // // // // // // // // // // // // // // //

function heartXY(t) {
	let x = Math.sqrt(2) * Math.pow(Math.sin(t), 3);
	let y =
		-Math.pow(Math.cos(t), 3) - Math.pow(Math.cos(t), 2) + 2 * Math.cos(t);

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
