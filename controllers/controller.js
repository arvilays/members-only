// Add DATABASE_URL in .env file:
// DATABASE_URL=postgresql://postgres:<password>@localhost:5432/<db>
const db = require("../db");
const bcrypt = require("bcrypt");
const passport = require("passport");

// List All Entries
exports.getUserList = async (req, res) => {
  const result = await db.query("SELECT * FROM users ORDER BY username");
  res.render("list", { db: result.rows });
};

// Show Login Form
exports.getLoginForm = (req, res) => {
  res.render("login");
}

// Handle Login Form
exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // Authentication failed
      return res.redirect("signup");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      // Authentication successful
      console.log(`Hello ${user.username}, welcome!`);
      return res.redirect("/");
    });
  })(req, res, next);
};

// Show Create Form
exports.getSignupForm = (req, res) => {
  res.render("signup");
};

// Handle Create Form
exports.postSignup = async (req, res) => {
  try {
    const { password, confirm_password } = req.body;

    // Trim inputs
    const first_name = req.body.first_name?.trim();
    const last_name = req.body.last_name?.trim();
    const username = req.body.username?.trim();

    // Validate name fields
    if (!first_name || !last_name || !username) {
      return res.status(400).send("Full name and/or username must not be empty.");
    }

    // Validate password length
    if (!password || password.length < 6) {
      return res.status(400).send("Password must be 6 characters or longer.")
    }

    // Validate confirm password
    if (password !== confirm_password) {
      return res.status(400).send("Passwords do not match.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
      [first_name, last_name, username, hashedPassword],
    );

    res.redirect("/");
  } catch (error) {
    console.error("Error creating user: ", error);
    return res.status(500).send("An error occurred while creating the user.");
  }
};

// Delete User Entry (along with their messages)
exports.postDeleteUser = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM users WHERE id = $1", [id]);
  res.redirect("/");
};