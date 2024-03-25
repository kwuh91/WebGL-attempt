import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);

const edges = new THREE.EdgesGeometry(geometry);
const material = new THREE.LineBasicMaterial({ color: "white" });
const line1 = new THREE.LineSegments(edges, material);

const lines = [];
lines.push(line1);

for (let i = 0; i < 8; i++) {
	let newline = line1.clone();
	newline.position.z = lines[lines.length - 1].position.z - 1;

	lines.push(newline);
}

for (let line of lines) scene.add(line);

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);

	camera.rotation.z += 0.001;

	for (let i = 0; i < lines.length; i++) {
		lines[i].position.z += 0.01;

		if (lines[i].position.z >= camera.position.z + 0.5) {
			lines[i].position.z =
				lines[(lines.length - 1 + i) % lines.length].position.z - 1;
		}
	}

	renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {
	// Initiate function or other initializations here
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById("container").appendChild(warning);
}
