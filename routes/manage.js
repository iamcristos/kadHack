const express= require('express');
const router= express.Router();
const nodemailer= require('nodemailer');
const passport= require('passport');
const localStrategy= require('passport-local').Strategy
const drugs= require('../model/drug');
const staff= require('../model/staff');
const kaduna= require('../model/api');
const admin= require('../model/manage');
const apiData= require('../scripts');
const trackStaff= require('../model/trackStaff');
// home admin route only accesible to an admin
router.get('/',ensureAuthenticated, (req,res,next)=>{
res.send('Admin page')
});

//Get the register Admin route to render the refistration form
router.get('/signUp', (req,res,next)=>{
    res.send('register admin')
})

// addmin sign up

router.post('/signUp', (req,res,next)=>{
    const username= req.body.username
    const email= req.body.email;
    const password= req.body.password;
    const password2= req.body.confirmPassword;

    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('email','Email is not valid').isEmail();
    req.checkBody('email','Email dont match').notEmpty();
    req.checkBody('password','password is required').notEmpty();
    req.checkBody('password2','password dont match').equals(req.body.password);

    let errors= req.validationErrors();

    if (errors) {
        res.send('register', {
            errors:errors
        });
    } else {
    let Admin= new admin();
    Admin.username= req.body.username;
    Admin.email= req.body.email;
    Admin.password= req.body.password;
        // admin registration
        admin.registerAdmin(Admin, (err,newAdmin)=>{
            if (err) console.log(err)
            else {
                req.flash('success', 'Admin successfully registerd')
                res.redirect('/manage/login')
            }
        });
    };
        });
    
//Get login admin
router.get('/login',(req,res,next)=>{
        res.send('login admin')
    });

 //local strategy
 passport.use(new localStrategy((username,password,done)=>{
    //match username
    admin.getAdminByUsername(username, (err, user)=>{
        if (err) throw err;
        if (!user) {
            return done(null, false, {message:'no user'})
        };

    //match password
    admin.comparePassword(password, user.password, (err,isMatch)=>{
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
    admin.getAdminId(id, function(err, user) {
      done(err, user);
    });
  });


// post login request for the admin
router.post('/login', (req,res,next)=>{
    passport.authenticate('local', {
            successRedirect:'/mange',
            failureRedirect:'/manage/login',
            failureFlash: true
        })(req,res,next) 
    });
    

//admin logout
router.get('/logout', (req,res,next)=>{
    req.logout()
    req.flash('success','Logged out');
    res.redirect('/manage/login')
});
//Get the drug registration form
router.get('/drugs/register', (req,res,next)=>{
    kaduna.find(err,data=>{
        if (err) console.log(err)
        res.send('data to retrieve lga_name and hospital form')//{name:data.name,lga_name:data.lga_name})
    });
    
})

//Get number of drugs sent to each local govt by collecting the data from the database
router.get('/drugs', (req,res,next)=>{
    drugs.getDrug((err,drug=>{
        res.send('the drug data')
    }) // res.send('rigister')
); 
})  
    

// get all registered in staffs and sort them by the local govt
router.get('/staffs', (req,res,next)=>{
    staff.getStaff((err,staffs)=>{
        res.send("registered staffs are displayed");
        // here all staffs login details should show
    })
});

// get contact us sending message to the admin using nodemailer 
router.post('/contact',(req,res,next)=>{
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'iamthecristos@gmail.com',
          pass: '1stclass'
        }
      });
      let name= req.body.name;
      let email= req.body.email;
      let subject= req.body.subject
      let message= req.body.message;
      console.log(name+email+message)
      let mailOptions = {
        from: 'iamthecristos@gmail.com',
        to: 'nmereginivincent@gmail.com',
        subject: subject,
        text: `you have a submission from name:${name} email:${email} message:${message} `,
        html: `<p>you have a submission from <ul><li>name:${name} </li><li>email:${email} </li><li>message:${message} </li></ul>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        res.redirect('/')
      });
        
    
})

// get all loged in staffs and their time
router.get('/staffs/login', (req,res,next)=>{
    //quarry the staff post database that stores the time he logs in
    trackStaff.getStaffTime((err,staffs)=>{
        res.send('staffs logged in')//'as soon as a staff in the local government logs in')
            // passing the data to the client side from the server
        })
    });

//access control
function ensureAuthenticated(req,res,next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash('error', 'You are not authorized')
        res.redirect('/manage/login')
    }
}

module.exports= router 