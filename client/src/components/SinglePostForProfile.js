import React from 'react'
import "../pagecss/singlepostcomp.css";

import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilRedo } from '@iconscout/react-unicons'
import { UilCommentAltNotes } from '@iconscout/react-unicons'
import { UilShare } from '@iconscout/react-unicons'
import { AiTwotoneLike } from 'react-icons/ai'
import { UilEdit } from '@iconscout/react-unicons'

import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";

export default function SinglePostForProfile({ pdata }) {
    return (
        <>
            {pdata.postimage ? <div className='singlepostbox my-1'>
                {pdata.postimage && <img src={pdata.postimage} alt="postimage" />}

                <div className="spostfeatures">

                    <div className='featureicon'>
                        {pdata?.likesCurrentUser ? <AiFillLike style={{ width: '28px', color: 'orange', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} /> :
                            <AiOutlineLike style={{ width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} />}

                        <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.likesCount}</span>
                    </div>

                    <div className='featureicon' style={{ color: "gray", cursor: 'text' }} >
                        <UilRedo style={{ color: "gray" }} />
                        <span style={{ fontSize: '12px' }}>{pdata.repostsCount}</span>
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



                {/* <div className="detail d-flex flex-column my-1">
                    <span><b>From {pdata.userDetails[0].username} :</b></span>
                    <span> {pdata.postdescription}</span>
                </div> */}

                <div className="detail d-flex flex-column">
                    <div className="d-flex align-items-center spebox ">
                        <img src={pdata.userDetails[0].profilePicture} alt="userphoto" className='singlepostuserphoto mx-1 ' />
                        <span className='mx-1'><b>From  <i style={{ color: 'grey' }}>@{pdata.userDetails[0].username}</i></b></span>
                    </div>

                    <span className='mx-2 mt-3  mb-3'> {pdata.postdescription}</span>
                </div>


            </div>

                :
                <div className='singlepostbox '>

                    <div className="detail d-flex flex-column">
                        <div className="d-flex align-items-center spebox ">
                            <img src={pdata.userDetails[0].profilePicture} alt="userphoto" className='singlepostuserphoto mx-1 ' />
                            <span className='mx-1'><b>From  <i style={{ color: 'grey' }}>@{pdata.userDetails[0].username}</i></b></span>
                        </div>

                        <span className='mx-2 mt-3  mb-3'> {pdata.postdescription}</span>
                    </div>
                    <div className="spostfeatures">

                        <div className='featureicon'>
                            {pdata?.likesCurrentUser ? <AiFillLike style={{ width: '28px', color: 'orange', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} /> :
                                <AiOutlineLike style={{ width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} />}

                            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.likesCount}</span>
                        </div>

                        <div className='featureicon' style={{ color: "gray", cursor: 'text' }} >
                            <UilRedo style={{ color: "gray" }} />
                            <span style={{ fontSize: '12px' }}>{pdata.repostsCount}</span>
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
