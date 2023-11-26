import React, { useContext, useState } from 'react'
import { UilEstate } from '@iconscout/react-unicons'
import { UilBell } from '@iconscout/react-unicons'
// import { UilSetting } from "@iconscout/react-unicons";
import { UilCommentDots } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons'
import { UilTablet } from '@iconscout/react-unicons'
import { UilSearch } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom';
import '../pagecss/menucomponent.css'
import SharePostModal from './SharePostModal';
import { UilSignin } from '@iconscout/react-unicons'
import { Appcontext } from '../ContextFolder/ContextCreator';
// import { UilRepeat } from '@iconscout/react-unicons'


export default function MenuComponent() {

    const [opensharemodal, setopensharemodal] = useState(false)
    const cur = useContext(Appcontext);
    const { userdata, jwtToken, logoutfunction } = cur;


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

            <div className="menuoptions">
                <UilBell className='menuicons' />
                <span className='optiontext'>Notifications</span>


            </div>
            <div className="menuoptions">
                <UilCommentDots className='menuicons' />
                <span className='optiontext'>Messages</span>
            </div>

            <Link to='/timeline' className="menuoptions">
                <UilTablet className='menuicons' />
                <span className='optiontext'>Your Timeline</span>
            </Link>

            <Link to='/profile' className="menuoptions">
                <UilUser className='menuicons' />
                <span className='optiontext'>Profile</span>
            </Link>
            {/* <div className="menuoptions">
                <UilSetting className='menuicons' />
                <span className='optiontext'>Settings</span>

            </div> */}

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
