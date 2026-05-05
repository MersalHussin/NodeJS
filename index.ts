// Local Server 
import * as http from 'http'

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" }) // == We change contet-type : html / json / ...etc
    res.write("<h1>Hello, World!</h1>") // => to write something
    // res.end("Hello, World!")  ==> Important for End Server 
})

const PORT = 8000


server.listen(PORT)
console.log(`Server is Runnig at http://localhost:${PORT}`);