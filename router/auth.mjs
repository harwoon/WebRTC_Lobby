import express from "express"
import * as authController from "../controller/auth.mjs"

const router = express.Router()

// 아이디 중복 체크
router.get("/checkid", authController.checkId)

// 회원가입
router.post("/signup", authController.signup)

// 로그인

// 로그인 유지 체크

export default router
