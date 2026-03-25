let lastTime = 0;
const villagerPosition = new Vector2D(200, 200);

function villagerInteraction() {
	/** @type {HTMLDivElement} */
	const buyPage = document.querySelector("#buy-page");
	if (buyPage.style.display === "none") {
		buyPage.style.display = "block";
	} else {
		buyPage.style.display = "none";
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
	const villagerOffset = offset(villagerPosition);

	ctx.fillStyle = "green";
	ctx.fillRect(villagerOffset.x, villagerOffset.y, 60, 60);

	if (euclideanDistance(player.pos, villagerPosition) < 150) {
		ctx.font = "bold 16px sans-serif";
		ctx.fillStyle = "black";
		ctx.fillText("Villager", villagerOffset.x, villagerOffset.y - 26);
		ctx.font = "14px sans-serif";
		ctx.fillText("[E] Interact", villagerOffset.x, villagerOffset.y - 10);
		currentInteraction = villagerInteraction;
	} else {
		const buyPage = document.querySelector("#buy-page");
		buyPage.style.display = "none";
		if (previousInteraction === "villager") {
			currentInteraction = () => {};
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
