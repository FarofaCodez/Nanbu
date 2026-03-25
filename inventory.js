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
		inventoryItems.innerHTML += `<p><button onclick='useItem(${i})'>Use</button> ${player.inventory[i].name}</p>`;
	}
}

let inventoryShown = false;

addEventListener("keydown", (event) => {
	if (event.key == "i") {
		const inventory = document.querySelector("#inventory");
		inventoryShown = !inventoryShown;
		if (inventoryShown) {
			inventory.style.display = "block";
			populateInventory();
		} else {
			inventory.style.display = "none";
		}
	}
});
