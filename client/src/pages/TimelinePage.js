import React, { useContext } from 'react'
import LeftsideOfHome from '../components/LeftsideOfHome'
import '../pagecss/timelinepage.css'
import Timelinecomponent from '../components/Timelinecomponent'
import RightofHome from '../components/RightofHome'
import Layout from '../components/Layout'
import { Appcontext } from '../ContextFolder/ContextCreator'

export default function TimelinePage() {

    const cur = useContext(Appcontext);
    const { curdevice } = cur;


    return (
        <Layout title={'Your Timeline'}>
            <div className='timelinepagebox'>
                {(curdevice === 'pc' || curdevice === 'tablet') && <LeftsideOfHome />}

                <Timelinecomponent />


                {(curdevice === 'pc') && <RightofHome />}



            </div>
        </Layout>
    )
}
