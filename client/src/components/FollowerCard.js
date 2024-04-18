import React, { useContext, useEffect, useState } from 'react'
import '../pagecss/followercard.css'

import Morefollowersmodal from './Morefollowersmodal'
import FollowerElement from './FollowerElement'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../ContextFolder/ContextCreator'
import EmptyBox from './EmptyBox'

export default function FollowerCard() {

    // let follweridlist = localStorage.getItem("authdata").sentuser.followers

    const navigate = useNavigate();


    const [followerlist, setFollowerlist] = useState([])
    const cur = useContext(Appcontext);
    const { jwtToken } = cur;






    const getFollowerList = async () => {
        try {
            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/user/get-followersOf-user`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {
                    // console.log(res.data.yourFollowers[0].followers)
                    setFollowerlist(res.data.yourFollowers[0].followers)

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
        getFollowerList()
    }, [jwtToken]);


    const [openfollowermodal, setopenfollowermodal] = useState(false)


    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className='followercardbox'>
                <span style={{ color: 'rgb(255, 94, 0)' }} >Your Followers </span>

                {followerlist.length > 0 ?
                    <>
                        {followerlist.map((personid, index) => {
                            return <FollowerElement key={index} fdata={personid} />

                        })}
                    </>
                    :
                    <EmptyBox />

                }


            </div>

            {/* <FollowerModal openfollowermodal={openfollowermodal} setopenfollowermodal={setopenfollowermodal} /> */}
            <Morefollowersmodal openfollower={openfollowermodal} setopenfollower={setopenfollowermodal} initialList={followerlist} />


            {followerlist.length > 0 && <button className="morefollowers" onClick={() => setopenfollowermodal(true)}><hr className='morefhr' /> <h6> See More Followers</h6> </button>}
        </div>

    )
}
