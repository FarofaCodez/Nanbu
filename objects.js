let objects = [];

class Character {
	constructor(name, x, y, width, height, color, interactionText = "") {
		this.pos = new Vector2D(x, y);
		this.width = width;
		this.height = height;
		this.color = color;
		this.name = name;
		this.uniqueId = crypto.randomUUID();
		this.interactionText = interactionText;
	}

	interact() {}
	deinteract() {}

	draw() {
		ctx.fillStyle = this.color;
		const _offset = offset(this.pos);
		ctx.fillRect(_offset.x, _offset.y, this.width, this.height);

		if (euclideanDistance(player.pos, this.pos) < 150) {
			characterBillboard(_offset, this.name, this.interactionText);
			currentInteraction = this.interact;
			previousInteraction = this.uniqueId;
		} else {
			if (previousInteraction === this.uniqueId) {
				this.deinteract();
				currentInteraction = () => {};
			}
		}
	}
}
const merchant = new Character("Merchant", 200, 200, 60, 60, "green", "Shop");
let merchantShown = false;
merchant.interact = () => {
	/** @type {HTMLDivElement} */
	const buyPage = document.querySelector("#buy-page");
	merchantShown = !merchantShown;
	if (merchantShown) {
		buyPage.style.display = "block";
	} else {
		buyPage.style.display = "none";
	}
};
merchant.deinteract = () => {
	/** @type {HTMLDivElement} */
	const buyPage = document.querySelector("#buy-page");
	merchantShown = false;
	buyPage.style.display = "none";
};
objects.push(merchant);

const shopItems = [];
const testItem = new Item("Test Item");
testItem.price = 50;
testItem.use = () => {
	console.log("Test item used");
	return true;
};
shopItems.push(testItem);

for (let i = 0; i < shopItems.length; i++) {
	const shopList = document.querySelector("#buy-items");
	shopList.innerHTML += `<p><button onclick='buy(shopItems[${i}], shopItems[${i}].price)'>$${shopItems[i].price}</button> ${shopItems[i].name}</p>`;
}
