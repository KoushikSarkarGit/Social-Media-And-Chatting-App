import React, { useContext } from 'react'

import '../pagecss/rightofhome.css'
import Trendingcard from './Trendingcard';

import FollowerCard from './FollowerCard';
import Searchbar from './Searchbar';
import Whotofollow from './Whotofollow';
import { Appcontext } from '../ContextFolder/ContextCreator';
import FollowingCard from './FollowingCard';

export default function RightofHome() {

    const cur = useContext(Appcontext);
    const { jwtToken } = cur;



    return (
        <div className='rightofhomebox'>

            <Searchbar />
            {jwtToken && <FollowingCard />}
            <Trendingcard />
            {jwtToken && <FollowerCard />}
            <Whotofollow />




        </div>
    )
}
