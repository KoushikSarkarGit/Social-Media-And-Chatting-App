import React from 'react'
import LogoComponent from './LogoComponent'
// import Profilecardleft from './Profilecardleft'
import '../pagecss/leftsideOfHome.css'
// import FollowerCard from './FollowerCard'
import MiniProfileCompund from './MiniProfileCompund'
import MenuComponent from './MenuComponent'

export default function LeftsideOfHome() {
    return (
        <div className='leftsideprofilebox'>
            <LogoComponent />
            <MiniProfileCompund />

            <MenuComponent />
            {/* <Profilecardleft /> */}
            {/* <FollowerCard /> */}
        </div>
    )
}
