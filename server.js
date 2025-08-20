const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname)); // يخدم ملفات html, css, js من نفس المجلد

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('chat message', (msg) => {
    // نبث الرسالة لكل الناس ما عدا المرسل
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
