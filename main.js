// Scene setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

// Add event listener to window resize
window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
}, false);

// Position the camera
camera.position.z = 5;

// Add OrbitControls for intuitive camera control
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Get points on circle
const getPointOnCircle = (theta, z) => {
    return [Math.cos(theta), Math.sin(theta), z];
}

// Create line geometry and material
const offset = Math.PI*2/3;
const numLines = 40;
const height = 1
var lines = [];
var lineMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
for (let i = 0; i < numLines; i++) {
    var theta = 2 * Math.PI * (i/numLines);
    const [topx, topy, topz] = getPointOnCircle(theta, height);
    const [bottomx, bottomy, bottomz] = getPointOnCircle(theta+offset, -height);

    var lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(topx, topy, topz),
      new THREE.Vector3(bottomx, bottomy, bottomz),
    ]);
    var line = new THREE.Line(lineGeometry, lineMaterial);
    
    lines.push(line)
}

// Add the circle and line to the scene
lines.forEach(line => {
  scene.add(line);
});

// Animation function
function animate() {
  requestAnimationFrame(animate);
  
  controls.update();
  
  renderer.render(scene, camera);
}

// Start the animation
animate();
