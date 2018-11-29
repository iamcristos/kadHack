const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const passport= require('passport');
const localStrategy= require('passport-local').Strategy;
const staffSchema= mongoose.Schema({
    username: {
        type: String
    },
    healthFacility: {
        type: String
    },
    lga_name: {
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password : {
        type: String
    },
    confirmPassword : {
        type: String
    },
    
    time : {
        type: Date,
        default: Date.now()
    }
});

const staff= mongoose.model('staff', staffSchema);
module.exports= staff;


// getting staffs whom have resumed

module.exports.getStaff = (callback,limit)=>{
    staff.find(callback).limit(limit).sort([['lga_name','ascending']])
} ;

// registration of staffs at different health facility and lga

module.exports.registerStaff = (staffUser, callback)=>{
    // hashing password
bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(staffUser.password,salt,function(err, hash){
        if (err){
            console.log(err)
        } 
        staffUser.password=hash;
        console.log(hash)
        staffUser.save(callback)
    })
});

}

// login request for staffs

module.exports.getStaffUsername = (username, callback)=>{
    let quary = {username:username}
    staff.findOne(quary,callback)
};

module.exports.getStaffId = (id,callback)=>{
    staff.findById(id,callback)
};

module.exports.comparePassword = (candidatePassword,hash,callback)=>{
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if (err) console.log(err)
        callback(null,isMatch)
    })
};
