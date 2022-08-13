import {useEffect, useState, useRef} from 'react';
import {Spinner} from '@huxy/components';

const pics = [
  require('@common/images/webgl/front.jpg'),
  require('@common/images/webgl/back.jpg'),
  require('@common/images/webgl/up.jpg'),
  require('@common/images/webgl/down.jpg'),
  require('@common/images/webgl/left1.jpg'),
  require('@common/images/webgl/right.jpg'),
];

/* const styles={
  position:'fixed',
  left:0,
  top:0,
  width:'100vw',
  height:'100vh',
  zIndex:10003,
}; */

const Index = props => {
  let renderer, scene, camera, controls;
  const panorama = useRef();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getThree = async () => {
      setLoading(true);
      const THREE = await import('three');
      const {OrbitControls} = await import('three/examples/jsm/controls/OrbitControls');
      setLoading(false);
      init(THREE, OrbitControls);
      animate();
    };
    getThree();
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);
  const getMaterial = THREE => {
    const materialArray = [];
    pics.map(pic => {
      const texture = new THREE.TextureLoader().load(pic);
      const material = new THREE.MeshBasicMaterial({map: texture});
      materialArray.push(material);
      material.side = THREE.BackSide;
    });
    return materialArray;
  };
  const init = (THREE, OrbitControls) => {
    renderer = new THREE.WebGLRenderer();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);
    controls = new OrbitControls(camera, renderer.domElement);

    const mounted = panorama.current; // document.body;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mounted.appendChild(renderer.domElement);

    camera.position.z = 0.01;

    controls.enableZoom = true;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.rotateSpeed = -1.0;
    controls.maxDistance = 0.5;

    const materialArray = getMaterial(THREE);

    const skyboxGeo = new THREE.BoxGeometry(1, 1, 1);
    const skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);

    window.addEventListener('resize', onWindowResize);
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  return (
    <>
      {loading && <Spinner global />}
      <div ref={panorama} />
    </>
  );
};

export default Index;
