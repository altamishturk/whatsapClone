const socket = io('http://localhost:3000');


// console.log(socket);
const input_message = document.querySelector('#input_message');
const send_btn = document.querySelector('#send_btn');


// const name = prompt("Enter Your Name To join");
let name = 'altamish';

socket.emit('adding_user', 'altamish');
