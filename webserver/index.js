const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("docs"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});