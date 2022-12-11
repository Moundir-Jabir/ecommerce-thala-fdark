require("dotenv").config();
const express = require("express");
const app = express();
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./models/config");

//Routers
const authRouter = require("./routes/auth");
const codePromo = require("./routes/codePromo");
const categoryRouter = require('./routes/category')
const product = require('./routes/product')


app.use(express.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(cors());
app.use(express.static("public")); // permet l'acces au fichiers de public

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    db.sync()
      .then((e) => console.log("sync"))
      .catch((err) => console.log(err));
  })
  .catch((error) => console.error("Unable to connect to the database:", error));

//Routes
app.use("/api/codePromo", codePromo);
app.use('/api/auth', authRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/product', product)


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

module.exports = app;
