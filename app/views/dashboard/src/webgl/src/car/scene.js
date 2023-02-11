import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {RGBELoader} from 'three/addons/loaders/RGBELoader.js';

import {getViewportSize} from '@huxy/utils';

import sceneImg from './src/scene.hdr';
import ferrariPng from './src/ferrari.png';
import ferrariGlb from './src/ferrari.glb';

const startScene = (areaInfo, mountDom = document.body) => {
  const {width, height} = getViewportSize(mountDom);
  const renderer = new THREE.WebGLRenderer({antialias: true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  const controls = new OrbitControls(camera, renderer.domElement);
  const grid = new THREE.GridHelper(8, 24, 0x333333, 0x000000);

  const wheels = [];

  const setConfigs = () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    mountDom.appendChild(renderer.domElement);

    camera.position.set(4.25, 1.4, -4.5);

    // controls.rotateSpeed = -1.0;
    // controls.enableZoom = true;
    // controls.maxDistance = 3;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);
    // controls.update();

    scene.background = new THREE.Color(0x303841);
    scene.environment = new RGBELoader().load(sceneImg);
    scene.environment.mapping = THREE.EquirectangularReflectionMapping;
    scene.fog = new THREE.Fog(0x303841, 10, 15);

    grid.material.opacity = 0.15;
    grid.material.depthWrite = false;
    grid.material.transparent = true;
    scene.add(grid);

    setMaterials();
  };

  const setMaterials = () => {
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf5222d,
      metalness: 1.0,
      roughness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      sheen: 0.5,
    });
    const detailsMaterial = new THREE.MeshStandardMaterial({
      color: 0x1890ff,
      metalness: 1.0,
      roughness: 0.5,
    });
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfadb14,
      metalness: 0.25,
      roughness: 0,
      transmission: 1.0,
    });

    areaInfo[0].setColor = value => bodyMaterial.color.set(value);
    areaInfo[1].setColor = value => detailsMaterial.color.set(value);
    areaInfo[2].setColor = value => glassMaterial.color.set(value);

    const shadow = new THREE.TextureLoader().load(ferrariPng);
    const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    // dracoLoader.setDecoderPath('three/addons/libs/draco/gltf/');
    // dracoLoader.setDecoderPath('http://uploads.ihuxy.com/draco-gltf/');
    dracoLoader.setDecoderPath('https://ihuxy.com/uploads/draco-gltf/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(ferrariGlb, gltf => {
      const carModel = gltf.scene.children[0];
      carModel.getObjectByName('body').material = bodyMaterial;
      carModel.getObjectByName('rim_fl').material = detailsMaterial;
      carModel.getObjectByName('rim_fr').material = detailsMaterial;
      carModel.getObjectByName('rim_rr').material = detailsMaterial;
      carModel.getObjectByName('rim_rl').material = detailsMaterial;
      carModel.getObjectByName('trim').material = detailsMaterial;
      carModel.getObjectByName('glass').material = glassMaterial;
      wheels.push(
        carModel.getObjectByName('wheel_fl'),
        carModel.getObjectByName('wheel_fr'),
        carModel.getObjectByName('wheel_rl'),
        carModel.getObjectByName('wheel_rr'),
      );
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
        new THREE.MeshBasicMaterial({
          map: shadow,
          blending: THREE.MultiplyBlending,
          toneMapped: false,
          transparent: true,
        }),
      );
      mesh.rotation.x = - Math.PI / 2;
      mesh.renderOrder = 2;
      carModel.add(mesh);
      scene.add(carModel);
    });
  };

  const onResize = () => {
    const {width, height} = getViewportSize(mountDom);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();

    const time = - performance.now() / 1000;
    for (let i = 0; i < wheels.length; i ++) {
      wheels[i].rotation.x = time * Math.PI * 2;
    }
    grid.position.z = - time % 1;

    renderer.render(scene, camera);
  };

  const start = () => {
    setConfigs();
    animate();
    window.addEventListener('resize', onResize, false);
    return () => window.removeEventListener('resize', onResize, false);
  };
  return start();
};

export default startScene;
