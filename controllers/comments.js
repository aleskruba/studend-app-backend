import jwt from "jsonwebtoken";
import {db} from "../db.js" 


export const getComments = (req,res) => {
    const q =   "SELECT c.id, `username`, `title`, `comment`, `img`, `date` FROM users u JOIN comments c ON u.id = c.uid ";

    db.query(q,(err,data)=>{
        if(err) return res.send(err)
        return res.status(200).json(data)
    })

}

export const getComment = (req,res) => {
    const q =
    "SELECT c.id, c.uid AS cID,  u.id AS userID, `username`, `title`, `comment`,`img`, `date` FROM users u JOIN comments c ON u.id = c.uid WHERE c.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
}


export const addComment = (req,res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO comments (`title`,`comment`, `date`,`uid`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.comment,
        req.body.date,
        userInfo.id
    ]

    db.query(q,[values], (err,data)=>{
      if (err) return res.status(500).json(err)

      return res.json("Post has been created")
    })

   });
}




export const deleteComment = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const commentId = req.params.id;
      const q = "DELETE FROM comments WHERE `id` = ? AND `uid` = ?";
  
      db.query(q, [commentId, userInfo.id], (err, data) => {
        if (err) return res.status(403).json("You can delete only your post!");
  
        return res.json("Post has been deleted!");
      });
    });
  };




export const updateComment = (req,res) => {
    res.json("from controller")
}
