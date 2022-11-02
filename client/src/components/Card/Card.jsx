import React from "react";
import styles from './Card.module.css';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { deleteRecipe }from '../../redux/actions/actions';

const Card = ({key, id, name, image, diets, deleteHandler}) =>{
    const dispatch = useDispatch();
    const handlerDelete =(e) =>{
        e.preventDefault();
        dispatch(deleteRecipe(id));
        deleteHandler();
    } 
return(
    <div key={key} className={styles.showcase}>
            <div>
                <h1 className={styles.H1}>{name}</h1>  
            </div>
            <div className={styles.image}>
                <Link to={'/home/'+ id}>
                <img src={image} alt="img not found"  width='315px' height='250px' className={styles.image}/>
                </Link>
            </div>
            <div className={styles.ulliCards}>
                <h4 className={styles.H2}>Diets:</h4> 
                <ul key='diets' className={styles.ulCards}>
                    {diets.map(d=> <li key={d}>{d}</li>) }
                </ul> 
            </div>
            <div className={styles.divBtns}>
                {
                    id.toString().length > 20 ? 
                    <div>
                       <div>
                        <button className={styles.btnError} onClick={(e) =>{handlerDelete(e)} }>Delete</button>
                       </div>
                    </div>: ''
                }
            </div>       
    </div>
)
}

export default Card;