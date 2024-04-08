import React, { useContext, useEffect, useState } from 'react'

import df2 from '../img/defaultprofimg2.jpg'

import '../pagecss/followercard.css'
import Morewhotofollowmodal from './Morewhotofollowmodal'

import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../ContextFolder/ContextCreator'


export default function Whotofollow() {
    const [openfollowermodal, setopenfollowermodal] = useState(false)


    const navigate = useNavigate();
    const [newpeople, setNewpeople] = useState([])



    const cur = useContext(Appcontext);
    const { jwtToken, userId } = cur;


    const getNewPeopleListLogged = async (manualpage) => {
        try {
            if (jwtToken) {

                await axios.post(`http://localhost:9000/api/v1/user/get-new-people/${manualpage}`,
                    {
                        userId: userId
                    },
                    {
                        headers: {
                            token: jwtToken
                        }
                    }).then(async (res) => {

                        if (res.data.success == true) {
                            setNewpeople(res.data.newpeople)
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



    const getNewPeopleGeneral = async (manualpage) => {
        try {
            await axios.post(`http://localhost:9000/api/v1/user/get-new-people/${manualpage}`
            ).then(async (res) => {

                if (res.data.success === true) {
                    setNewpeople(res.data.newpeople)
                    console.log(res.data.newpeople)
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
        setNewpeople([])
        if (jwtToken && userId) {
            getNewPeopleListLogged(1);
        }
        else {
            getNewPeopleGeneral(1);
        }


    }, []);



    return (
        <div className='mb-4' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className='followercardbox '>
                <h5 >Find New People </h5>

                {
                    newpeople.map((person, index) => {
                        return <div className="indivFollower" key={index * 3}>
                            <div>

                                <img src={person.profilePicture ? person.profilePicture : df2}
                                    alt="userphoto" className='userphoto'
                                    onClick={() => {
                                        navigate(`/view-user-profile/${person?._id}`)
                                    }} />
                                <div className="followerdetails">
                                    <span> <b>{person.firstname}   {person.lastname}</b> </span>
                                    <span>@{person.username}</span>
                                </div>

                            </div>

                            <button className='basicbutton followerbtn' >Follow</button>
                        </div>

                    })
                }


            </div>




            {/* //did not change the props name as i do not have the energy lol!! */}

            <Morewhotofollowmodal
                openfollower={openfollowermodal}
                setopenfollower={setopenfollowermodal}
                initialdata={newpeople}
                jwtToken={jwtToken}
                userId={userId} />


            <button className="morefollowers" onClick={() => {
                if (jwtToken && userId) {
                    setopenfollowermodal(true)
                } else {
                    navigate('/login')
                }
            }}><hr className='morefhr' /> <h6> See More People</h6> </button>
        </div>

    )
}
