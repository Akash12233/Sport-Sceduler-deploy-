import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import Sports from "../modals/sports.modal.js";

// Get all sports
const getAllSports =asyncHandler( async (req, res, next) => {
  try {
    const sports = await Sports.find();
    res.json( new ApiResponse(200, sports, "allsports fetched successfully"));
  } catch (error) {
    console.log(error)
  }
});

// Add a new sport
const addSport = asyncHandler(async (req, res, next) => {
  const { sportName} = req.body;
  const userId = req.user._id;

  console.log(sportName, userId);

  // Basic input validation
  if (!sportName) {
    return res.status(400).json(new ApiResponse(400, null, "Sport and userId are required"));
  }

  try {
    const newSport = await Sports.create(
      { sportName, userId }
    );
    res.status(201).json(new ApiResponse(200, newSport, "Sport added successfully"));
  } catch (error) {
    next(error);
  }
});

// Delete a sport by ID
const deleteSport =asyncHandler( async (req, res, next) => {
  const {_id} = req.body;
  console.log(_id," Yes fuck It|||")

  try {
    // Use a query object to match the sportName
    await Sports.deleteOne({ _id: _id });

    res.status(204).end();
  } catch (error) {
    next(error);
  }const { id } = req.body;

  try {
    // Assuming id is the _id of the sport you want to delete
    const result = await Sports.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Sport not found' });
    }

    res.status(204).end(); // Successful deletion, no content
  } catch (error) {
    console.error('Error during sport deletion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Find a sport by ID
const findSportByname =asyncHandler( async (req, res, next) => {
  const { sportName} = req.params;

  try {
    const sport = await Sports.findOne({sportName: sportName});
    if (!sport) {
      return res.status(404).json({ error: 'Sport not found' });
    }
    res.json(new ApiResponse(200, sport, "allsports fetched successfully"));
  } catch (error) {
    next(error);
  }
});

// Find sports by user ID
const findSportsByUser = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId) // Adjust this line based on where the user ID is stored
  try {
    const sports = await Sports.find({
      userId: userId,
    });
    res.json(new ApiResponse(200, sports, "allsports fetched successfully"));
  } catch (error) {
    next(error);
  }
});


export{
  getAllSports,
  addSport,
  deleteSport,
  findSportByname,
  findSportsByUser,
};



