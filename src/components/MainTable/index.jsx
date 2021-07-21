import {React, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBeers, getPizzaBeer, getSteakBeer} from '../../store/beers/actions'
import { BeerList } from '../BeerList'
import { CustomRadio } from '../CustomRadio'
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
    const [currentTab, setCurrentTab] = useState('PIZZA')
    const [loading, setLoading] = useState(true)

    const { pizza, steak, beers } = useSelector(state => state.beerReducer)

    const incrementHandler = () => {
        setLoading(true)
        switch(currentTab) {
            case 'PIZZA':
                if (pizza.length === perPage) {
                    setPizzaPage(prev => prev+1)
                } else if (beers.length !== perPage) {
                    setPizzaPage(prev => prev)
                    setLoading(false)
                }
                break
            case 'STEAK':
                if (steak.length === perPage) {
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
        setLoading(true)
        switch (+key) {
            case 1: 
                setTimeout(() => {  
                        setCurrentTab('PIZZA')
                        dispatch(getPizzaBeer(pizzaPage, perPage))
                        setLoading(false)
                    }, 1000)
                break;
            case 2: 
                setTimeout(() => {  
                    setCurrentTab('STEAK')
                    dispatch(getSteakBeer(steakPage, perPage))
                    setLoading(false)
                }, 1000)
                break;
            case 3:
                setTimeout(() => {  
                    setCurrentTab('ALL')
                    dispatch(getBeers(page, perPage))
                    setLoading(false)
                }, 1000)
                break;
        }   
    }

    const decrementHandler = () => {
        setLoading(true)
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

    const perPageSelector = e => {
        setLoading(true)
        setPerPage(e.target.value)
    }

    useEffect(() => {
        setTimeout(() => {
            dispatch(getPizzaBeer(pizzaPage, perPage))
            setLoading(false)
        }, 1000)
    }, [])

    useEffect(() => {
        setTimeout(() => {
            dispatch(getPizzaBeer(pizzaPage, perPage))
            dispatch(getSteakBeer(steakPage, perPage))
            setLoading(false) 
        }, 1000)
    }, [pizzaPage, steakPage, page, perPage])




    return (
        <div className='main-wrapper'>
            <div  className='per-page-nav'>
                <div>Per page: </div>
                <CustomRadio onChangeHandler={perPageSelector}/>    
            </div>
            <Tabs defaultActiveKey="1" onTabClick={key => clkHandler( key)}>
                <TabPane tab="Pizza" key="1">
                    <BeerList 
                        loading={loading}
                        beers={pizza}
                        perPage={perPage}
                        currentPage={pizzaPage}
                        incrementHandler={incrementHandler}
                        decrementHandler={decrementHandler}
                        />
                </TabPane>
                <TabPane tab="Steak" key="2">
                    <BeerList
                        loading={loading}
                        beers={steak}
                        perPage={perPage}
                        currentPage={steakPage}
                        incrementHandler={incrementHandler}
                        decrementHandler={decrementHandler}
                        />
                </TabPane>
                <TabPane tab="ALL" key="3">
                    <BeerList
                        loading={loading} 
                        beers={beers}
                        perPage={perPage}
                        currentPage={page}
                        incrementHandler={incrementHandler}
                        decrementHandler={decrementHandler}
                        />
                </TabPane>
            </Tabs>
            
        </div>
    )
}

export default MainTable