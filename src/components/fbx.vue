<template>
  <div id="info">
    <div ref='test'> </div>
	</div>
</template>

<script>
import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';
import {
	OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import {
	FBXLoader
} from 'three/addons/loaders/FBXLoader.js';
const clock = new THREE.Clock();
let mixer;
let camera, scene, renderer, stats;
export default {
	name: 'HelloWorld',
	mounted() {
		this.init();
		this.animate();
	},
	methods: {
		init() {
			const container = this.$refs.test;
			document.body.appendChild(container);
			camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
			camera.position.set(10, 10, 10);

			scene = new THREE.Scene();
			scene.background = new THREE.Color(0xa0a0a0);
			scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);

			const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
			hemiLight.position.set(0, 50, 0);
			scene.add(hemiLight);

			const dirLight = new THREE.DirectionalLight(0xffffff);
			dirLight.position.set(0, 50, 100);
			dirLight.castShadow = true;
			dirLight.shadow.camera.top = 180;
			dirLight.shadow.camera.bottom = -100;
			dirLight.shadow.camera.left = -120;
			dirLight.shadow.camera.right = 120;
			scene.add(dirLight);

			// scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

			// ground
			const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({
				color: 0x999999,
				depthWrite: false
			}));
			mesh.rotation.x = -Math.PI / 2;
			mesh.receiveShadow = true;
			scene.add(mesh);

			const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
			grid.material.opacity = 0.2;
			grid.material.transparent = true;
			scene.add(grid);

			// model
			const loader = new FBXLoader();
			loader.load('models/fbx/test2.fbx', function (object) {

				mixer = new THREE.AnimationMixer(object);

				//애니메이션 삭제
				//const action = mixer.clipAction( object.animations[ 0 ] );
				//action.play();

				object.traverse(function (child) {

					if (child.isMesh) {

						child.castShadow = true;
						child.receiveShadow = true;

					}

				});

				scene.add(object);

			});

			renderer = new THREE.WebGLRenderer({
				antialias: true
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.shadowMap.enabled = true;
			container.appendChild(renderer.domElement);

			const controls = new OrbitControls(camera, renderer.domElement);
			controls.target.set(0, 0, 0);
			controls.update();

			window.addEventListener('resize', this.onWindowResize);

			// stats
			stats = new Stats();
			container.appendChild(stats.dom);
		},
		onWindowResize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(window.innerWidth, window.innerHeight);

		},
		animate() {

			requestAnimationFrame(this.animate);

			const delta = clock.getDelta();

			if (mixer) mixer.update(delta);

			renderer.render(scene, camera);

			stats.update();

		}
	},
	data: () => ({

	}),
}
</script>
