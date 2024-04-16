import React from 'react'
import LogoComponent from './LogoComponent'

import '../pagecss/leftsideOfHome.css'

import MiniProfileCompund from './MiniProfileCompund'
import MenuComponent from './MenuComponent'

export default function LeftsideOfHome() {
    return (
        <div className='leftsideprofilebox'>
            <LogoComponent />
            <div className='minibox'>
                <MiniProfileCompund />
            </div>


            <MenuComponent />



        </div>
    )
}
