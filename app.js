require("dotenv").config(); 
require("./config/passport");

const PORT = process.env.PORT || 3000;

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const app = express();
const routes = require("./routes/routes.js");
const passport = require("passport");

app.set("view engine", "ejs");
app.set("layout", "layout");

app.use(express.urlencoded({ extended: true })); // Enables usage of req.body
app.use(express.static("public")); // Enables use of /public folder
app.use(expressLayouts);

// Passport
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", routes);
// app.get("/", (req, res) => res.redirect("/db"));

// Server Start
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
