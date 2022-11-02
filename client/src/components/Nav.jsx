import React from "react";
import { Link } from "react-router-dom";
import styles from './Home.module.css';
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { getAllRecipes, switchFlag, clearRecipes, setCurrentPage } from "../redux/actions/actions";

const Nav = ({setOrden, setOrdenScore}) =>{
    
    const dispatch = useDispatch();
    
    function handlerClick(e){
        e.preventDefault();
        dispatch(setCurrentPage(1));
        setOrden('');
        setOrdenScore('');
        dispatch(clearRecipes());
        dispatch(getAllRecipes());
        
    };
    
    function createHandler(){
        dispatch(switchFlag(false));
    }

    return(
    <div className={styles.Nav}>
                        <div>
                        <Link to='/createRecipe'><button className={styles.btn} onClick={() => createHandler()}>Create recipe</button></Link>
                        <SearchBar/>    
                        </div>
                    <div>
                        <h1>Food App!</h1>
                    </div>
                        <div>
                            <button onClick={ e => {handlerClick(e)}} className={styles.btn}>
                                Reload Recipes
                            </button>     
                        </div>
                </div>
    )

}

export default Nav;