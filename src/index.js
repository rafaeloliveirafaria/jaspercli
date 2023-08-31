const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json())

app.use(
  cors({
    origin: '*',
  })
);

app.use(`/`, require('./router'));

const port = 8482;
app.listen(port, () => console.log(`App init on port ${port}`));