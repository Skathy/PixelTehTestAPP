import React from 'react'
import { CustomButton } from '../CustomButton/CustomButton'
import './style.scss'

export const BeerList = ({beers, incrementHandler, decrementHandler, perPage, currentPage}) => {
    return (
        <div className='beer-list-wrapper'>
            <div className='beer-list'>
                {beers.length ? beers.map(item => <li key={item.id}>{item.name}</li>) : null}
            </div>
            <div className="pagination-wrapper">
                <CustomButton 
                    text='PREV' 
                    className='prev-btn' 
                    clickHandler={decrementHandler} 
                    disabled={currentPage === 1 ? true : false} 
                />
                <CustomButton 
                    text='NEXT' 
                    className='next-btn' 
                    clickHandler={incrementHandler} 
                    disabled={beers.length !== perPage ? true : false} 
                />
            </div>
        </div>
    )
}
