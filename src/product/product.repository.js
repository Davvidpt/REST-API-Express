/**
 * Berkomunikasi dengan database
 * boleh pakai ORM ataupun row query
 * supaya kalo edit orm hanya repository yang teredit   
 */

const prisma = require("../db");

const findProduct = async () => {
    const products= await prisma.product.findMany()
    return products;
}

const getProductById2 = async (id) => {
    // const product = await prisma.product.findUnique({
    //     where : {
    //         id,
    //     }
    // });
    const product = await prisma.$queryRaw `SELECT * FROM product WHERE id = ${id}`
    return product
}

const deleteProduct = async (id) => {
    const deleteProd = await prisma.product.delete({
        where : {
            id,
        },
    })
}
module.exports ={
    findProduct,
    getProductById2,
    deleteProduct
}