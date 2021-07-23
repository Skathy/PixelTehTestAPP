import React from 'react'
import { Select } from 'antd'

const { Option } = Select;

export const  CustomSelect = ({sortingBy, disabled}) => {
    return (
        <div>
            <Select defaultValue="ByNameAsc" onChange={value => sortingBy(value)} disabled={disabled}>
                <Option value='ByNameAsc'>By name asc</Option>
                <Option value='ByNameDesc'>By name desc</Option>
                <Option value='ByAbvAsc'>By ABV asc</Option>
                <Option value='ByAbvDesc'>By ABV desc</Option>
            </Select>
        </div>
    )
}
