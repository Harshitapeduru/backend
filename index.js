import express from "express";
import {MongoClient,ObjectId} from "mongodb";
import cors from "cors"
const usr = encodeURIComponent('peduruharshita2004')
const pwd =encodeURIComponent('en6H5ffgFoLt7C4X')
// const uri="mongodb://127.0.0.1:27017"

const uri=`mongodb+srv://${usr}:${pwd}@cluster0.1c3ya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client=new MongoClient(uri)
const db=client.db("ecomm")
const app=express();
app.use(express.json());
app.use(cors());
app.listen(8080,()=>{
    console.log("Server start at port 8080")
});
app.get("/",async(req,res)=>{
    // res.send("HelloWorld")
    const items=await db.collection("products").find().toArray()
    res.status(200).json(items)
});
// app.get("/home",(req,res)=>{
//     res.send("This is home api")
// });
// app.get("/products",(req,res)=>{
//     let products=[{
//         "name":"Product 1",
//         "price":34
//     }
//     ]
//     // let products=get list from mongodb
//     res.json(products)
// });
// app.get("/name",(req,res)=>{
//     res.send("Harshita Peduru")
// });
// app.get("/customers",(req,res)=>{
//     let customers=[{
//         "name":"abcd",
//         "email":"abcd@gmail.com",
//         "city":"Hyderabad"
//     }]
//     res.json(customers)
    
// });
app.post("/", async (req, res) => {
    const { name,desc, price,url } = req.body;
    const data = {
      name: name,
      desc:desc,
      price: price,
      url:url,
    };
    const newProduct = await db.collection("products").insertOne(data);
    res.status(200).json(newProduct);
  });
  
  
  app.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const newProduct = await db.collection("products").deleteOne({_id:new ObjectId(id)});
      res.status(200).json(newProduct);
    });