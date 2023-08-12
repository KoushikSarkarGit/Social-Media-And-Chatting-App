import React from 'react'
import { UilEstate } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilSetting } from "@iconscout/react-unicons";
import { UilCommentDots } from '@iconscout/react-unicons'

import '../pagecss/menucomponent.css'

export default function MenuComponent() {
    return (
        <div className='menucomponentbox'>

            <div className="menuoptions">
                <UilEstate />
                <span className='optiontext'>Home</span>
            </div>
            <div className="menuoptions">

                <UilSetting />
                <span className='optiontext'>Settings</span>

            </div>
            <div className="menuoptions">
                <UilBell />
                <span className='optiontext'>Notifications</span>


            </div>
            <div className="menuoptions">
                <UilCommentDots />
                <span className='optiontext'>Comments</span>
            </div>



        </div>
    )
}
