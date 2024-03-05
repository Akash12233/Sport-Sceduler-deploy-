import mongoose from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js";




const sportsSchema = new mongoose.Schema({
  sportName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // Assuming "User" is the name of the referenced model
});

console.log ("sport is here");

sportsSchema.methods.createsports = function ({ sport, userId }) {
  return this.create({
    sport_name: sport,
    userId: userId,
  });
};


sportsSchema.methods.deleteSport = asyncHandler ( async function (id) {
  try {
    const result = await this.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      console.log("Deleted successfully");
    }
  } catch (err) {
    console.log(err);
  }
});

sportsSchema.methods.getSports = function () {
  
  return this.find();
};

sportsSchema.methods.findSportByName = asyncHandler ( async function  (sportname, userId) {
  const getSport = await this.findOne({
    sport_name: sportname,
    userId: userId,
  });

  return !getSport; // Assuming you want to return true if the sport is not found
});

sportsSchema.methods.findSportByname =  asyncHandler(async function (id) {
  return this.findById(id);
});

sportsSchema.methods.getSportByUserId = asyncHandler(async function (userId) {
  return this.find({
    userId: userId,
  });
});


const Sports = mongoose.model("Sports", sportsSchema);

export default Sports;
