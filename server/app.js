const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const router = require("./routes/route");
const multer = require('multer');

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


const Note = require('./models/noteSchema');
require("./db/conn");
app.use(express.json());

app.use(cors());
app.use(router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.get("/", (req, res) => {
  res.send("Hello, server is running!");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


// app.js



// Rest of your app.js code...

app.post('/api/upload', upload.single('pdf'), async (req, res) => {
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

