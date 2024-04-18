import React, { useContext } from 'react'
import Layout from '../components/Layout'
import LeftsideOfHome from '../components/LeftsideOfHome';
import Whotofollow from '../components/Whotofollow';
import { Appcontext } from '../ContextFolder/ContextCreator';
import '../pagecss/mobilefindnew.css'


export default function MobileFindNewPeople() {
    const cur = useContext(Appcontext);
    const { curdevice } = cur;

    return (
        <Layout title={"New People"}>
            <div className='findnewbox'>
                {curdevice !== "mobile" && <LeftsideOfHome />}

                <Whotofollow />

            </div>

        </Layout>

    )
}
