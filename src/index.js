const express = require("express");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use("/user", userRoute);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.send({
    data: "home  page",
  });
});
app.listen(3000, () => console.log("server runing in port 3000"));
