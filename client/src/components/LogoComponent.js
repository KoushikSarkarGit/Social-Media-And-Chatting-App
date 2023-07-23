import React from 'react'
import logo from '../img/logo.png'
import { UilSearch } from '@iconscout/react-unicons'
import '../pagecss/logoComponentstyle.css'


export default function LogoComponent() {
    return (
        <div className='logocomponentmain' >
            <img src={logo} alt="logocomponentimg" />
            <div className="logosearchbar">

                <input type="text" placeholder='#Explore' />
                <div className="searchicon">
                    <UilSearch />
                </div>


            </div>

        </div>
    )
}
