import React from "react";
import styles from './Paginado.module.css';

const Paginado = ({recipesPerPage, allRecipes, paginado, currentPage}) =>{
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i);
    }
    return(
        <nav className={styles.navPaginado}>
            <ul className={styles.ulPaginado}>
                {/* logica paginado completo */}
                {
                    pageNumbers && pageNumbers.map( (number) => (
                        <li key={number} className={styles.liPaginado}>
                            <a onClick={() => paginado(number)} className={styles.aPaginado}>
                                <i className={styles.iPaginado}>{number}</i>
                            </a>
                        </li>
                       )
                    )
                }
            </ul>
        </nav>
    )
};

export default Paginado;