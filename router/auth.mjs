import express from "express"
import * as authController from "../controller/auth.mjs"
import { isAuth } from "../middleware/auth.mjs"

const router = express.Router()

// 아이디 중복 체크
router.get("/checkid", authController.checkId)

// 회원가입
router.post("/signup", authController.signup)

// 로그인
router.post("/login", authController.login)

// 로그인 유지 체크
router.get("/me", isAuth, authController.me)

// 로그인 유치 체크 테스트 (내 정보 조회)
// router.get("/me", isAuth, (req, res) => {
//     res.json({ user: req.user })
// })

export default router

