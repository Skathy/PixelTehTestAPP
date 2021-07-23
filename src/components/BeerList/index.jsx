import React from 'react'
import { Link } from 'react-router-dom'
import { CustomButton } from '../CustomButton/CustomButton'
import { Loader }  from '../Loader/Loader'
import './style.scss'

export const BeerList = ({beers, incrementHandler, decrementHandler, perPage, currentPage, loading, sorting, sortParam, path}) => {
    return (
        <div className='beer-list-wrapper'>
            <div className='beer-list'>
                {/* RENDERING LIST OF BEERS IF LOADING FALSE OR LENGTH OF BEERS ARR > 0 */}
                {loading ? <Loader /> : beers.length ? beers
                    .sort(sorting(sortParam)) 
                    .map(item => (
                        // OPEN BEER CARD BY ON BEER CLICK
                        <Link to={() => path(item.id)}>
                            <div className='beer' key={item.id}>
                                <div>
                                    <img src={item.image_url} alt={item.id} />
                                </div>
                                <div className='beer-desc'>
                                    <span>{item.name}</span>
                                    <span>ABV: {item.abv}</span>
                                </div>
                            </div>
                        </Link>)) : null}
            </div>
            {/* PAGINATION SECTION */}
            <div className="pagination-wrapper">
                <CustomButton 
                    text='PREV' 
                    className='prev-btn' 
                    clickHandler={decrementHandler}
                    disabled={currentPage === 1 ? true : loading ? true : false} 
                />
                <CustomButton 
                    text='NEXT' 
                    className='next-btn' 
                    clickHandler={incrementHandler}
                    disabled={beers.length !== perPage ? true : loading ? true : false} 
                />
            </div>
        </div>
    )
}
