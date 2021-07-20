import { GET_PIZZA_BEER, GET_STEAK_BEER, GET_BEERS } from './actions';

const initState = {
    pizza: [],
    steak: [],
    beers: []
}

export default (state = initState, action) => {
    switch(action.type) {
        case GET_PIZZA_BEER: {
            return {
                ...state, 
                pizza: action.payload
            }
        }
        case GET_STEAK_BEER: {
            return {
                ...state,
                steak: action.payload
            }
        }
        case GET_BEERS: {
            return {
                ...state,
                beers: action.payload
            }
        }
        default: return state
    }
}