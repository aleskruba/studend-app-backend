import express from "express";
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import gradeRoutes from "./routes/grades.js"
import commentRoutes from "./routes/comments.js"
import repliesRoutes from "./routes/replies.js"
import teacherRoutes from "./routes/teacher.js"
import cookieParser from "cookie-parser";
import multer from "multer";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors';
import {PORT,PORT1} from './config.js'


export const app = express()


app.use(express.json()) // to send data to db
app.use(cookieParser())

 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", ''https://*.onrender.com' ');
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
 });

app.use(cors({ 
    origin: 'https://*.onrender.com' }));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  const upload = multer({storage })
  
  
  app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
  });

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/replies", repliesRoutes)
app.use("/api/grades", gradeRoutes)
app.use("/api/teacher", teacherRoutes)



app.listen(PORT,()=>{
    console.log('Connected on port 8800')
})

