import React, { useEffect, useState } from 'react'
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

export default function SinglePostIterable({ pid, jwtToken }) {


    const [postdetails, setPostdetails] = useState()

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



    return (
        <>
            {postdetails?.postimage ? <div className='singlepostbox my-1'>
                {postdetails?.postimage && <img src={postdetails.postimage} alt="postimage" />}

                <div className="spostfeatures">


                    <div className='featureicon'>
                        {postdetails?.likedByCurrentUser ? <AiFillLike style={{ width: '29px', color: 'orange', height: '29px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} /> :
                            <AiOutlineLike style={{ width: '29px', height: '29px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} />}

                        <span style={{ color: "var(--gray)", fontSize: '12px' }}>{postdetails?.likeCount}</span>
                    </div>

                    <div className='featureicon' style={{ color: "gray", cursor: 'text' }} >
                        <UilRedo style={{ color: "gray" }} />
                        <span style={{ fontSize: '12px' }}>3333</span>
                    </div>

                    <div className='featureicon'>
                        <UilCommentAltNotes />
                        <span style={{ color: "var(--gray)", fontSize: '12px' }}>2222</span>
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



                <div className="detail d-flex flex-column ">
                    <div className="d-flex align-items-center spebox ">
                        <img src={postdetails?.userDetails[0].profilePicture ? postdetails?.userDetails[0].profilePicture : defaultprofileimg2} alt="userphoto" className='singlepostuserphoto mx-1 ' />
                        <span className='mx-1'><b>From  <i style={{ color: 'grey' }}>@{postdetails?.userDetails[0].username}</i></b></span>
                    </div>

                    <span className='mx-2 mt-3  mb-3'> {postdetails?.postdescription}</span>
                </div>


            </div>

                :
                <div className='singlepostbox '>

                    <div className="detail d-flex flex-column ">
                        <div className="d-flex align-items-center spebox ">
                            <img src={postdetails?.userDetails[0].profilePicture ? postdetails?.userDetails[0].profilePicture : defaultprofileimg2} alt="userphoto" className='singlepostuserphoto mx-1 ' />
                            <span className='mx-1'><b>From  <i style={{ color: 'grey' }}>@{postdetails?.userDetails[0].username}</i></b></span>
                        </div>

                        <span className='mx-2 mt-3  mb-3'> {postdetails?.postdescription}</span>
                    </div>
                    <div className="spostfeatures">

                        <div className='featureicon'>
                            {postdetails?.likedByCurrentUser ? <AiFillLike style={{ width: '29px', color: 'orange', height: '29px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} />
                                :
                                <AiOutlineLike style={{ width: '29px', height: '29px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} />}

                            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{postdetails?.likeCount}</span>
                        </div>

                        <div className='featureicon' style={{ color: "gray", cursor: 'text' }} >
                            <UilRedo style={{ color: "gray" }} />
                            <span style={{ fontSize: '12px' }}>3333</span>
                        </div>

                        <div className='featureicon'>
                            <UilCommentAltNotes />
                            <span style={{ color: "var(--gray)", fontSize: '12px' }}>2222</span>
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
