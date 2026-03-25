const testItem = new Item("Test Item");
testItem.use = () => {
	console.log("test item used");
	return true;
};
