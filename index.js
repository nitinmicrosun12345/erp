const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
console.log(process.env);
const app = express();
const port = process.env.PORT;

const mongoDBURL = process.env.MONGODB_URL;

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/api", require("./src/routes/dashboardRoutes"));
app.use("/api", require("./src/routes/homeRoutes"));
// Include your routes
app.use("/api", require("./src/routes/userRoutes"));

app.use("/api", require("./src/routes/serviceRoutes"));
app.use("/api", require("./src/routes/serviceInfoRoutes"));
app.use("/api", require("./src/routes/serviceadd"));
app.use("/api", require("./src/routes/workstatusRoutes"));
app.use("/api", require("./src/routes/salaryDescriptionRoutes"));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
