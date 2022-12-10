import  {db } from "../db.js"
import bcrypt from "bcrypt";  
import jwt from 'jsonwebtoken';




export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    console.log(data.length)
    if (err) return res.status(500).json(err);
    if (!req.body.username) return res.status(500).json("No username !!");
    if(!req.body.email || !req.body.email.match(isValidEmail)) return res.status(500).json("wrong email!");
    if (!req.body.password) return res.status(500).json("No password !!");
    if (data.length) return res.status(409).json("User already exists!");
   

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`,`img`,`admin`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash, req.body.img, req.body.isadmin];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

  export const login = (req, res) => {
    //CHECK USER
  
    const q = "SELECT * FROM users WHERE username = ?";
  
    db.query(q, [req.body.username], (err, data) => {
  
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
     
  
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");
        const token = jwt.sign({ id: data[0].id, admin: data[0].admin}, "jwtkey");
        const { password, ...other } = data[0];
        
        res.cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    });
  };


  export const updateProfile = (req,res) =>{
    const q = "SELECT * FROM users WHERE id = ?";
      const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      db.query(q, [req.body.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (!req.body.username) return res.status(500).json("No username !!");
        if(!req.body.email || !req.body.email.match(isValidEmail)) return res.status(500).json("wrong email!");
        if (!req.body.password) return res.status(500).json("No password !!");
    
      
   
  
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json("Not authenticated!");
      
        jwt.verify(token, "jwtkey", (err, userInfo) => {
          if (err) return res.status(403).json("Token is not valid!");
    
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const userId = req.params.id; 
        if (userId != userInfo.id)  res.status(400).json(`Do not try this frauds bro !!! otherwise you're gonna be expelled, YOUR IP ADRESS IS :  ${req.socket.localAddress}`)

        const q =
          "UPDATE users SET `username`=?,`email`=?, `password`=?,  `img`=?, `admin`=? WHERE `id` = ? ";

        const values = [req.body.username, req.body.email, hash, req.body.img, req.body.isadmin];
    
          db.query(q, [...values,userInfo.id], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("User has been updated.");
        });
         
        })
      });
      
    };

    export const getUsers = (req,res) =>{

  
      const q =   "SELECT * FROM users WHERE id = ? ";
    
      db.query(q,[req.params.id],(err,data)=>{
          if(err) return res.send(err)
          return res.status(200).json(data)
      })
  
  
  
  }


    




export const logout = (req,res) =>{

 res.clearCookie("access_token",{
   sameSite:"none",
   secure:true
 }).status(200).json("User has been logged out")

}



export const deleteUser = (req, res) => {


    const q = "DELETE FROM users WHERE `id` = ? ";
    const userID = req.params.id;
    
    db.query(q, userID, (err, data) => {
      if (err) return res.status(403).json("You can not delete this user!");

      return res.json("User has been deleted!");
    });

};



 

 
