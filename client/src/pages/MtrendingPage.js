import React, { useContext } from 'react'
import LeftsideOfHome from '../components/LeftsideOfHome'
import Trendingcard from '../components/Trendingcard'
import { Appcontext } from '../ContextFolder/ContextCreator';
import Layout from '../components/Layout';

import '../pagecss/mtrending.css'


export default function MtrendingPage() {
    const cur = useContext(Appcontext);
    const { curdevice } = cur;

    return (
        <Layout title={"Trending"}>

            <div className='mtrendingbox'>
                {curdevice !== "mobile" && <LeftsideOfHome />}

                <div className='mtrend2'>
                    <Trendingcard />
                </div>

            </div>
        </Layout>

    )
}
