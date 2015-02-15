function ChessCase (p_ordonnee, p_abscisse, p_color, id, p_opacity)  {
    this.chessCaseGeo = new THREE.BoxGeometry(10,2,10);
    this.chessCaseMaterial = new THREE.MeshPhongMaterial({color:p_color, ambient:p_color, transparent:true, opacity:p_opacity});
    this.chessCaseMesh = new THREE.Mesh(this.chessCaseGeo, this.chessCaseMaterial);

    this.identifiant = id;
    this.ordonnee = p_ordonnee;
    this.abscisse = p_abscisse;

    this.chessCaseMesh.position.x = -(10 * p_ordonnee);
    this.chessCaseMesh.position.y = 1;
    this.chessCaseMesh.position.z = -(10 * p_abscisse);

    this.name = "";
    
    this.castShadow = true;

    this.hasPiece = false;
    this.piece = null;
}


ChessCase.prototype = {
    getMesh : function () {return this.chessCaseMesh;},
    setMesh : function (value) {return this.chessCaseMesh;},
    getOrdonnee : function() {return this.ordonnee;},
    getAbscisse : function () {return this.abscisse;},
    getIdentifiant : function () {return this.identifiant;},
    getHasPiece : function () {return this.hasPiece;},
    setHasPiece : function (value) {return this.hasPiece;},
    getPiece : function () {return this.piece;},
    setPiece : function (value) {return this.piece;}
}

ChessCase.prototype.addPiece = function(piece_color) {
    var loader = new THREE.JSONLoader();
    var piece;
    var self = this;
    loader.load("scripts/checker.js", callback);

    function callback(geometry){
        var ord = self.getOrdonnee();
        var absc = self.getAbscisse();
        var id = self.getIdentifiant();
        
        var caseMesh = self.getMesh();


        var material = new THREE.MeshPhongMaterial({ color: piece_color, ambient: piece_color});
        
        piece = new THREE.Mesh(geometry, material);
        piece.position.x = 0.5;
        piece.position.y = 0;
        piece.position.z = -1;
        piece.castShadow = true;
        caseMesh.add(piece);
        collidablePieceList.push(piece);

        self.hasPiece = true;
        self.piece = piece;

        //console.log("self.piece = " + self.piece);

    }
}

