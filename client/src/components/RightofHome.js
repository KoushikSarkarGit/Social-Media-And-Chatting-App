import React, { useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import '../pagecss/rightofhome.css'
import Trendingcard from './Trendingcard';

import FollowerCard from './FollowerCard';
import Searchbar from './Searchbar';
import Whotofollow from './Whotofollow';

export default function RightofHome() {

    return (
        <div className='rightofhomebox'>

            <Searchbar />
            <FollowerCard />
            <Trendingcard />
            <Whotofollow />




        </div>
    )
}
