// Local Server 
import * as http from 'http';
const server = http.createServer((req, res) => {
    const data = [
        { name: "Riad", age: 23 },
        { name: "Adam", age: 33 },
        { name: "Sally", age: 29 },
        { name: "aSalsly", age: 219 },
        { name: "aSally", age: 29 },
        { name: "aSally", age: 2922212 },
        { name: "aSally", age: 2922 }
    ];
    res.writeHead(200, { "Content-Type": "application/json" }); // == We change contet-type : html / json / ...etc
    res.write(JSON.stringify(data)); // => to write something
    res.end("\n"); //==>  Important for End Server 
});
const PORT = 8000;
server.listen(PORT);
console.log(`Server is Runnig at http://localhost:${PORT}`);
//# sourceMappingURL=index.js.map