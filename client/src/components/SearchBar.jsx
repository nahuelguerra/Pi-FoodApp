import React from "react";
import { useState} from "react";
import { useDispatch } from 'react-redux';
import { clearRecipes, getAllRecipesByName, setCurrentPage } from "../redux/actions/actions";
import styles from './SearchBar.module.css';

const SearchBar = () =>{

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    const handlerInputChange = (e) =>{
        e.preventDefault();
        setName(e.target.value)
    };

    const handlerFunctionSubmit = (e) =>{
        e.preventDefault();
        dispatch(clearRecipes())
        dispatch(getAllRecipesByName(name));
        setName('')
        dispatch(setCurrentPage(1));
    }
    
    return(
        <div className={styles.container}>
            <input
             type="text"
             placeholder="Search recipe..."
             onChange={(e)=> handlerInputChange(e)}
             value={name}
             className={styles.ipt}
             />
             <button type="submit" onClick={(e) => handlerFunctionSubmit(e)} className={styles.btn}>Search</button>
        </div>
    )

};

export default SearchBar;