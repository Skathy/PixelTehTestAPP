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

    const [toggle, setToggle] =  useState({'description' : true, 'food': true})
    const collapseStatus = {true: 'collapsed', false: ''}

    useEffect(() => {
        dispatch(GetSingleBeer(id))
    }, [])



    const toggleText = e => {
        setToggle(prev => (
            {...prev, [e.target.innerText.split(' ')[0].toLowerCase().match('[a-zA-Z]+').join('')]: 
                !prev[e.target.innerText.split(' ')[0].toLowerCase().match('[a-zA-Z]+').join('')]
            }))
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
                        <div><b>Tagline:</b> {beer.tagline}</div>
                        <div><b>ABV:</b> {beer.abv}</div>
                        <div className={collapseStatus[toggle['description']]} onClick={e => toggleText(e)}>
                            <span><b>Description:</b> {beer.description}</span>
                        </div>
                        <div className={collapseStatus[toggle['food']]} onClick={e => toggleText(e)}>
                            <span><b>Food pairing:</b> {beer.food_pairing ? beer.food_pairing.join(',') : null}</span>
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
