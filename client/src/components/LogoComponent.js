import React from 'react'
import logo from '../img/birdlogo.png'
import connectify from '../img/connectify.png'

import '../pagecss/logoComponentstyle.css'


export default function LogoComponent() {
    return (
        <div className='logocomponentmain' >
            <img src={logo} className='logocomponentimg' alt="logocomponentimg" />

            <img src={connectify} className='logotextimg' alt="logotextimg" />

        </div>
    )
}
