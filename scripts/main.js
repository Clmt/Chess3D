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
var colorFirstPiece;
var cptmove = 0;
var pieceMangee;
var casePieceMangee;
var caseDepartPieceMangee;
var casePostManger;
var lastMoveColor = 0;
var old = [];
var cptWhite = 20;
var cptBlack = 20;

// -----------------
// ORIGIN
// -----------------
function init() {
    scene = new THREE.Scene;
   
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(200, 131, 0);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xdddddd, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    
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
    // Controleur d'une piece.
    if (pieceControl != null) {
        pieceControl.update();    
    }
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
    for(var i=0; i < 10; i++){
        for (var j = 0; j < 10; j++) {

            var chessCaseColor = '#E8D0AA'; // marron clair
            var pieceColor = 'white';
            var chessCase;
            var piece;
            
            if (i % 2 == 0  && j % 2 == 0 || i % 2 == 1 && j % 2 == 1) {

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
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    projector.unprojectVector(vector, camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(collidablePieceList);
    var intersectsCases = raycaster.intersectObjects(collidableCaseList);
    
    if (intersectsCases) {
        caseCliquee = intersectsCases[0].object;
    }

    /***********************************/
    /*   Cas mauvaise couleur joue     */
    /***********************************/

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;
        pieceCliquee = selectedObject;
        colorFirstPiece = selectedObject.material.color.r;
        if(lastMoveColor == colorFirstPiece) {
            showMessageInBox("<br/>Ce n'est pas &agrave; votre tour de jouer !");
            return;
        }
    }

    /***********************************/
    /*  Fin cas mauvaise couleur joue  */
    /***********************************/
    
    // Premier mouvement
    if(cptmove == 0) {
        caseDepartPieceMangee = intersectsCases[0].object;
    }

    // Part2 pièce à manger

    if(cptmove == 1) {
        casePostManger = intersectsCases[0].object;
    }

    selectedObject = intersectsCases[0].object;
}


function onDocumentMouseUp(event) {
    if(lastMoveColor == colorFirstPiece) {
        return;
    }
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    projector.unprojectVector(vector, camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(collidableCaseList);
    var intersectsPiece = raycaster.intersectObjects(collidablePieceList);

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;

        /***********************************/
        /*    Création de tous les test    */
        /***********************************/

            var test1 = selectedObject.material.opacity; // on check si la case est libre
            var value1 = 1;
            var test2 = selectedObject.material.color.b; // on check si la case peut recevoir une pièce (couleur de la case)
            var value2 = 0.403921568627451;
            var test3 = caseCliquee.position.x - selectedObject.position.x; // on check que l'on se déplace pas sur la largeur
            var value3 = 0;
            var test4 = caseCliquee.position.z- selectedObject.position.z;  // on check que l'on se déplace pas sur la longueur
            var value4 = 0;
            var test5 = Math.abs(caseCliquee.position.x - selectedObject.position.x); // on check que l'on se déplace bien d'une case (part1)
            var value5 = 10;
            var test6 = Math.abs(caseCliquee.position.z - selectedObject.position.z); // on check que l'on se déplace bien d'une case (part2)
            var value6 = 10;
            var test7 = intersectsPiece.length; // on check s'il y a une pièce dans la nouvelle case
            var value7 = 0;
            if(intersectsPiece.length) {
                var test8 = intersectsPiece[0].object.material.color.r; // on check si la pièce de la nouvelle case a une couleur différente de celle du début
            }
            else {
                var test8 = 10;
            }
            var value8 = colorFirstPiece;
            var test9 = cptmove; //on a déja lâché notre pièce sur une autre pour la manger (cpt + 1), là on va vérifier si une case est libre à côté
            var value9 = 1;
            if(casePostManger) {
                var test10 = Math.abs(Math.abs(casePostManger.position.x) - Math.abs(casePieceMangee.position.x));
                var value10 = 10;
                var test11 = Math.abs(Math.abs(casePostManger.position.z) - Math.abs(casePieceMangee.position.z));
                var value11 = 10;
            }
            var test12 = Math.abs(selectedObject.position.x) - Math.abs(caseCliquee.position.x); // on vérife le sens de déplacement voulu de la pièce (haut ou bas)
            var value12 = 0;
            var test13 = colorFirstPiece;
            var value13 = 1;

        /***********************************/
        /*      Fin création des test      */
        /***********************************/

        /***********************************/
        /*     Cas déplacement simple      */
        /***********************************/

            if((test1 == value1) && (test2 == value2) && (test3 != value3) && (test4 != value4) && (test5 == value5) && (test6 == value6)) {
                if(((test12 > value12) && (test13 == value13)) || ((test12 < value12) && (test13 == value12))) {
                    selectedObject.add(pieceCliquee);
                    selectedObject.material.opacity = 0.99;
                    caseCliquee.material.opacity = 1;
                    lastMoveColor = pieceCliquee.material.color.r;
                    if(lastMoveColor == 0) {
                        showMessageInBox("<br/>Aux blancs de jouer");
                    }
                    else {
                        showMessageInBox("<br/>Aux noirs de jouer");
                    }
                    resetCase();
                }
                else {
                    showMessageInBox("<br/>Vous ne pouvez pas aller en arri&egrave;re");
                }
            }

        /***********************************/
        /*   Fin cas déplacement simple    */
        /***********************************/

        /***********************************/
        /*     Cas prise d'une pièce       */
        /***********************************/

            else if((test1 == value1) && (test2 == value2) && (test10 == value10) && (test11 == value11) && (test9 == value9)) {
                if(casePostManger == selectedObject) {
                    casePieceMangee.remove(pieceMangee);
                    selectedObject.add(pieceCliquee);
                    selectedObject.material.opacity = 0.99;
                    casePieceMangee.material.opacity = 1;
                    caseDepartPieceMangee.material.opacity = 1
                    lastMoveColor = pieceCliquee.material.color.r;
                    if(lastMoveColor == 0) {
                        cptWhite -= 1;
                        if(cptWhite == 0){
                            document.getElementById("communication").innerHTML = "Victoire des noirs !!!";
                        }
                        else {
                            showMessageInBox("<br/>Aux blancs de jouer");
                        }
                    }
                    else {
                        cptBlack -= 1;
                        if(cptBlack == 0){
                            document.getElementById("communication").innerHTML = "Victoire des blancs !!!";
                        }
                        else {
                            showMessageInBox("<br/>Aux noirs de jouer");
                        }
                    }
                    resetCase();
                }                
            }

        /***********************************/
        /*    Fin cas prise d'une pièce    */
        /***********************************/

        else if ((test1 == value1) && (test2 == value2) && (test10 != value10) && (test11 != value11) && (test9 == value9)) {
            resetCase();
        }

        /***********************************/
        /*     Part1 prise de pièce        */
        /***********************************/

        else if ((test2 == value2) && (test3 != value3) && (test4 != value4) && (test5 == value5) && (test6 == value6) && (test7 > value7) && (test8 != value8)){
            pieceMangee = intersectsPiece[0].object;
            casePieceMangee = intersects[0].object;
            cptmove = 1;
        }

        /***********************************/
        /*   Fin part1 prise de pièce      */
        /***********************************/

        else {
            showMessageInBox('<br/>Mauvaise manipulation de votre part, veuillez rejouer');
            resetCase();
        }

    }
}

function resetCase(){
    caseCliquee = null;
    pieceCliquee = null;
    colorFirstPiece = null;
    pieceMangee = null;
    casePieceMangee = null;
    caseDepartPieceMangee = null;
    casePostManger = null;
    cptmove = 0;
}

function showMessageInBox(message){
    old = document.getElementById("communication").innerHTML;
    document.getElementById("communication").innerHTML = old + message;
}