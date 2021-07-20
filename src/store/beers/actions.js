export const GET_BEER = 'GET_BEER'
export function getBeer() {
    return async dispatch => {
        const response = await fetch(`https://api.punkapi.com/v2/beers/random`)
        const json = await response.json()
        dispatch({type: GET_BEER, payload: json})
    }
}