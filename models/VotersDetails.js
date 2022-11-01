let mongoose = require('mongoose');

let VoterDetailsSchema = new mongoose.Schema({
    "Voter No" :{
            typeof:Object
    },
    "Epic No":{
        typeof:String
    },
    "Voter Name":{
        typeof:String
    },
    sex:String,
    age:String

});

module.exports= mongoose.model("VoterDetails",VoterDetailsSchema);