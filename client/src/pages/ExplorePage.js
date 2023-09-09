import React from 'react'
import LeftsideOfHome from '../components/LeftsideOfHome';
import '../pagecss/explorepage.css'
import ExploreRight from '../components/ExploreRight'
import Searchbar from '../components/Searchbar';

export default function ExplorePage() {
    return (
        <div className='explorepagebox'>

            <LeftsideOfHome />
            <div className="mainexplorepagecontent">
                <Searchbar />
            </div>

            <ExploreRight />

        </div>
    )
}
