import React from 'react'
import LeftsideOfHome from '../components/LeftsideOfHome'
import RightofHome from '../components/RightofHome'

import '../pagecss/viewpostpage.css'
import SinglePostcomponent from '../components/SinglePostcomponent'
import postPic1 from '../img/postpic1.jpg'


export default function ViewPostpage() {

    const allpostdata = {
        img: postPic1,
        name: 'Tzuyu',
        desc: "Happy New Year all friends! #2023",
        likes: 2300,
        liked: true
    }
    return (
        <div className='viewpostpagebox'>

            <LeftsideOfHome />
            <div className="mainpost">

                <SinglePostcomponent pdata={allpostdata} />
            </div>
            <RightofHome />
        </div>


    )
}
