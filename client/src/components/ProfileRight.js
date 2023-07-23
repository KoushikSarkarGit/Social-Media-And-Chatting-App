import React from 'react'
import Trendingcard from './Trendingcard'
import { UilEstate } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilSetting } from "@iconscout/react-unicons";
import { UilCommentDots } from '@iconscout/react-unicons'
import '../pagecss/profileright.css'

export default function ProfileRight() {
    return (
        <div className='profilerightbox'>
            <div className="iconnavbar">
                <UilEstate />
                <UilSetting />
                <UilBell />
                <UilCommentDots />
            </div>
            <Trendingcard />
        </div>
    )
}
