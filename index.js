const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/pokemonRoute");

const app = express();

app.use(cors());
app.use(express.json({ extended: false }));

app.use("/pokemon", routes);

mongoose
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Pokemon API");
});

app.listen(5000, () => {
  console.log(`running at http://127.0.0.1:5000`);
});
