import React from 'react'
import {useSelector} from 'react-redux'
import { Tabs } from 'antd'
import { BeerList } from '../BeerList';


export const TabList = ({clkHandler, sorting, sortBy, currentTab, page, perPage, nextPage, prevPage, setPath}) => {
    const { TabPane } = Tabs;
    const { beerReducer } = useSelector(state => state)
    
    const tabs = {[0]: 'PIZZA', [1]: 'STEAK', [2]: 'ALL'}

    return (
        <Tabs 
            defaultActiveKey="1" 
            onTabClick={key => clkHandler( key)}
        >   
            {Object.keys(beerReducer).map((item, index) => {
                // CHECKING IF ITEM IS ARRAY CAUSE REDUCER CONTAINS NOT ONLY ARRAYS
                if (Array.isArray(beerReducer[item])) {
                    return (
                        <TabPane tab={tabs[index]} key={index+1}>
                            <BeerList
                                path={setPath}
                                sorting={sorting}
                                sortParam={sortBy}
                                loading={beerReducer.isLoading}
                                beers={beerReducer[item]}
                                perPage={perPage[currentTab]}
                                currentPage={page[currentTab]}
                                incrementHandler={nextPage}
                                decrementHandler={prevPage}
                            />
                        </TabPane>
                    )
                }
            })}
        </Tabs>
    )
}
