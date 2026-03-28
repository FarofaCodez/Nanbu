const loadingMessage = document.querySelector("#loadingMessage");
const menu = document.querySelector("#menu");

let mobile = false;

const modules = ["engine.js", "util.js", "objects.js", "inventory.js", "game.js"];
async function load() {
	modules.forEach(async (module) => {
		const element = document.createElement("script");
		element.src = module;
		document.body.appendChild(element);
	});
}
async function play() {
	if (mobile) {
		modules.push("mobile.js");
	}
	loadingMessage.innerText = "Loading...";
	await load();
	menu.remove();
}
async function multiplayer() {
	modules.push("client.js");
	await play();
}

/** @type {HTMLInputElement} */
const mobileToggle = document.querySelector("#isMobile");
mobileToggle.addEventListener("change", () => {
	if (mobileToggle.checked) {
		mobile = true;
		loadingMessage.innerText = "Tablet recommended but not required";
	} else {
		mobile = false;
		loadingMessage.innerText = "";
	}
});
