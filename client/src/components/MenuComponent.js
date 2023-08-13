import React, { useState } from 'react'
import { UilEstate } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilSetting } from "@iconscout/react-unicons";
import { UilCommentDots } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons'
import { UilTablet } from '@iconscout/react-unicons'
import { UilSearch } from '@iconscout/react-unicons'

import '../pagecss/menucomponent.css'
import SharePostModal from './SharePostModal';




export default function MenuComponent() {

    const [opensharemodal, setopensharemodal] = useState(false)


    return (<>


        <div className='menucomponentbox'>

            <div className="menuoptions">
                <UilEstate className='menuicons' />
                <span className='optiontext'>Home</span>
            </div>

            <div className="menuoptions">

                <UilSearch className='menuicons' />
                <span className='optiontext'>Explore</span>
            </div>

            <div className="menuoptions">
                <UilBell className='menuicons' />
                <span className='optiontext'>Notifications</span>


            </div>
            <div className="menuoptions">
                <UilCommentDots className='menuicons' />
                <span className='optiontext'>Messages</span>
            </div>

            <div className="menuoptions">
                <UilTablet className='menuicons' />
                <span className='optiontext'>Your Timeline</span>
            </div>

            <div className="menuoptions">
                <UilUser className='menuicons' />
                <span className='optiontext'>Profile</span>
            </div>
            <div className="menuoptions">

                <UilSetting className='menuicons' />
                <span className='optiontext'>Settings</span>

            </div>


        </div>

        <SharePostModal opensharemodal={opensharemodal} setopensharemodal={setopensharemodal} />


        <button className="sharebutton basicbutton" onClick={() => setopensharemodal(true)} >  Share </button>
    </>

    )
}
