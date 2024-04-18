import React, { useContext } from 'react'
import LeftsideOfHome from '../components/LeftsideOfHome';
import '../pagecss/explorepage.css'

import ExploreRight from '../components/ExploreRight'
import ExploreMiddle from '../components/ExploreMiddle';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development';
import { Appcontext } from '../ContextFolder/ContextCreator';


export default function ExplorePage() {

    const { keyword, page, type } = useParams();
    const cur = useContext(Appcontext);
    const { curdevice } = cur;


    return (
        <Layout title={'Explore'}>
            <div className='explorepagebox'>
                {(curdevice === 'pc' || curdevice === 'tablet') && <LeftsideOfHome />}

                <div className="mainexplorepagecontent">

                    <ExploreMiddle keyword={keyword} page={page} type={type} />
                </div>

                {(curdevice === 'pc') && <ExploreRight />}
            </div>
        </Layout>
    )
}
