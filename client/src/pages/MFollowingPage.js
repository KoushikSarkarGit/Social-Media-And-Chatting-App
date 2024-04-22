import React, { useContext } from 'react'
import FollowingCard from '../components/FollowingCard'
import LeftsideOfHome from '../components/LeftsideOfHome'
import { Appcontext } from '../ContextFolder/ContextCreator';
import Layout from '../components/Layout';

import '../pagecss/mfollowingpage.css'

export default function MFollowingPage() {

    const cur = useContext(Appcontext);
    const { curdevice } = cur;



    return (
        <Layout title={"Following"}>
            <div className='mfollowingbox'>

                {curdevice !== "mobile" && <LeftsideOfHome />}

                <FollowingCard />
            </div>

        </Layout>

    )
}
