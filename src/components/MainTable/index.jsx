import {React, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBeer} from '../../store/beers/actions'

const MainTable = () => {
    const dispatch = useDispatch()

    const { beers } = useSelector(state => state.beerReducer)
    console.log(beers)

    useEffect(() => {
        dispatch(getBeer())
    }, [])
    return (
        <div>
            Herro Warudo!
        </div>
    )
}

export default MainTable