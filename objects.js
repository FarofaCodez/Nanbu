let objects = [];

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
