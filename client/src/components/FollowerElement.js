import React from 'react'
import '../pagecss/followercard.css'



export default function FollowerElement(props) {
    return (
        <div className="indivFollower" >
            <div>

                <img src={props.fdata.img} alt="userphoto" className='userphoto' />
                <div className="followerdetails">
                    <span> <b>{props.fdata.name}</b> </span>
                    <span>@{props.fdata.username}</span>
                </div>

            </div>

            <button className='basicbutton followerbtn px-2'  >Unfollow</button>
        </div>
    )
}
