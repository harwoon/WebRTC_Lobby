// 로비 테스트용
// 머지할 때는 올리지 않을 예정
import express from "express"
import { connectDB } from "./db/database.mjs"
import stdRouter from "./router/student.mjs"
import trRouter from "./router/teacher.mjs"

const app = express()

app.use(express.json())
app.use(express.static("public"))
//app.use("/std", stdRouter)
//app.use("/tr",trRouter)
app.use("/room",roomRouter)

app.use((req,res)=>{
    res.sendStatus(404)
})

connectDB().then(() => {
    app.listen(3000, () => {
        console.log("서버 실행 중...")
    })
}).catch(console.error)