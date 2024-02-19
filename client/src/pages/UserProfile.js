import React from 'react'

import '../pagecss/userprofilepage.css'

import Layout from '../components/Layout'
import LeftsideOfHome from '../components/LeftsideOfHome'
import RightofHome from '../components/RightofHome'
import Profilecardleft from '../components/Profilecardleft'
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development'
import UserTimelineComponent from '../components/UserTimelineComponent'

export default function UserProfile() {


    const params = useParams()



    return (
        <Layout title={'User Profile'}>
            <div className='userprofilebox' >

                <LeftsideOfHome />
                <div className='userprofilecenter'>

                    <Profilecardleft uId={params.viewOtherUserProfileuserId} />
                    <UserTimelineComponent userId={params.viewOtherUserProfileuserId} />
                </div>

                <RightofHome />
            </div>
        </Layout>
    )
}
