import React from 'react'
import { CustomButton } from '../CustomButton/CustomButton'
import { Loader }  from '../Loader/Loader'
import './style.scss'

export const BeerList = ({beers, incrementHandler, decrementHandler, perPage, currentPage, loading}) => {
    return (
        <div className='beer-list-wrapper'>
            <div className='beer-list'>
                {loading ? <Loader /> : beers.map(item => (
                <div className='beer' key={item.id}>
                    <div>
                        <img src={item.image_url} alt={item.id} />
                    </div>
                    <div className='beer-desc'>
                        <span>{item.name}</span>
                        <span>ABV: {item.abv}</span>
                    </div>
                </div>))}
            </div>
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