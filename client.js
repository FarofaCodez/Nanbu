const urlSearchParams = new URLSearchParams(window.location.search);
const mode = urlSearchParams.get("mode");

const wss = new WebSocket("ws://localhost:8080");
wss.onopen = () => {
	const joinMessage = JSON.stringify({
		type: "join",
		name: "Player " + Math.floor(Math.random() * 100),
		x: 0,
		y: 0,
		width: 65,
		height: 65,
		color: "red"
	});
	console.log(joinMessage);
	wss.send(joinMessage);
	wss.onmessage = (event) => {
		const message = JSON.parse(event.data);
		console.log(message);
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
	};
};

setInterval(() => {
	wss.send(JSON.stringify({ type: "move", x: player.pos.x, y: player.pos.y }));
}, 1000 / 60);
