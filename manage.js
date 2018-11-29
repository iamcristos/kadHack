const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');

const adminSchema= mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require:true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    confirmPassword:{
        type: String,
        require: true
    }
});

const admin= module.exports= mongoose.model('admin', adminSchema);

module.exports.registerAdmin= function (userAdmin,callback) {
// hashing password
bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(userAdmin.password,salt,function(err, hash){
        if (err){
            console.log(err)
        } 
        userAdmin.password=hash;
        console.log(hash)
        userAdmin.save(callback)
    })
});
};

module.exports.getAdminByUsername= function (username,callback) {
    let quary= {username:username}
    admin.findOne(quary,callback)
};

module.exports.getAdminId= (id,callback)=>{
    admin.findById(id,callback)
};

module.exports.comparePassword= function (candidatePassword,hash,callback) {
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if (err) console.log(err)
        callback(null,isMatch)
    })
};
