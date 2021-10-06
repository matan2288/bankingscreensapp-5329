const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

router.route("/ChangePassword").post(async (req, res, next) => {
  try {
    User.findOne({ username: req.body.username }, async (err, user) => {
      if (!user) {
        console.log("No account with that email address exists.");
      } else if (user) {
        bcrypt.compare(
          req.body.oldPassword,
          user.password,
          function (err, isMatch) {
            if (err) throw err;
            if (isMatch) {
              console.log("correct password!");

              User.findOne({ username: user.username }, async (err, user) => {
                if (!user) {
                  console.log("Wrong Old Password");
                } else if (user) {
                  const hashedNewChangedPassword = await bcrypt.hash(
                    req.body.password,
                    1
                  );

                  User.findOneAndUpdate(
                    { password: user.password },
                    { $set: { password: hashedNewChangedPassword } },
                    { new: true },
                    async (err, doc) => {
                      if (err) {
                        console.log("Something wrong when updating data!");
                      }

                      console.log(doc);
                      res.send("Your password was changed successfully!");
                    }
                  );
                }
              });
            } else if (!isMatch) {
              res.send("The Old Password Is Incorrect!");
            }
          }
        );
      }
    });
  } catch (error) {
    console.error(error);

  }
});

module.exports = router;
