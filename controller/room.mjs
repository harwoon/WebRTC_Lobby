import express from "express"
import * as roomRepository from "../repository/room.mjs"
import * as authRepository from "../repository/auth.mjs"

// 방 생성
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

// 과목별 방 가져오기
export async function getRoomsbySubject(req,res){
    const {subject} = req.body
    const rooms = await roomRepository.getBySubject(subject)
    res.status(200).json(rooms)
}

// 레벨별 방 가져오기
export async function getRoomsbyLevel(req,res){
    console.log("room controller")
    const {level} = req.body
    const rooms = await roomRepository.getByLevel(level)
    res.status(200).json(rooms)
}