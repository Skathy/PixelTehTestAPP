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
    // SETTING PAGE FOR EACH TAB
    const [page, setPage] = useState({'PIZZA': 1, 'STEAK': 1, 'ALL': 1})
    // SETTING PER PAGE RENDER FOR EACH TAB
    const [perPage, setPerPage] = useState({'PIZZA': 5, 'STEAK': 5, 'ALL': 5})
    const [currentTab, setCurrentTab] = useState('PIZZA')
    const [sortBy, setSortBy] = useState('ByNameAsc')

    const { isLoading } = useSelector(state => state.beerReducer)

    const tabs = [{tab: 'PIZZA'},{tab: 'STEAK'},{tab: 'ALL'}]


    const displayBeer = (pg, perPG) => {
        switch(currentTab) {
            // I`M USING SWITCH JUST CAUSE DIDN'T GET HOW TO USE DYNAMIC ACTION NAMES.
            case 'PIZZA':
                dispatch(getPizzaBeer(pg[currentTab], perPG[currentTab]))
                break
            case 'STEAK':
                dispatch(getSteakBeer(pg[currentTab], perPG[currentTab]))
                break
            case 'ALL':
                dispatch(getBeers(pg[currentTab], perPG[currentTab]))
                break
            default: 
                dispatch(getPizzaBeer(pg[currentTab], perPG[currentTab]))
        }
    }

    const clkHandler = (key) => {
        switch (+key) {
            // SAME IS HERE, DUNNO HOW TO GET AMOUNT OF TABS FOR LOOPING IT + DYNAMIC ACTION NAMES
            case 1: 
                setCurrentTab('PIZZA')
                dispatch( getPizzaBeer(page[currentTab], perPage[currentTab]))
                break;
            case 2: 
                setCurrentTab('STEAK')
                dispatch(getSteakBeer(page[currentTab], perPage[currentTab]))
                break;
            case 3:
                setCurrentTab('ALL')
                dispatch(getBeers(page[currentTab], perPage[currentTab]))
                break;
            default: 
                setCurrentTab('PIZZA')
                dispatch(getPizzaBeer(page[currentTab], perPage[currentTab]))
            }
        }
        
    // DYNAMIC NEXT PAGE SETTING
    const nextPage = () => {
        tabs.map(item => {
            if (item.tab === currentTab) {
                setPage(prev => ({
                    ...prev,
                    [currentTab]: page[currentTab] + 1
                }))
            }
        })
    }

    //DYNAMIC PREV PAGE SETTING
    const prevPage = () => {
        tabs.map(item => {
            if (item.tab === currentTab) {
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
        displayBeer(page, perPage)
    }, [page, perPage])


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