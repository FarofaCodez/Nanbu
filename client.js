const urlSearchParams = new URLSearchParams(window.location.search);
const server = prompt("Enter a server to connect to");
const playerName = prompt("Enter an username");

document.querySelector("#chat").style.display = "block";

const connectingDiv = document.createElement("div");
connectingDiv.className = "menu center";
const connectingMessage = document.createElement("h1");
connectingMessage.innerText = "Waiting for server";
connectingDiv.appendChild(connectingMessage);
document.body.appendChild(connectingDiv);

const wss = new WebSocket(server);
wss.onopen = () => {
	connectingMessage.innerText = "Requesting character";
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
	connectingMessage.innerText = "Waiting for character";
	wss.onmessage = (event) => {
		const message = JSON.parse(event.data);
		console.log(message);
		if (message.type == "yourId") {
			player.uniqueId = message.uniqueId;
		}
		if (message.type == "join") {
			if (message.player.uniqueId == player.uniqueId) {
				connectingDiv.style.display = "none";
				connectingMessage.innerText = "";
			} else {
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

	setInterval(() => {
		wss.send(JSON.stringify({ type: "move", x: player.pos.x, y: player.pos.y }));
	}, 400);
};
wss.onclose = () => {
	connectingDiv.style.display = "block";
	connectingMessage.innerText = "Connection lost";
	setInterval(() => {
		location.reload();
	}, 3000);
}

function chat(message) {
	wss.send(JSON.stringify({ type: "chat", message: message }));
}

addEventListener("keydown", (event) => {
	if (event.key == "t") {
		const message = prompt("Enter chat message");
		chat(message);
	}
});
