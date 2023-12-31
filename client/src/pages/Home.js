import React from 'react'
import '../pagecss/home.css'
import LeftsideOfHome from '../components/LeftsideOfHome'
import MiddleofHome from '../components/MiddleofHome'
import RightofHome from '../components/RightofHome'
import Layout from '../components/Layout'

export default function Home() {
    return (
        <Layout title={'Home Page'}>
            <div className="homepage">
                <LeftsideOfHome />
                <MiddleofHome />
                <RightofHome />
            </div>
        </Layout>
    )
}
