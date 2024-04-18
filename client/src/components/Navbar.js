import React, { useContext } from 'react'
import '../pagecss/navbar.css'

import { UilEstate } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons'
import { UilSearch } from '@iconscout/react-unicons'
import { UilEllipsisH } from '@iconscout/react-unicons'
import logo from '../img/birdlogo.png'
import connectify from '../img/connectify.png'
import { UilBell } from '@iconscout/react-unicons'
import { UilCommentDots } from '@iconscout/react-unicons'
import { UilTablet } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom';
import SharePostModal from './SharePostModal';
import { UilSignin } from '@iconscout/react-unicons'
import { Appcontext } from '../ContextFolder/ContextCreator';
import toast from 'react-hot-toast'





export default function Navbar() {

    const cur = useContext(Appcontext);
    const { userdata, jwtToken, logoutfunction, curdevice } = cur;



    return (

        <nav className="navbar navcolor sticky-bottom" style={{ marginTop: '-50px' }} >
            <div className="container-fluid">


                <div className='customnav'>

                    <Link to='/' className=" nav-link">
                        <UilEstate className='menuicons2' />
                    </Link>


                    <Link to='/explore' className=" nav-link">
                        <UilSearch className='menuicons2' />
                    </Link>

                    {(userdata && jwtToken) ?
                        <Link to='/profile' className=" nav-link">
                            <UilUser className='menuicons2' />
                        </Link>
                        :
                        <Link to='/login' className=" nav-link">
                            <UilUser className='menuicons2' />
                        </Link>
                    }




                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <UilEllipsisH className='menuicons2' />
                    </button>
                </div>



                {/* body of mobile navigator starts */}



                <div className="offcanvas offcanvas-end " style={{ right: '-50px' }} tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <div className='logocomponentmain2' >
                            <img src={logo} className='logocomponentimg2' alt="logocomponentimg" />

                            <img src={connectify} className='logotextimg2' alt="logotextimg" />

                        </div>

                        <button type="button" className="btn-close me-5" data-bs-dismiss="offcanvas" aria-label="Close" />
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link to='/' className=" nav-link">
                                    Home
                                </Link>
                            </li>
                            {(userdata && jwtToken) && <li className="nav-item">
                                <Link to='/profile' className=" nav-link">
                                    Your Profile
                                </Link>
                            </li>}

                            {(userdata && jwtToken) && <li className="nav-item">
                                <Link to='/m/editprofile' className=" nav-link">
                                    Edit Profile
                                </Link>
                            </li>}

                            <li className="nav-item">
                                <Link to='/m/trending' className=" nav-link">
                                    Trending
                                </Link>
                            </li>

                            {(userdata && jwtToken) && <li className="nav-item">
                                <Link to='/timeline' className=" nav-link">
                                    Your Timeline
                                </Link>
                            </li>}


                            {(userdata && jwtToken) && <li className="nav-item">
                                <Link to='/m/followers' className=" nav-link">
                                    Followers
                                </Link>
                            </li>}


                            {(userdata && jwtToken) && <li className="nav-item">
                                <Link to='/m/findnewpeople' className=" nav-link">
                                    Find New People
                                </Link>
                            </li>}

                            <li className="nav-item">
                                <Link to='/login' className=" nav-link"
                                    onClick={() => {
                                        if (userdata && jwtToken) {
                                            logoutfunction();
                                        }
                                    }}
                                >
                                    {userdata ? 'LogOut' : 'Login'}
                                </Link>
                            </li>



                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    More
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>





    )
}
