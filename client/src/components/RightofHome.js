import React, { useState } from 'react'
import { UilEstate } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilSetting } from "@iconscout/react-unicons";
import { UilCommentDots } from '@iconscout/react-unicons'
import '../pagecss/rightofhome.css'
import Trendingcard from './Trendingcard';
import SharePostModal from './SharePostModal';

export default function RightofHome() {
    const [opensharemodal, setopensharemodal] = useState(false)
    return (
        <div className='rightofhomebox'>

            <div className="iconnavbar">
                <UilEstate />
                <UilSetting />
                <UilBell />
                <UilCommentDots />
            </div>

            <Trendingcard />
            <SharePostModal opensharemodal={opensharemodal} setopensharemodal={setopensharemodal} />

            <button className="sharebutton basicbutton" onClick={() => setopensharemodal(true)} >  Share </button>

        </div>
    )
}
