const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

//Define routes
app.use("/uk", require("./routes/uk-landing"));
app.use("/uk/cpr", require("./routes/cpr"));
app.use("/uk/court-order", require("./routes/court-order"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
