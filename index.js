const express = require('express');
require('dotenv').config()
const app = express()
const port = 8080;
const cors = require("cors");
const router = express.Router()
const routes = require("./src/routes/index.routes")(router, {});

const corsOptions = {
    origin: `http://localhost:${port}`
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', routes)

app.listen(port, async () => {
    console.log(`http://localhost:${port}/`);
});
