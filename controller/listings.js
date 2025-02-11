const listing = require("../models/listing.js");


module.exports.index = async (req,res)=>{
    const allListing = await listing.find({});
    // const list1 = await listing.findById({_id: '661166855e152177d77cf71d'});
    res.render("listing/index.ejs",{allListing});
 };

 module.exports.show = async (req,res)=>{
    let {id}= req.params;
    const Listing = await listing.findById(id)
    .populate({path: "reviews",
              populate: {
                path: "author"
              },
            })
            .populate("owner");
    if(!Listing){
      req.flash("error"," listing you requested for does not exist!");
      res.redirect("/listings");
    }
    res.render("listing/show.ejs", {Listing})
}

module.exports.createListing =async(req,res,next)=>{
let url = req.file.path;
let filename = req.file.filename;

    const newListing = new listing (req.body.listings);
    newListing.owner = req.user;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success","New listing Created!");
    res.redirect("/listings");
};
module.exports.renderEditForm = async (req,res)=>{
    console.log(req.user)
      let {id}= req.params;
      const Listing = await listing.findById(id);
      if(!Listing){
        req.flash("error"," listing you requested for does not exist!");
        res.redirect("/listings");
      }
      res.render("listing/edit.ejs",{Listing})
  };

  module.exports.updateListing = async(req,res)=>{

    // if(!req.body.listings){
    //   throw new ExpressError(400, "Send valid data for listing");
    // }
    let {id}= req.params;
   let  listings= await listing.findByIdAndUpdate(id,{...req.body.listings});

   if(typeof req.file !== "undefined"){
   let url = req.file.path;
   let filename = req.file.filename;
   console.log(url ," .. ",  filename  )
   listings.image = {url, filename};
  await listings.save();
   }
    req.flash("success","listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.distroyListing =async(req,res)=>{
    let {id}= req.params;
    let deletedListing = await listing.findByIdAndDelete(id);
    req.flash("success","listing Deleted! successfully");

    console.log(deletedListing)
    res.redirect("/listings");
};

