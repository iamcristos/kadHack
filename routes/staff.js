const express= require('express');
const router= express.Router();
const drugs= require('../model/drug');
const staff= require('../model/staff');
const trackStaff= require('../model/trackStaff');
const bcrypt= require('bcryptjs');
const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;
const session= require('express-session');


router.get('/',ensureAuthenticated, (req,res,next)=>{
    res.send('staff page')
});

// registering all staffs
//Get registration page route
router.get('/signUp', (req,res,next)=>{
    res.send('rigister')
});

//log in route
router.get('/login', (req,res,next)=>{
    res.send('login')
});

// post 
router.post('/signUp', (req,res,next)=>{
    //validation
    //get all our form values
    const username= req.body.username;
    const email= req.body.email;
    const password= req.body.password
    const confirmPassword=req.body.confirmPassword

    //validate registration form
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('email','Email dont match').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('password','password is required').notEmpty();
    req.checkBody('confirmPassword','password dont match').equals(req.body.password);

    let errors= req.validationErrors();

    if (errors) {
        res.send(errors)
        }
    else {
        let Staff= new staff()
    Staff.username= req.body.username;
    Staff.healthFacility= req.body.healthFacility;
    Staff.lga= req.body.lga;
    Staff.email= req.body.email;
    Staff.password= req.body.password;
    
    staff.registerStaff(staff,(error,staff)=>{
        if (error) console.log(error)
        else {
            req.flash('success', 'staff registerd succesfully');
            res.redirect('/staff/login')
        }
        
    })
}
});

    
// local strategy
passport.use(new LocalStrategy((username, password, done)=> {
    //match username
      staff.getStaffUsername( username, (err, user)=> {
        if (err) throw err
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        //match password
        staff.comparePassword(password, user.password, (err,isMatch)=>{
            if (err) throw err
            if (isMatch) {
                return done(null,user)
            } else {
                return done(null,false,{message:'wrong password'})
            }
        })
    })
    }));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        staff.getStaffId(id, function(err, user) {
          done(err, user);
        });
      });
    // login routes for all staffs 
// router.post('/login', function(req,res,next){
//     passport.authenticate('local', {
//         successRedirect:'/staff',
//         failureRedirect:'/staff/login',
//         failureFlash: true
//     })(req,res,next); 
// })
//authenticating user and posting his logged in time to the database
router.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        var query = {
            'username': req.user.username,
            "lga_name":req.user.lga_name
        };
        var update = {
            time: Date.now()
        };
        var options = {
            new: true
        };
        trackStaff.findOneAndUpdate(query, update, options, function(err, user) {
            if (err) {
                console.log(err);
            }
        });
        // if login is successfull, the following message will be displayed
        res.redirect('/staff/' + req.user.username);
    });
//get logout request
router.get('/logout', (req,res,next)=>{
    req.logout();
    req.flash('success','loged out succesfully')
    res.redirect('/staff/login')
});

//access control
function ensureAuthenticated(req,res,next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash('error', 'You are not authorized')
        res.redirect('/staff/login')
    }
};


module.exports= router 