// More game-specific functions

function euclideanDistance(p1, p2) {
	return Math.hypot(
		p2.x - p1.x,
		p2.y - p1.y
	);
}

function offset(position) {
	return new Vector2D(canvasCenter.x + position.x - player.pos.x - (player.width / 2),
	canvasCenter.y + position.y - player.pos.y - (player.height / 2));
}

function buy(item, price) {
	const buyMessage = document.querySelector("#buyMessage");
	if (player.money >= price) {
		if (player.inventory.includes(item)) {
			buyMessage.innerHTML = "You already have this item";
		} else {
			player.inventory.push(item);
			player.money -= price;
			buyMessage.innerHTML = "You bought the item";
		}
	} else {
		buyMessage.innerHTML = "Not enough money";
	}
}
