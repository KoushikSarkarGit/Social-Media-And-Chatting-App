import React, { useContext, useEffect, useState } from 'react'
import '../pagecss/followercard.css'


import defaultPrifileImg from '../img/defaultImage.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../ContextFolder/ContextCreator'
import toast from 'react-hot-toast'


export default function FollowerElement(props) {


    const [follower, setFollower] = useState([])
    const cur = useContext(Appcontext);
    const { jwtToken } = cur;

    const navigate = useNavigate();


    const getFollowerData2 = async () => {
        try {

            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/user/get-user-light/${props.fdata}`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {

                    // console.log(res.data.curuser)

                    setFollower(res.data.curuser)


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
        getFollowerData2()
    }, []);






    return (
        <div className="indivFollower" >
            <div>

                <img
                    src={follower.profilePicture ? follower.profilePicture : defaultPrifileImg}
                    alt="userphoto"
                    className='userphoto'
                    onClick={() => {
                        navigate(`/view-user-profile/${follower?._id}`)
                    }} />
                <div className="followerdetails">
                    <span> <b>{follower.firstname}</b> </span>
                    <span>@{follower.username}</span>
                </div>

            </div>

            <button className='basicbutton followerbtn px-1'  >Unfollow</button>
        </div>
    )
}
