const User = require("../models/user.js");


module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}


module.exports.signupUser = async (req,res)=>{
    try{
        let {username, email, password} = req.body;
        const newUser = new User ({ username, email});
        const registeredUser =  await User.register(newUser, password);//ye user ka register method hai jo hamre fakeUser ko with password db m save kraye ga aur ye khud hi check kerlega ki pasword/user unique hai y nhi  ""// helloworld is a password
        console.log(registeredUser);
        // hm chte h ki sign up kerte hi user login ho jaye 
        req.login(registeredUser, (err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to WonderLust");
            res.redirect("/listings");
             }) 
       
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
   
}

module.exports.renderLoginForm = (req,res)=>{
    
    res.render("users/login.ejs");
}
module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to WonderLust");
    let redirectUrl =  res.locals.RedirectUrl || "/listings";
    res.redirect( redirectUrl);
}
module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","ypu are logged out!");
        res.redirect("/listings");
    }
   
)
};