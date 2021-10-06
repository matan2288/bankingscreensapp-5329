const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const nodemailer = require("nodemailer");
const passport = require("passport");

//? Require Passport Config
require("../config/passportConfig")(passport);
passport.initialize();
passport.session();

router.route("/ResetPassword").post(async (req, res, next) => {
  console.log(req.body);

  const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "herbert.hodkiewicz92@ethereal.email",
      pass: "cUuAm1AZ3dvANRMmqd",
    },
  });

  
  try {
    User.findOne(req.body, async (err, user) => {
      if (!user) {
        console.log("No account with that email address exists.");
      } else if (user) {
        const newGivenPassword = await Math.random().toString(36).slice(-8);
        const hashedNewPassword = await bcrypt.hash(newGivenPassword, 1);

        User.findOneAndUpdate(
          { password: user.password },
          { $set: { password: hashedNewPassword } },
          { new: true },
          async (err, doc) => {
            if (err) {
              console.log("Something wrong when updating data!");
            }

            await transport.sendMail({
              from: "herbert.hodkiewicz92@ethereal.email",
              to: "matan2288@gmail.com",
              subject: "ResetPassword", // Subject line
              text: `Hello ${user.username},
                Your New Password is: ${newGivenPassword}
                `,
            });

            res.send("Email Sent!");

            console.log(doc);
          }
        );
      }
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
