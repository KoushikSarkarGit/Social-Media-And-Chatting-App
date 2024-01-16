import React from 'react'
import LeftsideOfHome from '../components/LeftsideOfHome';
import '../pagecss/explorepage.css'

import ExploreRight from '../components/ExploreRight'
import ExploreMiddle from '../components/ExploreMiddle';
import { Toaster } from 'react-hot-toast';

export default function ExplorePage() {


    return (
        <div className='explorepagebox'>
            <Toaster />
            <LeftsideOfHome />
            <div className="mainexplorepagecontent">

                <ExploreMiddle />
            </div>

            <ExploreRight />

        </div>
    )
}
