// const mongoose = require("mongoose");
// const Schema= mongoose.Schema;
// const review = require("./review.js");

// const listingSchema= new Schema({
//     title:{
//        type: String,
//         required:  true,
//     },

//     description: String,
//     image :{
      
//         url:{
//             type: Schema.Types.Mixed,
//         default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjd9cgfy9dYkFwK0--RfAoFiupyYHWss5RmKmxgaewmg&s",
//         set: (v)=>
//         v===""
//         ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9 GcSjd9cgfy9dYkFwK0--RfAoFiupyYHWss5RmKmxgaewmg&s" 
//         : v,}
          
//     },
    
    
//         price: Number,
//     location: String,
//     country:String,
//     reviews :[{
//         type: Schema.Types.ObjectId,
//         ref: "Review",
//     }],
// });
// listingSchema.post("findOneAndDelete",async (listing)=>{
//     if(listing){
//         await review.deleteMany({_id: {$in: listing.reviews}});
//     }
// })
// const listing = mongoose.model("listing",listingSchema);
// module.exports= listing;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
          url: String,
          filename: String,
    },
    price: Number,
    location: String,
    country: String,
    //review multiples honge isliye array use kia lkin owner single hoga.......
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref : "User",
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
