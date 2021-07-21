import React from 'react'
import { Button } from 'antd';
import './style.scss'

export const CustomButton = ({text, className, clickHandler}) => {
    return (
        <div className={className}>
            <Button onClick={(e) => clickHandler(e)}>{text}</Button>
        </div>
    )
}
