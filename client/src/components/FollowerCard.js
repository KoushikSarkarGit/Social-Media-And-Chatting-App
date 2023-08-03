import React from 'react'
import '../pagecss/followercard.css'
import img1 from '../img/img1.png'
import img2 from '../img/img2.png'

export default function FollowerCard() {

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
    },
    {
        name: 'Jeet kumar Sarkar ',
        username: 'jeet',
        img: img2
    }, {
        name: 'Jeet kumar Sarkar ',
        username: 'jeet',
        img: img2
    }
    ]

    return (
        <div style={{ width: '100%' }}>
            <div className='followercardbox'>
                <h3>Your Followers </h3>

                {
                    followerdata.map((person, index) => {
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

            </div>
        </div>

    )
}