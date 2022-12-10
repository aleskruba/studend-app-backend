import jwt from 'jsonwebtoken';
import  {db } from "../db.js"

export const teacher = (req,res) =>{

  

    const q =   "SELECT * FROM users WHERE admin = '0' ";
  
    db.query(q,(err,data)=>{
        if(err) return res.send(err)
        return res.status(200).json(data)
    })




}