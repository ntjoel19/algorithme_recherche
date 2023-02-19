import { get_inputText, set_inputText, get_currentRecipesList, set_currentRecipesList, get_initialRecipeList,
get_ingredients, get_ustensils, get_appareils, get_arraySelectedTags, set_arraySelectedTags } from "../index.js";
import { mainSearch } from "../search/search.js";

import { removeDoubles } from "../search/utils.js";

const searchInput = document.getElementById("searchInput");
const ingredients_list = document.getElementById("ingredients_list")
const appareils_list = document.getElementById("appareils_list");
const ustensils_list = document.getElementById("ustensiles_list")


const recipe = (recipe) => {
    const div = document.createElement("div")
    div.className = "recipe dflex dflex_c"
    div.id = recipe.id;

    const img = document.createElement("img");
    
    const div2 = document.createElement("div");
    div2.className = "recipeDetails dflex dflex_c";

    div.appendChild(img);
    div.appendChild(div2); 

    const p = document.createElement("p");
    p.className = "dflex dflex_space_betw"
    const h4 = document.createElement("h4")
    h4.innerText = recipe.name;
    const h4_2 = document.createElement("h4");
    h4_2.innerText = recipe.time + " min";
    p.appendChild(h4);
    p.appendChild(h4_2);

    div2.appendChild(p);

    const p2 = document.createElement("p");
    p2.className = "dflex dflex_space_betw description"
    
    const ul = document.createElement("ul");
    recipe.ingredients.forEach(ingr => {
        const li = document.createElement("li");
        console.log(ingr.ingredient)
        const innerHTML = `${ingr.ingredient} : ${ingr.quantity} ${ingr.unit?ingr.unit:""}`;
        li.innerText = innerHTML
        ul.appendChild(li);
    });

    p2.appendChild(ul)
    
    const span = document.createElement("span");
    span.innerText = recipe.description

    p2.appendChild(span)

    div2.appendChild(p);
    div2.appendChild(p2);
    
    return div;
}

const buildUlList = (list) => {
    let ul = document.createElement("ul");
    for(let i=0;i<list.length;i++) {
        const li = document.createElement("li")
        li.innerText = list[i];
        li.addEventListener("click", (e) => {
            
            let filterArray = get_arraySelectedTags();
            
            filterArray.push(e.target.innerHTML);

            
            filterArray = removeDoubles(filterArray)
            
            makeSearchAndUpadteDom(filterArray)
        })
        ul.appendChild(li);
    }
    return ul
}


const displayRecipes = (recipes) => {
    const main = document.getElementById("main");
    if(recipes.length===0) main.innerHTML = "Aucune recette ne correspond à la recherche"
    else main.innerHTML = ""
    for(let i=0;i<recipes.length;i++) {
        const recipeDom = recipe(recipes[i]);
        
        main.appendChild(recipeDom);
    }

    
}

const displayFiltres = (ingredients, appareils, ustensils) => {
    
    ingredients_list.innerHTML = "";
    appareils_list.innerHTML = "";
    ustensils_list.innerHTML = "";

    const ul1 = buildUlList(ingredients);
    const ul2 = buildUlList(appareils);
    const ul3 = buildUlList(ustensils);
    
    ingredients_list.appendChild(ul1);
    appareils_list.appendChild(ul2);
    ustensils_list.appendChild(ul3);
}

const displaySelectedTags = (array) => {
    console.log(array)
    const parent = document.getElementById("choosenFilters");
    parent.innerHTML=""
    array.forEach(elt=> {
        const span = document.createElement("span")  
        span.innerText = elt;

        span.addEventListener("click", (e) => {
            let filterArray = get_arraySelectedTags();
            filterArray.splice(filterArray.indexOf(e.target.innerText),1);
            set_arraySelectedTags(filterArray)

            makeSearchAndUpadteDom(filterArray)
        })

        parent.appendChild(span)
    })
    
    
    
}

const makeSearchAndUpadteDom = (filterArray) => {
    set_currentRecipesList(mainSearch(get_inputText(), get_initialRecipeList()));
    filterArray.forEach(filter => {
        set_currentRecipesList(mainSearch(filter, get_currentRecipesList()));
    })
    displaySelectedTags(filterArray)
    displayFiltres(get_ingredients(), get_appareils(), get_ustensils())
    displayRecipes(get_currentRecipesList())
}


set_currentRecipesList(mainSearch(get_inputText(), get_currentRecipesList()));
displayFiltres(get_ingredients(), get_appareils(), get_ustensils())
displayRecipes(get_currentRecipesList())

searchInput.addEventListener("keyup", (e) => {
    e.preventDefault();

    set_inputText(e.target.value);
    if(e.code === "Backspace") {
        set_currentRecipesList(mainSearch(get_inputText(), get_initialRecipeList()));
    } {
        set_currentRecipesList(mainSearch(get_inputText(), get_currentRecipesList()));
    }
    
    displayFiltres(get_ingredients(), get_appareils(), get_ustensils())
    displayRecipes(get_currentRecipesList())
})
