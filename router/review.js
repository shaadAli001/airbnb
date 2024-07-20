const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware");
const reviewController=require("../controllers/review");

// Post Review
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.createReview));

// Review delete route
router.delete("/:reviewId", isLoggedIn,isAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;