var elements = {
	"mainCanvas" : getElement("#mainCanvas"),
	"clearButton" : getElement("#clearButton"),
	"browseButton" : getElement("#browseButton")
}

var parameters = {
	
}

var assets = {
	"latestImage" : null,
	"canvasSnapshot" : null
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

function setUpElements() {
	window.onload = () => snapshotCanvas(elements.mainCanvas);
	
	elements.clearButton.onclick = () => {
		var canvas = elements.mainCanvas;
		canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
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
		if (assets.latestImage == null) return;
		var ctx = elements.mainCanvas.getContext("2d");
		var mousePos = getMousePosition(e, elements.mainCanvas);
		centreMousePosition(mousePos, assets.latestImage);
		ctx.drawImage(assets.latestImage, mousePos.x, mousePos.y);
		if (e.type == "click") {
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
}

function main() {
	setUpElements();
}

main();