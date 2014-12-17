function ListePieces() {
	var loader = new THREE.JSONlLoader();
	this.tour = loader.load("scripts/tour.js");
	this.cavalier = loader.load("scripts/cavalier.js");
	this.fou = loader.load("scripts/fou.js");
	this.reine = loader.load("scripts/reine.js");
	this.roi = loader.load("scripts/roi.js");
	this.pion = loader.load("scripts/pion.js");

	ListePieces.prototype = {
		
	}
}