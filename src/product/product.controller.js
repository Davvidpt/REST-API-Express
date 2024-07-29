/**
 * Layer controllers bertugas untuk menghandle request dan response
 * biasanya juga mengvalidasi body
 */



const express = require("express")

const router = express.Router()

const prisma = require("../db");
const { getAllProducts, getProductById, addNewProduct } = require("./product.service");



router.get("/"  ,async (req, res) => {
    const products = await getAllProducts();
    res.send(products)
})


router.get("/:id" ,async (req, res)=>{
    try {
        const productId = parseInt(req.params.id)
        const product = await getProductById(productId)
        res.send(product)
        
    } catch (error) {
        res.send(error.message)
    }
 
})

router.post("/", async (req,res) => {
        const newProductdata = req.body

    const products = await addNewProduct(newProductdata);
    res.send({
        data : products,
        message : "success"
    });
});


router.delete("/:id", async (req, res) => {
    const productId = req.params.id
    res.send(
        "product deleted"
    )
})



router.put("/:id", async (req, res) => {
    const productId = req.params.id;
    const dataProduct = req.body

    if(!(dataProduct.name && dataProduct.description && dataProduct.price && dataProduct.image)){
      return res.status(400).send("some fields is missing")
    }

    const product = await prisma.product.update({
        where :{
            id : parseInt(productId),
        },
        data : {
            description :dataProduct.description,
            image : dataProduct.image,
            price : dataProduct.price,
            name : dataProduct.name,

        },

    })

    res.send({
        data : product,
        message : "pesan"
    })
})

router.patch("/:id", async (req, res) => {
    const productId = req.params.id;
    const dataProduct = req.body

    const product = await prisma.product.update({
        where :{
            id : parseInt(productId),
        },
        data : {
            description :dataProduct.description,
            image : dataProduct.image,
            price : dataProduct.price,
            name : dataProduct.name,

        },

    })

    res.status(200).send(product)
})











module.exports = router;