<template>
  <div id="info">
    <div ref='test'> </div>
	</div>
</template>

<script>
import * as THREE from 'three';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { TDSLoader } from 'three/addons/loaders/TDSLoader.js';
/* eslint-disable */
const clock = new THREE.Clock();
let  controls;
let camera, scene, renderer;
export default {
	name: 'HelloWorld',
	mounted() {
		this.init();
		this.animate();
	},
    data: () => ({

	}),
	methods: {
		init() {
		    let container = this.$refs.test;
		    
		    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10);
		    camera.position.z = 2;

		    scene = new THREE.Scene();
		    scene.add(new THREE.HemisphereLight());

		    const directionalLight = new THREE.DirectionalLight(0xffeedd );
		    directionalLight.position.set(0, 0, 2);
		    scene.add(directionalLight);
			scene.background = new THREE.Color(0xffffff);
		    //3ds files dont store normal maps
		    const normal = new THREE.TextureLoader().load('models/3ds/portalgun/textures/normal.jpg');

		    const loader = new TDSLoader();
		    loader.setResourcePath('models/3ds/portalgun/textures/');
		    loader.load('models/3ds/portalgun/portalgun.3ds', function (object) {
				console.log(object)
		        object.traverse(function (child) {
		            if ( child.isMesh ) {

							child.material.specular.setScalar( 0.1 );
							child.material.normalMap = normal;

						}
					//if (child.isMesh) {
                    //    for(let material of child.material){
                    //        material.specular.setScalar(0.1);
                    //        material.normalMap = normal;
                    //    }
		            //}

		        });
		        scene.add(object);

		    });

		    renderer = new THREE.WebGLRenderer();
		    renderer.setPixelRatio(window.devicePixelRatio);
		    renderer.setSize(window.innerWidth, window.innerHeight);
		    renderer.outputEncoding = THREE.sRGBEncoding;
		    container.appendChild(renderer.domElement);

		    controls = new TrackballControls(camera, renderer.domElement);

		    window.addEventListener('resize', this.resize());
		},
		resize() {

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize(  window.innerWidth, window.innerHeight );

		},
		animate() {

			controls.update();
			renderer.render( scene, camera );

			requestAnimationFrame( () => { this.animate() } );

		}
	},
	
}
</script>
