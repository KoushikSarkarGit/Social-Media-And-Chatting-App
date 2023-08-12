import React from 'react'
import Profile from '../img/profileImg.jpg'
import '../pagecss/miniprofilecard.css'
import { UilEllipsisV } from '@iconscout/react-unicons'


export default function MiniProfileCompund() {
    return (
        <div className='miniprofilecardbox'>
            <div className="miniprofileimg">
                <img src={Profile} alt="" />
            </div>

            <div className="ProfileDetails">
                <span> <b> Zendaya MJ </b> </span>
                <span >@Jeet</span>
            </div>

            <UilEllipsisV className='moreicon' />

        </div>
    )
}
