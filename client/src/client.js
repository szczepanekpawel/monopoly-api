import io from '../socket.io';

export default () => {
  const socket = io('http://localhost:3000');

  socket.on('connect', () => {
    console.log('Connected');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected');
  });

  return socket;
};
