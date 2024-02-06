import React from 'react'
import LeftsideOfHome from '../components/LeftsideOfHome'
import '../pagecss/timelinepage.css'
import Timelinecomponent from '../components/Timelinecomponent'
import RightofHome from '../components/RightofHome'
import Layout from '../components/Layout'

export default function TimelinePage() {
    return (
        <Layout title={'Your Timeline'}>
            <div className='timelinepagebox'>

                <LeftsideOfHome />
                <Timelinecomponent />
                <RightofHome />


            </div>
        </Layout>
    )
}
