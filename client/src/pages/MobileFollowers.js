import React, { useContext } from 'react'
import { Appcontext } from '../ContextFolder/ContextCreator';
import LeftsideOfHome from '../components/LeftsideOfHome';
// import Timelinecomponent from '../components/Timelinecomponent';
import '../pagecss/mfollowers.css'
import Layout from '../components/Layout';
import FollowerCard from '../components/FollowerCard';


export default function MobileFollowers() {
    const cur = useContext(Appcontext);
    const { curdevice } = cur;

    return (
        <Layout title={"Your Timeline"}>

            <div className='mfollowers'>
                {curdevice !== "mobile" && <LeftsideOfHome />}
                <FollowerCard />

            </div>
        </Layout>

    )
}
