import React, { useContext } from 'react'
import Profilecardleft from './Profilecardleft'
import SharePostComponent from "./SharePostComponent";


import '../pagecss/profilecenter.css'
import Timelinecomponent from './Timelinecomponent';
import { Appcontext } from '../ContextFolder/ContextCreator';


export default function Profilecenter() {

    const cur = useContext(Appcontext);
    const { jwtToken, userId } = cur;



    return (
        <div className='profilecenterbox'>
            <Profilecardleft uId={userId} />
            <SharePostComponent />

            <Timelinecomponent />
        </div>
    )
}
