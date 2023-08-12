import React, { useState } from 'react'

import '../pagecss/rightofhome.css'
import Trendingcard from './Trendingcard';
import SharePostModal from './SharePostModal';
import FollowerCard from './FollowerCard';

export default function RightofHome() {
    const [opensharemodal, setopensharemodal] = useState(false)
    return (
        <div className='rightofhomebox'>
            <FollowerCard />
            <Trendingcard />
            <SharePostModal opensharemodal={opensharemodal} setopensharemodal={setopensharemodal} />

            <button className="sharebutton basicbutton" onClick={() => setopensharemodal(true)} >  Share </button>

        </div>
    )
}
