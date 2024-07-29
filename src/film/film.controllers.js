const express = require("express")

const router = express.Router();

const prisma = require("../db")


router.get("/films", async (req, res) =>{
    const films = await prisma.film.findMany()
    res.send(films)
})


router.post("/films", async (req, res) =>{
    const newFilm = req.body
    const films = await prisma.film.create({

        data : {
            name : newFilm.name,
            author : newFilm.author,
            rating : newFilm.rating,
        },
        
    })
    res.status(200).send(
        {
            data : films,
            message : "success"
        }
    )
})



router.get("/films/:id" ,async (req,res)=>{
    const filmId = req.params.id;
    const film = await prisma.film.findUnique({
        where :{
            id : parseInt( filmId)
        }
    })

    if(!film){
        res.status(400).send("data not found")
    }
    
    res.send(film)

})


router.delete("/films/:id" , async (req ,res) =>{
    const filmId = req.params.id;
    const deletefilm =  await prisma.film.delete({
        where : {
            id : parseInt(filmId)
        }
    })

    res.status(200).send("berhasil hapus data :" + deletefilm )
})


module.exports = router