const Listing = require("../Models/listing");
const Review = require("../Models/review");

module.exports.createReview = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    // console.log(newReview);
    await listing.save();
    await newReview.save();

    req.flash("success", "Review Created Successfully");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview=async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
}