const mongoose= require('mongoose');

const drugSchema= mongoose.Schema({
    drug_name: {
        type: String
    },
    name: {
        type: String
    },
    lga_name: {
        type: String
    },
    quantity:{
        type: Number
    },
    Date : {
        type: Date,
        default: Date.now
    }
});

const drug= mongoose.model('drug', drugSchema);
module.exports= drug;


// getting the number of drugs

module.export= getDrug = (callback,limit)=>{
    drug.find(callback).limit(limit).sort([["lga","asscending"]])
} ;