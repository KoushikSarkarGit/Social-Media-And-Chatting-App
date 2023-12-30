import React, { useState } from 'react'


import '../pagecss/timelinepage.css'
import '../pagecss/followercard.css'
import { Link } from 'react-router-dom/dist/umd/react-router-dom.development'
import AllPostForProfile from './AllPostForProfile'


export default function Timelinecomponent() {


    const [selectedoption, setSelectedoption] = useState('YourPosts')

    return (
        <div className='timelinecompbox '>
            <div className=' tabbox' >


                <ul className="nav nav-underline tabitems customStickyTop ">
                    <li className="nav-item" >
                        <Link className={`nav-link ${selectedoption === 'YourPosts' ? 'active' : ''}`} onClick={() => setSelectedoption('YourPosts')} aria-current="page" to="#">Your Posts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${selectedoption === 'Liked' ? 'active' : ''}`} onClick={() => setSelectedoption('Liked')} to="#">Liked</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${selectedoption === 'Reposts' ? 'active' : ''}`} onClick={() => setSelectedoption('Reposts')} to="#">Reposts</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${selectedoption === 'Comments' ? 'active' : ''}`} onClick={() => setSelectedoption('Comments')} to="#">Comments</Link>
                    </li>

                </ul>








                {/* <hr className='morefhr mb-2 ' /> */}


                <div className="displayelement py-2">

                    <AllPostForProfile selectedtab={selectedoption} />
                </div>

            </div>






        </div>
    )
}
