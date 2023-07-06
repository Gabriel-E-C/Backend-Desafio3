import {ProductManager} from "./productManager.js";
import express from "express";

const port = 8080;
const path = "./products.json";
const app = express();

const prodManager = new ProductManager(path);

app.listen(port,()=>{console.log(`El servidor esta escuchando en el puerto ${port}`)});

app.get("/products", async(req,res)=>{
    try {
        console.log(req.query);
        let limit = req.query.limit;
        console.log("El limite es",limit);
        let products = prodManager.getProduct();
        let limitedProducts =[];
        if (limit || limit >= products.length){
            return await res.send (limitedProducts = products.slice(0,limit));
        }else{
            return await res.send(products);
        }
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/products/:pid", async(req,res)=>{
    try {
        let productID = parseInt(req.params.pid);
        console.log(productID);
        let product = prodManager.getProductByID(productID);
        return await res.send(product);   
    } catch (error) {
        console.log(error.message);
    }
});

console.log("prodManager", prodManager);