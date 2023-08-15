import React from 'react'

import '../pagecss/profileright.css'
import FollowerCard from './FollowerCard';
import ProfileDetails from './ProfileDetails';
import Searchbar from './Searchbar';

export default function ProfileRight() {
    return (
        <div className='profilerightbox'>
            <Searchbar />
            <ProfileDetails />
            <FollowerCard />

        </div>
    )
}
