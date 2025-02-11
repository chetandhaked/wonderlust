const listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const review = require("./models/review.js");



module.exports.isloggedIn = (req, res,next)=>{
      
      // console.log(req.path , req.originalUrl);
     // hm chahte hai ki user new listing tabhi  create keer paaye jb wo logged in ho ye sabhi pages per ho (edit delete ....) , so use middlwre ......  
     if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
      req.flash("error", "you must be logged in to create listing!");
     return res.redirect("/login");
    }
          next();
    
}
module.exports.saveRedirectUrl = (req, res,next)=>{
    if(req.session.redirectUrl){
      res.locals.RedirectUrl = req.session.redirectUrl;
    }
          next();
}

// it is make for server side  authrization  
 module.exports.isOwner= async (req,res,next)=>{
      let {id}= req.params;
      let  Listing= await listing.findById(id); 
      if( res.locals.currUser && !Listing.owner._id.equals(res.locals.currUser._id)){
     req.flash("error","you are not the owner of this listing ");
    return res.redirect(`/listings/${id}`)
      }
      next();
 }
 

 // .................server side validation
// isme ham client se arhe data ko check ker rhe hai and ye isme req.body as a parameter paas ki h 
module.exports.validatelisting = (req,res,next)=>{
      const { listings } = req.body;
      const listing = listings; // Rename 'listings' to 'listing'
      const updatedBody = { listing };
      if(!updatedBody.listing.image){
        updatedBody.listing.image =" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjd9cgfy9dYkFwK0--RfAoFiupyYHWss5RmKmxgaewmg&s"
      }
      
      let {error} = listingSchema.validate(updatedBody);
            
            if(error){
              console.dir(error);
              //error m kai object aati hai ham chahte hai ki sab print ho web pr
              let errMsg = error.details.map((el)=> el.message).join(",");
              throw new ExpressError(400,errMsg);
            }else{
              next(); // aage ki api excute kerne ke liye
            }
        }

module.exports.validateReview = (req,res,next)=>{
            let {error} = reviewSchema.validate(req.body);
            if(error){
            console.dir(error);
             let errMsg = error.details.map((el)=> el.message).join(",");
            throw new ExpressError(400,errMsg);
            }else{
              next(); 
            }
        }

module.exports.isReviewAuthor= async (req,res,next)=>{
          let {reviewId, id}= req.params;
          let  Review= await review.findById(reviewId);
          if( res.locals.currUser && !Review.author.equals(res.locals.currUser._id)){
         req.flash("error","you are not the owner of this review");
        return res.redirect(`/listings/${id}`)
          }
          next();
     }