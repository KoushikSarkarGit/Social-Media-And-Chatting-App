import React from 'react'
import { UilEstate } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilSetting } from "@iconscout/react-unicons";
import { UilCommentDots } from '@iconscout/react-unicons'
import '../pagecss/rightofhome.css'
import Trendingcard from './Trendingcard';

export default function RightofHome() {
    return (
        <div className='rightofhomebox'>

            <div className="iconnavbar">
                <UilEstate />
                <UilSetting />
                <UilBell />
                <UilCommentDots />
            </div>

            <Trendingcard />

            <button className="sharebutton basicbutton">  Share </button>

        </div>
    )
}
