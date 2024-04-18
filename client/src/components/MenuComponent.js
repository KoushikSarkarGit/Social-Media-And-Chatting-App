import React, { useContext, useState } from 'react'
import { UilEstate } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
import { UilCommentDots } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons'
import { UilTablet } from '@iconscout/react-unicons'
import { UilSearch } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom';
import '../pagecss/menucomponent.css'

import SharePostModal from './SharePostModal';
import { UilSignin } from '@iconscout/react-unicons'
import { Appcontext } from '../ContextFolder/ContextCreator';
import { UilEllipsisH } from '@iconscout/react-unicons'
import toast from 'react-hot-toast'

export default function MenuComponent() {

    const [opensharemodal, setopensharemodal] = useState(false)
    const cur = useContext(Appcontext);
    const { userdata, jwtToken, logoutfunction, curdevice } = cur;


    return (<>


        <div className='menucomponentbox'>

            <Link to='/' className="menuoptions">
                <UilEstate className='menuicons' />
                <span className='optiontext'>Home</span>
            </Link>

            <Link to='/explore' className="menuoptions">

                <UilSearch className='menuicons' />
                <span className='optiontext'>Explore</span>
            </Link>


            {(curdevice === 'pc') &&
                <div className="menuoptions"
                    onClick={() => {
                        toast('Will be added in future updates', {
                            icon: '🐣',
                        })
                    }}>
                    <UilBell className='menuicons' />
                    <span className='optiontext'>Notifications</span>
                </div>}


            {(curdevice === 'pc') &&
                <div className="menuoptions"
                    onClick={() => {
                        toast('Will be added in future updates', {
                            icon: '🐣',
                        })
                    }}>
                    <UilCommentDots className='menuicons' />
                    <span className='optiontext'>Messages</span>
                </div>
            }



            <Link to='/timeline' className="menuoptions">
                <UilTablet className='menuicons' />
                <span className='optiontext'>Your Timeline</span>
            </Link>
            {(userdata && jwtToken) ?
                <Link to='/profile' className="menuoptions"
                >
                    <UilUser className='menuicons' />
                    <span className='optiontext'>Profile</span>
                </Link>
                :

                <Link to='/login' className="menuoptions"
                >
                    <UilUser className='menuicons' />
                    <span className='optiontext'>Profile</span>
                </Link>
            }

            {(curdevice === 'mobile' || curdevice === 'tablet') && <div className="menuoptions">
                <UilEllipsisH className='menuicons' />
                <span className='optiontext'>More</span>
            </div>}


            <Link to='/login' className="menuoptions" onClick={() => {
                if (userdata && jwtToken) {
                    logoutfunction();
                }
            }} >
                <UilSignin className='menuicons' />
                <span className='optiontext'> {userdata ? 'LogOut' : 'Login'}</span>

            </Link>


        </div>

        <SharePostModal opensharemodal={opensharemodal} setopensharemodal={setopensharemodal} />


        <button className="sharebutton basicbutton" onClick={() => setopensharemodal(true)} >  Share </button>
    </>

    )
}
