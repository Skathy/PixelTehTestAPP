import {React, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBeers, getPizzaBeer, getSteakBeer} from '../../store/beers/actions'
import { Tabs } from 'antd'
import 'antd/dist/antd.css'
import './style.scss'

const { TabPane } = Tabs;

const MainTable = () => {
    const dispatch = useDispatch()

    const { pizza, steak, beers } = useSelector(state => state.beerReducer)

    useEffect(() => {
        dispatch(getPizzaBeer())
        dispatch(getSteakBeer())
        dispatch(getBeers())
    }, [])


    return (
        <div>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Pizza" key="1">
                    <div className='beer-list'>
                        {pizza.length ? pizza
                            .map(beer => <li key={beer.id}>{beer.name}</li>) : null}
                    </div>
                </TabPane>
                <TabPane tab="Steak" key="2">
                    <div className='beer-list'>
                        {steak.length ? steak
                            .map(beer => <li key={beer.id}>{beer.name}</li>) : null}
                    </div>
                </TabPane>
                <TabPane tab="ALL" key="3">
                    <div className='beer-list'>
                        {beers.length ? beers
                            .map(beer => <li key={beer.id}>{beer.name}</li>) : null}
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default MainTable