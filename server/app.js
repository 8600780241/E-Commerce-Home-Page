const express = require("express");
const cors = require("cors");
const bodyparser = require('body-parser');
const morgan = require("morgan");
const path = require('path');
const dotenv = require("dotenv");
const Db = require('./DB/db');
const productRoute = require("./Route/productRoute");
const app = express();
dotenv.config();
Db();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyparser.json());

app.use('/product', productRoute);

app.get('/', (req, res) => {
    res.send("hello")
})

app.listen(process.env.PORT, () => {
    console.log(`server is conncted to the port ${process.env.PORT}`)
});