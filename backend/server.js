

const express = require("express");
const http = require("http");
const cors = require("cors");

const { userJoin, getUsers, userLeave } = require("./utils/user");



const app = express();
const server = require("http").createServer(app);
// const socketIO = require("socket.io");
// const io = socketIO(server);

const {Server} = require ("socket.io");
const io = new Server(server);

/*user authentication*/
const collection = require("./mongo.js")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }


       

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})





// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/", (req, res) => {
  res.send("server");
});

// socket.io
let imageUrl, userRoom;
io.on("connection", (socket) => {
  socket.on("takeThisData", (data)=>{
    console.log(data);
    socket.broadcast.emit("giveMeData", {data: data});
  })
  socket.on("user-joined", (data) => {
    console.log("User Joined")
    const { roomId, userId, userName, host, presenter } = data;
    userRoom = roomId;
    // const user = userJoin(socket.id, userName, roomId, host, presenter);
    
    socket.join(roomId);
    socket.emit("message", {
      success: true
    });
    socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
      // message: `${user.username} has joined`,
      imgURL: imageUrl,
    });

    // io.to(roomId).emit("users", roomUsers);
    io.to(roomId).emit("canvasImage", imageUrl);
    console.log("GODATA");
  });

  socket.on("whiteboardData", (data) => {
    imageUrl = data;
      socket.broadcast.to(userRoom).emit("whiteBoardDataResponse", {imgURL: data});
      // console.log(data); 
  });

  // socket.on("disconnect", () => {
  //   const userLeaves = userLeave(socket.id);
  //   const roomUsers = getUsers(userRoom);

  //   if (userLeaves) {
  //     io.to(userLeaves.room).emit("message", {
  //       message: `${userLeaves.username} left the chat`,
  //     });
  //     io.to(userLeaves.room).emit("users", roomUsers);
  //   }
  // });
});

// serve on port
const PORT =  8000 ;

server.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);