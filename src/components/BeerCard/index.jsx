import {React, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { GetSingleBeer } from './../../store/beers/actions'
import { Loader } from '../Loader/Loader'

export const BeerCard = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { beer, isLoading } = useSelector(state => state.beerReducer)

    useEffect(() => {
        dispatch(GetSingleBeer(id))
    }, [])

    return (
        <div>
            { beer ? 
                <div className='card-wrapper'>
                    <div className="card-header">
                        <img src={beer.image_url} alt="beer-logo"/>
                        <div>
                            Name: {beer.name}
                        </div>
                    </div>
                    <div className="card-body">
                        <div>Tagline: {beer.tagline}</div>
                        <div>ABV: {beer.abv}</div>
                        <div>Description: {beer.description}</div>
                        <div>Food pairing: {beer.food_pairing ? beer.food_pairing.join(',') : null}</div>
                    </div>
                    <Link to='/'>BACK</Link>
                </div>
            : isLoading? <Loader />: null}
        </div>
    )
}
