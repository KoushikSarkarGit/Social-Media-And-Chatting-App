import React, { useContext, useEffect, useState } from 'react'
import '../pagecss/followercard.css'

import Morefollowersmodal from './Morefollowersmodal'
import FollowerElement from './FollowerElement'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../ContextFolder/ContextCreator'
import EmptyBox from './EmptyBox'


export default function FollowingCard() {

    const navigate = useNavigate();


    const [followinglist, setFollowinglist] = useState([])
    const cur = useContext(Appcontext);
    const { jwtToken } = cur;






    const getFollowingList = async () => {
        try {
            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/user/get-followingsOf-user`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {
                    // console.log(res.data.yourFollowings[0])
                    setFollowinglist(res.data.yourFollowings[0].following)

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
        getFollowingList()
    }, [jwtToken]);


    const [openfollowermodal, setopenfollowermodal] = useState(false)

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className='followercardbox'>
                <span style={{ color: 'rgb(255, 94, 0)' }} >Your Are Following </span>

                {followinglist?.length > 0 ?
                    <>
                        {followinglist?.map((personid, index) => {
                            return <FollowerElement key={index} fdata={personid} />

                        })}
                    </>
                    :
                    <EmptyBox />

                }


            </div>

            {/* did not change name */}
            <Morefollowersmodal openfollower={openfollowermodal} setopenfollower={setopenfollowermodal} initialList={followinglist} />


            {followinglist?.length > 0 && <button className="morefollowers" onClick={() => setopenfollowermodal(true)}><hr className='morefhr' /> <h6> See More Followers</h6> </button>}
        </div>
    )
}
