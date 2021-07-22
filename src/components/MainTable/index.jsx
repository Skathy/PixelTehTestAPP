import {React, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBeers, getPizzaBeer, getSteakBeer} from '../../store/beers/actions'
import { sorting } from './sorting'
import { BeerList } from '../BeerList'
import { CustomRadio } from '../CustomRadio'
import { Tabs } from 'antd'
import 'antd/dist/antd.css'
import './style.scss'
import CustomSelector from '../CustomSelectоr/index';

const { TabPane } = Tabs;

const MainTable = () => {
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [currentTab, setCurrentTab] = useState('PIZZA')
    const [sortBy, setSortBy] = useState('ByNameAsc')

    const { pizza, steak, beers, isLoading } = useSelector(state => state.beerReducer)


    const displayBeer = (pg, perPG) => {
        switch(currentTab) {
            case 'PIZZA':
                dispatch(getPizzaBeer(pg, perPG))
                break
            case 'STEAK':
                dispatch(getSteakBeer(pg, perPG))
                break
            case 'ALL':
                dispatch(getBeers(pg, perPG))
                break
            default: 
                dispatch(getPizzaBeer(pg, perPG))
        }   
    }

    const incrementHandler = () => {
        setPage(prev => prev+1)
    }
    
    const clkHandler = (key) => {
        switch (+key) {
            case 1: 
                setCurrentTab('PIZZA')
                setPage(1)
                dispatch(getPizzaBeer(page, perPage))
                break;
            case 2: 
                setCurrentTab('STEAK')
                setPage(1)
                dispatch(getSteakBeer(page, perPage))
                break;
            case 3:
                setCurrentTab('ALL')
                setPage(1)
                dispatch(getBeers(page, perPage))
                break;
            default: 
                setCurrentTab('PIZZA')
                setPage(1)
                dispatch(getPizzaBeer(page, perPage))
        }   
    }

    const decrementHandler = () => {
        setPage(prev => prev - 1)
    }

    const perPageSelector = e => {
        setPerPage(e.target.value)
    }

    const sortingBy = value => {
        setSortBy(value)
    }


    useEffect(() => {
        displayBeer(page, perPage)
    }, [page, perPage])





    return (
        <div className='main-wrapper'>
            <div  className='per-page-nav'>
                <div>Per page: </div>
                <CustomRadio 
                    onChangeHandler={perPageSelector} 
                    value={perPage} 
                    disabled={isLoading}
                />
                <div>Sort by:</div>
                <CustomSelector
                    disabled={isLoading} 
                    sortingBy={sortingBy}
                />   
            </div>
            <Tabs 
                defaultActiveKey="1" 
                onTabClick={key => clkHandler( key)}
            >
                <TabPane tab="Pizza" key="1" disabled={isLoading}>
                    <BeerList 
                        sorting={sorting}
                        sortParam={sortBy}
                        loading={isLoading}
                        beers={pizza}
                        perPage={perPage}
                        currentPage={page}
                        incrementHandler={incrementHandler}
                        decrementHandler={decrementHandler}
                        />
                </TabPane>
                <TabPane tab="Steak" key="2" disabled={isLoading}>
                    <BeerList
                        sorting={sorting}
                        sortParam={sortBy}
                        loading={isLoading}
                        beers={steak}
                        perPage={perPage}
                        currentPage={page}
                        incrementHandler={incrementHandler}
                        decrementHandler={decrementHandler}
                        />
                </TabPane>
                <TabPane tab="ALL" key="3" disabled={isLoading}>
                    <BeerList
                        sorting={sorting}
                        sortParam={sortBy}
                        loading={isLoading} 
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