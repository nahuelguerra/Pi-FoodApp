import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetail, clearRecipe, switchFlag, deleteRecipe } from '../redux/actions/actions';
import { Link } from "react-router-dom";
import Loading from "./Loading/Loading";
import styles from './RecipeDetail.module.css';

const RecipeDetail = (props) =>{
    const dispatch = useDispatch();
    const rec = useSelector((state) => state.recipe);
    const id = props.match.params.id;
    console.log(id);
    useEffect(()=>{
        dispatch(getRecipeDetail(id))
    },[dispatch, id]);

    const handlerDelete =(e) =>{
        e.preventDefault();
        dispatch(deleteRecipe(id));
    } 
    const handlerClick =(e) => {
        dispatch(clearRecipe());
        dispatch(switchFlag(true))
    }
    return(
      
             <div className={styles.container}>
                <div className={styles.divBtn}>

                <Link to='/home'>
                <button onClick={(e) =>{handlerClick(e)}} className={styles.btn}>Back to Home</button>
                </Link>
                </div>
                {
                    rec.image ?  ( 
                    <div className={styles.divDetail}>
                            <h1 className={styles.title}>{rec?.name}</h1>
                        <div className={styles.divImgPs}>
                            <div className={styles.divImg}>
                                <h1 className={styles.centerTitles}>Illustrative Image</h1>
                                <img src={rec?.image} alt="img not found" className={styles.divimg}/>
                            </div>
                            <div className={styles.divPs}>
                                <div className={styles.divCampos}>
                                    <h2 className={styles.centerTitles}>HealthScore: <p> { rec?.healthScore}</p></h2>
                                </div>
                               
                                <div className={styles.divCampos}>
                                    <h2 className={styles.centerTitles}>Summary: </h2>
                                </div>
                                <p><p dangerouslySetInnerHTML={ { __html: rec?.summary }}/></p>
                                <div className={styles.divCampos}>
                                    <h2 className={styles.centerTitles}>Steps:</h2>
                                </div>
                                <p><p dangerouslySetInnerHTML={ { __html: rec?.steps }}/></p>
                                <div className={styles.divCampos}>
                                    <h2 className={styles.centerTitles}>Types of diet: </h2>
                                </div>                               
                                <ul>
                                    {
                                        rec.diets.map(d=> <li>{d}</li>)
                                    }
                                </ul> 
                            </div>
                        </div>
                    </div>
                    ): <Loading/>
                }
                
            </div>
    )
};

export default RecipeDetail;