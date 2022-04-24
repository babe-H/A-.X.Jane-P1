import http from "http";
import {Server} from "socket.io"; 
import express from "express";
import path from "path";
// import { json } from "express/lib/response";

const __dirname = path.resolve();


const app = express();



app.use("/public", express.static(__dirname + "/public"));
app.set("views", path.join(__dirname + "/src/views"));
app.set("view engine", "pug");
app.get("/" , (_,res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));



const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket["nkckname"] = "Anon";
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
});
socket.on("enter_room", (roomName, done) => {
socket.join(roomName);
done();
socket.to(roomName).emit("welcome", socket.nickname);
   });
   socket.on("disconnecting", () => {
     socket.rooms.forEach((room) => 
     socket.to(room).emit("bye",socket.nickname));
   });
   socket.on("new_message", (msg,room,done) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    done();
  });
  socket.on("nickname",(nickname) => (socket["nickname"] = nickname));
});









/*
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
*/
const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);
