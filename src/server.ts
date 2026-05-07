import express from 'express'
import { generateFakeProducts } from './utils/fakeData.ts';
import type { Iproduct } from './interfaces/index.js';

const app = express()
const PORT:number = 8000;


app.get("/" , (req,res)=>{
    res.send("Hello in Expreess.js")
})

const data:Iproduct[] = generateFakeProducts()
app.get("/proudcts",(req,res)=>{
    //?filterby=title,desciption
    console.log(req.query);  //  = { filterby: 'title,desciption' }

    const filterQuery = req.query.filter as string 
    if(filterQuery){
        const propertiesToFilter = filterQuery.split(',')
    
        const filteredProducts = data.map(product => {
            const filtered: any = {};
            for (const prop of propertiesToFilter) {
                if (prop in product) filtered[prop] = product[prop as keyof Iproduct];
            }
            return {id:product.id,...filtered};
        });
        return res.send(filteredProducts);
    }
    res.send(data);
})
    app.get("/proudcts/:id",(req,res)=>{
    res.send(data.filter(product => product.id === +req.params.id))
})

app.listen(PORT,() =>{
    console.log(`Server is Opend at => http://localhost:${PORT}`);
})