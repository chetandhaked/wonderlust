const express = require("express");
const router = express.Router();

const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { isloggedIn } = require("../middleware.js");
const { saveRedirectUrl } = require("../middleware.js");
const UserController= require("../controller/user.js");



router
    .route("/signup")
    .get( UserController.renderSignupForm)
    .post( WrapAsync(UserController.signupUser));


router
    .route("/login")
    .get(UserController.renderLoginForm)
    .post(saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash: true,
    }) ,UserController.login);


router.get("/logout",UserController.logout);

module.exports = router;
