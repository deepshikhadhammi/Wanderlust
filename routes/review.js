const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn } = require("../middleware.js");
const ReviewController = require("../controllers/reviews.js");

// Create Review
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(ReviewController.createReview)
);

// Delete Review
router.delete(
    "/:reviewId",
    isLoggedIn,
    wrapAsync(ReviewController.destroyReview)
);

module.exports = router;