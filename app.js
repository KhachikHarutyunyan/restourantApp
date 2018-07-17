const app = require('express')();
const bodyParser = require('body-parser');
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');

const port = process.env.PORT || 3000;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('/index.html');
});


io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});


server.listen(port, () => console.log('Server started work'));