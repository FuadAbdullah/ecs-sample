const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");

const PORT = process.env.PORT || 3000;
const MODE = process.env.MODE || "DEV";

app.use(morgan("combined"));

app.post("/helloWorld", (req, res) => {
  let message;
  if (req.query.name)
    message = `Hey there ${req.query.name}, hello world from ECS server!`;
  return res.status(200).json({
    success: true,
    message: message ? message : "Hello world from ECS",
    time: Date.now(),
    timeUTC: new Date(Date.now()).toUTCString(),
    timeISO: new Date(Date.now()).toISOString(),
  });
});

app.get("/health", (_, res) => {
  return res.status(200).json({
    success: true,
  });
});

app.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT} on ${MODE} mode`)
);
