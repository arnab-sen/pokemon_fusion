var elements = {
	"pokemonA" : getElement("#pokemonACanvas"),
	"pokemonB" : getElement("#pokemonBCanvas"),
	"fusedPokemon" : getElement("#fusedPokemonCanvas"),
	"fuseButton" : getElement("#fuseButton")
}

function getElement(name) {
	return document.querySelector(name);
}

function getPokemonSpriteURL(pokemon) {
	return `https://img.pokemondb.net/sprites/black-white/normal/${pokemon}.png`
}

function setupElements() {
	drawPokemon("charizard/charizard", elements.pokemonA);
	drawPokemon("dragonite/dragonite", elements.pokemonB);
	drawPokemon("dragonite/test_fusion_charizard_dragonite", elements.fusedPokemon);
}

function getPokemonImage(imageName) {
	/* INPUT: String imageName
	 * OUTPUT: Image sprite of pokemon
	*/
	var location = `images/${imageName}.png`;
	var sprite = new Image();
	sprite.src = location;
	
	return sprite;
}

function drawPokemon(pokemon, canvas) {
	/* INPUT: String pokemon, Canvas canvas
	 * OUTPUT: draws pokemon sprite onto a resized canvas at (0, 0)
	*/
	var ctx = canvas.getContext("2d");
	var pokemonImage = getPokemonImage(pokemon);
	canvas.width = pokemonImage.width;
	canvas.height = pokemonImage.height;
	pokemonImage.onload = () => ctx.drawImage(pokemonImage, 0, 0);
}

function main() {
	setupElements();
}

main();