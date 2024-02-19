import React, { useContext, useEffect, useState } from 'react'
import "../pagecss/singlepostcomp.css";

// import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilRedo } from '@iconscout/react-unicons'
import { UilCommentAltNotes } from '@iconscout/react-unicons'
import { UilShare } from '@iconscout/react-unicons'
// import { AiTwotoneLike } from 'react-icons/ai'
import { UilEdit } from '@iconscout/react-unicons'
import axios from 'axios';
import toast from 'react-hot-toast';
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";

import defaultprofileimg2 from '../img/defaultprofimg2.jpg'
import { Appcontext } from '../ContextFolder/ContextCreator';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

export default function SinglePostIterable({ pid, jwtToken }) {

    const navigate = useNavigate()

    const [postdetails, setPostdetails] = useState()
    const [isLikedByUser, setIsLikedByUser] = useState(false)

    const [isRepostedByUser, setIsRepostedByUser] = useState(false)


    const cur = useContext(Appcontext);
    const { LikePost, UnLikePost, RepostThePost, UnRepostThePost, getRelativeTime } = cur;

    const getLikedPostsofLoggedUserLiteversion = async () => {
        try {
            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/post/get-liked-post-of-logged-user-by-id/${pid}`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {
                    if (res.data.success === true) {
                        setPostdetails(res.data.fetchedLitePost[0])

                        // console.log(res.data.fetchedLitePost[0])
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
        getLikedPostsofLoggedUserLiteversion();
    }, [jwtToken, pid]);


    useEffect(() => {
        //useeffect for setting if liked value
        if (postdetails?.likedByCurrentUser === true) {
            setIsLikedByUser(true)
        }
        else if (postdetails?.likedByCurrentUser === false) {
            setIsLikedByUser(false)
        }

    }, [jwtToken, pid, postdetails, postdetails?.likedByCurrentUser]);




    useEffect(() => {
        //useeffect for setting if reposted value
        if (postdetails?.repostedByCurrentUser === true) {
            setIsRepostedByUser(true)
        }
        else if (postdetails?.repostedByCurrentUser === false) {
            setIsRepostedByUser(false)
        }

    }, [jwtToken, pid, postdetails, postdetails?.repostedByCurrentUser]);




    return (
        <>
            {postdetails?.postimage ? <div className='singlepostbox my-1' onClick={() => { navigate(`/viewpost/${pid}`) }}>
                {postdetails?.postimage && <img src={postdetails.postimage} alt="postimage" />}

                <div className="spostfeatures" onClick={(event) => { event.stopPropagation(); }}>


                    <div className='featureicon'>
                        {isLikedByUser ? <AiFillLike
                            style={{ width: '29px', color: 'orange', height: '29px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                            onClick={() => {
                                UnLikePost(pid, jwtToken)
                                setIsLikedByUser(false)
                                postdetails.likeCount = (postdetails?.likeCount - 1)
                            }}
                        />
                            :
                            <AiOutlineLike
                                style={{ width: '29px', height: '29px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                                onClick={() => {
                                    LikePost(pid, jwtToken)
                                    setIsLikedByUser(true)
                                    postdetails.likeCount = (postdetails?.likeCount + 1)
                                }}
                            />}

                        <span style={{ color: "var(--gray)", fontSize: '12px' }}>{postdetails?.likeCount}</span>
                    </div>

                    {isRepostedByUser ?
                        <div className='featureicon' style={{ color: '#00ff00' }} >
                            <UilRedo
                                onClick={() => {
                                    UnRepostThePost(pid, jwtToken)
                                    setIsRepostedByUser(false)
                                    postdetails.repostCount = (postdetails?.repostCount - 1)
                                }} />
                            <span style={{ fontSize: '12px' }}>{postdetails?.repostCount}</span>
                        </div>
                        :
                        <div className='featureicon'  >
                            <UilRedo
                                onClick={() => {
                                    RepostThePost(pid, jwtToken)
                                    setIsRepostedByUser(true)
                                    postdetails.repostCount = (postdetails?.repostCount + 1)
                                }}
                            />
                            <span style={{ fontSize: '12px' }}>{postdetails?.repostCount}</span>
                        </div>
                    }

                    <div className='featureicon'>
                        <UilCommentAltNotes onClick={(event) => { navigate(`/viewpost/${pid}`) }} />
                        <span style={{ color: "var(--gray)", fontSize: '12px' }}>{postdetails?.commentNo}</span>
                    </div>


                    <div className='featureicon'>
                        <UilShare />
                        <span style={{ color: "var(--gray)", fontSize: '12px' }}></span>
                    </div>

                </div>



                <div className="detail d-flex flex-column ">
                    <div className="d-flex align-items-center justify-content-between spebox ">
                        <div>
                            <img src={postdetails?.userDetails[0].profilePicture ? postdetails?.userDetails[0].profilePicture : defaultprofileimg2}
                                alt="userphoto"
                                className='singlepostuserphoto mx-1 '
                                onClick={(event) => {
                                    event.stopPropagation();
                                    navigate(`/view-user-profile/${postdetails?.userId}`)
                                }}
                            />
                            <span className='mx-1'><b>From  <i style={{ color: 'grey' }}>@{postdetails?.userDetails[0].username}</i></b></span>
                        </div>

                        <div className="creationdatebox mx-2">
                            <span className='creationtext'>
                                {getRelativeTime(postdetails?.createdAt)}
                            </span>
                        </div>
                    </div>

                    <span className='mx-2 mt-3  mb-3'> {postdetails?.postdescription}</span>
                </div>


            </div>

                :
                <div className='singlepostbox ' onClick={() => { navigate(`/viewpost/${pid}`) }}>

                    <div className="detail d-flex flex-column ">
                        <div className="d-flex align-items-center justify-content-between spebox ">
                            <div>
                                <img src={postdetails?.userDetails[0].profilePicture ? postdetails?.userDetails[0].profilePicture : defaultprofileimg2}
                                    alt="userphoto"
                                    className='singlepostuserphoto mx-1 '
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        navigate(`/view-user-profile/${postdetails?.userId}`)
                                    }}
                                />
                                <span className='mx-1'><b>From  <i style={{ color: 'grey' }}>@{postdetails?.userDetails[0].username}</i></b></span>
                            </div>

                            <div className="creationdatebox mx-2">
                                <span className='creationtext'>
                                    {getRelativeTime(postdetails?.createdAt)}
                                </span>
                            </div>


                        </div>

                        <span className='mx-2 mt-3  mb-3'> {postdetails?.postdescription}</span>
                    </div>
                    <div className="spostfeatures" onClick={(event) => { event.stopPropagation(); }}>

                        <div className='featureicon'>
                            {isLikedByUser ? <AiFillLike
                                style={{ width: '29px', color: 'orange', height: '29px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                                onClick={() => {
                                    UnLikePost(pid, jwtToken)
                                    setIsLikedByUser(false)
                                    postdetails.likeCount = (postdetails?.likeCount - 1)
                                }}
                            />
                                :
                                <AiOutlineLike
                                    style={{ width: '29px', height: '29px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                                    onClick={() => {
                                        LikePost(pid, jwtToken)
                                        setIsLikedByUser(true)
                                        postdetails.likeCount = (postdetails?.likeCount + 1)
                                    }}
                                />}

                            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{postdetails?.likeCount}</span>
                        </div>



                        {isRepostedByUser ?
                            <div className='featureicon' style={{ color: '#00ff00' }} >
                                <UilRedo
                                    onClick={() => {
                                        UnRepostThePost(pid, jwtToken)
                                        setIsRepostedByUser(false)
                                        postdetails.repostCount = (postdetails?.repostCount - 1)
                                    }} />
                                <span style={{ fontSize: '12px' }}>{postdetails?.repostCount}</span>
                            </div>
                            :
                            <div className='featureicon'  >
                                <UilRedo
                                    onClick={() => {
                                        RepostThePost(pid, jwtToken)
                                        setIsRepostedByUser(true)
                                        postdetails.repostCount = (postdetails?.repostCount + 1)
                                    }}
                                />
                                <span style={{ fontSize: '12px' }}>{postdetails?.repostCount}</span>
                            </div>
                        }



                        <div className='featureicon'>
                            <UilCommentAltNotes onClick={(event) => { navigate(`/viewpost/${pid}`) }} />
                            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{postdetails?.commentNo}</span>
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
