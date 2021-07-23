import React from 'react'
import {useSelector} from 'react-redux'
import { Tabs } from 'antd'
import { BeerList } from '../BeerList';


export const TabList = ({clkHandler, sorting, sortBy, currentTab, page, perPage, nextPage, prevPage}) => {
    const { TabPane } = Tabs;
    const { pizza, steak, beers, isLoading } = useSelector(state => state.beerReducer)

    return (
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
                        perPage={perPage[currentTab]}
                        currentPage={page[currentTab]}
                        incrementHandler={nextPage}
                        decrementHandler={prevPage}
                        />
                </TabPane>
                <TabPane tab="Steak" key="2" disabled={isLoading}>
                    <BeerList
                        sorting={sorting}
                        sortParam={sortBy}
                        loading={isLoading}
                        beers={steak}
                        perPage={perPage[currentTab]}
                        currentPage={page[currentTab]}
                        incrementHandler={nextPage}
                        decrementHandler={prevPage}
                        />
                </TabPane>
                <TabPane tab="ALL" key="3" disabled={isLoading}>
                    <BeerList
                        sorting={sorting}
                        sortParam={sortBy}
                        loading={isLoading} 
                        beers={beers}
                        perPage={perPage[currentTab]}
                        currentPage={page[currentTab]}
                        incrementHandler={nextPage}
                        decrementHandler={prevPage}
                        />
                </TabPane>
            </Tabs>
    )
}
