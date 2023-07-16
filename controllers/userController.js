const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(422).json({ error: "Invalid email or password" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await new User({
      name,
      email,
      password: hashedPassword,
    }).save();
    res.status(200).json({ message: "User saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(422).json({ error: "Invalid email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create and sign the JWT
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      "your-secret-key"
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
