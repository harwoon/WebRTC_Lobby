import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from "url"
import { config } from "./config.mjs"
import { connectDB } from "./db/user_database.mjs"
import authRouter from "./router/auth.mjs"
import roomRouter from "./router/room.mjs"
import lobbyRouter from "./router/lobby.mjs"

const app = express()
const server = createServer(app)
const io = new Server(server)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use("/auth", authRouter)
app.use("/room",roomRouter)
app.use("/lobby",lobbyRouter)

app.use((req,res)=>{
    res.sendStatus(404)
})

const users = {}

function updateUserList() {
    let tCount = 0;
    let sCount = 0;
    const userList = [];

    Object.values(users).forEach(u => {
        if (u.userType === "teacher") tCount++;
        else if (u.userType === "student") sCount++;
        userList.push({ nickname: u.nickname, userType: u.userType });
    });


    io.to("로비").emit("userCounts", { tCount, sCount });
    io.to("로비").emit("userList", userList);
}

io.on("connection", (socket) => {
    console.log("사용자가 연결되었음")

    socket.on("join", ({ nickname, channel, userType }) => {
        Object.keys(users).forEach((id) => {
            if (users[id].nickname === nickname) {
                delete users[id]
            }
        })
        socket.nickname = nickname
        socket.channel = channel
        users[socket.id] = { nickname, channel,userType }
        socket.join(channel)

        const msg = { user: "system", text: `${nickname}님이 입장했습니다` }
        io.to(channel).emit("message", msg)

        updateUserList()
    })

    socket.on("chat", ({ text, to }) =>{
        const sender = users[socket.id]
        if(!sender) return
        const payload = { user: sender.nickname, text }
        if(to){
            const receiverSocket = Object.entries(users).find(
                ([id, u]) => u.nickname === to)?.[0]
            if(receiverSocket){
                io.to(receiverSocket).emit("whisper", payload)
                socket.emit("whisper", payload)
            }
        }else{
            io.to(sender.channel).emit("message", payload)
            console.log("sender.channel: ", sender.channel, "payload:", payload)
        }
        
    
    })

    socket.on("disconnect", () => {
        const user = users[socket.id]
        if (user) {
            const msg = { user: "system", text: `${user.nickname}님이 퇴장했습니다` }
            io.to(user.channel).emit("message", msg)
            delete users[socket.id]
            updateUserList()
        }
        console.log("사용자가 퇴장함")
    })
})

connectDB().then(() => {
    server.listen(config.host.port, () => {
        console.log("WebRTC 과제 DB/웹 서버 실행 중 ...")
    })
}).catch((err) => { 
    console.log("서버 연결 실패")
    console.error(err)
})