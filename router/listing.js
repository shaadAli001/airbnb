const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");
const multer = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })

router.route("/")
    .get(wrapAsync(listingControllers.index))
    .post(isLoggedIn, validateListing, upload.single('listing[image.url]'), wrapAsync(listingControllers.createListing))

router.get("/new", isLoggedIn, listingControllers.renderNewForm);

router.route("/:id")
    .get(wrapAsync(listingControllers.showListing))
    .put(validateListing, isLoggedIn, isOwner, upload.single('listing[image.url]'), wrapAsync(listingControllers.renderUpdateForm))
    .delete(isLoggedIn, isOwner, wrapAsync(listingControllers.renderDeleteForm));


router.get("/:id/edit", isLoggedIn, wrapAsync(listingControllers.renderEditForm));


module.exports = router;