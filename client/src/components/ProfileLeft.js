import React from 'react'
import LogoComponent from "./LogoComponent";
import '../pagecss/profileleft.css'
import MenuComponent from './MenuComponent';
import MiniProfileCompund from './MiniProfileCompund';


export default function ProfileLeft() {
    return (
        <div className='profileleftbox'>

            <LogoComponent />
            <MiniProfileCompund />

            <MenuComponent />
        </div>
    )
}
