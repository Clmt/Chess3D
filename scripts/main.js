// global variables
const taillePlateau = 8;
var middleCase;
var chessCaseColor;
var renderer;
var scene;
var camera;
var cameraControl;

// -----------------
// ORIGIN
// -----------------
function init() {
    var tourBlancheGauche;

    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, -50, 0));

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 200;
    camera.position.y = 100;
    camera.position.z = 0;
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xdddddd, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    cameraControl = new THREE.OrbitControls(camera);

    /*
    chessCaseColor = 'red';
    var chessCase = new ChessCase(0 ,0 , chessCaseColor);
    chessCase.addPiece();
    this.scene.add(chessCase.chessCaseMesh);*/

    // ajout de la lumière
    addLight();

   // add objects
    /*var chessBoard = new ChessBoard(scene);
    chessBoard.make();*/


    makeChessBoard();

    document.body.appendChild(renderer.domElement);
    render();
    camera.lookAt(scene.position);
}


// Called when the scene needs to be rendered. Delegates to requestAnimationFrame
// for future renders
function render() {
	cameraControl.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}


// Function handles the resize event. This make sure the camera and the renderer
// are updated at the correct moment.
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// calls the init function when the window is done loading.
window.onload = init;

// calls the handleResize function when the window is resized
window.addEventListener('resize', handleResize, false);


// -----------------
// Methods
// -----------------
function addLight(){
    var ambientLight = new THREE.AmbientLight(0xffffff);
    ambientLight.position.set(10, 20, 20);
    ambientLight.shadowCameraNear = 20;
    ambientLight.shadowCameraFar = 50;
    scene.add(ambientLight);
}

function makeChessBoard() {
    var color;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {

            if (i == 0 && j == 0) {
                color = 'black';
            }
            else
            {
                color = 'white';
            }

            
            
        }   
    }
    var chessCase = new ChessCase(0,0,'black');
    scene.add(chessCase);
}





