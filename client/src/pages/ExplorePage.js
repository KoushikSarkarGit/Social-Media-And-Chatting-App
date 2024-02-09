import React from 'react'
import LeftsideOfHome from '../components/LeftsideOfHome';
import '../pagecss/explorepage.css'

import ExploreRight from '../components/ExploreRight'
import ExploreMiddle from '../components/ExploreMiddle';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development';


export default function ExplorePage() {

    const { keyword, page, type } = useParams();



    return (
        <Layout title={'Explore'}>
            <div className='explorepagebox'>

                <LeftsideOfHome />
                <div className="mainexplorepagecontent">

                    <ExploreMiddle keyword={keyword} page={page} type={type} />
                </div>

                <ExploreRight />

            </div>
        </Layout>
    )
}
