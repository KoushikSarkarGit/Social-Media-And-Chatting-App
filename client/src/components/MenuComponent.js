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
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'

export default function MenuComponent() {

    const [opensharemodal, setopensharemodal] = useState(false)
    const cur = useContext(Appcontext);

    const navigate = useNavigate()
    const { userdata, jwtToken, logoutfunction, curdevice } = cur;



    const profiledetailslogout = () => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'This will log you Out',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: "#d33",
                confirmButtonText: 'Yes, LogOut'
            }).then((result) => {

                if (result.isConfirmed) {
                    logoutfunction()
                    setTimeout(() => {
                        navigate('/login')
                    }, 200);
                }

            })

        } catch (error) {
            console.log(error)
        }
    }




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

            {(curdevice === 'mobile' || curdevice === 'tablet') && <div className="menuoptions dropup" >
                <UilEllipsisH className="menuicons " />

                <span className="optiontext dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"  >More</span>

                {/* dropdown option  */}

                <ul className="dropdown-menu " style={{ position: 'absolute', minWidth: 'auto' }}>

                    <li>
                        <Link to='/m/editprofile' className="dropdown-item px-3 " style={{ color: 'rgb(255 92 7)' }} >
                            Edit Profile
                        </Link>
                    </li>
                    <li>
                        <Link to='/m/trending' className="dropdown-item px-3 " style={{ color: 'rgb(255 92 7)' }} >
                            Trending
                        </Link>
                    </li>
                    <li>
                        <Link to='/m/following' className="dropdown-item px-3 " style={{ color: 'rgb(255 92 7)' }} >
                            You are Following
                        </Link>
                    </li>
                    <li>
                        <Link to='/m/followers' className="dropdown-item px-3 " style={{ color: 'rgb(255 92 7)' }} >
                            Your Followers
                        </Link>
                    </li>
                    <li>
                        <Link to='/m/findnewpeople' className="dropdown-item px-3 " style={{ color: 'rgb(255 92 7)' }} >
                            Find New People
                        </Link>
                    </li>

                </ul>











            </div>}


            <Link to='' className="menuoptions" onClick={() => {
                if (userdata && jwtToken) {
                    profiledetailslogout();
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
