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

    const [page, setPage] = useState(1)
    const [pizzaPage, setPizzaPage] = useState(1)
    const [steakPage, setSteakPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [currentTab, setCurrentTab] = useState('')

    const { pizza, steak, beers } = useSelector(state => state.beerReducer)

    const incrementHandler = () => {
        switch(currentTab) {
            case 'PIZZA':
                if (beers.length === perPage) {
                    setPizzaPage(prev => prev+1)
                }
                break
            case 'STEAK':
                if (beers.length === perPage) {
                    setSteakPage(prev => prev+1)
                }
                break
            case 'ALL': 
                if (beers.length === perPage) {
                    setPage(prev => prev+1)
                }
                break
        }
    }
    const clkHandler = (key) => {
        switch (+key) {
            case 1: 
                setCurrentTab('PIZZA');
                break;
            case 2: 
                setCurrentTab('STEAK');
                break;
            case 3:
                setCurrentTab('ALL');
                break;
        }   
    }

    const decrementHandler = () => {
        switch(currentTab) {
            case 'PIZZA':
                if (pizzaPage > 1) {
                    setPizzaPage(prev => prev-1)
                }
                break
            case 'STEAK':
                if (steakPage > 1) {
                    setSteakPage(prev => prev-1)
                }
                break
            case 'ALL': 
                if (page > 1) {
                    setPage(prev => prev-1)
                }
                break
        }
    }


    useEffect(() => {
        dispatch(getPizzaBeer(pizzaPage, perPage))
        dispatch(getSteakBeer(steakPage, perPage))
    }, [steakPage, pizzaPage])

    useEffect(() => {
        dispatch(getBeers(page,perPage))
    }, [page])



    return (
        <div>
            <Tabs defaultActiveKey="1" onTabClick={key => clkHandler( key)}>
                <TabPane tab="Pizza" key="1">
                    <BeerList 
                        beers={pizza}
                        incrementHandler={incrementHandler}
                        decrementHandler={decrementHandler}
                        />
                </TabPane>
                <TabPane tab="Steak" key="2">
                    <BeerList 
                        beers={steak}
                        incrementHandler={incrementHandler}
                        decrementHandler={decrementHandler}
                        />
                </TabPane>
                <TabPane tab="ALL" key="3">
                    <BeerList 
                        beers={beers}
                        incrementHandler={incrementHandler}
                        decrementHandler={decrementHandler}
                        />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default MainTable