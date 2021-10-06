const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

router.route("/Register").post((req, res, next) => {
  const user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
  };
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) {
      console.log("User Already Exists");
      res.status(203).send("User Already Exists");
    }
    if (!doc) {
      const newUser = new User(user);
      await newUser.save();
      console.log("New User Created");
      res.status(200).send("Registered Successfully");
    }
  });
});

module.exports = router;
