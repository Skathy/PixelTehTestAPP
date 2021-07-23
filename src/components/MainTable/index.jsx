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

    const [page, setPage] = useState({'PIZZA': 1, 'STEAK': 1, 'ALL': 1})
    const [perPage, setPerPage] = useState(5)
    const [currentTab, setCurrentTab] = useState('PIZZA')
    const [sortBy, setSortBy] = useState('ByNameAsc')

    const { pizza, steak, beers, isLoading } = useSelector(state => state.beerReducer)

    const tabs = [{tab: 'PIZZA'},{tab: 'STEAK'},{tab: 'ALL'}]


    const displayBeer = (pg, perPG) => {
        switch(currentTab) {
            case 'PIZZA':
                dispatch(getPizzaBeer(pg[currentTab], perPG))
                break
            case 'STEAK':
                dispatch(getSteakBeer(pg[currentTab], perPG))
                break
            case 'ALL':
                dispatch(getBeers(pg[currentTab], perPG))
                break
            default: 
                dispatch(getPizzaBeer(pg[currentTab], perPG))
        }
    }

    const incrementHandler = () => {
        tabs.map(item => {
            if (item.tab === currentTab) {
                setPage(prev => ({
                    ...prev,
                    [currentTab]: page[currentTab] + 1
                }))
            }
        })
    }
 
    
    const clkHandler = (key) => {
        switch (+key) {
            case 1: 
                setCurrentTab('PIZZA')
                dispatch( getPizzaBeer(page['PIZZA'], perPage))
                break;
            case 2: 
                setCurrentTab('STEAK')
                dispatch(getSteakBeer(page['STEAK'], perPage))
                break;
            case 3:
                setCurrentTab('ALL')
                dispatch(getBeers(page['ALL'], perPage))
                break;
            default: 
                setCurrentTab('PIZZA')
                dispatch(getPizzaBeer(page['PIZZA'], perPage))
        }
    }

    const decrementHandler = () => {
        tabs.map(item => {
            if (item.tab === currentTab) {
                setPage(prev => ({
                    ...prev,
                    [currentTab]: page[currentTab] - 1
                }))
            }
        })
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
                        currentPage={page['PIZZA']}
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
                        currentPage={page['STEAK']}
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
                        currentPage={page['ALL']}
                        incrementHandler={incrementHandler}
                        decrementHandler={decrementHandler}
                        />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default MainTable