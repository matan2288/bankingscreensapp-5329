const express = require("express");
const router = express.Router();
const UserDataPassedFromClientSchema = require("../Models/FullUserDataModel");
const User = require("../Models/User.js");

router.route("/PVUDTDB").post((req, res, next) => {
  console.log(req.body);

  const sortedAcceptedDataFromClient = {
    VerifiedUsername: req.body.UserDataPassedFromClient[0].Username,
    VerifiedUserPersonalCompanyDetails: req.body.UserDataPassedFromClient[1],
    VerifiedUserBankAccountIndex: req.body.UserDataPassedFromClient[2],
    VerifiedUserLoanAmount: req.body.UserDataPassedFromClient[3]
  };

  User.findOne(req.body.Username, async (err, doc) => {
    if (err) throw err;
    if (doc) {
      try {
        await UserDataPassedFromClientSchema.create(
          sortedAcceptedDataFromClient
        );
        console.log(req.body);
        res.send("Success!");
       
        // console.log("Success!");
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  });
});

module.exports = router;
