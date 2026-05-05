// Local Server 
import * as http from 'http'

const server = http.createServer((req, res) => {

if(req.url === '/proudcts' && req.method === 'GET'){

    const data = [        
        { name: "Riad", age: 23 },
        { name: "Adam", age: 33 },
        { name: "Sally", age: 29 },
        { name: "aSalsly", age: 219 },
        { name: "aSally", age: 29 },
        { name: "aSally", age: 2922212 },
        { name: "aSally", age: 2922 }
    ]
     res.writeHead(200, { "Content-Type": "application/json" }) // == We change contet-type : html / json / ...etc
     res.write(JSON.stringify(data)) // => to write something
     res.end("\n")  //==>  Important for End Server 
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
    }else if (req.url === '/add-proudct' && req.method === "POST"){
        res.writeHead(200, {"Content-Type": "text/html" })
        res.end('add a New Product')
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