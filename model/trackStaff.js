const mongoose = require('mongoose')
//this model stores in data as the staffs logs in and gets the time the staff logs in 
const trackStaffSchema = mongoose.Schema({
    username : {
        type: String
    },
    lga_name : {
        type: String
    },
    email : {
        type: String
    },
    Time : {
        type: Date,
        default: Date.now()
    },
});

const trackStaff= module.export=mongoose.model('trackStaff', trackStaffSchema);
// gets the whole staff that logs in and the time they did.... we sort them by the lga name and the local govertment name is gotten from our given API
module.exports.getStaffTime = (callback,limit)=>{
    trackStaff.find(callback).limit(limit).sort([["lga_name","ascending"]])
} ;