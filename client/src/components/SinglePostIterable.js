import React, { useEffect, useState } from 'react'
import "../pagecss/singlepostcomp.css";

import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilRedo } from '@iconscout/react-unicons'
import { UilCommentAltNotes } from '@iconscout/react-unicons'
import { UilShare } from '@iconscout/react-unicons'
import { AiTwotoneLike } from 'react-icons/ai'
import { UilEdit } from '@iconscout/react-unicons'
import axios from 'axios';
import toast from 'react-hot-toast';



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

                        console.log(res.data.fetchedLitePost[0])
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

    }, [pid, jwtToken]);



    return (
        <>
            {postdetails?.postimage ? <div className='singlepostbox my-1'>
                {postdetails?.postimage && <img src={postdetails.postimage} alt="postimage" />}

                <div className="spostfeatures">

                    <div className='featureicon'>
                        {postdetails?.likedByCurrentUser ? <UilThumbsUp style={{ width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} /> :
                            <AiTwotoneLike style={{ color: 'orange', width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} />}

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



                <div className="detail my-1">
                    <span><b>From ABCD:</b></span>
                    <span> {postdetails?.postdescription}</span>
                </div>


            </div>

                :
                <div className='singlepostbox '>

                    <div className="detail">
                        <span><b>From ABCD:</b></span>
                        <span> {postdetails?.postdescription}</span>
                    </div>
                    <div className="spostfeatures">

                        <div className='featureicon'>
                            {postdetails?.likedByCurrentUser ? <UilThumbsUp style={{ width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} /> :
                                <AiTwotoneLike style={{ color: 'orange', width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} />}

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
