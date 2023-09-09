import React from 'react'
import LeftsideOfHome from '../components/LeftsideOfHome'
import '../pagecss/timelinepage.css'
import Timelinecomponent from '../components/Timelinecomponent'
import RightofHome from '../components/RightofHome'

export default function TimelinePage() {
    return (
        <div className='timelinepagebox'>

            <LeftsideOfHome />
            <Timelinecomponent />
            <RightofHome />


        </div>
    )
}
