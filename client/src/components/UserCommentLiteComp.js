import React, { useEffect, useState } from 'react'
import '../pagecss/allpostcomp.css'
import toast from 'react-hot-toast'
import axios from 'axios'

import defaultprofileimg2 from '../img/defaultprofimg2.jpg'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'





export default function UserCommentLiteComp({ commentdata, jwtToken }) {

    const navigate = useNavigate()

    const [userdetails, setUserdetails] = useState([])


    const getRelativeTime = (createdAt) => {

        const now = new Date();
        const commentDate = new Date(createdAt);

        const timeDifferenceInSeconds = Math.floor((now - commentDate) / 1000);

        if (timeDifferenceInSeconds < 60) {
            return `${timeDifferenceInSeconds} second${timeDifferenceInSeconds !== 1 ? 's' : ''} ago`;
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(timeDifferenceInSeconds / 86400);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }

    };

    const getuserdetails = async () => {
        try {



            await axios.get(`http://localhost:9000/api/v1/user/get-user-light/${commentdata.userId}`
            ).then(async (res) => {

                setUserdetails(res.data.curuser)

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

        getuserdetails()
    }, []);




    return (
        <div className='litecommentbox d-flex flex-column'>
            <div className='cbox' onClick={() => { navigate(`/viewpost/${commentdata.postId}`) }} style={{ cursor: 'pointer' }}>

                <div className="d-flex justify-content-between">
                    <span >User commented on this post 👇🏼</span>
                    <div className="commentcreationdate">
                        <span className='crtext'>
                            {getRelativeTime(commentdata.createdAt)}
                        </span>
                    </div>
                </div>

                <div className="detail d-flex flex-column " style={{ cursor: 'text' }}>
                    <div className="d-flex align-items-center spebox2 " onClick={(event) => { event.stopPropagation(); }} >
                        <img src={userdetails?.profilePicture ? userdetails?.profilePicture : defaultprofileimg2} alt="userphoto" className='singlepostuserphoto mx-1 ' />

                        <span className='mx-1' ><b>From  <i style={{ color: 'grey' }}>@{userdetails?.username
                        }</i></b></span>

                    </div>

                </div>

            </div>

            <div className="d-flex my-2 pt-2 flex-wrap px-1">

                <h3 className='me-3 mutedtext' >❝</h3>

                <h5>
                    {commentdata.commentText}
                </h5>

                <h3 className='ms-3 mutedtext'> ❞</h3>


            </div>


        </div>
    )
}
