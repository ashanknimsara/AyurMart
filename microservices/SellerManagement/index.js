const express = require("express");
const cors = require("cors");
const { mongoose } = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(cookieparser());
app.use(express.json());

//mongoose connection
mongoose
  .connect(process.env.mongoDBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("mongoDB Successfully Connected"))
  .catch((error) => console.log(error));

//routes
app.use("/auth", require("./routes/Login"));
app.use("/auth/sign", require("./routes/Login"));
app.use("/auth/profile", require("./routes/Login"));
app.use("/auth/log", require("./routes/Login"));


//app listen port
app.listen(5000, () => {
  console.log("server running on port 5000");
});


