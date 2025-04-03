import { Router } from "express";
import {register, login, addHistory, getHistory} from '../controllers/user.controllers.js';

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity").post(addHistory);
router.route("/get_all_activity").post(getHistory)

export default router;