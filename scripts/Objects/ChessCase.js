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
    getAbscisse : function () {return this.abscisse;}
}

ChessCase.prototype.addPiece = function() {
    var loader = new THREE.JSONLoader();
    var piece;
    var self = this;
    loader.load("scripts/fou.js", callback);

    function callback(geometry){
        var ord = self.getOrdonnee();
        var absc = self.getAbscisse();


        var caseMesh = self.getMesh();
        var material = new THREE.MeshPhongMaterial({ color: 'blue', ambient: 'blue' });
        piece = new THREE.Mesh(geometry, material);
        piece.position.y = -3.75;

        piece.position.x = 0;
        piece.position.z = 0;

        if (ord == 0) {
            for(var j = 0; j < 8; j++) {
                
            }
        }

        caseMesh.add(piece);
    }
}

/*
piece.position.x = (self.getMesh().position.x - 4) / self.getOrdonnee();
            piece.position.y = -3.75;
            piece.position.z = (self.getMesh().position.z - 2) / self.getAbscisse();
            self.getMesh().add(piece);*/