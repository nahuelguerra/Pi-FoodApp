import axios from 'axios';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_ALL_RECIPES_BY_NAME = 'GET_ALL_RECIPES_BY_NAME';
export const POST_RECIPE = 'POST_RECIPE';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const GET_DIETS = 'GET_DIETS';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_SCORE= 'ORDER_BY_SCORE';
export const SWITCH_FLAG= 'SWITCH_FLAG';
export const ORDER_BY_CREATES= 'ORDER_BY_CREATES';
export const CLEAR= 'CLEAR';
export const DELETE_RECIPE= 'DELETE_RECIPE';
export const CLEAR_RECIPES= 'CLEAR_RECIPES';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'


export function getAllRecipes(){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/recipes');
            return dispatch({
                type: GET_ALL_RECIPES,
                payload: json.data
            })
        }catch(error){
            console.log(error.message);
        }
    }
};
export function setCurrentPage(pageNumber){
    return{
        type: SET_CURRENT_PAGE,
        payload: pageNumber
    }
}
export function deleteRecipe(id){
    return async function(dispatch) {
        try {
            console.log(id)
            const response = await axios.delete(`http://localhost:3001/recipe/`+ id);
            console.log(response);
            return dispatch({
                type: DELETE_RECIPE,
                payload: id
            })

        }catch(error){
            console.log(error);
        }
    }
};

export function clearRecipe(){
    return{
        type: CLEAR,
    }
};
export function clearRecipes(){
    return{
        type: CLEAR_RECIPES,
    }
};

export function getAllRecipesByName(name){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/recipes?name='+ name);
            return dispatch({
                type: GET_ALL_RECIPES_BY_NAME,
                payload: json.data
            })
        }catch(error){
            console.log(error.message);
        }
    }
};

export function getAllDiets(){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/diets');
            console.log(json.data);
            return dispatch({
                type: GET_DIETS,
                payload: json.data
            })
        }catch(error){
            console.log(error.message);
        }
    }
};

export function filterByCreates(payload){
    return{
        type: ORDER_BY_CREATES,
        payload
    }
};

export function getRecipeDetail(id){
    // return function(dispatch){
    //     return axios.get(`http://localhost:3001/recipes/${id}` )
    //     .then(response => response.data)
    //     .then(data => dispatch({
    //         type: GET_RECIPE_DETAIL,
    //         payload: data
    //     }))
    // }
    return async function(dispatch){
        try {
            let json = await axios.get(`http://localhost:3001/recipes/${id}`);
            console.log(json.data);
            return dispatch({
                type: GET_RECIPE_DETAIL,
                payload: json.data
            })
        }catch(error){
            console.error(error.message);
        }
    }
};

export function orderByScore(payload){
    return {
        type: ORDER_BY_SCORE,
        payload
    }
};

export function switchFlag(payload){
    return{
        type: SWITCH_FLAG,
        payload: payload
    }
};

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
};

export function postRecipes(payload){
    return async function(dispatch) {
        try {        
            const response = await axios.post(`http://localhost:3001/recipe`, payload)
            return response

        }catch(error){
            console.log(error);
        }
    }
};

export function filterRecipesByDiets(payload){
    console.log(payload);
    return{
        type: FILTER_BY_DIETS,
        payload
    }
};
