import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postRecipes, getAllDiets, clearRecipes, switchFlag, setCurrentPage} from "../redux/actions/actions";
import styles from './CreateRecipe.module.css';
import Loading from './Loading/Loading';

const validate = (input) =>{
    let errors = {};
    if(!input.name){
        errors.name = 'Name is required';
    }else if(!/^[A-Za-z0-9 ]+$/.test(input.name)){
        errors.name='a-z, 0-9 and space only'
    }
    if(!input.summary){
        errors.summary = 'Summary is required';
    }
    if(!/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?.*(png|jpg|jpeg|gif)$/.test(input.image)){
        errors.image= 'the image must be in URL format'
    }
    if(input.diets.length === 0){
        errors.diets = 'Select at least one type of Diet';
    }
    return errors
}

const CreateRecipe = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);
    const allRecipes = useSelector((state) =>state.allRecipes);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name:'',
        summary: '',
        healthScore: 10,
        image:'',
        steps: '',
        diets:[],   
    });

    useEffect(() =>{
        dispatch(getAllDiets())
    }, []);

    const handlerChange = (e) =>{
        setInput({...input, [e.target.name]: e.target.value});
        setErrors(validate({...input, [e.target.name]: e.target.value}));
    };

    const handlerSelect = (e) =>{
        if(input.diets.includes(e.target.value)) return;
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            });
            setErrors(validate({...input,
                diets: [...input.diets, e.target.value]}));
        
    };

    function handlerNumber(e){
        try{
            const parsValue = parseInt(e.target.value)
            if ((Number.isInteger(parsValue)) && (parsValue >= 10) && (parsValue <= 100)){
                setInput({
                    ...input,
                    [e.target.name]: parsValue
                })
            }
        }catch{
            console.log('error')
        }
    }
    const handlerDelete = (e) =>{
        e.preventDefault();
        //if(e.target.checked){
            setInput({
                ...input,
                diets: input.diets.filter(d => d !== e.target.value)
            }); 
            setErrors(validate({
                ...input,
                diets: input.diets.filter(d => d !== e.target.value)
            }));
        
    }
    const handlerBackToHome =() =>{
        dispatch(switchFlag(true));
    }

    const handlerSubmit = (e) =>{
        e.preventDefault();
        if(allRecipes.find(r => r.name.toLowerCase() === input.name.toLowerCase())){  
            alert('Ya existe una receta con ese nombre');
            setInput({
                name:'',
                summary: '',
                healthScore: 10,
                image:'',
                steps: '',
                diets:[], 
            });
            
            history.push('/createRecipe');
        }else{
            dispatch(postRecipes(input));
            alert('Receta Creada');
            setInput({
                name:'',
                summary: '',
                healthScore: 10,
                image:'',
                steps: '',
                diets:[], 
            });
            dispatch(setCurrentPage(1));
            dispatch(switchFlag(false));
            dispatch(clearRecipes());
            history.push('/home')
        }
    }
    
    return(
        <div className={styles.container}>
            <Link to='/home'>
            <button className={styles.btn} onClick={()=>{handlerBackToHome()}}>Back To Home</button>
            </Link>
            {
                !diets.length ? <Loading/> :

            <form onSubmit={(e) => {handlerSubmit(e)}} className={styles.form}>
            <h1>Create your Recipe!</h1>
                <div>
                    <label>Name: </label>
                    <input type="text" value={input.name} name= 'name'  placeholder='Add name...' onChange={handlerChange}/>
                     *
                {errors.name && (
                    <p className={styles.ps}>{errors.name}</p>
                )}
                </div>
                <div>
                    <label>Summary: </label>
                    <input type="text" value={input.summary} name= 'summary' placeholder='Write the summary here...' onChange={handlerChange}/>
                     *
                    {errors.summary && (
                    <p className={styles.ps}>{errors.summary}</p>
                )}
                </div>
                <div>
                    <label>HealthScore: </label>
                    <input type="number" value={input.healthScore} name='healthScore' min='10' max='100' onChange={(e) =>{handlerNumber(e)}}/>
                </div>
                <div>
                    <label>Image: </label>
                    <input type="text" value={input.image} name='image'placeholder='Enter URL of an image...' onChange={handlerChange}/>
                    {errors.image && (
                    <p className={styles.ps}>{errors.image}</p>
                )}
                </div>
                <div>
                    <label>Steps: </label> 
                    <input type="text" value={input.steps} name='steps' placeholder='Write the steps here...' onChange={handlerChange}/>
                </div>
                <div>
                    <label>Diets: </label>
                    <select onChange={(e) =>{handlerSelect(e)}} className={styles.selector}>
                        <option disabled selected>Select the types of diet</option>
                    {diets?.map((d) =>{
                        return(
                        <option value={d.name} name={d.name} > {d.name}  </option>
                        )
                    })
                    }   
                    </select>
                    {errors.diets && (
                        <p className={styles.ps}>{errors.diets}</p>)
                    }
                </div>
                {
                    !input.diets.length ? '' : (
                        <div >
                            <label>Remove type of diet: </label>
                            {
                                input.diets.map( d=>
                                    <button value={d} name={d} onClick={(e) =>{handlerDelete(e)}} className={styles.btnError2}> X {d}</button>
                                )
                            }
                        </div>
                    )
                }
                {((input.name !== '') && (!errors.name) &&(!errors.diets)&& (!errors.image) && (input.summary !=='')) ?
                         
                             <button type='submit' className={styles.btn}>Create Recipe</button>
                              : ( <div><button type='submit'  className={styles.btnError} disabled>Create Recipe</button>
                              <p className={styles.ps}>Incomplete required fields</p></div>)
                }
               
            </form>
            }

        </div>
    )
};

export default CreateRecipe;