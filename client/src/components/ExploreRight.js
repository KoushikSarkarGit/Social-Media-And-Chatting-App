import React from 'react'
import '../pagecss/rightofhome.css'
import Trendingcard from './Trendingcard';

import FollowerCard from './FollowerCard';
import Whotofollow from './Whotofollow';



export default function ExploreRight() {
    return (
        <div className='rightofhomebox'>
            <FollowerCard />
            <Trendingcard />
            <Whotofollow />
        </div>
    )
}
