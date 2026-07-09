import express from "express"
import * as roomRepository from "../repository/room.mjs"
import * as authRepository from "../repository/auth.mjs"

// 방 생성
/*
    {
    _id : 방번호
    title : 방제목
    nickname : 생성자명
    subject : 과목태그
    level : 수준태그
    use : 불린

}
*/
export async function createRoom(req,res){
    const {title, subject, level } = req.body
    const user = await authRepository.findById(req.user)
    const nickname = user.nickname
    const room = await roomRepository.create(title,nickname,subject,level)
    res.status(201).json(room)
}

// 전체 방 가져오기
export async function getRooms(req,res){
    const rooms = await roomRepository.getAll()
    res.status(200).json(rooms)
}