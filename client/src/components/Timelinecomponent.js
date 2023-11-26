import React from 'react'
import AllPostsComponent from './AllPostsComponent'

import '../pagecss/timelinepage.css'
import '../pagecss/followercard.css'
import { Link } from 'react-router-dom/dist/umd/react-router-dom.development'


export default function Timelinecomponent() {
    return (
        <div className='timelinecompbox'>
            <div className=' tabbox' >


                <ul className="nav nav-underline tabitems sticky-top ">
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


                <hr className='morefhr' />


                <div className="displayelement">
                    <AllPostsComponent />
                </div>

            </div>






        </div>
    )
}
