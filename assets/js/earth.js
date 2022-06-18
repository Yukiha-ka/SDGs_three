//! サイズを指定
const width = window.innerWidth;
const height = window.innerHeight;

// ? windowのサイズが変更されたとき
window.addEventListener('resize', resizeWindow);

function resizeWindow() {
  // ? サイズをwindowに合わせる(出来ない。。。)
  renderer.setSize(width, height);
}


// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

function init() {

  const canvasElement = document.querySelector('#myCanvasEarth');
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
  });
  renderer.setSize(width, height);
  renderer.setClearColor(0xffffff, 0);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  // カメラの初期座標を設定
  camera.position.set(0, 0, 1000);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera, canvasElement);
  
    // ?ズーム制御が効かない
  controls.userZoom = false;
  controls.userZoomSpeed = 0.1;

  // 滑らかにカメラコントローラーを制御
  controls.enableDamping = true;
  controls.dampingFactor = 0.02;

  // // 平行光源を作成
  var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.0); // 光源色と光強度を指定して生成
  directionalLight.position.set(20, 20, 100); // 光源位置を設定
  scene.add(directionalLight); // シーンに追加
  
  
  // 環境光源を作成（影の応急処置）
  var ambientLight = new THREE.AmbientLight(0xFFFFFF, 1); // 光源色を指定して生成
  scene.add(ambientLight); // シーンに追加

  // マテリアルを作成
  const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('imgs/earthmap1k.jpg'),
  });

  // 球体の形状を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  // 形状とマテリアルからメッシュを作成
  const earthMesh = new THREE.Mesh(geometry, material);
  // シーンにメッシュを追加
  scene.add(earthMesh);

  tick();

  // 毎フレーム時に実行されるループイベント
  function tick() {
    // 地球は常に回転させておく
    earthMesh.rotation.y += 0.00001;

    // カメラコントローラーを更新
    controls.update();

    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }
}
