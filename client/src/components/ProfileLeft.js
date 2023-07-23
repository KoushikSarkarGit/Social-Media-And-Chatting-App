import React from 'react'
import LogoComponent from "./LogoComponent";
import ProfileDetails from './ProfileDetails';
import FollowerCard from "./FollowerCard";
import '../pagecss/profileleft.css'


export default function ProfileLeft() {
    return (
        <div className='profileleftbox'>

            <LogoComponent />
            <ProfileDetails />
            <FollowerCard />
        </div>
    )
}
