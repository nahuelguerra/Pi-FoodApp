import {GET_ALL_RECIPES, GET_ALL_RECIPES_BY_NAME, POST_RECIPE, GET_RECIPE_DETAIL, GET_DIETS, FILTER_BY_DIETS, ORDER_BY_NAME, ORDER_BY_SCORE, SWITCH_FLAG, ORDER_BY_CREATES, CLEAR, DELETE_RECIPE, CLEAR_RECIPES, SET_CURRENT_PAGE} from '../actions/actions.js';

const initialState = {
    recipes: [],
    allRecipes: [],
    recipe: {},
    diets:[],
    currentPage: 1,
   flag: false
  };

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_RECIPES:
            return{
                ...state, 
                recipes: action.payload, 
                allRecipes: action.payload
            }
        case SET_CURRENT_PAGE:
            return{
                ...state,
                currentPage: action.payload
            }
        case DELETE_RECIPE:
            alert('Receta eliminada')
            return{
                ...state, 
                recipes: state.recipes.filter( r => r.id !== action.payload),
                allRecipes: state.allRecipes.filter( r => r.id !== action.payload),
            }
         case CLEAR_RECIPES:
                return{
                    ...state, recipes:[]
                }
        case CLEAR:
            return{
                ...state, recipe:{}
            }
        case SWITCH_FLAG:
            return{
                ...state, flag: action.payload
            }
        case ORDER_BY_CREATES:
            const recipesCreated = state.allRecipes;
            let filtered = action.payload === 'All' ? recipesCreated :
            (action.payload === 'database'? state.allRecipes.filter(r => r.id.length >20): state.allRecipes.filter(r => r.id.toString().length < 20))
            if(!filtered.length){
                alert('No se encontraron coincidencias')
                filtered = recipesCreated;
            }
            return{
                ...state, recipes: filtered 
            }
        case GET_ALL_RECIPES_BY_NAME:
            return {
                ...state, recipes: action.payload
            }
        case FILTER_BY_DIETS:
            const allRecipes = state.allRecipes;
            let filteredRecipes = action.payload === 'All' ? allRecipes : state.allRecipes.filter((r) =>{
                if(action.payload === 'vegan' && r.vegan) return true;
                if(action.payload === 'vegetarian' && r.vegetarian) return true;
                if(action.payload === 'gluten free' && r.glutenFree) return true;
                if(action.payload === 'dairy free' && r.dairyFree) return true;
                 return r.diets.includes(action.payload)
                });
            if(!filteredRecipes.length){
                alert('No se encontraron coincidencias')
                filteredRecipes = allRecipes;
            }
            return{
                ...state,
                recipes: filteredRecipes
            }
        case GET_RECIPE_DETAIL:
            console.log(action.payload);
            return{
                ...state, recipe: action.payload
            }
        case GET_DIETS:
            return{
                ...state, diets: action.payload
            } 
        case ORDER_BY_NAME: 
            let sortArr = action.payload === 'asc' ? 
                state.recipes.sort(function(a,b){
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    return 0;
                }) : state.recipes.sort(function(a,b){
                    if(a.name > b.name) return -1;
                    if(a.name < b.name) return 1;
                    return 0;
                })
            return{
                ...state,
                recipes: sortArr
            }
        case POST_RECIPE:
            return{
                ...state
            }
        case ORDER_BY_SCORE:
            let sortByScore = action.payload === 'random' ? state.recipes : action.payload === 'down' ?
            state.recipes.sort(function(a,b){
                return a.healthScore - b.healthScore;
            }) : state.recipes.sort(function(a,b){
                return b.healthScore - a.healthScore;
            })
            return{
                ...state,
                recipes: sortByScore
            } 
        default:
                return state    
    }
};

export default rootReducer;
