import React from 'react'
import { Button } from 'antd';
import './style.scss'

export const CustomButton = ({text, className, onClick}) => {
    return (
        <div className={className}>
            <Button onClick={onClick}>{text}</Button>
        </div>
    )
}
