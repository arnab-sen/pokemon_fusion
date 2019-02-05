class Pokemon {
	constructor(name) {
		this.name = name;
		this.folder = "images/" + this.name;
		this.assetFlags = {
			"head" : false,
			"arms": false,
			"wings" : false,
			"legs" : false,
			"tail" : false
			
		};
		this.connectionPoints = this.getConnectionPoints();
		this.assets = {
			"base" : {image: null, x: 0, y: 0, inFront : true}, 
			"head" : {image: null, x: 0, y: 0, inFront : true}, 
			"armLeft" : {image: null, x: 0, y: 0, inFront : true},
			"armRight" : {image: null, x: 0, y: 0, inFront : true},
			"wingLeft" : {image: null, x: 0, y: 0, inFront : true},
			"wingRight" : {image: null, x: 0, y: 0, inFront : true},
			"legLeft" : {image: null, x: 0, y: 0, inFront : true},
			"legRight" : {image: null, x: 0, y: 0, inFront : true},
			"tail" : {image: null, x: 0, y: 0, inFront : true}
		};
	}
	
	setAssetFlags(flagArray) {
		// Sets all input flags to true
		for (var i = 0; i < flagArray.length; i++) {
			this.assetFlags[flagArray[i]] = true;
		}
	}
	
	getConnectionPoints() {
		var connectionPoints = {};
		
		return connectionPoints;
	}
	
	loadPokemonAssets() {
		this.assets.base.image = this.getImage(this.name + "_limbless.png");
		if (this.assetFlags.head) 
			this.assets.head.image = this.getImage(this.name + "_head.png");
		if (this.assetFlags.arms) {
			this.assets.armLeft.image = this.getImage(this.name + "_armLeft.png");
			this.assets.armRight.image = this.getImage(this.name + "_armRight.png");
		}
		if (this.assetFlags.wings) {
			this.assets.wingLeft.image = this.getImage(this.name + "_wingLeft.png");
			this.assets.wingRight.image = this.getImage(this.name + "_wingRight.png");
		}
		if (this.assetFlags.legs) {
			this.assets.legLeft.image = this.getImage(this.name + "_legLeft.png");
			this.assets.legRight.image = this.getImage(this.name + "_legRight.png");
		}
		if (this.assetFlags.tail) 
			this.assets.tail.image = this.getImage(this.name + "_tail.png");
		
	}
	
	getImage(imageName) {
		var image = new Image();
		image.src = this.folder + "/" + imageName;
		return image;
	}
	
	setAssetPosition(asset, position) {
		this.assets[asset].x = position.x;
		this.assets[asset].y = position.y;
	}
	
	drawFromAssets(canvas) {
		var ctx = canvas.getContext("2d");
		var asset;
		for (var key in this.assets) {
			asset = this.assets[key];
			ctx.drawImage(asset.image, asset.x, asset.y);
		}
	}
}

function setUpPokemon() {
	var charizard = new Pokemon("charizard");
	pokemonContainer.charizard = charizard;
	charizard.setAssetFlags(["head", "arms", "wings", "legs", "tail"]);
	charizard.loadPokemonAssets();
	charizard.setAssetPosition("base", {x: 0, y: 0});
	charizard.setAssetPosition("head", {x: 0, y: 0});
	charizard.setAssetPosition("armLeft", {x: 0, y: 0});
	charizard.setAssetPosition("armRight", {x: 0, y: 0});
	charizard.setAssetPosition("wingLeft", {x: 0, y: 0});
	charizard.setAssetPosition("wingRight", {x: 0, y: 0});
	charizard.setAssetPosition("legLeft", {x: 0, y: 0});
	charizard.setAssetPosition("legRight", {x: 0, y: 0});
	charizard.setAssetPosition("tail", {x: 0, y: 0});
}

var pokemonContainer = {};
setUpPokemon();