import React, { useContext } from 'react'
import '../pagecss/home.css'
import LeftsideOfHome from '../components/LeftsideOfHome'
import MiddleofHome from '../components/MiddleofHome'
import RightofHome from '../components/RightofHome'
import Layout from '../components/Layout'
import { Appcontext } from '../ContextFolder/ContextCreator'

export default function Home() {


    const cur = useContext(Appcontext);
    const { curdevice } = cur;


    return (
        <Layout title={'Home Page'}>
            <div className="homepage">
                {(curdevice === 'pc' || curdevice === 'tablet') && <LeftsideOfHome />}

                <MiddleofHome />

                {(curdevice === 'pc') && <RightofHome />}

            </div>
        </Layout>
    )
}
