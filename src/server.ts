import express from 'express'

const app = express()
const PORT:number = 8000;


app.get("/" , (req,res)=>{
    res.send("Hello in Expreess.js")
})

app.listen(PORT,() =>{
    console.log(`Server is Opend at => http://localhost:${PORT}`);
})