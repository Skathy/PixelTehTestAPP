import {React, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBeers, getPizzaBeer, getSteakBeer} from '../../store/beers/actions'
import { sorting } from './sorting'
import { CustomRadio } from '../CustomRadio'
import { CustomSelect } from '../CustomSelect';
import { TabList } from '../TabList'
import 'antd/dist/antd.css'
import './style.scss'


const MainTable = () => {
    const dispatch = useDispatch()
    const [currentTab, setCurrentTab] = useState('PIZZA')
    const [sortBy, setSortBy] = useState('ByNameAsc')
    // SETTING PAGE FOR EACH TAB
    const [page, setPage] = useState({'PIZZA': 1, 'STEAK': 1, 'ALL': 1})
    // SETTING PER PAGE RENDER FOR EACH TAB
    const [perPage, setPerPage] = useState({'PIZZA': 5, 'STEAK': 5, 'ALL': 5})

    const { isLoading } = useSelector(state => state.beerReducer)

    const tabs = { 1: 'PIZZA', 2: 'STEAK', 3: 'ALL'}
    const dispatches = {
        'PIZZA': () => {dispatch(getPizzaBeer(page[currentTab], perPage[currentTab]))},
        'STEAK': () => {dispatch(getSteakBeer(page[currentTab], perPage[currentTab]))},
        'ALL': () => {dispatch(getBeers(page[currentTab], perPage[currentTab]))}
    }

    const displayBeer = (tab) => {
        return dispatches[tab]()
    }

    const clkHandler = (key) => {
        setCurrentTab(tabs[key])
    }
        
    // DYNAMIC NEXT PAGE SETTING
    const nextPage = () => {
        Object.values(tabs).map(item => {
            if (item === currentTab) {
                setPage(prev => ({
                    ...prev,
                    [currentTab]: page[currentTab] + 1
                }))
            }
        })
    }

    //DYNAMIC PREV PAGE SETTING
    const prevPage = () => {
        Object.values(tabs).map(item => {
            if (item === currentTab) {
                setPage(prev => ({
                    ...prev,
                    [currentTab]: page[currentTab] - 1
                }))
            }
        })
    }
    
    // SET AMOUNT OF PER PAGE ITEMS
    const perPageSelector = e => {
        setPerPage(prev => ({
            ...prev,
            [currentTab]: e.target.value
        }))
    }

    // SET SORTING VALUE
    const sortingBy = value => {
        setSortBy(value)
    }

    const beerID = id => {
        return `/${id}`
    }


    useEffect(() => {
        displayBeer(currentTab)
    }, [page, perPage, currentTab])


    return (
        <div className='main-wrapper'>
            <div  className='per-page-nav'>
                <div>Per page: </div>
                <CustomRadio 
                    onChangeHandler={perPageSelector} 
                    value={perPage[currentTab]} 
                    disabled={isLoading}
                />
                <div>Sort by:</div>
                <CustomSelect
                    disabled={isLoading} 
                    sortingBy={sortingBy}
                />   
            </div>
            <TabList
                setPath={beerID}
                clkHandler={clkHandler}
                sorting={sorting}
                sortBy={sortBy}
                page={page}
                perPage={perPage}
                currentTab={currentTab}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        </div>
    )
}

export default MainTable