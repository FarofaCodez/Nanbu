/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#game");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
class Vector2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

let player = {
	pos: new Vector2D(0, 0),
	"width": 65,
	"height": 65,
	"speed": 0.3,
	"inventory": [],
	"money": 100,
	"color": "blue"
};
let movement = new Vector2D(0, 0);
let canvasCenter = new Vector2D(canvas.width / 2, canvas.height / 2);
let center = new Vector2D(canvasCenter.x - (player.width / 2), canvasCenter.y - (player.height / 2));

addEventListener("keydown", (event) => {
	if (event.key == "ArrowUp" || event.key == "w") {
		movement.y = -1;
	} if (event.key == "ArrowDown" || event.key == "s") {
		movement.y = 1;
	} if (event.key == "ArrowLeft" || event.key == "a") {
		movement.x = -1;
	} if (event.key == "ArrowRight" || event.key == "d") {
		movement.x = 1;
	}
});
addEventListener("keyup", (event) => {
	if (event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "w" || event.key == "s") {
		movement.y = 0;
	} if (event.key == "ArrowLeft" || event.key == "ArrowRight" || event.key == "a" || event.key == "d") {
		movement.x = 0;
	}
})

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvasCenter.x = canvas.width / 2;
	canvasCenter.y = canvas.height / 2;
	center.x = canvasCenter.x - (player.width / 2);
	center.y = canvasCenter.y - (player.height / 2);
}
addEventListener("resize", resize);
resize();

class Item {
	use() {}
	/** @type {HTMLImageElement} */
	texture;
	/** @type {string} */
	name;
	/** @type {boolean} */
	stackable = false;

	constructor(name) {
		this.name = name;
	}
}

currentInteraction = () => {};
let previousInteraction = "";
