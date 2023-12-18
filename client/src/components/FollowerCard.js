import React, { useState } from 'react'
import '../pagecss/followercard.css'
import img1 from '../img/img1.png'
import img2 from '../img/img2.png'
// import FollowerModal from './FollowerModal'
import Morefollowersmodal from './Morefollowersmodal'
import FollowerElement from './FollowerElement'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


export default function FollowerCard() {

    // let follweridlist = localStorage.getItem("authdata").sentuser.followers

    const navigate = useNavigate();

    const [followerlist, setFollowerlist] = useState([])


    const followSomeone = async () => {
        try {
            await axios.put(`http://localhost:9000/api/v1/user/follow-user/64d104c56d7a4d72168abaa4`).then(async (res) => {

                console.log(res.data)


            }).catch((err) => {

                console.log(err)
                toast.error('some internal axios error occured')

            })
        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
        }
    }




    const getFollowerList = async () => {
        try {
            await axios.put(`http://localhost:9000/api/v1/user/follow-user/64d104c56d7a4d72168abaa4`).then(async (res) => {

                console.log(res.data)


            }).catch((err) => {

                console.log(err)
                toast.error('some internal axios error occured')

            })
        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
        }
    }






    const [openfollowermodal, setopenfollowermodal] = useState(false)

    const followerdata = [{
        name: 'Koushik Sarkar',
        username: 'karma',
        img: img1
    },
    {
        name: 'Jeet kumar Sarkar ',
        username: 'jeet',
        img: img2
    },
    {
        name: 'just ',
        username: 'karma',
        img: img1
    },
    {
        name: 'ABC Sarkar ',
        username: 'jeet',
        img: img2
    }
    ]

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className='followercardbox'>
                <h5 >Your Followers </h5>

                {
                    followerdata.map((personid, index) => {
                        return <FollowerElement key={index} fdata={personid} />

                    })
                }


            </div>

            {/* <FollowerModal openfollowermodal={openfollowermodal} setopenfollowermodal={setopenfollowermodal} /> */}
            <Morefollowersmodal openfollower={openfollowermodal} setopenfollower={setopenfollowermodal} />


            <button className="morefollowers" onClick={() => setopenfollowermodal(true)}><hr className='morefhr' /> <h6> See More Followers</h6> </button>
        </div>

    )
}
