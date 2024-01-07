import React, { useContext, useEffect } from 'react'

import '../pagecss/miniprofilecard.css'
import { UilEllipsisV } from '@iconscout/react-unicons'
import { Appcontext } from '../ContextFolder/ContextCreator'
import defaultprofileimg2 from '../img/defaultprofimg2.jpg'

export default function MiniProfileCompund() {

    const cur = useContext(Appcontext);
    const { username, userprofileimg, userlastname, userfristname } = cur;




    return (
        <div className='miniprofilecardbox'>
            <div className="miniprofileimg">
                <img src={userprofileimg ? userprofileimg : defaultprofileimg2} alt="myprofilepic" />
            </div>

            <div className="ProfileDetails">
                <span> <b> {(userfristname && userlastname) ? (userfristname + ' ' + userlastname) : 'Please Sign In'}</b> </span>
                <span >@{username}</span>
            </div>
            <div className="moreicon">
                <UilEllipsisV />
            </div>


        </div>
    )
}
