const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database/index.js');

const app = express();
const PORT = 3025;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.listen(PORT, () => {

    console.log(`listening on port ${PORT}`);
});

const userDB = require('./controllers/user.js');
const productDB = require('./controllers/product.js');

app.get('/users', userDB.getUsers)
app.get('/login/:email/:userPassword', userDB.loginUser)
app.post('/users', userDB.addUser)
app.get('/products', productDB.getProducts)
app.post('/like', productDB.addLike)
