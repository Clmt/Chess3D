function ChessCase (p_ordonnee, p_abscisse, p_color, id)  {
    this.chessCaseMaterial = Physijs.createMaterial(
        new THREE.MeshPhongMaterial({color:p_color, ambient:p_color}),
        .9,
        .6
    );

    this.chessCaseMesh = new Physijs.BoxMesh(
        new THREE.BoxGeometry(10,2,10),
        this.chessCaseMaterial,
        2
    );

    this.identifiant = id;
    this.ordonnee = p_ordonnee;
    this.abscisse = p_abscisse;

    this.chessCaseMesh.position.x = -(10 * p_ordonnee);
    this.chessCaseMesh.position.y = 1;
    this.chessCaseMesh.position.z = -(10 * p_abscisse);

    this.name = "";
    
    this.castShadow = true;
}


ChessCase.prototype = {
    getMesh : function () {return this.chessCaseMesh;},
    setMesh : function (value) {return this.chessCaseMesh;},
    getOrdonnee : function() {return this.ordonnee;},
    getAbscisse : function () {return this.abscisse;},
    getIdentifiant : function () {return this.identifiant;}
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
        var caseColor='white';
        var caseMesh = self.getMesh();


        var material = new THREE.MeshPhongMaterial({ color: piece_color, ambient: piece_color });
        
        piece = new THREE.Mesh(geometry, material);
        piece.position.x = 0.5;
        piece.position.y = 0;
        piece.position.z = -1;
        
        caseMesh.add(piece);
    }
}

/*
piece.position.x = (self.getMesh().position.x - 4) / self.getOrdonnee();
            piece.position.y = -3.75;
            piece.position.z = (self.getMesh().position.z - 2) / self.getAbscisse();
            self.getMesh().add(piece);*/