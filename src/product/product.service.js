//Service Layer berfungsi untuk handle bussines logic   
/**Kenapa dipisah?
 * 
 * agar tanggung jawabnya ter-isolate dan functionnya reusables
 */


const prisma = require("../db");
const { findProduct, getProductById2, deleteProduct } = require("./product.repository");


const getAllProducts = async () => {
    const getProducts = await findProduct()

    return getProducts;
}


const getProductById = async (id) => {

    const product =  getProductById2(id)
    if (!product){
        throw Error("not fund")
    }
    return product
}

const addNewProduct = async (newProductdata)=>  {


    const products = await prisma.product.create({
        data : {
            name : newProductdata.name,
            description : newProductdata.description,
            price : newProductdata.price,
            image : newProductdata.image,
        },
    });

    return products;
} 

 const deletedProductById = async (id) => {
    if (typeof id !== "number"){
        throw Error("ID not a number")
    }
    const productId = await prisma.product.findUnique({
        where :{
            id,
        }
    })

    if(!productId){
        throw Error("data not found")
    }
    const productValue = await prisma.product.delete({
        where : {
            id,
        }
    })

    return productValue



 }

module.exports = {
    getAllProducts,
    getProductById,
    addNewProduct
}
