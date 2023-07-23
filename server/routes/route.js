const express = require("express");
const router = express.Router();
const userDb = require("../models/userSchema.js");
const bcryptjs = require("bcryptjs");
const multer = require('multer');
const path = require('path');
const Note = require('../models/noteSchema');

// Configure multer to store uploaded files in a 'uploads' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const { name, description, subjects } = req.body;
    const fileName = req.file.filename;
    const filePath = req.file.path;

    // Assuming you have a User model for teacher authentication
    // You'll need to handle authentication before allowing teachers to upload notes
    const uploadedBy = req.user._id; // Get the teacher's ID from the authenticated user

    const note = new Note({
      name,
      description,
      subjects,
      fileName,
      filePath,
      uploadedBy,
    });

    await note.save();

    res.status(200).json({ message: 'Note uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the note' });
  }
});



// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(422).json({ error: "Fill in all the details" });
//   }

//   try {
//     const user = await userDb.findOne({ email: email });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     } else {
//       const isMatch = await bcryptjs.compare(password, user.password);
//       if (isMatch) {
//         // Login successful, return a success response with an appropriate message
//         return res.status(200).json({ message: "Login successful", user });
//       } else {
//         return res.status(401).json({ error: "Invalid password" });
//       }
//     }
//   } catch (error) {
//     console.log("catch block error", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });


router.post("/login", async (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      userDb.find({ username: req.body.username }, (err, data) => {
        if (data.length > 0) {
          if (bcrypt.compareSync(req.body.password, data[0].password)) {
            // Passwords match, login successful
            checkUserAndGenerateToken(data[0], req, res);
          } else {
            res.status(400).json({
              errorMessage: 'Username or password is incorrect!',
              status: false
            });
          }
        } else {
          res.status(400).json({
            errorMessage: 'Username or password is incorrect!',
            status: false
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameters first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});



router.get("/login", (req, res) => {
  res.status(405).json({ error: "Method Not Allowed" });
});


module.exports = router;




























