import React, { useContext } from 'react'
import ProfileLeft from '../components/ProfileLeft'
import Profilecenter from '../components/Profilecenter'
import '../pagecss/profilepage.css'
import ProfileRight from '../components/ProfileRight'
import Layout from '../components/Layout'
import { Appcontext } from '../ContextFolder/ContextCreator'



export default function Profilepage() {

    const cur = useContext(Appcontext);
    const { curdevice } = cur;

    return (
        <Layout title={'Profile Page'}>
            <div className='profilepagebox'>

                {(curdevice === 'pc' || curdevice === 'tablet') && <ProfileLeft />}

                <Profilecenter />

                {(curdevice === 'pc') && <ProfileRight />}



            </div>

        </Layout>
    )
}
