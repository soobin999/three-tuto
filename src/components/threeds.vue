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
    computed:{
        windowWidth(){
            return window.innerWidth
        },
        windowHeight(){
            return window.innerHeight
        },
    },
	methods: {
		init() {
		    let container = this.$refs.test;
		    

		    camera = new THREE.PerspectiveCamera(60, this.windowWidth / this.windowHeight, 0.1, 10);
		    camera.position.z = 1;

		    scene = new THREE.Scene();
		    scene.add(new THREE.HemisphereLight());

		    const directionalLight = new THREE.DirectionalLight(0xffeedd);
		    directionalLight.position.set(0, 0, 0);
		    scene.add(directionalLight);

		    //3ds files dont store normal maps
		    const normal = new THREE.TextureLoader().load('models/3ds/portalgun/textures/normal.jpg');

		    const loader = new TDSLoader();
		    loader.setResourcePath('models/3ds/portalgun/textures/');
		    loader.load('models/3ds/portalgun/SB_model.3ds', function (object) {

		        object.traverse(function (child) {
		            if (child.isMesh) {
                        for(let material of child.material){
                            material.specular.setScalar(10);
                            material.normalMap = normal;
                        }
		            }

		        });

		        scene.add(object);

		    });

		    renderer = new THREE.WebGLRenderer();
		    renderer.setPixelRatio(window.devicePixelRatio);
		    renderer.setSize(this.windowWidth, this.windowHeight);
		    renderer.outputEncoding = THREE.sRGBEncoding;
		    container.appendChild(renderer.domElement);

		    controls = new TrackballControls(camera, renderer.domElement);

		    window.addEventListener('resize', this.resize());
		},
		resize() {

			camera.aspect = this.windowWidth / this.windowHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( this.windowWidth, this.windowHeight );

		},
		animate() {

			controls.update();
			renderer.render( scene, camera );

			requestAnimationFrame( this.animate );

		}
	},
	
}
</script>
