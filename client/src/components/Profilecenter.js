import React from 'react'
import Profilecardleft from './Profilecardleft'
import SharePostComponent from "./SharePostComponent";


import '../pagecss/profilecenter.css'
import Timelinecomponent from './Timelinecomponent';


export default function Profilecenter() {
    return (
        <div className='profilecenterbox'>
            <Profilecardleft />
            <SharePostComponent />

            <Timelinecomponent />
        </div>
    )
}
