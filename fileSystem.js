import {promises as fs} from "fs"

class ProductManager {
    constructor(){
        this.patch = "./producto.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        
        ProductManager.id++

        let newProduct = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct)

        
        
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta);
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById =async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)){
            console.log("Producto no encontrado")
        } else{
            console.log(respuesta3.find(product => product.id === id))
        }
    }
deleteProductById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter(products => products.id != id)
    await fs.writeFile(this.patch, JSON.stringify(productFilter))
    console.log ("pRODUCTO ELIMINADo")
}

updateProducts = async({id, ...producto})=> {
    let idProd = producto.id
    console.log (idProd);
}



}

const productos = new ProductManager

productos.addProduct("titulo1", "Blabla1", 522, "imagen1", "code1", 1)

productos.addProduct("titulo2", "Blabla2", 1880, "imagen2", "code2", 2)


productos.getProducts()
productos.getProductsById(1)

productos.deleteProductById(2)

productos.updateProducts({
    title: 'titulo1',
    description: 'Descripcion1',
    price: 1999,
    imagen: 'imagen1',
    code: 'abc123',
    stock: 5,
    id: 1
})