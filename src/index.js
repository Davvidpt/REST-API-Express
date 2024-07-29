const express = require("express")
const {PrismaClient} = require("@prisma/client")
const dotenv = require("dotenv")


const app = express();
const prisma = new PrismaClient();


dotenv.config();
const PORT = process.env.PORT;

app.use(express.json())

const productControllers = require("./product/product.controller")

app.use("/products", productControllers)
// app.put("/films/:id", async (req, res) => {
//     const filmId = req.params.id;
//     const filmData = req.body

//     if(!(filmData.name && filmData.author && filmData.rating)){
//         return res.status(400).send("failded, some fields is empty")
//     }
//     const updateFilm = await prisma.film.update({
//         where : {
//             id : parseInt(filmId)
//         },
//         data : {
//             name : filmData.name,
//             author : filmData.author,
//             rating : filmData.rating
//         }
//     })

//     res.send(updateFilm)


// })



app.listen(PORT, ()=>{
    console.log("express running in port:" + PORT)
});