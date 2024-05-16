import React from 'react'
import Share from '../images/share'
import Notif from '../images/Notif'
import { useState } from 'react'

const Navbar = (props) => {
    const [search, setSearch] = useState()
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        console.log(search)
    }
    return (<nav>
        <div className='icon'>
            myStockFolio
        </div>
        <div className='upNav'>
            <input placeholder='Search Now...' type="text" className='search' value={search} onChange={handleSearchChange} />
            <div className="navRight">
                <div className='buttons'>
                    <Share />
                    <Notif />
                </div>
                <div className='details'>
                    <img src="{props.details.image}" />
                    <div className='textDetails'>
                        <div className='userName'>{props.details.name}</div>
                        <div className='userEmail'>{props.details.email}</div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    )
}

export default Navbar
