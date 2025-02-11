if(process.env.NODE_ENV != "production"){
require('dotenv').config();//it connect env file to backend 
}


const express= require("express");
const app= express();
const port = 8080;
const mongoose= require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate= require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStratergy = require("passport-local")
const User = require("./models/user.js"); 


const listingsRoute = require("./routes/listings.js");
const reviewsRoute = require("./routes/reviews.js");
const usersRoute = require("./routes/users.js")
// const review = require("./models/review.js");

app.set("views engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOption = {
  secret : "mysupersecretcode",
  resave: false,
  saveUninitialized : true,
  cookie: {
    expires : Date.now() + 7*24*60*60*1000, // time of 1 week in terms of ms 
    maxAge : 7*24*60*60*1000,
    httpOnly :true

  }
}

app.use(session(sessionOption));
app.use(flash());
// hamesa flash raouts ke uper define hona chhiye 
  
app.use(passport.initialize()); // a middleware that initialize passport
app.use(passport.session()); // jab user one sesion m kai req. bhje to baar bar login na kerna pde(iska use kerte hai taki her request ko pta ho wo konse session ka part hai )
// mtlb ek session m ek login kre
passport.use(new LocalStratergy(User.authenticate()));


// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser()); // serialize : usr ki info save kerna 
passport.deserializeUser(User.deserializeUser());// info htana 

// app.get("/ddemouser" ,async(req,res)=>{
//   let fackeUser = new User({
//     email: "student5462@gmail.com",
//     username: "delta-student"
//   })
 
// })




// is line se client jo bhi request bhjega wo roter ke listings.js m jayegi 
app.use((req, res, next)=>{
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.currUser = req.user;
  
  next();
});


app.use("/listings", listingsRoute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/",usersRoute);



main()
.then((res)=>{console.log("connection is successful")})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}





// hamne wrapfunction bnaaya jo api ke error ko handle kerne m help kerega , lekin ydi kisi ne galat api req. m bhji to error aayega us error ko wrspfn handle nhi ker paayega so...
app.all("*",(req,res,next)=>{
    next( new ExpressError(404,"Page Not found"));
});

app.use((err, req, res, next)=>{
    let {statusCode = 500, message= "Something went wrong"}= err;
  // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(port, (req,res)=>{
  console.log("server is listening on the port : 8080");
  
})



// app.get("/testlisting",async (req,res)=>{
//     let sampleListing = new listing({
//         title: "My New villa",
//         description : "By the beach",
//         price:1200,
//         location: "Calangute, Goa",
//         country: "India",
//     });
//    await sampleListing.save();
//    console.log("sample was sved");
//    res.send("successful");
// })


