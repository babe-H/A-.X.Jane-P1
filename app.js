const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
room.hidden = true;

let roomName,nickName


function addMessage(message){
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}


function handleMessagesubmit(event){
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value,roomName, () => {
  addMessage(`You: ${input.value}`);
});
  input.value = "";
}

function handleNicknamesubmit(event){
  event.preventDefault();
  const input = room.querySelector("#name input");
  input.setAttribute("placeholder",nickName);
  socket.emit("nickname",input.value);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  span = room.querySelector("span");
  sapn.innerText = `My nickname: ${nickName}`;
  const msgFrom = room.querySelector("#msg");
  //const nameFrom = room.querySelector("#name");
  msgFrom.addEventListener("submit", handleMessagesubmit);
  //nameFrom.addEventListener("submit", handleNicknamesubmit);
}



function handleRoomSubmit(event) {
  event.preventDefault();
  //const input = form.querySelector("input");
  //socket.emit("enter_room", { payload: input.value }, () => {
  //  console.log("server is done!");
  //});
  const nickNameInput = form.querySelector("#name");
  const roomNameInput = form.querySelector("#roomName");

  nickName = nickNameInput.value;
  roomName = roomNameInput.value;

  socket.emit("enter_room", nickName, roomName, showRoom);
  console.log(nickName)
  console.log(roomName)

  nickNameInput.value = "";
  roomNameInput.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
  addMessage(`${user} arrived!`);
}) ;

socket.on("bye" , (left) => {
  addMessage(`${left} left ㅠㅠ`);
});

socket.on("new_message", addMessage);