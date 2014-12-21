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
    scene = new THREE.Scene;
   
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 50;
    camera.position.y = 200;
    camera.position.z = 0;
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xdddddd, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    cameraControl = new THREE.OrbitControls(camera);

    // Lumière
    addLight();

    // Plateau de jeu
    makeChessBoard();

    document.body.appendChild(renderer.domElement);
    
    camera.lookAt(scene.position);
    render();
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
    var compteur = 1;
    var middleCase;
    for(var i=0; i < 10; i++){
        for (var j = 0; j < 10; j++) {

            var chessCaseColor = '#E8D0AA'; // marron clair
            var pieceColor = 'white';

            if (i % 2 == 0  && j % 2 == 0 || i % 2 == 1 && j % 2 == 1) {

                //console.log(compteur);

                chessCaseColor = '#827467'; // marron foncé

                if (j > 5) {
                    pieceColor = 'black';
                }

                var chessCase = new ChessCase(j ,i , chessCaseColor, compteur);

                if (j != 4 && j != 5)  {
                    chessCase.addPiece(pieceColor);
                }

                if (compteur == 28) {
                    middleCase = chessCase;
                }
                compteur++;
            }
            else {
                var chessCase = new ChessCase(j ,i , chessCaseColor, 999);
            }

            
            this.scene.add(chessCase.chessCaseMesh);

        }
    }
    console.log(middleCase.getMesh().position.x);
    console.log(middleCase.getMesh().position.y);
    console.log(middleCase.getMesh().position.z);
}





