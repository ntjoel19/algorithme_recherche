import { removeDoubles, dispatchFilters } from "./utils.js";
import { get_initialRecipeList } from "../index.js";
export const mainSearch = (inputText, recipes) => {
    let result = [];
    if(inputText==="" || inputText===null || inputText===undefined || inputText.length < 3) {
        console.log("liste initiale")
        dispatchFilters(get_initialRecipeList())
        return get_initialRecipeList();
    }

    recipes.forEach(recipe => {
        if(recipe.description.includes(inputText)) {
            result.push(recipe);
        }

        if(recipe.appliance.includes(inputText)) {
            result.push(recipe);
        }

        if(recipe.ustensils.includes(inputText)) {
            result.push(recipe);
        }

        if(recipe.ingredients.some(element => element.ingredient.includes(inputText) )) {
            result.push(recipe);
        }
    });
    
    result = removeDoubles(result)
    console.log(result)
    dispatchFilters(result)
    
    return result

    
}


