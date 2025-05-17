// Load Environmental Variables
// NODE_ENV=prod
require("dotenv").config(); // Remember to create .env file

// Core Modules
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

// Routes
const routes = require("./routes/routes.js");

// App Setup
const app = express();
const PORT = process.env.PORT || 3000;

// View Engine
app.set("view engine", "ejs");
app.set("layout", "layout");

// Middleware
app.use(express.urlencoded({ extended: true })); // Enables usage of req.body
app.use(express.static("public")); // Enables use of /public folder
app.use(expressLayouts);

// Routes
app.use("/db", routes);
app.get("/", (req, res) => res.redirect("/db"));

// Server Start
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
