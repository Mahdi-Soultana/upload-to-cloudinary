const express = require("express");

const router = express.Router();

router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ limit: "50mb" }));

const { GetUser, PostUser } = require("../controllers/user/UserController");
const routes = [
  { method: "GET", route: "/" },
  { method: "GET", route: "/:id" },
  { method: "POST", route: "/" },
  { method: "Delete", route: "/:id" },
  { method: "PUT", route: "/:id" },
];

router
  .get(routes[0].route, (req, res) => {
    res.send(routes[0]);
  })
  .get(routes[1].route, GetUser)
  .post(routes[2].route, PostUser)
  .delete(routes[3].route, (req, res) => {
    res.send(routes[3]);
  })
  .put(routes[4].route, (req, res) => {
    res.send(routes[4]);
  });

module.exports = router;
