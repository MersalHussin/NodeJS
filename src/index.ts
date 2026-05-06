// Local Server 
import fs , {promises as fsPromise}  from 'fs';
import * as http from 'http'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const server = http.createServer((req, res) => {
    const userFilePath =path.join(__dirname,"data","users.json") ;
    const assetsPath =path.join(__dirname,"assets") ;
    
if(req.url === '/proudcts' && req.method === 'GET'){

    fs.access(userFilePath,(err =>{
                   if(err){
               console.error("Error =>",`File Cannot accesed at this path ${userFilePath}`);
               return
           }
        res.writeHead(200, { "Content-Type": "application/json" }) // == We change contet-type : html / json / ...etc
        
        fs.readFile(userFilePath,"utf-8", ((err,data) =>{
           res.write(data)
           res.end()  //==>  Important for End Server 
    }))
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
        <input type="text" name="description" placeholder="Enter Description" />
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
        req.on("end",async()=>{
            const data = new URLSearchParams(body)
            const name = data.get("name") 
            const description = data.get("description")
            try{
            const jsonData = await fsPromise.readFile(userFilePath, "utf-8")
            const jsonProducts:{products:[{name:string|null, id:number|null , description:string|null }]} = JSON.parse(jsonData)
            const submittedProduct = {name:name,id:jsonProducts.products.length+1 , description:description}
            jsonProducts.products.push(submittedProduct)
            const updatedProducts = JSON.stringify(jsonProducts,null ,2)
            await fsPromise.writeFile(userFilePath, updatedProducts)
            }
            catch(err){
                console.log(err);
            }

        res.write(`
        <h1>Product Added</h1>
        <p>Name: ${name}</p>
        <p>Description: ${description}</p>
            `)
            res.end()
    
    })
}
else if (req.url === '/assets' && req.method === "GET"){
    fs.access(assetsPath, (err)=>{
        if(err){
            console.log(err);
            return
        }
        res.writeHead(200, {"Content-Type": "text/html" })
        fs.readdir(assetsPath, (err,files)=>{
            if(err){
                console.log(err);
                return
            }
            res.write("<h1>Assets</h1>")
            res.write("<ul>")
            res.write(files.map(file => `<li><a href=/${file} > ${file}</a> --- <a href=/delete?file=${encodeURIComponent(file)} >Delete</a></li>`).join(''));
            res.write("</ul>")            
            res.end()
        })
    }
)



}else if (req.url?.startsWith("/delete") && req.method === "GET"){
    const file = decodeURIComponent(`${req.url.split("?file=")[1]}`);
    const assetsPath = path.join(__dirname, "assets" ,file);

    
    fs.unlink(assetsPath, (err)=>{
        if(err){
            console.log(err);
            return;
        }

        res.writeHead(200, {"Content-Type": "text/html" })
        res.write(`<div>`)
        res.write(`<h1>File  ${file} Deleted Succsefully</h1>`)
        res.write(`</div>`)
        res.end()
    })

}
else{
    res.writeHead(404, { "Content-Type": "text/html" })
    res.write(`<h1>404 Page Not Found</h1>`)
}

})

const PORT = 8000


server.listen(PORT)
console.log(`Server is Runnig at http://localhost:${PORT}`);