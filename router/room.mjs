import express from "express"
import * as roomController from "../controller/room.mjs"
import { isAuth } from "../middleware/auth.mjs"

const router = express.Router();

//방 생성
// https://127.0.0.1:8080/room/create (POST)
router.post("/create",isAuth,roomController.createRoom)

//방 가져오기
// https://127.0.0.1:8080/room/rooms (GET)
router.get("/rooms",isAuth,roomController.getRooms)

//과목별 방 가져오기

//레벨별 방 가져오기

export default router