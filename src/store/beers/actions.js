export const SET_LOADING = 'SET_LOADING'

export const GET_SINGLE_BEER = 'GET_SINGLE_BEER'
export function GetSingleBeer(id) {
    let isLoading = true
    return async dispatch => {
        dispatch({type: SET_LOADING, payload: isLoading})
        const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`)
        const json = await response.json()
        dispatch({type: GET_SINGLE_BEER, payload: json[0]})
        dispatch({type: SET_LOADING, payload: !isLoading})
    }
}

export const GET_PIZZA_BEER = 'GET_PIZZA_BEER'
export function getPizzaBeer(page, perPage) {
    let isLoading = true
    return async dispatch => {
        dispatch({type: SET_LOADING, payload: isLoading})
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}&food=pizza`)
        const json = await response.json()
        dispatch({type: GET_PIZZA_BEER, payload: json})
        dispatch({type: SET_LOADING, payload: !isLoading})
    }
}

export const GET_STEAK_BEER = 'GET_STEAK_BEER'
export function getSteakBeer(page, perPage) {
    let isLoading = true
    return async dispatch => {
        dispatch({type: SET_LOADING, payload: isLoading})
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}&food=steak`)
        const json = await response.json()
        dispatch({type: GET_STEAK_BEER, payload: json})
        dispatch({type: SET_LOADING, payload: !isLoading})
    }
}

export const GET_BEERS = 'GET_BEERS'
export function getBeers(page, perPage) {
    let isLoading = true
    return async dispatch => {
        dispatch({type: SET_LOADING, payload: isLoading})
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`)
        const json = await response.json()
        dispatch({type: GET_BEERS, payload: json})
        dispatch({type: SET_LOADING, payload: !isLoading})

    }
}