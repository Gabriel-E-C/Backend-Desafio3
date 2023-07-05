import fs from "fs";

export class ProductManager {
    constructor (path) {
        this.path = path;
        console.log(this.path);
    };

    contenido (){ 
        return fs.readFileSync (this.path, "utf-8")
    };
    contenidoArreglo () {
       return JSON.parse(this.contenido ());
    };

    writeToFile (contentToWrite) {
            fs.writeFileSync (this.path,JSON.stringify(contentToWrite,null,"\t"));
        };

    addProduct (title, descritpion, price, thumbnail,code, stock){
        let newID;
        
        const newProduct = {
            id: 0,
            title,
            descritpion,
            price,
            thumbnail,
            code,
            stock
        };

        if (fs.existsSync (this.path)){       
            const contentArray = this.contenidoArreglo ();
            console.log("Estoy aca", contentArray);
            newID = contentArray[contentArray.length - 1].id + 1;
            newProduct.id = newID;
            if ( contentArray.some ((productCode) => productCode.code === newProduct.code)){
                console.log ("El valor de code esta repetido")
            } else {
                contentArray.push (newProduct);
                console.log("El nuevo contenido es", contentArray);
                this.writeToFile(contentArray);
            };
        } else {
            const firstProduct = [];
            newProduct.id = 1;
            firstProduct.push (newProduct);
            fs.writeFileSync (this.path, JSON.stringify(firstProduct,null,"\t"));
        }
    };

    getProduct (){
        if (fs.existsSync (this.path)){
            const contentArray = this.contenidoArreglo ();
            return contentArray;
        } else {
            return console.log ("No se puede getProduct porque el archivo no existe.");
        }
    };

    getProductByID (productID) {
        let productExist; 
        
        if (fs.existsSync (this.path)){
            const contentArray = this.contenidoArreglo ();
            productExist = contentArray.find((product)=> product.id === productID);
            if (!productExist){
                return ("Not Found");
            } else {
                return productExist;
            }; 
        } else {
            return console.log ("No se puede getProductByID porque el archivo no existe.");
        }
    };

    updateProduct (productID, campoActualizar, valorActualizar){
        let productoActualizar;

        if (fs.existsSync (this.path)){
            const contenido = fs.readFileSync (this.path, "utf-8");
            const contenidoArreglo = JSON.parse(contenido);
            productExist = contenidoArreglo.indexOf((product)=> product.id === productID);
                if (!productExist){
                    return ("Not Found");
                } else {
                    productoActualizar = contenidoArreglo [productExist];
                };
            productoActualizar.campoActualizar = valorActualizar;
            contenidoArreglo [productExist] = productoActualizar;
            fs.writeFileSync(this.path, JSON.stringify(contenidoArreglo,null,"/t"));
        } else {
            return console.log ("No se puede updateProduct porque el archivo no existe.");
        }
    };

    deleteProduct (productID){
        if (fs.existsSync (this.path)){
            const contenido = fs.readFileSync (this.path, "utf-8");
            const contenidoArreglo = JSON.parse(contenido);
            productExist = contenidoArreglo.indexOf((product)=> product.id === productID);
                if (!productExist){
                    return ("Not Found");
                } else {
                    contenidoArreglo.splice(productExist,1);
                    fs.writeFileSync(this.path, JSON.stringify(contenidoArreglo,null,"/t"));        
                };
        } else {
            return console.log ("No se puede updateProduct porque el archivo no existe.");
        }
    };

}

