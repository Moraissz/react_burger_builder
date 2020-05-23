import React from 'react'

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) =>{
    const ingredients = Object.keys(props.ingredients).map((igName) =>{
        return [...Array(props.ingredients[igName])].map((_,index)=>{
            
            return <BurgerIngredient type= {igName} key ={igName + index}></BurgerIngredient>
            
        })
        })
    
    console.log(ingredients)

    

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'></BurgerIngredient>
                {ingredients}
                
            <BurgerIngredient type='bread-bottom'></BurgerIngredient>
        </div>        
    )
}

export default burger;