require('./config/mongodb');
const express = require('express');
const server = express();

const user = require('./routes/userRouter');
const product = require('./routes/productRouter');
const order = require('./routes/orderRouter');

server.use(express.json());
server.listen(3000,console.log('Server started at port 3000'));

server.use('/api',user);
server.use('/api',product);
server.use('/api',order);