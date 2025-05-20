const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../db");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find username
      const result = await db.query(
        "SELECT * FROM users where username = $1",
        [username.trim()]
      );

      if (result.rows.length === 0) {
        return done(null, false, { message: "Incorrect username or password." });
      }

      const user = result.rows[0];

      // Compare password hashes
      const isMatch = await bcrypt. compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect username or password." });
      }

      // Success
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) return done(null, false);
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});