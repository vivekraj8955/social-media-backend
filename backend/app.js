const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user_routes');
const blogrouter = require('./routes/blod_routes');

const app = express();
app.use(express.json())
app.use('/', router);
app.use('/blog',blogrouter)

mongoose
  .connect('mongodb+srv://admin:HpWmCIQiBCxVDz5m@cluster0.ytozahj.mongodb.net/bloobank?retryWrites=true&w=majority')
  .then(() => {
    app.listen(5000, () => {
      console.log('Server is listening on port 5000');
    });
  })
  .catch((err) => console.log(err));
