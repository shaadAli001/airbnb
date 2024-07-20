const Listing = require("../Models/listing");
const initData = require("./data.js");
const mongoose = require("mongoose");
const Mongo_Url = 'mongodb://127.0.0.1:27017/airbnb';

main()
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(Mongo_Url);

}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: '6699407c208af53596ed84b9' }));
    await Listing.insertMany(initData.data);
    console.log("Sample Data Initialized");
}
initDB();