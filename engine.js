/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#game");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

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
	if (event.key == "e") {
		currentInteraction();
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

currentInteraction = () => {};
let previousInteraction = "";

function characterBillboard(position, character, interactionText = "") {
	if (interactionText !== "") {
		ctx.font = "bold 16px sans-serif";
		ctx.fillStyle = "black";
		ctx.fillText(character, position.x, position.y - 26);
		ctx.font = "14px sans-serif";
		ctx.fillText(`[E] ${interactionText}`, position.x, position.y - 10);
	} else {
		ctx.font = "bold 16px sans-serif";
		ctx.fillStyle = "black";
		ctx.fillText(character, position.x, position.y - 10);
	}
}

let lastTime = 0;

let update = (timestamp) => {};

function render(timestamp) {
	if (lastTime === 0) {
		lastTime = timestamp;
	}
	const deltaTime = timestamp - lastTime;
	lastTime = timestamp;

	player.pos.x += (movement.x * player.speed * deltaTime);
	player.pos.y += (movement.y * player.speed * deltaTime);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < objects.length; i++) {
		if (objects[i].uniqueId !== player.uniqueId) {
			objects[i].draw();
		}
	}
	
	ctx.fillStyle = player.color;
	ctx.fillRect(center.x, center.y, player.width, player.height);

	ctx.fillStyle = "black";
	ctx.font = "bold 16px sans-serif";
	ctx.fillText("Money: " + player.money, 12, 20);

	update(timestamp);
	
	requestAnimationFrame(render);
}
requestAnimationFrame(render);
