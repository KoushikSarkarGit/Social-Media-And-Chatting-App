import React, { useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import '../pagecss/rightofhome.css'
import Trendingcard from './Trendingcard';

import FollowerCard from './FollowerCard';

export default function RightofHome() {

    return (
        <div className='rightofhomebox'>

            {/* <div className="logocomponent"> */}

            <div className="logosearchbar">

                <input type="text" placeholder='Search People or Post' />
                <div className="searchicon">
                    <UilSearch />
                </div>

            </div>
            {/* </div> */}



            <FollowerCard />
            <Trendingcard />




        </div>
    )
}
