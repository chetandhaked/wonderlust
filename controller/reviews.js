const review = require("../models/review.js");
const listing = require("../models/listing.js");


module.exports.createReview =  async(req,res)=>{
    let Listings = await listing.findById(req.params.id);
  
    let newReview = new review(req.body.review);
    newReview.author  = req.user._id;
    Listings.reviews.push(newReview);
     console.log(newReview);
    await newReview.save();
    await Listings.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${req.params.id}`)
  };
module.exports.destroyReview = async (req,res)=>{
    let{id, reviewId}= req.params;
    
    await listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}})
    await review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
  
    res.redirect(`/listings/${id}`);
  
  }
  