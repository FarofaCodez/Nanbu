const modules = ["engine.js", "util.js", "objects.js", "inventory.js", "game.js"];
async function load() {
	modules.forEach(async (module) => {
		const element = document.createElement("script");
		element.src = module;
		document.body.appendChild(element);
	});
}
async function play() {
	document.querySelector("#loadingMessage").innerHTML = "Loading...";
	await load();
	document.querySelector("#menu").remove();
}
async function multiplayer() {
	modules.push("client.js");
	await play();
}
