require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Recipe, Diet, Op } = require('../db');
const {
    YOUR_API_KEY
  } = process.env;


// const apiKey = '162944f000714996bf606ef56f11b02e';
// const apiKey = '08662a4aa7744526a60422a972cd78d1';
// const apiKey ='0d97d4c2e0924aa49c64800972827140';
// const apiKey = 'bf163dec45584f359588b9ce37e82125';
// const apiKey ='39fd1b306eec45e58bacf136996a76f7';
// const apiKey = "94b72cb357cc42479f7d2392df985bda";
// const apiKey = "7c8b97d0182f49e0860a93e1bd131fc3"; // key de la api

//funcion que me retorna las recetas de la api
const getApiInfo = async () => {
    try
    {
        //const resAxios = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5');
        const resAxios = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100&addRecipeInformation=true`);
        const  results  = resAxios.data.results;
    
        
        if (results.length > 0) {

            let response = await results?.map((result) => {
                return {
                    name: result.title,
                    vegetarian: result.vegetarian,
                    vegan: result.vegan,
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree, 
                    image: result.image,  
                    id: result.id,
                    healthScore: result.healthScore,
                    types: result.dishTypes?.map(element => element),  
                    diets: result.diets?.map(element => element), 
                    summary:result.summary, 
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
                }        
            })

        return response;
    }

    }catch (error) {
        console.error(error);
        return ([])
    }
};

//funcion que me retorna las recetas de mi base de datos
const getDatabaseInfo = async () => {
    try{
        const dataDB =  await Recipe.findAll({ 
            include:{
                model: Diet,
                attributes: ['name'],
                through:{
                    attributes: []
                }
            }
        });
        let response = await dataDB?.map(recipe => {
                 return {
                     id: recipe.id,
                     name: recipe.name,
                     summary: recipe.summary,
                     healthScore: recipe.healthScore,
                     image: recipe.image,
                     steps: recipe.steps,
                     diets: recipe.diets?.map(diet => diet.name),
                 }
             });
        return response;
    }catch (error) {
      console.error(error);
    }
};

//funcion que junta en un mismo array las recetas de la api con las de mi base de datos

const getAllInfo = async () => {
    try{
        const apiInfo = await getApiInfo();
        const bdInfo = await getDatabaseInfo();
        const infoTotal = [...apiInfo, ...bdInfo];
        return infoTotal;
    }catch (error) {
        console.error(error);
        return('error');
    }
 };

 //funcion para buscar receta dentro de la api por name que llega por query 
 const getApiByName = async (name) => {           
    try{
        const results = await getApiInfo();
        const response = results?.filter((r) => r.name.toLowerCase().includes(name.toLowerCase()) === true);
        if(response.length > 0){
            return response
        }else{
            return false 
        }    

    }catch (error) {
        console.error(error.message);  
    }
};

 //funcion para buscar receta dentro de la base de datos por name que llega por query 
const getDBByName = async (name) => {
    try{
        let DBInfo = await getDatabaseInfo();
        let filtByName = DBInfo.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
        if(filtByName.length === 0) return false;
        console.log("se encontro coincidencia con la db");
        return filtByName;
    }catch (error) {
        console.error(error.message)
    } 
};


//funcion que junta en un mismo array las recetas filtradas por query name de la api con las de mi base de datos
const getInfoByName = async (name) => {
    try{
        let infoTotal =  [];
        let apiByName = await getApiByName(name);
        let DBByName = await getDBByName(name);
        if(!apiByName && !DBByName){
            const objerr = {
                id: 'sdadasdasdasdadasdas',
                name: 'Recipe not Found',
                summary: 'None',
                healthScore: 0,
                image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',
                steps: 'none',
                diets: []
            }
            infoTotal =[objerr];
        } else if(!DBByName){
            infoTotal = apiByName;
        }else if(!apiByName){
            infoTotal = DBByName; 
        }else{

            infoTotal = [...apiByName, ...DBByName];
        }
        
        
        return infoTotal;
    }catch (error) {
        console.error(error.message);
    }
};

// RUTAS:

//ruta para buscar receta por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try{
        if (id.length > 20){
            const dataDB = await Recipe.findByPk(id,{
                include: {
                model: Diet,
                atributes: ["name"],
                through: {
                    attributes: [],
                    },
                },
            });
            if(dataDB){
            const obj = {
                id: dataDB.id,
                name: dataDB.name,
                summary: dataDB.summary,
                healthScore: dataDB.healthScore,
                image: dataDB.image,
                steps: dataDB.steps,
                diets: dataDB.diets?.map(diet => diet.name)
            }
                res.status(200).json(obj)
            }else{
                console.log('bd')
                const objerr = {
                    name: 'Recipe not Found',
                    summary: 'None',
                    score: 0,
                    healthScore: 0,
                    image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',
                    steps: 'none',
                    diets: []
                }
                res.status(200).json(objerr)
            }
        }else{

            const resAxios = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
            const result = resAxios.data;
            let obj =
                {
                name: result.title, 
                vegetarian: result.vegetarian,
                vegan: result.vegan,
                glutenFree: result.glutenFree,
                dairyFree: result.dairyFree,
                image: result.image, 
                id: result.id, 
                types: result.dishTypes?.map(element => element),   
                healthScore: result.healthScore, 
                diets: result.diets?.map(element => element),
                summary:result.summary, 
                steps: result.instructions
               }
            if (obj){
                res.status(200).send(obj);
            }else{
                let objerrors = {
                    name: 'Recipe not Found', 
                    image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',  
                    score: 0, 
                    healthScore: 0, 
                    diets: [], 
                    summary:'none', 
                    steps: 'none'}

                res.status(200).json(objerrors)
            }
        }
    }catch(e){
        let objerr = {
            name: 'Detail not found', 
            image: 'https://www.knownhost.com/blog/wp-content/uploads/2017/11/404-Error-Message.jpg',  
            score: 0, 
            healthScore: 0, 
            diets: [], 
            summary:'none', 
            steps: 'none'}

    res.json(objerr)
    }
});

router.get('/', async (req, res) => {
    try {
        const { name } = req.query;

        if (name) {
            
            // const diets = await Diet.findAll({
            //     where: {
            //         name: name
            //     }
            // })
            // console.log(diets);
            // if(diets){
            //     console.log(diets[0].dataValues.name);
            //     const recipes = await getAllInfo();
            //    const filterRecipes = recipes.filter(r => r.diets.includes(diets[0].dataValues.name));
            //    if(filterRecipes.length){
            //     return res.status(200).json(filterRecipes);
            //    }
            // }

                const infoByName = await getInfoByName(name);
                if (infoByName.length > 0){
                   return res.status(200).send(infoByName);
                }else{
                    throw new Error('Recipe with name not found');
                } 
            
        }else{
           // para no confundir a home, si no hay un name de busqueda muestra toda la info.
            const allDate = await getAllInfo();
            if (allDate !== 'error'){  
                return res.status(200).json(allDate);
            }else{
                throw new Error('Error en la búsqueda de datos')
            }
    
        } 
    } catch (e) {
        let error = e.message;
        res.status(400).json(error);
    }
    
});




module.exports = router;