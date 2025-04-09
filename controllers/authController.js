const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/userModel");

// Register
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = users.find((user) => user.email === email);
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    role,
  };
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({ message: "Login successful", token });
};
