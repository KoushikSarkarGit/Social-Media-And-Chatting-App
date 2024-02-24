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
import { UilTrashAlt } from '@iconscout/react-unicons'

import axios from 'axios'
import toast from 'react-hot-toast'
import defaultprofileimg2 from '../img/defaultprofimg2.jpg'
import { Appcontext } from '../ContextFolder/ContextCreator';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import Swal from 'sweetalert2'

export default function SinglePostForProfile({ pdata }) {
    const navigate = useNavigate()

    const cur = useContext(Appcontext);
    const { jwtToken, LikePost, UnLikePost, getRelativeTime } = cur;

    const [isLikedByUser, setIsLikedByUser] = useState(false)
    const [isloading, setIsloading] = useState(false);

    useEffect(() => {
        if (pdata.likesCurrentUser === true) {
            setIsLikedByUser(true)
        } else {
            setIsLikedByUser(false)
        }

    }, []);





    useEffect(() => {
        if (isloading) {
            showAlert();



            setTimeout(() => {
                setIsloading(false)
            }, 20000);



        }
    }, [isloading]);



    const showAlert = () => {
        Swal.fire({
            title: "Your post is being deleted...", // Adjust title as needed
            icon: 'info',
            html: isloading ? `     
                    <div class="spinner-border my-2 text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>        
          `
                : "",
            timer: 30000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false, // Prevent outside click closing
            backdrop: true, // Add a backdrop for emphasis
            willClose: () => {

                if (isloading) {
                    // Alert the user or prevent closing 
                    Swal.fire({
                        title: "Please Wait...",
                        icon: 'info',
                        html: `
                        <div class="spinner-border text-warning my-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div> 
                        `,
                        allowOutsideClick: false,
                        backdrop: true,
                    });
                }
            }
        });
    };












    const deletePost = async (manualpostId) => {
        try {
            setIsloading(true)
            if (jwtToken && manualpostId) {

                await axios.delete(`http://localhost:9000/api/v1/post/delete-post/${manualpostId}`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {
                    // console.log(res.data)
                    if (res.data.success) {

                        setIsloading(false)
                        Swal.fire({
                            title: "The post has been deleted successfully",
                            icon: 'success',
                            confirmButtonText: "Ok"

                        }).then((result) => {

                            if (result.isConfirmed) {
                                setTimeout(() => {
                                    window.location.reload()
                                }, 500);

                            }
                        });


                    }
                    else {
                        setIsloading(false)
                        Swal.fire({
                            title: "Oops...?",
                            text: "Something went wrong!",
                            icon: "error"
                        });

                    }


                }).catch((err) => {
                    console.log(err)
                    setIsloading(false)
                    toast.error('some internal axios error occured')
                })
            }

        } catch (error) {
            console.log(error)
            setIsloading(false)
            toast.error('some internal error occured')
        }
    }







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



                    <div className='featureicon'>
                        <UilCommentAltNotes onClick={(event) => { navigate(`/viewpost/${pdata._id}`) }} />
                        <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.commentNo}</span>
                    </div>

                    <div className='featureicon'>
                        <UilEdit
                            onClick={() => {
                                toast('Will Be Added In Future Updates', {
                                    icon: '🐣',
                                })
                            }}
                        />
                        <span style={{ color: "var(--gray)", fontSize: '12px' }}></span>
                    </div>
                    <div className='featureicon'  >
                        <UilTrashAlt
                            onClick={() => {
                                Swal.fire({
                                    title: 'Are you sure?',
                                    text: 'The post will be deleted',
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonColor: "#d33",
                                    confirmButtonText: 'Delete',
                                    cancelButtonText: `Go back`
                                }).then(async (result) => {

                                    if (result.isConfirmed) {
                                        deletePost(pdata._id)
                                    }

                                })
                            }}
                        />
                        <span style={{ fontSize: '12px' }}></span>
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



                        <div className='featureicon'>
                            <UilCommentAltNotes onClick={(event) => {

                                navigate(`/viewpost/${pdata._id}`)
                            }} />
                            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.commentNo}</span>
                        </div>

                        <div className='featureicon'>
                            <UilEdit

                                onClick={() => {
                                    toast('Will Be Added In Future Updates', {
                                        icon: '🐣',
                                    })
                                }}
                            />
                            <span style={{ color: "var(--gray)", fontSize: '12px' }}></span>
                        </div>
                        <div className='featureicon'  >
                            <UilTrashAlt
                                onClick={() => {
                                    Swal.fire({
                                        title: 'Are you sure?',
                                        text: 'The post will be deleted',
                                        icon: 'question',
                                        showCancelButton: true,
                                        confirmButtonColor: "#d33",
                                        confirmButtonText: 'Delete',
                                        cancelButtonText: `Go back`
                                    }).then(async (result) => {

                                        if (result.isConfirmed) {
                                            deletePost(pdata._id)
                                        }

                                    })
                                }}
                            />
                            <span style={{ fontSize: '12px' }}></span>
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
