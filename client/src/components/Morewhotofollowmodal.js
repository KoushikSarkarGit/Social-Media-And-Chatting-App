import React from 'react'
import '../pagecss/followercard.css'

import { Modal, useMantineTheme } from '@mantine/core';

import img1 from '../img/img1.png'
import img2 from '../img/img2.png'



export default function Morewhotofollowmodal({ openfollower, setopenfollower }) {

    const theme = useMantineTheme();
    const demofollowerdata = [{
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
                            demofollowerdata.map((person, index) => {
                                return <div className="indivFollower" key={index * 3}>
                                    <div>

                                        <img src={person.img} alt="userphoto" className='userphoto' />
                                        <div className="followerdetails">
                                            <span> <b>{person.name}</b> </span>
                                            <span>@{person.username}</span>
                                        </div>

                                    </div>

                                    <button className='basicbutton followerbtn' >Follow</button>
                                </div>

                            })
                        }

                        <div className="seemorebtn"> See More</div>

                    </div>
                </>


            </Modal>


        </>
    )
}
