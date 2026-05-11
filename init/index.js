// Initialisation logic

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js")

//establish connection
main().then(()=>{
    console.log("connected to DB");
}).catch(err =>{
    console.log(err);
})
//create db
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({
        ...obj, owner: new mongoose.Types.ObjectId("69fac978ba251708f15cd893") //because owner is required field in listing schema and we have to assign some user as owner for the initial listings
    }))
    await Listing.insertMany(initData.data) //because initData is object check data file
    console.log("data was initialised");

}

initDB();