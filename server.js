const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

const port = process.env.PORT || 9000;

// EJS Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "partial"));

// Static Files
app.use(express.static(path.join(__dirname, "/public")));

// Routes for Pages
app.get("/", (req, res) => {
  res.render("index");
});
  // rendering index(main/entry) page
app.get('/index', (req, res) => {
  // rendering .ejs file 
  res.render('index');
});
  // rendering about page
app.get("/about", (req, res) => {
  res.render("about");
});

// connecting to mongodb 
mongoose.connect('mongodb://localhost:27017/UserData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('Data', userSchema);

// API Endpoints
// Signup
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } 
  catch (error) {
    res.status(500).json({ message: 'Error signing up', error });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});



// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});