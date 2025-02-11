const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const listing = require("../models/listing.js");
const {isloggedIn,isOwner , validatelisting} = require("../middleware.js");
const listingController = require("../controller/listings.js")
const multer  = require('multer')
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage})// multer form m se image ke data ko nikalega and ek upload name ki folder create krega and usme store kerega  

router.use(express.urlencoded({extended: true}));


    
    
  router
    .route("/")  //index route
    .get( wrapAsync(listingController.index))
    .post(//submit new listing
            isloggedIn, 
            upload.single('listings[image]'), // image ka data req.file m jata hai 
            validatelisting, 
            wrapAsync(listingController.createListing) 
          );
    
    


            
  //click for new listing ......
  router.get("/new", isloggedIn , (req , res)=>{
    console.log(res.locals.location)
    res.render("listing/new.ejs");
  });


  router
    .route("/:id")
    .get( wrapAsync(listingController.show))
    // show routs
    .put( //update route
            isloggedIn, 
            isOwner, 
             upload.single('listings[image]'),
             validatelisting, 
            wrapAsync(listingController.updateListing))
    .delete(//delete route
          isloggedIn, 
          isOwner,
          wrapAsync(listingController.distroyListing));



  router.get("/",wrapAsync((req,res)=>{
    res.send("hi i am root");
    }));
    
  // edit 
  router.get("/:id/edit",
            isloggedIn, 
            isOwner,
            wrapAsync(listingController.renderEditForm));

  module.exports = router;
