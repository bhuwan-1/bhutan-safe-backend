const express = require("express");
const { green, red } = require("colorette");
const cors = require("cors");
const connectDB = require("../db/db.js");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//controllers

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server started on port http://localhost:${process.env.PORT}`,
        green("✓")
      );
      console.log(`  Press ${red("ctrl-c")} to stop`);
    });
  })
  .catch((err) => {
    console.log(
      `${red("Failed to connect to the database. Server not started.")}`
    );
    console.log(err);
  });
