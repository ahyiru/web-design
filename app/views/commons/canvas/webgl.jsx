import {useEffect} from 'react';
import * as THREE from 'three';

const initThree = () => {
  this.renderer.setClearColor();
  this.renderer.setClearColor(new THREE.Color(0xeeeeee));
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.renderer.shadowMapEnabled = true;

  const axes = new THREE.AxesHelper(1000);
  this.scene.add(axes);

  const planeGeometry = new THREE.PlaneGeometry(60, 20);
  const planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;
  this.scene.add(plane);

  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 0;
  cube.castShadow = true;
  this.scene.add(cube);

  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x7777ff});
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;
  sphere.castShadow = true;
  this.scene.add(sphere);

  this.camera.position.x = -30;
  this.camera.position.y = 40;
  this.camera.position.z = 30;
  this.camera.lookAt(this.scene.position);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  this.scene.add(spotLight);

  // this.scene.fog = new THREE.Fog(0xffffff, 0.015, 100);

  document.getElementById('WebGL-output').appendChild(this.renderer.domElement);

  const animationRenderScene = () => {
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;

    this.step += 0.04;
    sphere.position.x = 20 + 10 * Math.cos(this.step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(this.step));

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(animationRenderScene);
  };
  animationRenderScene();

  const renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  this.controls.addEventListener('change', renderScene);
  this.controls.enableDamping = true;
  this.controls.dampingFactor = 0.25;
  this.controls.enableZoom = false;
};

const Index = (props) => {
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        // _OnWindowResize();
      },
      false,
    );
  }, []);
  return <div>webgl</div>;
};

export default Index;
