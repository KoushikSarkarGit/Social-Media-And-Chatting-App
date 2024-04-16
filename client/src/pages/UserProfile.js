import React, { useContext } from 'react'

import '../pagecss/userprofilepage.css'

import Layout from '../components/Layout'
import LeftsideOfHome from '../components/LeftsideOfHome'
import RightofHome from '../components/RightofHome'
import Profilecardleft from '../components/Profilecardleft'
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development'
import UserTimelineComponent from '../components/UserTimelineComponent'
import { Appcontext } from '../ContextFolder/ContextCreator'

export default function UserProfile() {


    const params = useParams()

    const cur = useContext(Appcontext);
    const { curdevice } = cur;

    return (
        <Layout title={'User Profile'}>
            <div className='userprofilebox' >
                {(curdevice === 'pc' || curdevice === 'tablet') && <LeftsideOfHome />}

                <div className='userprofilecenter'>

                    <Profilecardleft uId={params.viewOtherUserProfileuserId} />
                    <UserTimelineComponent userId={params.viewOtherUserProfileuserId} />
                </div>

                {(curdevice === 'pc') && <RightofHome />}
            </div>
        </Layout>
    )
}
