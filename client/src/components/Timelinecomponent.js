import React from 'react'


import '../pagecss/timelinepage.css'
import '../pagecss/followercard.css'
import { Link } from 'react-router-dom/dist/umd/react-router-dom.development'
import AllPostForProfile from './AllPostForProfile'


export default function Timelinecomponent() {
    return (
        <div className='timelinecompbox '>
            <div className=' tabbox' >


                <ul className="nav nav-underline tabitems customStickyTop ">
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="#">Your Posts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Liked</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Reposts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Comments</Link>
                    </li>

                </ul>


                {/* <hr className='morefhr mb-2 ' /> */}


                <div className="displayelement py-2">

                    <AllPostForProfile />
                </div>

            </div>






        </div>
    )
}
