// Add DATABASE_URL in .env file:
// DATABASE_URL=postgresql://postgres:<password>@localhost:5432/<db>
const db = require("../db");

// List All Entries
exports.listUsers = async (req, res) => {
  const result = await db.query("SELECT * FROM users ORDER BY username");
  res.render("db/list", { db: result.rows });
};

// Show Create Form
exports.getCreateUserForm = (req, res) => {
  res.render("db/form");
};

// Handle Create Form
exports.postCreateUser = async (req, res) => {
  const { first_name, last_name, username, password, confirm_password } = req.body;

  await db.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, username, password],
  );
  res.redirect("/db");
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM users WHERE id = $1", [id]);
  res.redirect("/db");
};
