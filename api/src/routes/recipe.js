const express = require('express');
const router = express.Router();
const { Recipe, Diet, Op } = require('../db');


//ruta post
router.post('/', async (req, res) =>{
    const{
        name,
        summary,
        healthScore,
        image,
        steps,
        diets
    } =req.body;
    try {
        if (!name) return res.status(400).send({error: 'Debe ingresar el name para la receta'});
        if (!summary) return res.status(400).send({error: 'Debe ingresar un summary del receta'});
        let createdRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            image,
            steps,
        });
        let dietDatabase = await Diet.findAll({
            where:{
                name: diets,
            }
        });
        console.log(dietDatabase);
        await createdRecipe.addDiets(dietDatabase);
        return res.status(200).send('Succesfull');
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//ruta delete
router.delete('/:id', async (req, res) =>{
    const {id} = req.params;
    try {
        await Recipe.destroy({
            where: {
                id: id
              }
        })
        return res.status(200).send('Delete Succesfull');
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});



module.exports = router;