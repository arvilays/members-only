// Add DATABASE_URL in .env file:
// DATABASE_URL=postgresql://postgres:<password>@localhost:5432/<db>
const db = require("../db");

// List All Entries
exports.list = async (req, res) => {
  const result = await db.query("SELECT * FROM <db> ORDER BY title");
  res.render("db/list", { db: result.rows });
};

// Show Create Form
exports.create_get = (req, res) => {
  res.render("db/form");
}

// Handle Create Form
exports.create_post = async (req, res) => {
  const { title, description, release_date, price } = req.body;
  await db.query(
    "INSERT INTO db (title, description, release_date, price) VALUES ($1, $2, $3, $4)",
    [title, description, release_date, price]
  );
  res.redirect("/db");
}

exports.delete = async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM db WHERE id = $1", [id]);
  res.redirect("/db");
}