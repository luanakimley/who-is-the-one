const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/users");
const candidatesRoutes = require("./routes/candidates");
const tagsRoutes = require("./routes/tags");
const categoriesRoutes = require("./routes/categories");
const app = express();
const port = 8000;

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(usersRoutes)
  .use(candidatesRoutes)
  .use(tagsRoutes)
  .use(categoriesRoutes)
  .use((req, res) => {
    res.status(404);
    res.json({
      error: "Page not found",
    });
  })
  .listen(port, () => console.log("listening on port " + port));
