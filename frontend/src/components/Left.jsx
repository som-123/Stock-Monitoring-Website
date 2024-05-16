import React from 'react'
import { NavLink } from 'react-router-dom'


const left = () => {
    return (
        <div className='left'>
            <div className='leftUp'>
                <NavLink className={(e) => { return e.isActive ? "beige" : "" }} to="/"><li>Dashboard</li></NavLink>
                <NavLink className={(e) => { return e.isActive ? "beige" : "" }} to="/portfolio"><li>Portfolio</li></NavLink>
                <NavLink className={(e) => { return e.isActive ? "beige" : "" }} to="/mystocks"><li>My Stocks</li></NavLink>
            </div>
            <div className='btwLine'></div>
            <div className='leftDown'>
                <NavLink className={(e) => { return e.isActive ? "beige" : "" }} to="/settings"><li>Settings</li></NavLink>
                <NavLink className={(e) => { return e.isActive ? "beige" : "" }} to="/help"><li>Help</li></NavLink>
            </div>
        </div>
    )
}

export default left
