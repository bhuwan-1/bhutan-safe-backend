require("dotenv").config();

const express = require("express");
const { green, red } = require("colorette");
const cors = require("cors");
const connectDB = require("../db/db.js");
const cookieParser = require("cookie-parser");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/auth", require("./routes/auth/authRoutes.js"));
app.use("/user", require("./routes/user/userRoutes.js"));
app.use("/contact", require("./routes/contact/contactRoutes.js"));
app.use("/image", require("./routes/image/image.js"));

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
