const urlSearchParams = new URLSearchParams(window.location.search);
const server = prompt("Enter a server to connect to");
const playerName = prompt("Enter an username");

const wss = new WebSocket(server);
wss.onopen = () => {
	const joinMessage = JSON.stringify({
		type: "join",
		name: playerName,
		x: 0,
		y: 0,
		width: 65,
		height: 65,
		color: "red"
	});
	wss.send(joinMessage);
	wss.onmessage = (event) => {
		const message = JSON.parse(event.data);
		if (message.type == "yourId") {
			player.uniqueId = message.uniqueId;
		}
		if (message.type == "join") {
			if (message.uniqueId != player.uniqueId) {
				objects.push(new Character(message.player.name, message.player.pos.x, message.player.pos.y, message.player.width, message.player.height, message.player.color, message.player.interactionText, message.player.uniqueId));
			}
		}
		if (message.type == "leave") {
			for (let i = 0; i < objects.length; i++) {
				if (objects[i].uniqueId == message.uniqueId) {
					objects.splice(i, 1);
				}
			}
		}
		if (message.type == "move") {
			for (let i = 0; i < objects.length; i++) {
				if (objects[i].uniqueId == message.uniqueId) {
					objects[i].pos.x = message.x;
					objects[i].pos.y = message.y;
				}
			}
		}
		if (message.type == "chat") {
			const chatMessage = document.querySelector("#chat");
			chatMessage.innerText = `` + `${message.message}\n` + chatMessage.innerText;
		}
	};
};

setInterval(() => {
	wss.send(JSON.stringify({ type: "move", x: player.pos.x, y: player.pos.y }));
}, 1000 / 60);

function chat(message) {
	wss.send(JSON.stringify({ type: "chat", message: message }));
}

addEventListener("keydown", (event) => {
	if (event.key == "t") {
		const message = prompt("Enter chat message");
		chat(message);
	}
});
