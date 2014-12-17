function ChessBoard(p_scene) {
    this.scene = p_scene;
    this.nb_lignes = 8;
    this.nb_colonnes = 8;
}

ChessBoard.prototype.make = function() {
    var self = this;

    function callback() {
        var chessCaseColor;


        for(var i = 0; i < nb_lignes; i++) {
            for (var j = 0; i < nb_colonnes; j++)
            {
                if (i == 0 || i == 2 || i == 4 || i == 6) {
                    if (j == 0 || j == 2 || j == 4 || j == 6) {
                        chessCaseColor = 'white';
                    }
                    else
                        chessCaseColor = 'black';
                }
                else {
                    if (j == 0 || j == 2 || j == 4 || j == 6) {
                        chessCaseColor = 'black';
                    }
                    else
                        chessCaseColor = 'white';
                }


                var chessCase = new ChessCase(j,i,chessCaseColor);
                self.scene.add(chessCase);
            }
        }

    }
    
}

/*
var chessCaseColor;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {

            //Set colors white and black
            if (i == 0 || i == 2 || i == 4 || i == 6) {
                if (j == 0 || j == 2 || j == 4 || j == 6) {
                    chessCaseColor = 'white';
                }
                else
                    chessCaseColor = 'black';
            }
            else {
                if (j == 0 || j == 2 || j == 4 || j == 6) {
                    chessCaseColor = 'black';
                }
                else
                    chessCaseColor = 'white';
            }

            if(i == 0 && j == 0) {
                chessCaseColor = 'red';
            }

            var chessCase = new ChessCase(j ,i , chessCaseColor);

            chessCase.addPiece();
            scene.add(chessCase.chessCaseMesh);
        }
    }*/


