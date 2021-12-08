module.exports = {
  GetUser,
  PostUser,
};
const upload = require("../../utils/cloudinary");
function GetUser(req, res) {
  const user = { name: "mahdi" };

  return res.send(user);
}

/////////////
async function PostUser(req, res) {
  let file = req.body.file;
  if (file) {
    try {
      const result = await upload(file);
      res.send({ name: req.body.name, email: req.body.email, ...result });
    } catch (e) {
      res.send({ error: "fixe some error in your upload" });
    }
  } else {
    res.send({ res: "done" });
  }
}
