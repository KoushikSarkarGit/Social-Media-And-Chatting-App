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
        <Layout title={'View Profile'}>
            <div className='userprofilebox' >

                <LeftsideOfHome />
                <div className='userprofilecenter'>

                    <Profilecardleft uId={params.userId} />
                    <UserTimelineComponent userId={params.userId} />
                </div>

                <RightofHome />
            </div>
        </Layout>
    )
}
