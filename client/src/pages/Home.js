import React from 'react'
import '../pagecss/home.css'
import LeftsideOfHome from '../components/LeftsideOfHome'
import MiddleofHome from '../components/MiddleofHome'
import RightofHome from '../components/RightofHome'

export default function Home() {
    return (
        <div className="homepage">
            <LeftsideOfHome />
            <MiddleofHome />
            <RightofHome />
        </div>
    )
}
