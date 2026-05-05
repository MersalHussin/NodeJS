// Local Server 
import { readFile } from 'fs'
import * as http from 'http'

const server = http.createServer((req, res) => {

if(req.url === '/proudcts' && req.method === 'GET'){

     res.writeHead(200, { "Content-Type": "application/json" }) // == We change contet-type : html / json / ...etc
     readFile("./src/data/users.json","utf-8", ((err,data) =>{
        if(err){
            console.error("Error =>",err);
        }else{
            console.error("Data =>",JSON.parse(data));
        }
        res.write(data)
        res.end()  //==>  Important for End Server 
    } ))
}else if (req.url === '/' && req.method === 'GET'){
    res.writeHead(200, { "Content-Type": "text/html" })
    res.write(`<h1>Hello From Server</h1>`)
    res.end()
}else if (req.url === '/proudcts/new' && req.method === 'GET'){
    res.writeHead(200, { "Content-Type": "text/html" })
    res.write(`
        <form method="POST" action="/add-proudct">
        <input type="text" name="name" placeholder="Enter Name" />
        <input type="number" name="age" placeholder="Enter Age" />
        <button type="submit">Send</button>
        </form>
        `)

        res.end();
    }else if (req.url === '/add-proudct' && req.method === "POST"){
        res.writeHead(200, {"Content-Type": "text/html" })
        let body = ''
        req.on("data",(chunk)=>{
            body += chunk.toString()
        })
        req.on("end",()=>{
            const data = new URLSearchParams(body)
            const name = data.get("name") 
            const age = data.get("age")
        res.write(`
        <h1>Product Added</h1>
        <p>Name: ${name}</p>
        <p>Age: ${age}</p>
            `)
            res.end()
        }
    )
    }

else{
    res.writeHead(404, { "Content-Type": "text/html" })
    res.write(`<h1>404 Page Not Found</h1>`)
    res.end()
}

})

const PORT = 8000


server.listen(PORT)
console.log(`Server is Runnig at http://localhost:${PORT}`);