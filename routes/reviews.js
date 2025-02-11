const express = require("express");
const router = express.Router({mergeParams: true});//  merge prms se app .js m jp id aayegi wo rewie file tk pahuch sake 
const wrapAsync = require("../utils/WrapAsync.js");
const review = require("../models/review.js");

const {validateReview, isloggedIn, isReviewAuthor }= require("../middleware.js")

const { createReview, destroyReview } = require("../controller/reviews.js");



//reviews 
//post route
router.post("/", isloggedIn,
          validateReview,
          wrapAsync(createReview)
)


// delete review route
router.delete("/:reviewId",isReviewAuthor, wrapAsync(destroyReview))

module.exports = router;
