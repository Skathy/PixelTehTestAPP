import React from 'react'
import { Radio } from 'antd';

export const CustomRadio = ({onChangeHandler, value}) => {
    const options = [
        {label: '5',  value: 5},
        {label: '10',  value: 10},
        {label: '15',  value: 15}
    ]
    return (
        <div>
             <Radio.Group
                options={options}
                onChange={(e) => onChangeHandler(e)}
                optionType="button"
                value={value}
            />
        </div>
    )
}
