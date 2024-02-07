import React, { useContext, useEffect, useRef, useState } from 'react'

import "../pagecss/viewpostpage.css";


import { UilRedo } from '@iconscout/react-unicons'
import { UilCommentAltNotes } from '@iconscout/react-unicons'
import { UilShare } from '@iconscout/react-unicons'
import { UilArrowLeft } from '@iconscout/react-unicons'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Appcontext } from '../ContextFolder/ContextCreator';
import defaultprofileimg2 from '../img/defaultprofimg2.jpg'
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import defaultImage3 from '../img/defaultImage3.png'
import Swal from 'sweetalert2';



export default function ViewSinglepost({ pid }) {


    const navigate = useNavigate()

    const [isLikedByUser, setIsLikedByUser] = useState(false)

    const [isRepostedByUser, setIsRepostedByUser] = useState(false)

    const [postdetails, setPostdetails] = useState()
    const [page, setPage] = useState(1)
    const [totalCommentCount, setTotalCommentCount] = useState(0)
    const [taglist, setTaglist] = useState([])
    const [commentdetails, setCommentdetails] = useState([])

    const cur = useContext(Appcontext);
    const { jwtToken, LikePost, UnLikePost, RepostThePost, UnRepostThePost, getRelativeTime } = cur;


    const checkIfUserLikesThePost = async () => {
        try {
            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/user/check-if-user-likes-post/${pid}`, {
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

                await axios.get(`http://localhost:9000/api/v1/user/check-if-user-reposted-post/${pid}`, {
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





    const getPostDetails = async () => {
        try {

            await axios.get(`http://localhost:9000/api/v1/post/get-post/${pid}`).then(async (res) => {

                if (res.data.success === true) {
                    setPostdetails(res.data.fetchedpost)
                    setTaglist(res.data.fetchedpost.tags)
                    // console.log(res.data.fetchedpost)
                }

            }).catch((err) => {
                console.log(err)
                toast.error('some internal axios error occured')
            })


        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
        }
    }



    const getCommentsOfPosts = async () => {
        try {

            await axios.get(`http://localhost:9000/api/v1/comments/get-comments/${pid}/${page}`).then(async (res) => {

                if (res.data.success === true) {
                    setCommentdetails(prevCommentList => [...prevCommentList, ...res.data.thepostcomment])
                    setTotalCommentCount(res.data.totalCommentCount)

                    // console.log(res.data)
                }

            }).catch((err) => {
                console.log(err)
                toast.error('some internal axios error occured')
            })


        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
        }
    }


    const addComment = async () => {
        try {

            await axios.post(`http://localhost:9000/api/v1/comments/add-comment/${pid}`,
                {
                    commentdata: textareaval.toString()
                },
                {
                    headers: {
                        token: jwtToken
                    }
                }

            ).then(async (res) => {

                if (res.data.success === true) {
                    setaddingcomment(false)
                    settextareaval('')

                    Swal.fire({
                        title: "Comment Added Successfully",
                        icon: 'success',
                        confirmButtonText: "Ok"

                    })
                }
                else {
                    Swal.fire({
                        title: "Oops...?",
                        text: "Something went wrong!",
                        icon: "error"
                    });
                }

            }).catch((err) => {
                console.log(err)
                toast.error('some internal axios error occured')
            })


        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
        }
    }






    useEffect(() => {
        getPostDetails()
        getCommentsOfPosts()
    }, []);






    const textarearef = useRef(null)

    const [textareaval, settextareaval] = useState('');
    const [addingcomment, setaddingcomment] = useState(false);

    const onchangehandler = (event) => {

        settextareaval(event.target.value)

    }

    useEffect(() => {

        textarearef.current.style.height = 'auto';
        textarearef.current.style.height = textarearef.current.scrollHeight + 'px';
        if (textarearef.current.clientHeight < 100) { // Adjust the minimum height as needed
            textarearef.current.style.height = '45px';
        }

    }, [textareaval])


    useEffect(() => {
        if (addingcomment) {
            textarearef.current.focus();
        }
    }, [addingcomment]);


    useEffect(() => {
        checkIfUserLikesThePost()
        checkIfUserRepostedPost()
    }, [jwtToken]);




    return (
        <div className="superviewsinglepostbox">

            <div className="backbtn">
                <UilArrowLeft
                    onClick={() => {
                        navigate(-1)
                    }}
                    style={{ width: '40px', height: '40px', cursor: 'pointer' }} />
                <b>Back </b>

            </div>


            <div className='singlepostviewbox'>

                <div className="posterdetails">
                    <div className='d-flex'>
                        <img
                            src={postdetails?.userDetails[0]?.profilePicture ? postdetails?.userDetails[0]?.profilePicture : defaultprofileimg2}
                            alt="userimage"
                            className='posterpic'
                            onClick={() => { navigate(`/view-user-profile/${postdetails?.userId}`) }}
                        />
                        <div className="d-flex flex-column">
                            <span className='mx-2'><b>From: {postdetails?.userDetails[0]?.firstname} {postdetails?.userDetails[0]?.lastname}</b></span>
                            <span className='mx-2 text-muted' > @{postdetails?.userDetails[0]?.username}</span>
                        </div>

                    </div>

                    <button className='basicbutton px-3 py-1'>follow</button>

                </div>





                {taglist.length >= 1 && <div className='text-sm-end' style={{ marginBottom: '-40px', marginTop: '-5px' }}>
                    <p className="d-inline-flex ">
                        <a className="showtagsbtn btn btn-outline-primary " data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            Show Tags
                        </a>

                    </p>
                    <div className="collapse mb-4" id="collapseExample">
                        <div className="card card-body text-start d-flex flex-row flex-wrap">

                            {taglist.map((item, index) => {

                                return <a className='mx-1' href='#' key={index} >#{item.tagname}</a>
                            })}
                        </div>
                    </div>
                </div>}



                <div className="detail px-1 py-1 mb-1">

                    <span> {postdetails?.postdescription}</span>

                </div>
                {postdetails?.postimage ?
                    <div className="imgcontainer">
                        <img src={postdetails?.postimage} alt="postimage" className='postimage' />
                    </div>
                    :
                    null}


                <div className="spostfeatures">
                    <div className='featureicon'>
                        {isLikedByUser ? <AiFillLike
                            style={{ width: '28px', color: 'orange', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                            onClick={() => {
                                if (jwtToken) {
                                    UnLikePost(pid, jwtToken)
                                    setIsLikedByUser(false)
                                    postdetails.likeCount = (postdetails?.likeCount - 1)
                                }
                                else {
                                    navigate('/login')
                                }

                            }}
                        />

                            :

                            <AiOutlineLike
                                style={{ width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }}
                                onClick={() => {

                                    if (jwtToken) {

                                        LikePost(pid, jwtToken)
                                        setIsLikedByUser(true)
                                        postdetails.likeCount = (postdetails?.likeCount + 1)
                                    }
                                    else {
                                        navigate('/login')
                                    }

                                }}
                            />

                        }

                        <span style={{ color: "var(--gray)", fontSize: '12px' }}>{postdetails?.likeCount}</span>
                    </div>


                    {isRepostedByUser ?
                        <div className='featureicon' style={{ color: '#00ff00' }} >
                            <UilRedo
                                onClick={() => {

                                    if (jwtToken) {
                                        UnRepostThePost(pid._id, jwtToken)
                                        setIsRepostedByUser(false)
                                        postdetails.repostCount = (postdetails?.repostCount - 1)
                                    }
                                    else {
                                        navigate('/login')
                                    }

                                }} />
                            <span style={{ fontSize: '12px' }}>{postdetails?.repostCount}</span>
                        </div>
                        :
                        <div className='featureicon'  >
                            <UilRedo
                                onClick={() => {
                                    if (jwtToken) {
                                        RepostThePost(pid._id, jwtToken)
                                        setIsRepostedByUser(true)
                                        postdetails.repostCount = (postdetails?.repostCount + 1)

                                    }
                                    else {
                                        navigate('/login')
                                    }

                                }}
                            />
                            <span style={{ fontSize: '12px' }}>{postdetails?.repostCount}</span>
                        </div>
                    }


                    <div className='featureicon'>

                        <UilCommentAltNotes id='commentinput' onClick={() => setaddingcomment(true)} />
                        <span style={{ color: "var(--gray)", fontSize: '12px' }}>{postdetails?.commentNo}</span>
                    </div>


                    <div className='featureicon'>

                        <UilShare />
                        <span style={{ color: "var(--gray)", fontSize: '12px' }}></span>

                    </div>





                </div>


            </div>

            {/* comment section starts here */}

            <div className="commentsection">


                <div className="commentbox">
                    <label><h3> {postdetails?.commentNo} Comments  </h3></label>
                    <textarea className="commentinput" id='commentinput' name='textareaval' onClick={() => setaddingcomment(true)} placeholder='Add a comment Here' value={textareaval} ref={textarearef} onChange={(event) => onchangehandler(event)} />

                    {addingcomment && <div className=" commentbtnsection ">

                        <div className="commentbtn basicbutton" onClick={() => {

                            Swal.fire({
                                title: "Are You Sure You Want to Post This Comment?",
                                icon: 'question',
                                confirmButtonText: "Yes",
                                showCloseButton: true,
                                showCancelButton: true

                            }).then((result) => {

                                if (result.isConfirmed) {
                                    addComment()
                                }
                            });


                            console.log(textareaval.toString())
                        }}>Post Comment</div>

                        <div className="commentbtn basicbutton" onClick={() => {
                            setaddingcomment(false)
                            settextareaval('')
                        }} >Cancel</div>

                    </div>}

                </div>




                <div className="commentlistbox">
                    {
                        commentdetails?.map((item, index) => {
                            return <div className="singlecomment" key={index}>
                                <img src={item?.userDetails?.profilePicture ? item?.userDetails?.profilePicture : defaultImage3} alt="profpic" className='commenterpic' />
                                <div className="usersection">
                                    <span className='commenterdetails'>@<b>{item?.userDetails?.username}</b>

                                        <span className='ms-2'> {getRelativeTime(item.createdAt)}</span>


                                    </span>
                                    <span className='commentdesc'>{item?.commentText} </span>
                                </div>

                            </div>
                        })
                    }
                </div>

                {page * 10 > totalCommentCount ? null
                    :
                    <div className="seemorecomments"
                        onClick={async () => {
                            await setPage(page + 1)
                            await getCommentsOfPosts();

                        }}
                    > See More Comments</div>}

            </div>


        </div>
    )
}
