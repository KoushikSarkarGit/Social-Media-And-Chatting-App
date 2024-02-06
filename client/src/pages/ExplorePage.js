import React from 'react'
import LeftsideOfHome from '../components/LeftsideOfHome';
import '../pagecss/explorepage.css'

import ExploreRight from '../components/ExploreRight'
import ExploreMiddle from '../components/ExploreMiddle';
import Layout from '../components/Layout';


export default function ExplorePage() {


    return (
        <Layout title={'Explore'}>
            <div className='explorepagebox'>

                <LeftsideOfHome />
                <div className="mainexplorepagecontent">

                    <ExploreMiddle />
                </div>

                <ExploreRight />

            </div>
        </Layout>
    )
}
