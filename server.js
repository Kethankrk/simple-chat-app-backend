import express from "express";
import { Server } from "socket.io";

const app = express();
const lol = app.listen(3000, () => {
  console.log("Server started in: http://localhost:3000");
});

const io = new Server(lol, {
  cors: "http://localhost:5173",
});

io.on("connection", (socket) => {

  socket.on("join_room", (roomNo) => {
    socket.join(roomNo);
  });

  socket.on("msg", (data) => {
    console.log(data.room);
    socket.to(data.room).emit("receive_msg", data);
  });
});
