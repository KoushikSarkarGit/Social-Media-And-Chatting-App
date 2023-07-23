import React from 'react'
import ProfileLeft from '../components/ProfileLeft'
import Profilecenter from '../components/Profilecenter'
import '../pagecss/profilepage.css'
import ProfileRight from '../components/ProfileRight'


export default function Profilepage() {
    return (
        <div className='profilepagebox'>
            <ProfileLeft />

            <Profilecenter />

            <ProfileRight />

        </div>
    )
}
