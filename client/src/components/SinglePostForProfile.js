import React, { useContext, useEffect, useState } from 'react'
import "../pagecss/singlepostcomp.css";

// import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilRedo } from '@iconscout/react-unicons'
import { UilCommentAltNotes } from '@iconscout/react-unicons'
import { UilShare } from '@iconscout/react-unicons'
// import { AiTwotoneLike } from 'react-icons/ai'
import { UilEdit } from '@iconscout/react-unicons'
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";

import defaultprofileimg2 from '../img/defaultprofimg2.jpg'
import { Appcontext } from '../ContextFolder/ContextCreator';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';


export default function SinglePostForProfile({ pdata }) {
    const navigate = useNavigate()

    const cur = useContext(Appcontext);
    const { jwtToken, LikePost, UnLikePost, getRelativeTime } = cur;

    const [isLikedByUser, setIsLikedByUser] = useState(false)

    useEffect(() => {
        if (pdata.likesCurrentUser === true) {
            setIsLikedByUser(true)
        } else {
            setIsLikedByUser(false)
        }

    }, []);


    return (
        <>
            {pdata.postimage ? <div className='singlepostbox my-1'
                onClick={() => { navigate(`/viewpost/${pdata._id}`) }} >

                {pdata?.postimage && <img src={pdata.postimage} alt="postimage"
                    style={{ cursor: 'pointer' }}
                // onClick={() => { navigate(`/view-user-profile/${postdetails?.userId}`) }}
                />}

                <div className="spostfeatures" onClick={(event) => { event.stopPropagation(); }}>

                    <div className='featureicon'>
                        {isLikedByUser ? <AiFillLike
                            style={{ width: '28px', color: 'orange', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                            onClick={(event) => {
                                event.stopPropagation();
                                if (jwtToken) {

                                    UnLikePost(pdata._id, jwtToken)
                                    setIsLikedByUser(false)
                                    pdata.likesCount = (pdata?.likesCount - 1)
                                }
                                else {
                                    navigate('/login')
                                }

                            }}
                        /> :
                            <AiOutlineLike
                                style={{ width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    if (jwtToken) {

                                        LikePost(pdata._id, jwtToken)
                                        setIsLikedByUser(true)
                                        pdata.likesCount = (pdata?.likesCount + 1)
                                    }
                                    else {
                                        navigate('/login')
                                    }

                                }}
                            />}

                        <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.likesCount}</span>
                    </div>

                    <div className='featureicon' style={{ color: "gray", cursor: 'text' }} >
                        <UilRedo style={{ color: "gray" }} />
                        <span style={{ fontSize: '12px' }}>{pdata.repostsCount}</span>
                    </div>

                    <div className='featureicon'>
                        <UilCommentAltNotes onClick={(event) => { navigate(`/viewpost/${pdata._id}`) }} />
                        <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.commentNo}</span>
                    </div>

                    <div className='featureicon'>
                        <UilEdit />
                        <span style={{ color: "var(--gray)", fontSize: '12px' }}></span>
                    </div>

                    <div className='featureicon'>
                        <UilShare />
                        <span style={{ color: "var(--gray)", fontSize: '12px' }}></span>
                    </div>

                </div>





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
                <div className='singlepostbox ' onClick={(event) => {
                    navigate(`/viewpost/${pdata._id}`)
                }}
                >

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
                    <div className="spostfeatures" onClick={(event) => { event.stopPropagation(); }}>

                        <div className='featureicon'>
                            {isLikedByUser ? <AiFillLike
                                style={{ width: '28px', color: 'orange', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                                onClick={() => {
                                    if (jwtToken) {
                                        UnLikePost(pdata._id, jwtToken)
                                        setIsLikedByUser(false)
                                        pdata.likesCount = (pdata?.likesCount - 1)
                                    }
                                    else {
                                        navigate('/login')
                                    }

                                }}
                            /> :
                                <AiOutlineLike
                                    style={{ width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                                    onClick={() => {

                                        if (jwtToken) {

                                            LikePost(pdata._id, jwtToken)
                                            setIsLikedByUser(true)
                                            pdata.likesCount = (pdata?.likesCount + 1)
                                        }
                                        else {
                                            navigate('/login')
                                        }

                                    }}
                                />}

                            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.likesCount}</span>
                        </div>

                        <div className='featureicon' style={{ color: "gray", cursor: 'text' }} >
                            <UilRedo style={{ color: "gray" }} />
                            <span style={{ fontSize: '12px' }}>{pdata.repostsCount}</span>
                        </div>

                        <div className='featureicon'>
                            <UilCommentAltNotes onClick={(event) => {

                                navigate(`/viewpost/${pdata._id}`)
                            }} />
                            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.commentNo}</span>
                        </div>

                        <div className='featureicon'>
                            <UilEdit />
                            <span style={{ color: "var(--gray)", fontSize: '12px' }}></span>
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
