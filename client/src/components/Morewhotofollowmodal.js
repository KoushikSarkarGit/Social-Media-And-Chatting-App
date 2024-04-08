import React, { useEffect, useState } from 'react'
import '../pagecss/followercard.css'

import df2 from '../img/defaultprofimg2.jpg'
import { Modal, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'




export default function Morewhotofollowmodal({ openfollower, setopenfollower, initialdata, jwtToken, userId }) {

    const theme = useMantineTheme();

    const navigate = useNavigate();
    const [newpeople, setNewpeople] = useState([])
    const [reachedend, setReachedend] = useState(false)

    const [page, setPage] = useState(1)


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
                            setNewpeople(prevlist => [...prevlist, ...res.data.newpeople])
                        }

                        if (res.data.newpeople?.length < 1) {
                            setReachedend(true)
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


    useEffect(() => {

        setNewpeople(initialdata)
        setPage(1)
        setReachedend(false)
        console.log(initialdata)
    }, [openfollower]);




    return (
        <>
            <Modal title="Find People Here"


                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}

                size="50%"
                opened={openfollower}
                onClose={() => setopenfollower(false)}

            >

                <>
                    <div className="morefollowerbox">

                        {
                            newpeople.map((person, index) => {
                                return <div className="indivFollower" key={index * 3}>
                                    <div>

                                        <img
                                            src={person.profilePicture ? person.profilePicture : df2} alt="userphoto" className='userphoto'
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

                        {reachedend ? null : <div className="seemorebtn" onClick={async () => {
                            await getNewPeopleListLogged(page + 1);
                            setPage(page + 1);
                        }}> See More</div>}

                    </div>
                </>


            </Modal>


        </>
    )
}
