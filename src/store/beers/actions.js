export const GET_PIZZA_BEER = 'GET_PIZZA_BEER'
export function getPizzaBeer(page, perPage) {
    return async dispatch => {
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}&food=pizza`)
        const json = await response.json()
        dispatch({type: GET_PIZZA_BEER, payload: json})
    }
}

export const GET_STEAK_BEER = 'GET_STEAK_BEER'
export function getSteakBeer(page, perPage) {
    return async dispatch => {
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}&food=steak`)
        const json = await response.json()
        dispatch({type: GET_STEAK_BEER, payload: json})
    }
}

export const GET_BEERS = 'GET_BEERS'
export function getBeers(page, perPage) {
    return async dispatch => {
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`)
        const json = await response.json()
        dispatch({type: GET_BEERS, payload: json})
    }
}