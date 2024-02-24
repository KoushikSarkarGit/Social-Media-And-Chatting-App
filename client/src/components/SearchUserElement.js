import React from 'react'

import '../pagecss/explorepage.css'
import '../pagecss/followercard.css'

import postPic1 from '../img/postpic1.jpg'
import dpi3 from '../img/defaultImage3.png'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { Appcontext } from '../ContextFolder/ContextCreator'
import { useEffect } from 'react'
import { useState } from 'react'

export default function SearchUserElement({ udata }) {
    const navigate = useNavigate()

    const cur = useContext(Appcontext);
    const { jwtToken, userId, followSomeone, UnfollowSomeone, checkIfLoggedUserFollowsUser } = cur;

    const [isfollwedbyuser, setIsfollwedbyuser] = useState()




    useEffect(() => {


        setIsfollwedbyuser(checkIfLoggedUserFollowsUser(udata._id))

    }, [udata]);










    return (
        <div className='srUser'>
            <div className="srUserImg"
                style={{ cursor: 'pointer' }}
                onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/view-user-profile/${udata._id}`)
                }}>
                <img src={udata?.profilePicture ? udata?.profilePicture : dpi3} alt="myprofilepic" />
            </div>

            <div className="srUserDetails">
                <span> <b> {udata.firstname
                } {udata.lastname}</b> </span>
                <span >@{udata.username}</span>
            </div>

            {/* <div className="verticalHr mx-1">    </div>
            <div className="minidetails">
                <span>
                    0
                </span>
                <span>Posts</span>
            </div> */}
            <div className="verticalHr mx-1">    </div>

            <div className="minidetails">
                <span>
                    {udata.followerscount}
                </span>
                <span>Followers</span>
            </div>
            <div className="verticalHr mx-2">    </div>
            <div className="minidetails">
                <span>
                    {udata.followingcount}
                </span>
                <span>Following</span>
            </div>
            <div className="verticalHr mx-2">    </div>

            {/* <button className='basicbutton followerbtn px-2 m-4 ms-2'  >Unfollow</button> */}


            {userId !== udata._id ?
                <>
                    {isfollwedbyuser ? <div type='button'
                        className="basicbutton followerbtn px-2 m-4 ms-2"
                        onClick={() => {
                            if (!jwtToken) {
                                navigate('/login')
                            } else {
                                UnfollowSomeone(udata._id)
                                setIsfollwedbyuser(false)
                            }
                        }}
                    >
                        Unfollow
                    </div>
                        :
                        <div type='button'
                            className="basicbutton followerbtn px-2 m-4 ms-2"
                            onClick={() => {
                                if (!jwtToken) {
                                    navigate('/login')
                                } else {
                                    followSomeone(udata._id)
                                    setIsfollwedbyuser(true)
                                }
                            }}
                        >
                            follow
                        </div>

                    }

                </>

                :
                null
            }


        </div>
    )
}
