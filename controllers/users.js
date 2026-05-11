const User = require("../models/user");
const Listing = require("../models/listing");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async (req,res)=>{
    req.flash("success", "Welcome to Wanderlust! You are logged in!");
    res.redirect(res.locals.redirectUrl || "/listings");  
}

module.exports.signup = async(req,res)=>{
    try{
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    await User.register(newUser, password);
    console.log(newUser);
    req.login(newUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
    })
 
    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
     
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "You have logged out successfully!");
        res.redirect("/listings");
    })
}