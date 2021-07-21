import {React, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBeers, getPizzaBeer, getSteakBeer} from '../../store/beers/actions'
import { BeerList } from '../BeerList'
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
                    <BeerList beers={pizza}/>
                </TabPane>
                <TabPane tab="Steak" key="2">
                    <BeerList beers={steak}/>
                </TabPane>
                <TabPane tab="ALL" key="3">
                    <BeerList beers={beers}/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default MainTable