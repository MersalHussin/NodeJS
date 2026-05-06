import express from 'express'

const app = express()
const PORT:number = 8000;


app.get("/" , (req,res)=>{
    res.send("Hello in Expreess.js")
})

const data = [
    {
        id :"1",
        name :"Hello",
    },
    {
        id :"2",
        name :"Hello2",
    },
    {
        id :"3",
        name :"Hello2",
    },
]
app.get("/proudcts",(req,res)=>{
    res.send(data)})
app.get("/proudcts/:id",(req,res)=>{
    res.send(data.filter(product => product.id === req.params.id))
})

app.listen(PORT,() =>{
    console.log(`Server is Opend at => http://localhost:${PORT}`);
})