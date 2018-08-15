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

const port = process.env.PORT || 3000;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./api/middleware/passport')(passport);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);

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


io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});


server.listen(port, () => console.log(`Server started work ${port}`));