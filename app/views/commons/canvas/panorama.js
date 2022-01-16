import {useEffect, useState} from 'react';
import Spinner from 'ihuxy-components/spinner';
const Index = (props) => {
  let camera, controls;
  let renderer;
  let scene;
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
  }, []);
  const init = async (THREE, OrbitControls) => {
    // const container = panorama.current;
    const mounted = document.body;

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mounted.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 100);

    camera.position.z = 0.01;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.rotateSpeed = -1.0;
    controls.maxDistance = 0.5;

    // const textures = getTexturesFromAtlasFile( "images/cubemap-miami.jpg", 6 );

    // const materials = [];

    // for ( let i = 0; i < 6; i ++ ) {

    //   materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] } ) );

    // }
    const front = await import('@common/images/webgl/front.jpg');
    const back = await import('@common/images/webgl/back.jpg');
    const up = await import('@common/images/webgl/up.jpg');
    const down = await import('@common/images/webgl/down.jpg');
    const left1 = await import('@common/images/webgl/left1.jpg');
    const right = await import('@common/images/webgl/right.jpg');
    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load(front.default);
    let texture_bk = new THREE.TextureLoader().load(back.default);
    let texture_up = new THREE.TextureLoader().load(up.default);
    let texture_dn = new THREE.TextureLoader().load(down.default);
    let texture_rt = new THREE.TextureLoader().load(left1.default);
    let texture_lf = new THREE.TextureLoader().load(right.default);

    materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));

    for (let i = 0; i < 6; i++) {
      materialArray[i].side = THREE.BackSide;
    }

    let skyboxGeo = new THREE.BoxGeometry(1, 1, 1);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);

    // const skyBox = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials );
    // skyBox.geometry.scale( 1, 1, - 1 );
    // scene.add( skyBox );

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
  return loading ? <Spinner global /> : <div />;
};

export default Index;
