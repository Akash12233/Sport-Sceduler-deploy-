import { Router } from "express";
import {verifyJWT} from "../middlewares/user.auth.js"

import {addPlayer,
    addSession,
    getAllSessions,
    getSessions,
    deleteSession,
    cancelSession,
    getSessionById,
    getPlayedSessions,
    removePlayer} from  "../controllers/session.controller.js";


const sessionrouter = Router();

sessionrouter.route('/addplayer').post(verifyJWT, addPlayer);
sessionrouter.route('/getsession/:sportname/:userId').get(verifyJWT, getSessions);
sessionrouter.route('/getAllsession/:sportname').get(verifyJWT, getAllSessions);
sessionrouter.route('/addsession').post(verifyJWT, addSession);
sessionrouter.route('/deletesession').post(verifyJWT, deleteSession);
sessionrouter.route('/cancelsession').post(verifyJWT, cancelSession);
sessionrouter.route('/getsessionbyid').get(verifyJWT, getSessionById);
sessionrouter.route('/getplayedsession').get(verifyJWT, getPlayedSessions);
sessionrouter.route('/removeplayer').post(verifyJWT, removePlayer);

export default sessionrouter