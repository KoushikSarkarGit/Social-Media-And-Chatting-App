import React, { useContext, useEffect } from 'react'
import Profile from '../img/profileImg.jpg'
import '../pagecss/miniprofilecard.css'
import { UilEllipsisV } from '@iconscout/react-unicons'
import { Appcontext } from '../ContextFolder/ContextCreator'


export default function MiniProfileCompund() {

    const cur = useContext(Appcontext);
    const { username, userdata } = cur;




    return (
        <div className='miniprofilecardbox'>
            <div className="miniprofileimg">
                <img src={Profile} alt="" />
            </div>

            <div className="ProfileDetails">
                <span> <b> {userdata?.firstname + ' ' + userdata?.lastname}</b> </span>
                <span >@{username}</span>
            </div>
            <div className="moreicon">
                <UilEllipsisV />
            </div>


        </div>
    )
}
