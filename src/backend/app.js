const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());


const bookRoute = require('./controllers/book');
app.use('/api/books', bookRoute);

const categoriesRoute = require('./controllers/category');
app.use('/api/categories', categoriesRoute);

const chapterRoute = require('./controllers/chapter');
app.use('/api/chapter', chapterRoute);


mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => console.log("Connected to DB")
)

app.listen(process.env.API_POST);