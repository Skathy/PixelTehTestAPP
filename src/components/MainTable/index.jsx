import {React, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBeers, getPizzaBeer, getSteakBeer} from '../../store/beers/actions'
import { BeerList } from '../BeerList'
import { CustomRadio } from '../CustomRadio'
import { Tabs } from 'antd'
import 'antd/dist/antd.css'
import './style.scss'
import CustomSelector from './../CustomeSelecter/index';

const { TabPane } = Tabs;

const MainTable = () => {
    const dispatch = useDispatch()

    const [page, setPage] = useState(1)
    const [pizzaPage, setPizzaPage] = useState(1)
    const [steakPage, setSteakPage] = useState(1)
    const [perPage, setPerPage] = useState(5)
    const [currentTab, setCurrentTab] = useState('PIZZA')
    const [sortBy, setSortBy] = useState('ByNameAsc')

    const { pizza, steak, beers, isLoading } = useSelector(state => state.beerReducer)

    const incrementHandler = () => {
        switch(currentTab) {
            case 'PIZZA':
                if (pizza.length === perPage) {
                    setPizzaPage(prev => prev+1)
                } else if (beers.length !== perPage) {
                    setPizzaPage(prev => prev)
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
        switch (+key) {
            case 1: 
                setCurrentTab('PIZZA')
                dispatch(getPizzaBeer(pizzaPage, perPage))
                break;
            case 2: 
                setCurrentTab('STEAK')
                dispatch(getSteakBeer(steakPage, perPage))
                break;
            case 3:
                setCurrentTab('ALL')
                dispatch(getBeers(page, perPage))
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

    const perPageSelector = e => {
        setPerPage(e.target.value)
    }

    const sortByNameAsc = (a, b) => {
        if (a.name > b.name) {
            return 1
        } else {
            return -1
        }
    }
    const sortByNameDesc = (a, b) => {
        if (a.name > b.name) {
            return -1
        } else {
            return 1
        }
    }
    const sortByAbvAsc = (a, b) => {
        if (a.abv > b.abv) {
            return 1
        } else {
            return -1
        }
    }
    const sortByAbvDesc = (a, b) => {
        if (a.abv > b.abv) {
            return -1
        } else {
            return 1
        }
    }

    const sortingBy = value => {
        setSortBy(value)
    }

    const sorting = sortBy => {
        switch(sortBy) {
            case 'ByNameAsc':
                return sortByNameAsc
            case 'ByNameDesc':
                return sortByNameDesc
            case 'ByAbvAsc':
                return sortByAbvAsc
            case 'ByAbvDesc':
                return sortByAbvDesc
            default: return sortByNameAsc
        }
    }

    useEffect(() => {
        dispatch(getPizzaBeer(pizzaPage, perPage))
        setTimeout(() => {
        }, 1000)
    }, [pizzaPage, perPage])

    useEffect(() => {
        dispatch(getBeers(page, perPage))
        setTimeout(() => {
        }, 1000)
    }, [page, perPage])

    useEffect(() => {
        dispatch(getSteakBeer(steakPage, perPage))
        setTimeout(() => {
        }, 1000)
    }, [steakPage ,perPage])
 




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
                        sort={sorting}
                        sortParam={sortBy}
                        loading={isLoading}
                        beers={pizza}
                        perPage={perPage}
                        currentPage={pizzaPage}
                        incrementHandler={incrementHandler}
                        decrementHandler={decrementHandler}
                        />
                </TabPane>
                <TabPane tab="Steak" key="2" disabled={isLoading}>
                    <BeerList
                        sort={sorting}
                        sortParam={sortBy}
                        loading={isLoading}
                        beers={steak}
                        perPage={perPage}
                        currentPage={steakPage}
                        incrementHandler={incrementHandler}
                        decrementHandler={decrementHandler}
                        />
                </TabPane>
                <TabPane tab="ALL" key="3" disabled={isLoading}>
                    <BeerList
                        sort={sorting}
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