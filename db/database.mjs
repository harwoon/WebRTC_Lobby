// 메인 머지할 때 겹칠거라 안올릴 예정
import MongoDB from "mongodb"

let db

export async function connectDB() {
    return MongoDB.MongoClient.connect("mongodb://harwoon:gksgPdnjs1!@ac-vn1kyzb-shard-00-00.tmmq4a4.mongodb.net:27017,ac-vn1kyzb-shard-00-01.tmmq4a4.mongodb.net:27017,ac-vn1kyzb-shard-00-02.tmmq4a4.mongodb.net:27017/?ssl=true&replicaSet=atlas-ll4tz9-shard-0&authSource=admin&appName=Cluster0").then((client) => {
        db = client.db("WebRTC")
    })
}

export function getRooms(){
    return db.collection("rooms")
}