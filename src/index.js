const express = require("express");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use("/user", userRoute);

app.use(express.static(__dirname + "/public"));
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send({
    data: "home  page",
  });
});
app.listen(PORT, () => console.log("server runing in port 3000"));
