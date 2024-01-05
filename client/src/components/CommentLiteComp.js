import React, { useEffect, useState } from 'react'
import '../pagecss/allpostcomp.css'
import toast from 'react-hot-toast'
import axios from 'axios'





export default function CommentLiteComp({ commentdata, jwtToken }) {

    const [userdetails, setUserdetails] = useState([])

    const getuserdetails = async () => {
        try {

            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/user/get-user-light/${commentdata.userId}`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {

                    console.log(res.data.curuser)
                    setUserdetails(res.data.curuser)
                    // setFollower(res.data.curuser)


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
        getuserdetails()
    }, []);



    //the classes are automatically fetched from parent component's imported css files
    return (
        <div className='litecommentbox'>
            <div className='cbox'>
                <span >You commented on this post 👇🏼</span>
                <div className="detail d-flex flex-column ">
                    <div className="d-flex align-items-center spebox2 ">
                        <img src={userdetails?.profilePicture} alt="userphoto" className='singlepostuserphoto mx-1 ' />
                        <span className='mx-1'><b>From  <i style={{ color: 'grey' }}>@{userdetails?.username
                        }</i></b></span>
                    </div>

                </div>

            </div>


            {commentdata.commentText}
            {commentdata.createdAt}
        </div>
    )
}
