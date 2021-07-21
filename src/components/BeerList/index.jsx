import React from 'react'
import { CustomButton } from '../CustomButton/CustomButton'
import './style.scss'

export const BeerList = ({beers}) => {
    return (
        <div className='beer-list-wrapper'>
            <div className='beer-list'>
                {beers.length ? beers.map(item => <li>{item.name}</li>) : null}
            </div>
            <div className="pagination-wrapper">
                <CustomButton text='PREV' className='prev-btn'/>
                <CustomButton text='NEXT' className='next-btn'/>
            </div>
        </div>
    )
}
