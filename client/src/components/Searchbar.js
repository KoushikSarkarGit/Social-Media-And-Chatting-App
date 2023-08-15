import React from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import '../pagecss/rightofhome.css'

export default function Searchbar() {
    return (

        <div className="logosearchbar">

            <input type="text" placeholder='Search People or Post' />
            <div className="searchicon">
                <UilSearch />
            </div>

        </div>

    )
}
