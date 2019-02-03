class Layer {
	constructor(order, parentCanvas) {
		this.order = order;
		this.width = parentCanvas.width;
		this.height = parentCanvas.height;
		this.layer = document.createElement("canvas");
		this.layer.width = this.width;
		this.layer.height = this.height;
		this.images = [];
	}
	
	draw(canvas) {
		var ctx = canvas.getContext("2d");
		for (var i = 0; i < this.images.length; i++) {
			ctx.drawImage(this.images[i].image, this.images[i].x, this.images[i].y);
		}
	}
	
	addImage(image, x, y) {
		this.images.push({"image" : image, "x" : x, "y" : y});
	}
	
	changeLatestImage(image, x, y) {
		if (this.images.length > 0) {
			this.images[this.images.length - 1] = {"image" : image, "x" : x, "y" : y};
		} else {
			this.addImage(image, x, y);
		}
	}
}

var elements = {
	"mainCanvas" : getElement("#mainCanvas"),
	"layerCanvas" : getElement("#layerCanvas"),
	"clearButton" : getElement("#clearButton"),
	"browseButton" : getElement("#browseButton"),
	"prevLayer" : getElement("#prevLayer"),
	"nextLayer" : getElement("#nextLayer"),
	"addLayer" : getElement("#addLayer"),
	"deleteLayer" : getElement("#deleteLayer"),
	"currentLayer" : getElement("#currentLayer")
}

var parameters = {
	"currentLayer" : 0
}

var assets = {
	"mainCanvas" : elements.mainCanvas,
	"latestImage" : null,
	"canvasSnapshot" : null,
	"blankCanvas" : null,
	"layers" : []
}

function getElement(name) {
	return document.querySelector(name);
}

function getMousePosition(event, element) {
	return {"x" : event.clientX - element.offsetLeft,
			"y" : event.clientY - element.offsetTop};
}

function centreMousePosition(mousePos, image) {
	mousePos.x -= (image.width / 2);
	mousePos.y -= (image.height / 2);
}

function snapshotCanvas(canvas) {
	assets.canvasSnapshot = canvas.getContext("2d").getImageData(0, 0, canvas.width, 
		canvas.height);
}

function restoreCanvas(canvas) {
	canvas.getContext("2d").putImageData(assets.canvasSnapshot, 0, 0);
}

function drawScaledImage(canvas, imageData, scale, position) {
	var ctx = canvas.getContext("2d");
	ctx.scale(scale.x, scale.y);
	ctx.drawImage(imageData, position.x, position.y);
	ctx.scale(1/scale.x, 1/scale.y);
}

function drawText(canvas, text, x, y) {
		var ctx = canvas.getContext("2d");
		ctx.font = "20px Arial";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.fillText(text, x, y);
}

function drawFromLayers() {
	var canvas = elements.mainCanvas;
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < assets.layers.length; i++) {
		assets.layers[i].draw(elements.mainCanvas);
	}
}

function setUpElements() {
	window.onload = () => {
		snapshotCanvas(elements.mainCanvas);
		assets.blankCanvas = assets.canvasSnapshot;
		assets.layers.push(new Layer(0, assets.blankCanvas, elements.mainCanvas));
	}
	
	elements.clearButton.onclick = () => {
		var canvas = elements.mainCanvas;
		canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
		assets.layers = [new Layer(0, elements.mainCanvas)];
		parameters.currentLayer = 0;
		snapshotCanvas(canvas);
	}
	
	elements.browseButton.addEventListener("change", e => {
		var reader = new FileReader();
		reader.onload = e => {
			var image = new Image();
			image.src = e.target.result;
			image.onload = () => assets.latestImage = image;
		};
		reader.readAsDataURL(e.target.files[0]);
	});
		
	elements.mainCanvas.onclick = e => {
		if (assets.latestImage == null) {
			return;
		}
		var currentLayer = assets.layers[parameters.currentLayer];
		var ctx = currentLayer.layer.getContext("2d");
		var mousePos = getMousePosition(e, elements.mainCanvas);
		centreMousePosition(mousePos, assets.latestImage);
		currentLayer.changeLatestImage(assets.latestImage, mousePos.x, mousePos.y);
		drawFromLayers();
		
		if (e.type == "click") {
			currentLayer.addImage(assets.latestImage, mousePos.x, mousePos.y);
			drawFromLayers();
			snapshotCanvas(elements.mainCanvas);
			assets.latestImage = null;
		}
	};
	
	elements.mainCanvas.addEventListener("mousemove", e => {
		if (assets.latestImage != null) {
			restoreCanvas(elements.mainCanvas);
			elements.mainCanvas.onclick(e);
		}
	});
	
	elements.prevLayer.onclick = () => {
		if (parameters.currentLayer > 0) parameters.currentLayer--;
		elements.currentLayer.textContent = `Current Layer: ${parameters.currentLayer}`;
	}
	
	elements.nextLayer.onclick = () => {
		if (parameters.currentLayer < assets.layers.length - 1) 
				parameters.currentLayer++;
		elements.currentLayer.textContent = `Current Layer: ${parameters.currentLayer}`;
	}
	
	elements.addLayer.onclick = () => {
		assets.layers.push(new Layer(++parameters.currentLayer, elements.mainCanvas));
		elements.currentLayer.textContent = `Current Layer: ${parameters.currentLayer}`;
	}
	
	elements.deleteLayer.onclick = () => {
		assets.layers.splice(parameters.currentLayer, 1);
		elements.prevLayer.onclick();
		if (assets.layers.length == 0) {
			assets.layers.push(new Layer(0, elements.mainCanvas));
		}
		
		drawFromLayers();
	}
}

function main() {
	setUpElements();
}

main();