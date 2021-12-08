const cloudinary = require("cloudinary");

module.exports = function upload(file) {
  return new Promise(function (resolve, reject) {
    /////ASYC Stahgg
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
      secure: true,
    });
    console.log({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
      secure: true,
    });
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: "auto",
      },
      function (err, res) {
        if (err) {
          return reject(err);
        }
        resolve(res);
      },
    );
  });
};
