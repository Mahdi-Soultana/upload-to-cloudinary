const cloudinary = require("cloudinary");

module.exports = function upload(file) {
  return new Promise(function (resolve, reject) {
    /////ASYC Stahgg
    cloudinary.v2.config({
      cloud_name: "soultana-mahdi",
      api_key: "854179451261813",
      api_secret: "_WVO8zT9yB_gQEFiSAjPXn-ncE4",
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
