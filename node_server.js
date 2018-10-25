const express = require("express");
const app = express();
const process = require("process");

app.listen(process.env.PORT || 3000, () => {
  console.log("started server");
});
