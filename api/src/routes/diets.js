const express = require('express');
const router = express.Router();
const { Diet } = require('../db');


const dietsDefault = [{name: 'dairy free'}, {name: 'gluten free'}, {name: 'ketogenic'}, {name: 'vegetarian'}, {name: 'lacto ovo vegetarian'},
{name: 'vegan'}, {name: 'pescatarian'}, {name: 'paleolithic'}, {name: 'primal'}, {name: 'low FODMAP'}, {name: 'whole 30'}];

router.get('/', async (req, res) => {
    try{

        dietsDefault.forEach( async e => {
            await Diet.findOrCreate({
                where: {name: e.name}
            });
        });
        let typesDiet = await Diet.findAll();
        res.status(200).json(typesDiet);
    } catch (error){
        console.error(error);
        res.status(400).send(error);
    }
})

module.exports = router
