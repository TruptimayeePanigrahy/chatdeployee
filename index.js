const express = require("express")

const {connection}=require("./config/db")
const {userRoute}=require("./routes/userroute")
require("dotenv").config()
const cors=require("cors")
const app = express()
const http=require("http").createServer(app)
const io=require("socket.io")(http)
app.use(express.json())
app.use(cors())

app.use("/user",userRoute)


app.get("/",(req,res)=>{
    res.send("Home page")
})


io.on("connection",(socket)=>{
    console.log("connected")
// recieve msg from client
    socket.on("message",(msg)=>{
        console.log(msg)
        // send all client except sender
        socket.broadcast.emit("message", msg)
    })
})

http.listen(process.env.port,async()=>{
try {
    await connection
    console.log("Server connected to Database")
} catch (error) {
    console.log(error)
}
console.log("Server is Running..")
})

