// global variables
const taillePlateau = 8;
var middleCase;
var chessCaseColor;
var renderer;
var scene;
var camera;
var cameraControl;
var pieceControl;
var collidablePieceList = [];
var collidableCaseList = [];
var oldColors = [1];
var caseCliquee;
var pieceCliquee;

// -----------------
// ORIGIN
// -----------------
function init() {
    scene = new THREE.Scene;
   
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 200;
    camera.position.y = 131;
    camera.position.z = 0;
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xdddddd, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

   // cameraControl = new THREE.OrbitControls(camera);

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
    //cameraControl.update();
    // Controleur d'une piece.
    if (pieceControl != null) {
        pieceControl.update();    
    }
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    /*
    console.log("Position de la caméra");
    console.log(camera.position.x);
    console.log(camera.position.y);
    console.log(camera.position.z);*/
}


// Function handles the resize event. This make sure the camera and the renderer
// are updated at the correct moment.
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


window.onmousedown=onDocumentMouseDown;
window.onmouseup=onDocumentMouseUp;

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
            var chessCase;
            var piece;
            
            if (i % 2 == 0  && j % 2 == 0 || i % 2 == 1 && j % 2 == 1) {

                //console.log(compteur);

                chessCaseColor = '#827467'; // marron foncé

                if (j > 5) {
                    pieceColor = 'black';
                }

                chessCase = new ChessCase(j ,i , chessCaseColor, compteur, 1);
                if (j != 4 && j != 5)  {
                    chessCase.addPiece(pieceColor);
                    chessCase.hasPiece = true;
                    chessCase.chessCaseMesh.material.opacity = 0.99;
                }

                if (compteur == 28) {
                    middleCase = chessCase;
                }
                compteur++;
            }
            else {
                chessCase = new ChessCase(j ,i , chessCaseColor, 1);
            }

            
            
            chessCase.chessCaseMesh.castShadow = true;
            this.scene.add(chessCase.chessCaseMesh);
            collidableCaseList.push(chessCase.chessCaseMesh);
        }
    }
    
}


var projector = new THREE.Projector();
function onDocumentMouseDown(event) {
        console.log("onmousedown");
        //event.preventDefault();
        var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        projector.unprojectVector(vector, camera);

        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = raycaster.intersectObjects(collidablePieceList);
        var intersectsCases = raycaster.intersectObjects(collidableCaseList);
        
        if (intersectsCases) {
            caseCliquee = intersectsCases[0].object;
            console.log("case cliquee : " + caseCliquee);

        }

        if (intersects.length > 0) {

          

            selectedObject = intersects[0].object;
            pieceCliquee = selectedObject;
          
            
        }
    }


    function onDocumentMouseUp(event) {
        console.log("onmouseup");
        //event.preventDefault();
        var vector2 = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        projector.unprojectVector(vector2, camera);

        var raycaster2 = new THREE.Raycaster(camera.position, vector2.sub(camera.position).normalize());
        var intersects2 = raycaster2.intersectObjects(collidablePieceList);
        


        

        var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        projector.unprojectVector(vector, camera);

        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        var intersects = raycaster.intersectObjects(collidableCaseList);
        

        /*console.log(collidableCaseList);
        console.log(intersects);*/

        if (intersects.length > 0) {

            selectedObject = intersects[0].object;
            if (selectedObject.material.opacity == 0.99)  {
                alert("La case est déjà prise !");
            }
            else if ((selectedObject.material.opacity == 1) && (selectedObject.material.color.b == 0.403921568627451 )) {
                console.log("On dépose une pièce");
                console.log(selectedObject.material.color);
                selectedObject.add(pieceCliquee);
                selectedObject.material.opacity = 0.99;
                caseCliquee.material.opacity = 1;




                

            }
            

            
        }

        
    }







