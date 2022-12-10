import  {db } from "../db.js"



export const getGrades = (req,res) =>{

  
    const q =   "SELECT g.id as gradeID,  g.comment, g.grade , g.uidGrade , g.date,  u.id , `username`, `email`, `img`  FROM users u JOIN grades g ON u.id = g.uidgrade WHERE g.uidgrade = ? ";
  
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.send(err)
        return res.status(200).json(data)
    })



}


export const addGrade = (req,res) => {
  
      const q = "INSERT INTO grades (`grade`,`comment`, `uidGrade`,`date`) VALUES (?)"
      const values = [
          req.body.grade,
          req.body.note,
          req.body.id,
          req.body.date
      ]
  
      db.query(q,[values], (err,data)=>{
        if (err) return res.status(500).json(err)
  
        return res.json("Grade has been created")
      })

  }

  export const deleteGrade= (req, res) => {
    
    const q = "DELETE FROM grades WHERE `id` = ? ";
    const values = [req.body.delID]
 
    db.query(q,[values] , (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Reply has been deleted!");
    });
};


export const updateGrade =  (req,res) => {
    
  const {e_gradeID, e_uidGrade, e_datum, e_note, e_grade} = req.body

  const q = "UPDATE grades SET grade=?, comment=?  WHERE id = ?"
     db.query(q,[e_grade, e_note, e_gradeID], (err,result)=> {
      if (err) return res.status(403).json("You cannnot update this grade!");

      return res.json("Grade has been updated!");
  })
}