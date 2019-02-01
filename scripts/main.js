var elements = {
	"pokemonA" : getElement("#pokemonACanvas"),
	"pokemonB" : getElement("#pokemonBCanvas"),
	"fusedPokemon" : getElement("#fusedPokemonCanvas"),
	"fuseButton" : getElement("#fuseButton")
}

var spriteURLs = {
	"charizard" : "https://img.pokemondb.net/sprites/black-white/normal/charizard.png",
	"dragonite" : "https://img.pokemondb.net/sprites/black-white/normal/dragonite.png"
}

function getElement(name) {
	return document.querySelector(name);
}

function getPokemonSpriteURL(pokemon) {
	return `https://img.pokemondb.net/sprites/black-white/normal/${pokemon}.png`
}

function setupElements() {
	drawPokemon("charizard", elements.pokemonA);
	drawPokemon("dragonite", elements.pokemonB);
}

function getPokemonImage(pokemon) {
	/* INPUT: String pokemon
	 * OUTPUT: Image sprite of pokemon
	*/
	var url = spriteURLs[pokemon];
	var sprite = new Image();
	sprite.src = url;
	
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