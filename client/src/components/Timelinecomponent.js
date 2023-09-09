import React from 'react'
import AllPostsComponent from './AllPostsComponent'

import '../pagecss/timelinepage.css'
import '../pagecss/followercard.css'


export default function Timelinecomponent() {
    return (
        <div className='timelinecompbox'>
            <div className=' tabbox' >


                <ul className="nav nav-underline tabitems">
                    <li className="nav-item">
                        <a className="nav-link " aria-current="page" href="#">Your Posts</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Liked</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Reposts</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Comments</a>
                    </li>

                </ul>


                <hr className='morefhr' />


                <div className="displayelement">
                    <AllPostsComponent />
                </div>

            </div>






        </div>
    )
}
