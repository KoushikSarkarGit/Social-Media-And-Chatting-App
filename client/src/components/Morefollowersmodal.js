import React, { useContext, useEffect, useState } from 'react'
import '../pagecss/followercard.css'


import { Modal, useMantineTheme } from '@mantine/core';

import img1 from '../img/img1.png'
import img2 from '../img/img2.png'
import { Appcontext } from '../ContextFolder/ContextCreator';
import toast from 'react-hot-toast';
import axios from 'axios';
import FollowerElement from './FollowerElement';



export default function SharePostModal({ openfollower, setopenfollower, initialList }) {


    const [morefollowerlist, setMorefollowerlist] = useState()
    const [pageno, setPageno] = useState(2)
    const cur = useContext(Appcontext);
    const { jwtToken } = cur;


    const getFollowerList = async () => {
        try {

            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/user/get-follower-list/${pageno}`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {

                    console.log(pageno, res.data.myuser[0].followers)
                    // setFollowerlist(res.data.yourFollowers[0].followers)
                    setMorefollowerlist([...morefollowerlist, ...res.data.myuser[0].followers])


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

        setMorefollowerlist(initialList)
        setPageno(2)
    }, [openfollower]);



    const theme = useMantineTheme();

    return (
        <>
            <Modal title="All Followers"


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
                            morefollowerlist?.map((personid, index) => {
                                return <FollowerElement key={index} fdata={personid} />

                            })
                        }

                        <div className="seemorebtn" onClick={async () => {
                            await setPageno(pageno + 1)
                            await getFollowerList();
                            // await console.log(pageno, morefollowerlist)
                        }} > See More</div>

                    </div>
                </>


            </Modal>


        </>
    )
}
