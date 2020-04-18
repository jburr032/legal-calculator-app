const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

app.get("/", (req, res) => res.send("API running"));

//Define routes
app.use("/uk", require("./routes/uk-landing"));
app.use("/uk/cpr", require("./routes/cpr"));
app.use("/uk/court-order", require("./routes/court-order"));
