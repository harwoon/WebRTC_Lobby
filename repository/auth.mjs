import MongoDB from "mongodb"
import { getUsers } from "../db/user_database.mjs"

// 회원 중복 체크
export async function findByUserid(userid) {
    return getUsers().find({ userid }).next().then(mapOptionalUser)
}

// 회원가입
export async function createUser(user) {
    return getUsers().insertOne(user).then((result) => result.insertedId.toString())
}

function mapOptionalUser(user) {
    return user ? { ...user, id: user._id.toString() } : user
}