import React from 'react'
import LogoComponent from './LogoComponent'
import Profilecardleft from './Profilecardleft'
import '../pagecss/leftsideOfHome.css'
import FollowerCard from './FollowerCard'

export default function LeftsideOfHome() {
    return (
        <div className='leftsideprofilebox'>
            <LogoComponent />
            <Profilecardleft />
            <FollowerCard />
        </div>
    )
}
