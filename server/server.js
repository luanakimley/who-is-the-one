const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();
const port = 8000;

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(routes)
  .use((req, res) => {
    res.status(404);
    res.json({
      error: "Page not found",
    });
  })
  .listen(port, () => console.log("listening on port " + port));
