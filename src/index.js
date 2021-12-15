const express = require("express");
const userRoute = require("./routes/userRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use("/user", userRoute);

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.send({
    data: "home  page",
  });
});

app.listen(PORT, () => console.log("everything is good Server Run !!! ));
