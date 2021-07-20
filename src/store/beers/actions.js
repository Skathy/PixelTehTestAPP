export const GET_PIZZA_BEER = 'GET_PIZZA_BEER'
export function getPizzaBeer() {
    return async dispatch => {
        const response = await fetch(`https://api.punkapi.com/v2/beers?food=pizza`)
        const json = await response.json()
        dispatch({type: GET_PIZZA_BEER, payload: json})
    }
}

export const GET_STEAK_BEER = 'GET_STEAK_BEER'
export function getSteakBeer() {
    return async dispatch => {
        const response = await fetch(`https://api.punkapi.com/v2/beers?food=steak`)
        const json = await response.json()
        dispatch({type: GET_STEAK_BEER, payload: json})
    }
}

export const GET_BEERS = 'GET_BEERS'
export function getBeers() {
    return async dispatch => {
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=1&per_page=9`)
        const json = await response.json()
        dispatch({type: GET_BEERS, payload: json})
    }
}