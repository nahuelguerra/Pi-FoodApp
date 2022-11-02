const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipe = require('./recipe.js');
const recipes = require('./recipes.js');
const diets = require('./diets.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/recipe', recipe);
router.use('/diets', diets);
router.use('/recipes', recipes);

module.exports = router;


