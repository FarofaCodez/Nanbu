const testItem = new Item("Test Item");
testItem.use = () => {
	player.color = prompt("Change your player color to any CSS color");
	return true;
};

function useItem(i) {
	const item = player.inventory[i];
	item.use();
	player.inventory.splice(i, 1);
	populateInventory();
} 

function populateInventory() {
	const inventoryItems = document.querySelector("#inventory-items");
	inventoryItems.innerHTML = "";
	for (let i = 0; i < player.inventory.length; i++) {
		const inventoryItem = document.createElement("div");
		inventoryItem.innerHTML = `<p><button onclick='useItem(${i})'>Use</button> ${player.inventory[i].name}</p>`;
		inventoryItems.appendChild(inventoryItem);
	}
}

addEventListener("keydown", (event) => {
	if (event.key == "e") {
		currentInteraction();
	}
	if (event.key == "i") {
		const inventory = document.querySelector("#inventory");
		if (inventory.style.display === "none") {
			inventory.style.display = "block";
			populateInventory();
		} else {
			inventory.style.display = "none";
		}
	}
});

document.querySelector("#inventory").style.display = "none";
