import { Router } from "express";
import {verifyJWT} from "../middlewares/user.auth.js";
import {getAllSports,
    addSport,
    deleteSport,
    findSportByname,
    findSportsByUser} from "../controllers/sport.controller.js"

const sportrouter=Router();

sportrouter.route('/deletesport').post(verifyJWT, deleteSport);
sportrouter.route('/allsport').get(verifyJWT, getAllSports);
sportrouter.route('/addsport').post(verifyJWT, addSport);
sportrouter.route('/sportuser').get(verifyJWT, findSportsByUser);
sportrouter.route('/:sportName').get(verifyJWT, findSportByname);



export default sportrouter;