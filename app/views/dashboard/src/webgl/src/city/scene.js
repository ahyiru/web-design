import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import {getViewportSize} from '@huxy/utils';

import cityImg from './city.jpg';

const wheelStep = 0.05;
const deltaMax = 12;
const deltaMin = 0;

const startScene = (mountDom = document.body) => {
  const {width, height} = getViewportSize(mountDom);
  const renderer = new THREE.WebGLRenderer({antialias: true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
  const controls = new OrbitControls(camera, renderer.domElement);

  let deltaCount = 0;

  const setConfigs = () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    // renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountDom.appendChild(renderer.domElement);

    camera.position.x = 0.1;

    controls.enablePan = false;
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.maxDistance = 60;
    controls.rotateSpeed = -1.0;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    const geometry = new THREE.SphereGeometry(600, 100, 100);
    geometry.scale(-1, 1, 1);

    const texture = new THREE.TextureLoader().load(cityImg);
    const material = new THREE.MeshBasicMaterial({map: texture});

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);
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
    renderer.render(scene, camera);
  };

  const onMouseWheel = e => {
    // e.preventDefault();
    const mouseWheel = () => {
      const detail = e.wheelDelta * wheelStep ?? e.wheelDeltaY * wheelStep ?? e.detail * -1;
      camera.fov -= detail;
      camera.fov = Math.max(10, Math.min(100, camera.fov));
    };
    if (e.deltaY < 0) {
      if (deltaCount < deltaMax) {
        mouseWheel();
        deltaCount += 1;
      }
    } else {
      if (deltaCount > deltaMin) {
        mouseWheel();
        deltaCount -= 1;
      }
    }
    camera.updateProjectionMatrix();
  };

  const start = () => {
    setConfigs();
    animate();
    window.addEventListener('resize', onResize, false);
    window.addEventListener('mousewheel', onMouseWheel, false);
    window.addEventListener('DOMMouseScroll', onMouseWheel, false);
    return () => {
      window.removeEventListener('resize', onResize, false);
      window.removeEventListener('mousewheel', onMouseWheel, false);
      window.removeEventListener('DOMMouseScroll', onMouseWheel, false);
    };
  };
  return start();
};

export default startScene;
