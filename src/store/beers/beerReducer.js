import { GET_BEER } from './actions';
const initState = {
    beers: []
}

export default (state = initState, action) => {
    switch(action.type) {
        case GET_BEER: {
            return {
                ...state, 
                beers: [action.payload]
            }
        }
    }
}