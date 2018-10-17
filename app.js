const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const keys = require('./api/config/keys');

const server = require('http').Server(app);
const io = require('socket.io')(server);

const authRoutes = require('./api/routes/auth');
const categoryRoutes = require('./api/routes/categories');
const positionRoutes = require('./api/routes/positions');
const orderRoutes = require('./api/routes/order');
const analyticsRoutes = require('./api/routes/analytics');
const checkoutRoutes = require('./api/routes/checkout');
const messagesRoutes = require('./api/routes/messages');

const port = process.env.PORT || 3000;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./api/middleware/passport')(passport);

app.use(morgan('dev'));
app.use('/api/uploads/', express.static('api/uploads/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/position', positionRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/chat', messagesRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'client', 'index.html'
      )
    );
  });
}


io.on('connection', function(socket)  {
  console.log('connection');

  // socket.on('isLogged', (token) => {
  //   console.log('User is Logged in', token);
  // });

  socket.on('subscribe', function(room) {
    console.log('joining room', room);
    socket.join(room);
  });

  socket.on('admin message', (msg) => {
    socket.emit('admin message', msg);
  });

  socket.on('admin message', (message) => {
    console.log(keys.adminId);
    const msg = {
      email: message.email,
      message: message.message.trim(),
      userId: message.userId
    };
    socket.broadcast.to(message.userId).emit('privat chat', {
      message: msg.message
    });

    // socket.emit('message', msg);
    // console.log(message);
  });

  socket.on('disconnect', function() {
    console.log('dis');
  });
});

// io.on('disconnect', function () {
//   console.log('dis');
// });

server.listen(port, () => console.log(`Server started work ${port}`));