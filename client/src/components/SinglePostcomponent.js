import React, { useContext, useEffect, useState } from 'react'
import "../pagecss/singlepostcomp.css";


import { UilRedo } from '@iconscout/react-unicons'
import { UilCommentAltNotes } from '@iconscout/react-unicons'
import { UilShare } from '@iconscout/react-unicons'


import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import defaultprofileimg2 from '../img/defaultprofimg2.jpg'
import { Appcontext } from '../ContextFolder/ContextCreator';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

export default function SinglePostcomponent({ pdata }) {

    const navigate = useNavigate()


    const [isLikedByUser, setIsLikedByUser] = useState(false)

    const [isRepostedByUser, setIsRepostedByUser] = useState(false)

    const cur = useContext(Appcontext);
    const { jwtToken, LikePost, UnLikePost, RepostThePost, UnRepostThePost, getRelativeTime } = cur;



    const checkIfUserLikesThePost = async () => {
        try {
            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/user/check-if-user-likes-post/${pdata._id}`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {

                    if (res.data.success === true && res.data.likedByCurrentUser === true) {
                        setIsLikedByUser(true)
                    }

                }).catch((err) => {
                    console.log(err)
                    toast.error('some internal axios error occured')
                })
            }

        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
        }
    }



    const checkIfUserRepostedPost = async () => {
        try {
            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/user/check-if-user-reposted-post/${pdata._id}`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {

                    if (res.data.success === true && res.data.repostedByCurrentUser === true) {
                        setIsRepostedByUser(true)
                    }

                }).catch((err) => {
                    console.log(err)
                    toast.error('some internal axios error occured')
                })
            }

        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
        }
    }





    useEffect(() => {
        checkIfUserLikesThePost()
        checkIfUserRepostedPost()
    }, [jwtToken]);

    return (
        <>
            {pdata.postimage ? <div className='singlepostbox my-1'>
                {pdata.postimage && <img src={pdata.postimage} alt="postimage" onClick={() => {
                    navigate(`/viewpost/${pdata._id}`)
                }} />}

                <div className="spostfeatures">

                    <div className='featureicon'>
                        {isLikedByUser ? <AiFillLike
                            style={{ width: '28px', color: 'orange', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                            onClick={() => {
                                UnLikePost(pdata._id, jwtToken)
                                setIsLikedByUser(false)
                                pdata.likescount = (pdata.likescount - 1)
                            }}
                        />

                            :

                            <AiOutlineLike
                                style={{ width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                                onClick={() => {
                                    LikePost(pdata._id, jwtToken)
                                    setIsLikedByUser(true)
                                    pdata.likescount = (pdata.likescount + 1)
                                }}
                            />

                        }

                        <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.likescount}</span>
                    </div>




                    {isRepostedByUser ?
                        <div className='featureicon' style={{ color: '#00ff00' }} >
                            <UilRedo
                                onClick={() => {
                                    UnRepostThePost(pdata._id, jwtToken)
                                    setIsRepostedByUser(false)
                                    pdata.repostscount = (pdata.repostscount - 1)
                                }} />
                            <span style={{ fontSize: '12px' }}>{pdata.repostscount}</span>
                        </div>
                        :
                        <div className='featureicon'  >
                            <UilRedo
                                onClick={() => {
                                    RepostThePost(pdata._id, jwtToken)
                                    setIsRepostedByUser(true)
                                    pdata.repostscount = (pdata.repostscount + 1)
                                }}
                            />
                            <span style={{ fontSize: '12px' }}>{pdata.repostscount}</span>
                        </div>
                    }




                    <div className='featureicon'>
                        <UilCommentAltNotes />
                        <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.commentNo}</span>
                    </div>



                    <div className='featureicon'>
                        <UilShare />
                        <span style={{ color: "var(--gray)", fontSize: '12px' }}></span>
                    </div>

                </div>



                {/* <div className="detail d-flex flex-column my-1">
                <span><b>From {pdata.userDetails[0].username} :</b></span>
                <span> {pdata.postdescription}</span>
            </div> */}

                <div className="detail d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-between spebox ">
                        <div>
                            <img src={pdata.userDetails[0].profilePicture ? pdata.userDetails[0].profilePicture : defaultprofileimg2} alt="userphoto" className='singlepostuserphoto mx-1 ' />
                            <span className='mx-1'><b>From  <i style={{ color: 'grey' }}>@{pdata.userDetails[0].username}</i></b></span>
                        </div>
                        <div className="creationdatebox mx-2">
                            <span className='creationtext'>
                                {getRelativeTime(pdata.createdAt)}
                            </span>
                        </div>

                    </div>

                    <span className='mx-2 mt-3  mb-3'> {pdata.postdescription}</span>
                </div>


            </div>

                :
                <div className='singlepostbox '>

                    <div className="detail d-flex flex-column">
                        <div className="d-flex align-items-center justify-content-between spebox ">
                            <div>
                                <img src={pdata.userDetails[0].profilePicture ? pdata.userDetails[0].profilePicture : defaultprofileimg2} alt="userphoto" className='singlepostuserphoto mx-1 ' />
                                <span className='mx-1'><b>From  <i style={{ color: 'grey' }}>@{pdata.userDetails[0].username}</i></b></span>
                            </div>

                            <div className="creationdatebox mx-2">
                                <span className='creationtext'>
                                    {getRelativeTime(pdata.createdAt)}
                                </span>
                            </div>
                        </div>

                        <span className='mx-2 mt-3  mb-3'> {pdata.postdescription}</span>
                    </div>
                    <div className="spostfeatures">

                        <div className='featureicon'>
                            {isLikedByUser ? <AiFillLike
                                style={{ width: '28px', color: 'orange', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                                onClick={() => {
                                    UnLikePost(pdata._id, jwtToken)
                                    setIsLikedByUser(false)
                                    pdata.likescount = (pdata.likescount - 1)
                                }}
                            />
                                :
                                <AiOutlineLike style={{ width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                                    onClick={() => {
                                        LikePost(pdata._id, jwtToken)
                                        setIsLikedByUser(true)
                                        pdata.likescount = (pdata.likescount + 1)
                                    }}
                                />}

                            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.likescount}</span>
                        </div>

                        {isRepostedByUser ?
                            <div className='featureicon' style={{ color: '#00ff00', fontWeight: 'bolder' }} >
                                <UilRedo
                                    onClick={() => {
                                        UnRepostThePost(pdata._id, jwtToken)
                                        setIsRepostedByUser(false)
                                        pdata.repostscount = (pdata.repostscount - 1)

                                    }}
                                />
                                <span style={{ fontSize: '12px' }}>{pdata.repostscount}</span>
                            </div>
                            :
                            <div className='featureicon'  >
                                <UilRedo
                                    onClick={() => {
                                        RepostThePost(pdata._id, jwtToken)
                                        setIsRepostedByUser(true)
                                        pdata.repostscount = (pdata.repostscount + 1)

                                    }}
                                />
                                <span style={{ fontSize: '12px' }}>{pdata.repostscount}</span>
                            </div>
                        }

                        <div className='featureicon'>
                            <UilCommentAltNotes />
                            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.commentNo}</span>
                        </div>



                        <div className='featureicon'>
                            <UilShare />
                            <span style={{ color: "var(--gray)", fontSize: '12px' }}></span>
                        </div>

                    </div>

                </div>


            }

        </>
    )
}
