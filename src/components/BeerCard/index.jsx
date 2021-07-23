import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { GetSingleBeer } from './../../store/beers/actions'
import { Loader } from '../Loader/Loader'
import './style.scss'

export const BeerCard = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { beer, isLoading } = useSelector(state => state.beerReducer)
    const [collapse, setCollapse] = useState({['description']: 'collapsed', ['food_pairing']: 'collapsed'})

    useEffect(() => {
        dispatch(GetSingleBeer(id))
    }, [])

    const openText = (e) => {
        console.log(e.target.innerHTML.split(' ')[0])
        if (e.target.innerHTML.split(' ')[0] === 'Description:') {
            if (collapse['description'] === 'collapsed') {
                setCollapse(prev => ({
                    ...prev,
                    ['description']: ''
                }))
            } else {
                setCollapse(prev => ({
                    ...prev,
                    ['description']: 'collapsed'
                }))
            }
        } else {
            if (collapse['food_pairing'] === 'collapsed') {
                setCollapse(prev => ({
                    ...prev,
                    ['food_pairing']: ''
                })) 
            } else {
                setCollapse(prev => ({
                    ...prev,
                    ['food_pairing']: 'collapsed'
                }))
            }
        }
    }
    

    return (
        <div>
            { isLoading ? <Loader /> : beer ? 
                <div className='card-wrapper'>
                    <div className="card-header">
                        <img src={beer.image_url} alt="beer-logo"/>
                        <div className='beer-name'>
                            <h2>{beer.name}</h2>
                        </div>
                    </div>
                    <div className="card-body">
                        <div>Tagline: {beer.tagline}</div>
                        <div>ABV: {beer.abv}</div>
                        <div className={collapse['description']} onClick={e => openText(e)}>
                            <span>Description: {beer.description}</span>
                        </div>
                        <div className={collapse['food_pairing']} onClick={e => openText(e)}>
                            <span>Food pairing: {beer.food_pairing ? beer.food_pairing.join(',') : null}</span>
                        </div>
                    </div>
                    <Link to='/'>
                        <div className='link-btn'>
                            BACK
                        </div>
                    </Link>
                </div>
            : <Loader />}
        </div>
    )
}
