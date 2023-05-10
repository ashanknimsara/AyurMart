const cors = require("cors");
const express = require("express");
const bodyparser = require("body-parser");
const { success, error } = require("consola");
const { connect } = require("mongoose");

const { DB, PORT } = require("./config");

const app = express();
// Serve static files from the "Media" folder
const serveStatic = require("serve-static");
app.use("/media", serveStatic("media"));
app.use(express.static('media'))


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//product routes
const ProductRouter = require("./routes/ProductRoutes");
app.use("/products", ProductRouter);

const startApp = async () => {
  try {
    await connect(DB);
    success({
      message: `Successfully connected with the Database`,
      badge: true,
    });

    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with the Database ${DB}`,
      badge: true,
    });
    startApp();
  }
};

startApp();
