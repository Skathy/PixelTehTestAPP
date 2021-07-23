import { GET_PIZZA_BEER, GET_STEAK_BEER, GET_BEERS, SET_LOADING, GET_SINGLE_BEER } from './actions';

const initState = {
    pizza: [],
    steak: [],
    beers: [],
    beer: {},
    isLoading: false
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
        case SET_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        case GET_SINGLE_BEER: {
            return {
                ...state,
                beer: action.payload
            }
        }
        default: return state
    }
}