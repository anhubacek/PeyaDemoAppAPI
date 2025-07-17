const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    console.log('Registering user:', req.body);
    const { email, name, lastName, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    const newUser = new User({ email, name, lastName, password });
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log('Error registering user:', error);
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.json({ message: "Login exitoso", user });
  } catch (error) {
    console.log('Error logging in user:', error);
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    console.log('Error getting user by email:', error);
    res.status(500).json({ message: "Error al obtener usuario", error });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const updateFields = req.body;

    // if (image !== undefined && image !== null && image.trim() !== "") {
    //   updateFields.image = image;
    // }

    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      updateFields,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.log('Error updating user info:', error);
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserByEmail,
  updateUserInfo,
};
