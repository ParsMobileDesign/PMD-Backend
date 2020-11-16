const express = require("express");
const bodyParser = require("body-parser");
const portfolioRouter = require("./routes/portfolio-routes");
const userRoutes = require("./routes/user-routes");
const httpError = require("./models/httpError");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use("/api/portfolio", portfolioRouter);
app.use("/api/user", userRoutes);
app.use((req, res, next) => {
  const err = new httpError("Could not find the route !", 404);
  throw err;
});
app.use((error, req, res, next) => {
  res.status(error.code).json({ message: error.message });
});
mongoose
  .connect(
    "mongodb+srv://pedram:MongoDb2020@parsmobiledesign.wd6ri.mongodb.net/portfolio?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => console.log(error));
