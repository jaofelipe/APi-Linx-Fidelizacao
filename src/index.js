const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


mongoose.connect('mongodb+srv://semana:semana@cluster0-6w0gp.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true, })

app.use(cors());
app.use(require('./routes'));


app.listen(3333)
console.log("listening to port", 3333);