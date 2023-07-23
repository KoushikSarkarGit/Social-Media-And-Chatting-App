import React from 'react'
import Profilecardleft from './Profilecardleft'
import SharePostComponent from "./SharePostComponent";
import AllPostsComponent from "./AllPostsComponent";

import '../pagecss/profilecenter.css'


export default function Profilecenter() {
    return (
        <div className='profilecenterbox'>
            <Profilecardleft />
            <SharePostComponent />
            <AllPostsComponent />
        </div>
    )
}
