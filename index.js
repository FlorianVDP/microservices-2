const express = require('express');
const app = express()
const port =8080;
const cors = require("cors");

const corsOptions = {
    origin: `http://localhost:${port}`
};

app.listen(port, async () => {
    console.log(`http://localhost:${port}/`);
});
