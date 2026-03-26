let lastTime = 0;
const villagerPosition = new Vector2D(200, 200);

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

function update(timestamp) {
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
	
	requestAnimationFrame(update);
}
requestAnimationFrame(update);
