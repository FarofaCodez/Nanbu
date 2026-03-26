const websocket = require("ws");
const wss = new websocket.Server({ port: 8080 });

class Vector2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
class Character {
	constructor(name, x, y, width, height, color, interactionText = "", uniqueId = crypto.randomUUID()) {
		this.pos = new Vector2D(x, y);
		this.width = width;
		this.height = height;
		this.color = color;
		this.name = name;
		this.uniqueId = uniqueId;
		this.interactionText = interactionText;
	}

	interact() {}
	deinteract() {}
}

let clients = [];

wss.on("connection", (ws) => {
	ws.on("message", (_message) => {
		const text = _message.toString();
		const message = JSON.parse(text);
		if (message.type == "leave") {
			wss.clients.forEach((client) => {
				if (client.readyState === websocket.OPEN) {
					client.send(JSON.stringify({ type: "leave", uniqueId: message.uniqueId }));
				}
			})
			clients = clients.filter((client) => client.uniqueId != message.uniqueId);
			return;
		}
		if (message.type == "join") {
			const uniqueId = crypto.randomUUID();
			ws.uniqueId = uniqueId;
			ws.send(JSON.stringify({ type: "yourId", uniqueId: uniqueId }));
			const playerName = message.name;
			ws.name = playerName;
			wss.clients.forEach((client) => {
				if (client.readyState === websocket.OPEN) {
					client.send(JSON.stringify({ type: "join", player: new Character(playerName, 0, 0, 65, 65, "red", "", uniqueId) }));
				}
			});
			for (let i = 0; i < clients.length; i++) {
				ws.send(JSON.stringify({ type: "join", player: clients[i] }));
			}
			clients.push(new Character(playerName, 0, 0, 65, 65, "red", "", uniqueId));
			return;
		}
		if (message.type == "move") {
			wss.clients.forEach((client) => {
				if (client.readyState === websocket.OPEN) {
					client.send(JSON.stringify({ type: "move", uniqueId: ws.uniqueId, x: message.x, y: message.y }));
				}
			});
		}
		if (message.type == "chat") {
			if (message.message.length < 128) {
				wss.clients.forEach((client) => {
					if (client.readyState === websocket.OPEN) {
						client.send(JSON.stringify({ type: "chat", message: `${ws.name}: ${message.message}` }));
					}
				});
			} else {
				ws.send(JSON.stringify({ type: "chat", message: "Message too long" }));
			}
		}
	});
	ws.on("close", () => {
		wss.clients.forEach((client) => {
			if (client.readyState === websocket.OPEN) {
				client.send(JSON.stringify({ type: "leave", uniqueId: ws.uniqueId }));
			}
		})
		clients = clients.filter((client) => client.uniqueId != ws.uniqueId);
	});
});
