const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressSession = require("express-session");
const PORT = process.env.PORT || 4003;
const passport = require("passport");

//! Express Session = keep track of the user client side state
//! If the user is logged in/If the user added items to the shopping cart

//ImportRoutes
const RegisterRouteImported = require("./routes/RegisterRoute");
const UserLoginRouteImported = require("./routes/UserLoginRoute");
const PVUDTDB_Route_Imported = require("./routes/PVUDTDB-Route");
const ResetPassword_Route_Imported = require("./routes/ResetPassword-Route");
const ChangePassword_Route_Imported = require("./routes/ChangePassword-Route ");

const app = express();

//CONNECT TO DB
const connectDB = require("./config/DatabaseSetup");
connectDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//? Middleware
//DataParsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//!Express Session
app.use(
  expressSession({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000", //! <-- Location of the react app we are connecting to
    credentials: true, // <-- ALSO IMPORTENT
  })
);

app.use(cookieParser("secretcode")); //! <-- use the same parameter ('secretcode') in the cookie parser

//? Initialize passport
app.use(passport.initialize());
app.use(passport.session());
require("./config/passportConfig")(passport);

//?ApplyRoutes
app.use("/Register-Route", RegisterRouteImported); // <-- Register ROUTE
app.use("/UserLogin-Route", UserLoginRouteImported); // <-- LOGIN ROUTE
app.use("/PVUDTDB-Route", PVUDTDB_Route_Imported);
app.use("/ResetPassword-Route", ResetPassword_Route_Imported);
app.use("/ChangePassword-Route", ChangePassword_Route_Imported);

app.use((req, res, next) => {
  next(createError(404));
});

if (process.env.NODE_ENV == "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

