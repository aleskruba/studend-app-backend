
import {db} from "../db.js" 
import jwt from "jsonwebtoken";

export const getReplies = (req,res) => {

    
    const q =   "SELECT r.id, r.date,  r.uiduser,  r.reply, r.uidcomment,  `username`, `title`, `comment`, `img` FROM users u JOIN comments c  JOIN replies r ON c.id = r.uidcomment AND u.id = r.uiduser ";

    db.query(q,(err,data)=>{
        if(err) return res.send(err)
        return res.status(200).json(data)
    })

}

export const addReply = (req,res)=>{

  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO replies (`reply`, `date`,`uidcomment`,`uiduser`,`uidcommentauthor`) VALUES (?)"
    const values = [
        req.body.comment,
        req.body.date,
        req.body.uidcomment,
        req.body.uiduser,
        req.body.uidcommentauthor
    ]

    db.query(q,[values], (err,data)=>{
      if (err) return res.status(500).json(err)

      return res.json("Reply has been created")
    })

   });
  }



export const deleteReply = (req, res) => {
    
      const q = "DELETE FROM replies WHERE `id` = ? ";
      const values = [req.body.replyID]
   
      db.query(q,[values] , (err, data) => {
        if (err) return res.status(403).json("You can delete only your post!");
  
        return res.json("Reply has been deleted!");
      });
 };
