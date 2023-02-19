import { get_appareils, get_ustensils, get_ingredients,
        set_appareils, set_ustensils, set_ingredients } from "../index.js";

export const removeDoubles = (array) => {
    return array.filter((element, index) => {
        return array.indexOf(element) === index;
    });
}

export const dispatchFilters = (currentRecipesList) => {
    set_appareils([]);
    set_ustensils([]);
    set_ingredients([]);
    currentRecipesList.forEach(element => {
        let appareils = get_appareils();
        appareils.push(element.appliance)
        set_appareils(appareils);

        let ustensils = get_ustensils();
        ustensils.push(...(element.ustensils))
        set_ustensils(ustensils);

        element.ingredients.forEach(ingr => {
            let ingredient = get_ingredients();
            ingredient.push(ingr.ingredient);
            set_ingredients(ingredient)
        })
    });

    set_ingredients(get_ingredients().map(element => element.toLowerCase()))

    set_appareils(removeDoubles(get_appareils()))

    set_ustensils(removeDoubles(get_ustensils()))

    set_ingredients(removeDoubles(get_ingredients()))
}