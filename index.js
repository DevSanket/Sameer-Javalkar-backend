const express = require('express');
const app = express();
const mongoose = require('mongoose');
const VotersDetails = require('./models/VotersDetails');
require('dotenv/config');
const bodyParser = require('body-parser');


app.use(bodyParser.json());


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    dbName:'Voters'
}).then(() => {
    console.log("Database Connected");
}).catch(err => {
    console.log(err);
    console.log("Database not connected");
});

// app.post('/api/create',async (req,res) => {
//     await new VotersDetails({"Epic No":"test","Voter Name":"test","Voter No":"2","age":"12","sex":"test"}).save();
//     return res.status(200);
// });

app.get('/api/getAll',async (req,res) => {

    // await new VotersDetails({"Epic No":"test","Voter Name":"test","Voter No":"2","age":"12","sex":"test"}).save();

    await VotersDetails.find({}).limit(200).then(data => {
        return res.status(200).json(data);
    }).catch(err => {
        console.log(err)
        return res.status(404).json({
            msg:"No Data found"
        })
    })
})

app.post('/api/search',async (req,res) => {
    const {search} = req.body;
    await VotersDetails.find({"Voter Name" : {$regex : search,$options: 'i'}}).then((data) => {
    //    res.json(data);
       return res.status(200).json(data);
    }).catch(err => {
        console.log(err);
        return res.status(400).json({msg:"No Data found"});
    });

    return res.status(200);


    
})



app.listen(process.env.PORT,() => {
    console.log("Running on Port ",process.env.PORT);
})