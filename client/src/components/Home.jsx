import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllRecipes, filterRecipesByDiets, getAllDiets, orderByName, orderByScore, switchFlag, filterByCreates, setCurrentPage, clearRecipes} from '../redux/actions/actions';
import Card from './Card/Card';
import Paginado from './Paginado';
import Loading from './Loading/Loading';
import styles from './Home.module.css';
import Nav from './Nav';

const Home = () =>{
    const dispatch = useDispatch();
    const page= useSelector((state) => state.currentPage);
    const allRecipes = useSelector((state) => state.recipes);
    const diets = useSelector((state) => state.diets)
    const statusFlag = useSelector((state) => state.flag);
    const [orden, setOrden] = useState('');                                           //estado local para ordenar por orden alfabetico
    const [ordenScore, setOrdenScore] = useState('');                                //estado local pata ordenar por healthScore
    const recipesPerPage= 9;                                                        //cantidad de cards por pagina
    const indexOfLastRecipe = page * recipesPerPage;                                // indice de la primer carta a mostrar segun el numero del paginado
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;                  // indice de la ultima carta a mostrar segun el numero del paginado
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe); // de todas las recetas me quedo solo desde indice a la primer carta a mostrar hasta la novena seguida a la primera
    

    const paginado = (pageNumber) =>{
        dispatch(setCurrentPage(pageNumber));
    }


    useEffect(() =>{
        if(!statusFlag){
            dispatch(getAllDiets());
            dispatch(getAllRecipes());
       }    
    },[statusFlag]);

    function deleteHandler(){
        if(allRecipes.length === 1){
            dispatch(getAllRecipes());  
        }else if(currentRecipes.length === 1){
            dispatch(setCurrentPage(page - 1))
        }
        else{
            dispatch(switchFlag(true)) 
        }
    }
    function handlerFilterByDiets(e){
        dispatch(clearRecipes());
        dispatch(filterRecipesByDiets(e.target.value));
        dispatch(setCurrentPage(1));
        setOrdenScore(``);
        setOrden(``);
    };

    function handlerSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        dispatch( setCurrentPage(1));
        setOrden(`Ordenado ${e.target.value}`)
        
    };

    function handlerScore(e){
        e.preventDefault();
        dispatch(orderByScore(e.target.value));
        dispatch( setCurrentPage(1));
        setOrdenScore(`Ordenado ${e.target.value}`);
    }
    
    function handlerCreates(e) {
        dispatch(filterByCreates(e.target.value));
       dispatch( setCurrentPage(1));
        setOrdenScore(``);
        setOrden(``);
    }

    return (
        <div className={styles.divContainer}>
           
           <Nav setOrden={setOrden} setOrdenScore={setOrdenScore}/>
              
           <div className={styles.cardsFiltersPag}>
                <div>
                    <Paginado
                    recipesPerPage={recipesPerPage}  //le mando la cantidad de recetas a motrar por pagina
                    allRecipes={allRecipes.length} //la cantidad de recetas que existen
                    paginado={paginado} //funcion que despacha la action para establecer la pagina actual
                    currentPage={page} //pagina actual
                    /> 
                </div>
                
                <div className={styles.cardsFilters}>
                {
                    !currentRecipes.length ? '' : (

                    <div className={styles.filters}>
                            <label>
                                Sort by HealthScore:
                                <select onChange={(e) =>{handlerScore(e)}} className={styles.selector}>
                                    <option disabled selected>Select an option...</option>
                                    <option value="up">Highest Score</option>
                                    <option value="down">Lowest Score</option>
                                </select>
                            </label>
                            <label>
                                 Sort by Alphabetical order:
                                <select onChange={(e) =>{handlerSort(e)}} className={styles.selector}>
                                <option disabled selected>Select an option...</option>
                                    <option value="asc">A-Z</option>
                                    <option value="dsc">Z-A</option>
                                </select>
                            </label>
                            <label>
                                Filter by Diet:
                                <select onChange={e => handlerFilterByDiets(e)} className={styles.selector}>
                                    <option value="All">All</option>
                                    {
                                        diets?.map(d => <option value={d.name}>{d.name}</option>)
                                    }
                                </select>
                            </label>
                            <label>
                                Filter by created:
                                <select onChange={(e) =>{ handlerCreates(e)}} className={styles.selector}>
                                    <option value="All">All</option>
                                    <option value="database">Created</option>
                                    <option value="api">Not created</option>
                                </select>                                 
                            </label>
                        </div>
                    )
                }

                    <div className={styles.containerCards}>
                            {
                            !currentRecipes.length ? <Loading/> : currentRecipes?.map((r) =>{

                                return( 
                                            <Card key={r.id + r.name} id={r.id} name={r.name} image={r.image} diets={r.diets} deleteHandler={deleteHandler}/>
                                        ) 
                                    
                                    }
                                )  
                            }
                    </div>
                </div>
           </div>

            
        </div>
    )
};

export default Home;


