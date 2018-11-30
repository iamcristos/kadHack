const mongoose= require('mongoose')
const kadunaSchema= mongoose.Schema({
    name : {
        type: String
    },
    functional_status : {
        type: String
    },
    lga_code : {
        type: String
    },
    lga_name : {
        type: String
    },
    state_code : {
        type: String
    },
    state_name : {
        type :String
    }
});

const kaduna= mongoose.model('kaduna', kadunaSchema);

module.exports= kaduna;