import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'

const LandingPage = (props) =>{
    return (
        <section className={styles.showcase}>
            <div>
                <h1>Welcome to Food App!</h1>
                <Link to= '/home'>
                    <button>Go to home</button>
                </Link>
            </div>
            
        </section>
    )
};

export default LandingPage;
