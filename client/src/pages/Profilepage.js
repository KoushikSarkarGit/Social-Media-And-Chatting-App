import React from 'react'
import ProfileLeft from '../components/ProfileLeft'
import Profilecenter from '../components/Profilecenter'
import '../pagecss/profilepage.css'
import ProfileRight from '../components/ProfileRight'
import Layout from '../components/Layout'



export default function Profilepage() {
    return (
        <Layout title={'Profile Page'}>
            <div className='profilepagebox'>

                <ProfileLeft />

                <Profilecenter />

                <ProfileRight />

            </div>

        </Layout>
    )
}
