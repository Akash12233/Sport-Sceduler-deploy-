import Session from "../modals/session.modal.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const addPlayer = asyncHandler(async (req, res) => {
    // Extract data from request body
    const { id, player } = req.body;
  
    if (!id || !player) {
      throw new ApiError(400, "Session ID and player name are required");
    }
  
    const session = await Session.findById(id);
  
    if (!session) {
      throw new ApiError(404, "Session not found");
    }

    if(session.playername.length >= session.noplayers){
        throw new ApiError(400, "Session is full");
    }
  
    session.playername.push(player);
  
    // Save the updated session
    const updatedSession = await session.save();
  
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          session: updatedSession,
        },
        "Player added to the session successfully"
      )
    );
  });

  const getAllSessions = asyncHandler(async (req, res, next) => {
    const { sportname } = req.params; // Assuming sportname is part of the query parameters
  
    try {
      // Validate required fields
      if (!sportname) {
        return res.status(400).json({ error: 'Sport name is required' });
      }
  
      // Retrieve sessions based on the provided sportname
      const sessions = await Session.find({ sportname: sportname,
        sessioncreated: true,
     });
        console.log(sessions);
  
        return res.status(200).json(
          new ApiResponse(
            200,
            sessions,
            "Sessions retrieved successfully"
          )
        );
    } catch (error) {
      next(error);
    }
  });
  
  const addSession = asyncHandler(async (req, res) => {
    // Extract data from request body
    const {
      sportName,
        dateTime,
        address,
        playernames,
        noplayer,
        sessioncreated,
        userId
    } = req.body;
    console.log(sportName,
      dateTime,
      address,
      playernames,
      noplayer,
      sessioncreated,
      userId)
    // Validate required fields
    if (!sportName || !dateTime || !address || !playernames || !noplayer || !userId) {
      throw new ApiError(400, "All required fields must be provided");
    }
  
    // Create a new session
    const newSession = await Session.create({
      sportname: sportName,
      time: dateTime,
      userId: userId,
      address: address,
      playername: playernames,
      noplayers: noplayer,
      sessioncreated: sessioncreated,
    });
  
    return res.status(201).json(
      new ApiResponse(
        201,
        {
          session: newSession,
        },
        "Session created successfully"
      )
    );
  });
  
  const deleteSession = asyncHandler(async (req, res) => {
    // Extract data from request body or params
    const { name, userId } = req.body; // or req.params depending on your route
  
    // Validate required fields
    if (!name || !userId) {
      throw new ApiError(400, "Sport name and user ID are required");
    }
  
    // Delete the session
    const result = await Session.deleteOne({
      sportname: name,
      _id: userId,
    });
  
    if (result.deletedCount === 0) {
      throw new ApiError(404, "Session not found");
    }
  
    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Session deleted successfully"
      )
    );
  });
  
  const getSessions = asyncHandler(async (req, res, next) => {
    // Extract data from request query or body
    const  sportName = req.params.sportname;
    const  userid = req.params.userId;// or req.body depending on your route
    
    console.log(sportName, userid)
    // Validate required fields
    if (!sportName || !userid) {
      throw new ApiError(400, "Sport name and user ID are required");
    }
  
    // Retrieve sessions
    const sessions = await Session.find({
      sportname: sportName,
      sessioncreated: true,
      userId: userid,
      time: {
        $gt: new Date(),
      },
    });
    console.log(sessions);
    return res.status(200).json(
      new ApiResponse(
        200,
          sessions,
        "Sessions retrieved successfully"
      )
    );
    next(error);
  });
 
  const cancelSession = asyncHandler(async (req, res) => {
    // Extract data from request body or params
    const { id } = req.body; // or req.params depending on your route
  
    // Validate required fields
    if (!id) {
      throw new ApiError(400, "Session ID is required");
    }
  
    // Cancel the session
    const result = await Session.updateOne(
      { _id: id },
      {
        sessioncreated: false,
      }
    );
  
    if (result.nModified === 0) {
      throw new ApiError(404, "Session not found or not modified");
    }
  
    return res.status(200).json(
      new ApiResponse(
        200,
        null,
        "Session canceled successfully"
      )
    );
  });
  
  const getSessionById = asyncHandler(async (req, res) => {
    // Extract data from request params
    const { id } = req.params;
  
    // Validate required fields
    if (!id) {
      throw new ApiError(400, "Session ID is required");
    }
  
    // Retrieve session by ID
    const session = await Session.findById(id);
  
    if (!session) {
      throw new ApiError(404, "Session not found");
    }
  
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          session: session,
        },
        "Session retrieved successfully"
      )
    );
  });
  
  const getPlayedSessions = asyncHandler(async (req, res) => {
    // Extract data from request params
    const { userId } = req.params;
  
    // Validate required fields
    if (!userId) {
      throw new ApiError(400, "User ID is required");
    }
  
    // Retrieve played sessions
    const playedSessions = await Session.find({
      userId: userId,
      sessioncreated: true,
      time: {
        $lt: new Date(),
      },
    });
  
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          playedSessions: playedSessions,
        },
        "Played sessions retrieved successfully"
      )
    );
  });
  
  const removePlayer = asyncHandler(async (req, res) => {
    // Extract data from request body
    const { playername, id } = req.body;
  
    // Validate required fields
    if (!playername || !id) {
      throw new ApiError(400, "Player name and session ID are required");
    }
  
    // Remove player from session
    const session = await Session.findById(id);
  
    if (!session) {
      throw new ApiError(404, "Session not found");
    }
  
    const index = session.playername.indexOf(playername);
  
    if (index === -1) {
      throw new ApiError(404, "Player not found in the session");
    }
  
    session.playername.splice(index, 1);
    const updatedSession = await session.save();
  
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          session: updatedSession,
        },
        "Player removed from the session successfully"
      )
    );
  });
export {
    addPlayer,
    addSession,
    getAllSessions,
    getSessions,
    deleteSession,
    cancelSession,
    getSessionById,
    getPlayedSessions,
    removePlayer,
  };
  
  
  
