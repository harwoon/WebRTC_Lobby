import express from "express"
import { config } from "../config.mjs"
import * as authRepository from "../repository/auth.mjs"
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// 회원 중복 체크
export async function checkId(req, res) {
    const { userid } = req.query
    const found = await authRepository.findByUserid(userid)
    res.json({ exists: !!found })
}

// 회원가입
export async function signup(req, res) {
    const { userid, userpw, nickname, username, email, userType } = req.body
    // console.log("req.body: ", req.body)

    // 회원 중복 체크
    const found = await authRepository.findByUserid(userid)
    if(found) {
        return res.status(409).json({ message: `${userid}은(는) 이미 존재하는 아이디입니다.` })
    }
    const hashed = bcrypt.hashSync(userpw, config.bcrypt.saltRounds)

    // 회원가입
    const userInsertedId = await authRepository.createUser(
        { userid, userpw: hashed, nickname, username, email, userType }
    )
    const token = await createJwtToken(userInsertedId)
    // console.log("userInsertedId: ", userInsertedId)
    // console.log("token: ", token)
    res.status(201).json({ token, userInsertedId })
}

// 토큰 생성 함수
async function createJwtToken(id) {
    return jwt.sign({ newId: id }, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresInSec
    })
}
