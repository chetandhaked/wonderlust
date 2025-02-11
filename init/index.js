
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  // owner ko listing collection ke her object m as a property (like : image, title ), add krne ke lye 
  initData.data = initData.data.map((obj) => ({
    ...obj, 
    owner : "6624a8b378e9ed82066775c1",
  }));
  // map function new array return kerta hai ( ...obj : phle wali sari obj ese hi rhe or and , owner likhne se)new array m owner prop. jud jaaye ........


  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
