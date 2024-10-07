const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({storage: storage})

// const multiupload = upload.fields([{name: "documents", maxCount: 2},{name: "photos", maxCount: 9}]);

module.exports = upload;