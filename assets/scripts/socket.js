const socket = io('http://localhost:4000');

socket.on('connect', () => {
  const chatroom = document.getElementById('chatroom');
  chatroom.textContent = 'events';
});

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accountId = urlParams.get('accountId');

    socket.emit('events', { accountId, msg: input.value });
    input.value = '';
  }
});

socket.on('events', ({ name, msg, currentDate }) => {
  const item = document.createElement('li');
  item.textContent = `[${currentDate}] ${name}: ${msg}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
