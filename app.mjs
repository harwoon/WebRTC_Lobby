// 로비 테스트용
// 머지할 때는 올리지 않을 예정
import express from "express"
import { config } from "./config.mjs"
import { connectDB } from "./db/user_database.mjs"
import authRouter from "./router/auth.mjs"
import roomRouter from "./router/room.mjs"

const app = express()

app.use(express.json())
app.use(express.static("public"))
app.use("/auth", authRouter)
app.use("/room",roomRouter)

app.use((req,res)=>{
    res.sendStatus(404)
})

connectDB().then(() => {
    app.listen(config.host.port, () => {
        console.log("WebRTC 과제 DB/웹 서버 실행 중 ...")
    })
}).catch((err) => { 
    console.log("서버 연결 실패")
    console.error(err)
})