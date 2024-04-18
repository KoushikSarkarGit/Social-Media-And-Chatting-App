import React, { useContext } from 'react'
import '../pagecss/mobileeditprofile.css'
import Layout from '../components/Layout'
import ProfileDetails from '../components/ProfileDetails'
import MiniProfileCompund from '../components/MiniProfileCompund'
import LeftsideOfHome from '../components/LeftsideOfHome'
import { Appcontext } from '../ContextFolder/ContextCreator'

export default function MobileEditProfile() {
    const cur = useContext(Appcontext);
    const { curdevice } = cur;

    return (
        <Layout title={'Edit Profile'} >
            <div className='meditprofilebox'>
                {curdevice !== 'mobile' && <LeftsideOfHome />}
                <div className='medit2'>
                    {curdevice === 'mobile' && <MiniProfileCompund />}


                    <ProfileDetails />

                </div>




            </div>

        </Layout>

    )
}
