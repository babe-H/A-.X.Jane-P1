import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import path from "path";
// import { json } from "express/lib/response";

const __dirname = path.resolve();


const app = express();



app.use("/public", express.static(__dirname + "/public"));
app.set("views", path.join(__dirname + "/src/views"));
app.set("view engine", "pug");
app.get("/" , (req,res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocketServer({server});

function onSocketClose()  {
  console.log("Disconnected from the Brower");
}



const sockets = [];


wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connected to Browser ✅");
    socket.on("close", onSocketClose);
    socket.on("message", (msg) => {
      const message = JSON.parse(msg);
      switch(message.type) {
        case "new_message" :
       sockets.forEach((aSocket) => 
       aSocket.send(`${socket.nickname}: ${message.payload}`)
    );
    case "nickname" :
      socket["nickname"] = message.payload;
      }
    });
  });


server.listen(3000, handleListen);