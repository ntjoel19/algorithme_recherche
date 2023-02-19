let initialRecipeList = recipes
let currentRecipesList = recipes
let inputText = ""
let ingredients = []
let appareils = []
let ustensils = []
let arraySelectedTags = []

/** Getters */
export const get_initialRecipeList = () => {
    return initialRecipeList
}

export const get_currentRecipesList = () => {
    return currentRecipesList
}

export const get_inputText = () => {
    return inputText
}

export const get_ingredients = () => {
    return ingredients
}

export const get_appareils = () => {
    return appareils
}

export const get_ustensils = () => {
    return ustensils
}

export const get_arraySelectedTags = () => {
    return arraySelectedTags
}

/**Setters */
export const set_initialRecipeList = (value) => {
    initialRecipeList = value
}

export const set_currentRecipesList = (value) => {
    currentRecipesList = value
}

export const set_inputText = (value) => {
    inputText = value
}

export const set_ingredients = (value) => {
    ingredients = value
}

export const set_appareils = (value) => {
    appareils = value
}

export const set_ustensils = (value) => {
    ustensils = value
}

export const set_arraySelectedTags = (value) => {
    arraySelectedTags = value
}