const socket = io();

// get username and room 
const { username, room } = Qs.parse(window.location.search, {
  ignoreQueryPrefix: true
});



// when user join leave 
socket.on('message', message => {

  if (message.message === 'WELCOME TO MY WHATSAP' || message.message === 'HAS JOINED CHAT' ||
    message.message === 'LEAVED THE CHAT') {
    displayLeavJoinInfo(message);
  }
  else {
    displayMessage(message);
  }

  const messagesContainer = document.querySelector('.messages-container');
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
})


const form = document.querySelector('#chat-form');
form.addEventListener('submit', e => {

  e.preventDefault();
  const message = document.querySelector('#msg');
  socket.emit('chatMessage', message.value);
  message.value = '';
  message.focus();
})


// defining the display message function 
function displayMessage(msg) {
  const divElem = document.createElement('div');
  divElem.classList.add('message');
  const pName = document.createElement('p');
  const pActualSMS = document.createElement('p');
  const pTime = document.createElement('p');

  // pName.style.color = `#${randomColor()}`;

  pName.classList.add('name');
  pActualSMS.classList.add('actual_sms');
  pTime.classList.add('time');

  pName.innerText = msg.name;
  pActualSMS.innerText = msg.message;
  pTime.innerText = msg.time;

  divElem.appendChild(pName);
  divElem.appendChild(pActualSMS);
  divElem.appendChild(pTime);

  const chatmessages = document.querySelector('.messages-container');
  chatmessages.appendChild(divElem);
}

// defining displayLeavJoinInfo function 
function displayLeavJoinInfo(msg) {
  const divElem = document.createElement('div');
  divElem.classList.add('leave_join_container');
  const p = document.createElement('p');
  p.classList.add('leave_join');
  p.innerText = `"${msg.name.toUpperCase()}" ${msg.message}`;
  divElem.appendChild(p);
  const chatmessages = document.querySelector('.messages-container');
  chatmessages.appendChild(divElem);

}

// join room 
socket.emit('join_room', { username, room });


// get room and users 
socket.on('roomUsers', ({ room, users }) => {

  displayUsers(users);
  displayRooms(room);

});

// defining display users 
function displayUsers(users) {
  const usersElem = document.querySelector('#users');
  usersElem.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}



// defining displayRooms users 
function displayRooms(room) {
  const room_name = document.querySelector('#room-name');
  room_name.innerText = room;
}


// random color geneartor 
// function randomColor() {
//   const colorArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
//   let color = '';
//   for (let i = 0; i < 6; i++) {
//     const randNo = Math.floor(Math.random() * colorArray.length);
//     color += colorArray[randNo];
//   }

//   return color;
// }





// const chatForm = document.getElementById('chat-form');
// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');

// // Get username and room from URL
// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true
// });

// const socket = io();

// // Join chatroom
// socket.emit('joinRoom', { username, room });

// // Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//   outputRoomName(room);
//   outputUsers(users);
// });

// // Message from server
// socket.on('message', message => {
//   console.log(message);
//   outputMessage(message);

//   // Scroll down
//   chatMessages.scrollTop = chatMessages.scrollHeight;
// });

// // Message submit
// chatForm.addEventListener('submit', e => {
//   e.preventDefault();

//   // Get message text
//   let msg = e.target.elements.msg.value;

//   msg = msg.trim();

//   if (!msg){
//     return false;
//   }

//   // Emit message to server
//   socket.emit('chatMessage', msg);

//   // Clear input
//   e.target.elements.msg.value = '';
//   e.target.elements.msg.focus();
// });

// // Output message to DOM
// function outputMessage(message) {
//   const div = document.createElement('div');
//   div.classList.add('message');
//   const p = document.createElement('p');
//   p.classList.add('meta');
//   p.innerText = message.username;
//   p.innerHTML += `<span>${message.time}</span>`;
//   div.appendChild(p);
//   const para = document.createElement('p');
//   para.classList.add('text');
//   para.innerText = message.text;
//   div.appendChild(para);
//   document.querySelector('.chat-messages').appendChild(div);
// }

// // Add room name to DOM
// function outputRoomName(room) {
//   roomName.innerText = room;
// }

// // Add users to DOM
// function outputUsers(users) {
//   userList.innerHTML = '';
//   users.forEach(user=>{
//     const li = document.createElement('li');
//     li.innerText = user.username;
//     userList.appendChild(li);
//   });
//  }
