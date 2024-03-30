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
camera.position.set(0, 0, 1);
controls.update();

class Cube {
	#cube;
	#cubeEdges;
	constructor(x, y, z, color = Math.random() * 0xffffff) {
		// create cube
		const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
		const cubeMaterial = new THREE.MeshBasicMaterial({
			color: "white", // radom material color
		});
		const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
		cube.position.set(
			x + camera.position.x,
			y + camera.position.y,
			z + camera.position.z
		);
		this.#cube = cube;

		// create edges for a cube
		const edges = new THREE.EdgesGeometry(cubeGeometry);
		const edgesMaterial = new THREE.LineBasicMaterial({
			color: "black",
		});
		const cubeEdges = new THREE.LineSegments(edges, edgesMaterial);
		cubeEdges.position.set(
			x + camera.position.x,
			y + camera.position.y,
			z + camera.position.z
		);
		this.#cubeEdges = cubeEdges;

		// add cube and its edges to a scene
		scene.add(this.#cube);
		scene.add(this.#cubeEdges);
	}
}

class CubeFigure1 {
	constructor(
		moveX = 0,
		moveY = 0,
		moveZ = 0,
		color = Math.random() * 0xffffff
	) {
		// front
		new Cube(1 + moveX, 0 + moveY, -2 + moveZ, color);
		new Cube(-1 + moveX, 0 + moveY, -2 + moveZ, color);
		new Cube(0 + moveX, 1 + moveY, -2 + moveZ, color);
		new Cube(0 + moveX, -1 + moveY, -2 + moveZ, color);

		// back
		new Cube(1 + moveX, 0 + moveY, 2 + moveZ, color);
		new Cube(-1 + moveX, 0 + moveY, 2 + moveZ, color);
		new Cube(0 + moveX, 1 + moveY, 2 + moveZ, color);
		new Cube(0 + moveX, -1 + moveY, 2 + moveZ, color);

		// left
		new Cube(-2 + moveX, 0 + moveY, 1 + moveZ, color);
		new Cube(-2 + moveX, 0 + moveY, -1 + moveZ, color);
		new Cube(-2 + moveX, 1 + moveY, 0 + moveZ, color);
		new Cube(-2 + moveX, -1 + moveY, 0 + moveZ, color);

		// right
		new Cube(2 + moveX, 0 + moveY, 1 + moveZ, color);
		new Cube(2 + moveX, 0 + moveY, -1 + moveZ, color);
		new Cube(2 + moveX, 1 + moveY, 0 + moveZ, color);
		new Cube(2 + moveX, -1 + moveY, 0 + moveZ, color);

		// up
		new Cube(0 + moveX, 2 + moveY, -1 + moveZ, color);
		new Cube(0 + moveX, 2 + moveY, 1 + moveZ, color);
		new Cube(1 + moveX, 2 + moveY, 0 + moveZ, color);
		new Cube(-1 + moveX, 2 + moveY, 0 + moveZ, color);

		// down
		new Cube(0 + moveX, -2 + moveY, -1 + moveZ, color);
		new Cube(0 + moveX, -2 + moveY, 1 + moveZ, color);
		new Cube(1 + moveX, -2 + moveY, 0 + moveZ, color);
		new Cube(-1 + moveX, -2 + moveY, 0 + moveZ, color);
	}
}

class CubeFigure2 {
	constructor(
		moveX = 0,
		moveY = 0,
		moveZ = 0,
		color = Math.random() * 0xffffff
	) {
		// sides
		new CubeFigure1(0 + moveX, 0 + moveY, 0 + moveZ, color);
		new CubeFigure1(5 + moveX, 0 + moveY, 0 + moveZ, color);
		new CubeFigure1(0 + moveX, 5 + moveY, 0 + moveZ, color);
		new CubeFigure1(0 + moveX, 0 + moveY, 5 + moveZ, color);
		new CubeFigure1(-5 + moveX, 0 + moveY, 0 + moveZ, color);
		new CubeFigure1(0 + moveX, -5 + moveY, 0 + moveZ, color);
		new CubeFigure1(0 + moveX, 0 + moveY, -5 + moveZ, color);

		// diagonals
		new CubeFigure1(3 + moveX, 3 + moveY, 3 + moveZ, color);
		new CubeFigure1(-3 + moveX, 3 + moveY, 3 + moveZ, color);
		new CubeFigure1(3 + moveX, -3 + moveY, 3 + moveZ, color);
		new CubeFigure1(3 + moveX, 3 + moveY, -3 + moveZ, color);
		new CubeFigure1(-3 + moveX, -3 + moveY, 3 + moveZ, color);
		new CubeFigure1(3 + moveX, -3 + moveY, -3 + moveZ, color);
		new CubeFigure1(-3 + moveX, 3 + moveY, -3 + moveZ, color);
		new CubeFigure1(-3 + moveX, -3 + moveY, -3 + moveZ, color);
	}
}

class CubeFigure3 {
	constructor(
		moveX = 0,
		moveY = 0,
		moveZ = 0,
		color = Math.random() * 0xffffff
	) {
		new CubeFigure2(0 + moveX, 0 + moveY, 0 + moveZ, color);
		new CubeFigure2(5 * 3 + moveX, 0 + moveY, 0 + moveZ, color);
		new CubeFigure2(0 + moveX, 5 * 3 + moveY, 0 + moveZ, color);
		new CubeFigure2(0 + moveX, 0 + moveY, 5 * 3 + moveZ, color);
		new CubeFigure2(-5 * 3 + moveX, 0 + moveY, 0 + moveZ, color);
		new CubeFigure2(0 + moveX, -5 * 3 + moveY, 0 + moveZ, color);
		new CubeFigure2(0 + moveX, 0 + moveY, -5 * 3 + moveZ, color);

		new CubeFigure2(5 * 3 + moveX, 5 * 3 + moveY, 0 + moveZ, color);
		new CubeFigure2(0 + moveX, 5 * 3 + moveY, 5 * 3 + moveZ, color);
		new CubeFigure2(5 * 3 + moveX, 0 + moveY, 5 * 3 + moveZ, color);
		new CubeFigure2(-5 * 3 + moveX, -5 * 3 + moveY, 0 + moveZ, color);
		new CubeFigure2(0 + moveX, -5 * 3 + moveY, -5 * 3 + moveZ, color);
		new CubeFigure2(-5 * 3 + moveX, 0 + moveY, -5 * 3 + moveZ, color);

		new CubeFigure2(-5 * 3 + moveX, 5 * 3 + moveY, 0 + moveZ, color);
		new CubeFigure2(0 + moveX, -5 * 3 + moveY, 5 * 3 + moveZ, color);
		new CubeFigure2(-5 * 3 + moveX, 0 + moveY, 5 * 3 + moveZ, color);
		new CubeFigure2(5 * 3 + moveX, -5 * 3 + moveY, 0 + moveZ, color);
		new CubeFigure2(0 + moveX, 5 * 3 + moveY, -5 * 3 + moveZ, color);
		new CubeFigure2(5 * 3 + moveX, 0 + moveY, -5 * 3 + moveZ, color);

		new CubeFigure2(5 * 3 + moveX, 5 * 3 + moveY, 5 * 3 + moveZ, color);
		new CubeFigure2(-5 * 3 + moveX, 5 * 3 + moveY, 5 * 3 + moveZ, color);
		new CubeFigure2(5 * 3 + moveX, -5 * 3 + moveY, 5 * 3 + moveZ, color);
		new CubeFigure2(5 * 3 + moveX, 5 * 3 + moveY, -5 * 3 + moveZ, color);

		new CubeFigure2(-5 * 3 + moveX, -5 * 3 + moveY, 5 * 3 + moveZ, color);
		new CubeFigure2(-5 * 3 + moveX, 5 * 3 + moveY, -5 * 3 + moveZ, color);
		new CubeFigure2(5 * 3 + moveX, -5 * 3 + moveY, -5 * 3 + moveZ, color);
		new CubeFigure2(-5 * 3 + moveX, -5 * 3 + moveY, -5 * 3 + moveZ, color);
	}
}

new Cube(0, 0, 0);

new CubeFigure1(0, 10, 0);

new CubeFigure2(0, 10 * 3, 0);

new CubeFigure3(0, 10 * 9, 0);

// // // // // // // // // // // // // // // // // // // // // // // //

// main animation loop
function animate() {
	requestAnimationFrame(animate);

	// camera.position.z = 2;
	// camera.position.z += 0.05;

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
