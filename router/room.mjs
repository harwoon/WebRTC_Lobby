import express from "express"
import * as roomController from "../controller/room.mjs"

const router = express.Router();

//방 생성
// 로그인 완료시 인증 미들웨어 인자로 추가
router.post("/create",roomController.createRoom)

export default router