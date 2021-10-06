const express = require("express");
const router = express.Router();
const passport = require("passport");


//? Require Passport Config
require("../config/passportConfig")(passport);
passport.initialize();
passport.session();

router.route("/Login").post((req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      console.log("No User Exists!");
      res.status(203).send("Wrong Username Or Password!");
    } else {
      req.logIn(user, async (err) => {
        if (err) throw err;
        console.log("Successfully Authenticated");
        console.log(req.user);
        res.status(200).send("Successfully Authenticated"); //! <<<<<זה!!!!!
      });
    }
  })(req, res, next);
});

module.exports = router;
