import React from "react";
import styles from './Loading.module.css'

const Loading= () =>{

    return(
        <div className={styles.container}>

        <div className={styles.ring}>
            Loading
            <span className={styles.ring}></span>
        </div>
        </div>
    )

};

export default Loading;