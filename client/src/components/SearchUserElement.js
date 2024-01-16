import React from 'react'

import '../pagecss/explorepage.css'
import '../pagecss/followercard.css'

import postPic1 from '../img/postpic1.jpg'

export default function SearchUserElement({ udata }) {
    return (
        <div className='srUser'>
            <div className="srUserImg">
                <img src={postPic1} alt="myprofilepic" />
            </div>

            <div className="srUserDetails">
                <span> <b> {udata.firstname
                } {udata.lastname}</b> </span>
                <span >@{udata.username}</span>
            </div>

            <div className="verticalHr mx-1">    </div>
            <div className="minidetails">
                post
            </div>
            <div className="verticalHr mx-1">    </div>

            <div className="minidetails">
                followers
            </div>
            <div className="verticalHr mx-2">    </div>
            <div className="minidetails">
                followers
            </div>
            <div className="verticalHr mx-2">    </div>

            <button className='basicbutton followerbtn px-2 m-4 ms-2'  >Unfollow</button>
        </div>
    )
}
