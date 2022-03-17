const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/v1/tasks", require("./routes/task.route"));

// Error handler
app.use(require("./middlewares/errorHandler"));

module.exports = app;
