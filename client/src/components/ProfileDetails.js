import React, { useState } from 'react'
import '../pagecss/profiledetails.css'
import { UilPen } from "@iconscout/react-unicons";
import Profiledetailsmodal from './Profiledetailsmodal';

export default function ProfileDetails() {

    const [pmodal, setpmodal] = useState(false);

    return (
        <div className='profiledetailsbox'>


            <div className="userinfo">
                <h4>Your Info</h4>

                <div>
                    <UilPen
                        width="2rem"
                        height="1.2rem"
                        onClick={() => setpmodal(true)}
                    />
                    {/* <ProfileModal
                        modalOpened={pmodal}
                        setModalOpened={setpmodal}
                    /> */}
                </div>
            </div>
            <hr style={{ width: '99%', color: 'var(--hrColor)', marginTop: '-1rem', border: '2px solid', borderRadius: '15rem' }} />
            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>Single</span>
            </div>

            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>Mumbai</span>
            </div>

            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span>PWC India </span>
            </div>

            <div className="info">
                <span>
                    <b>Bio </b>
                </span>
                <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea temporibus sunt nostrum consequuntur esse deleniti aperiam sit at...</span>
            </div>

            <Profiledetailsmodal pmodal={pmodal} setpmodal={setpmodal} />
            <div className="btncontainer">
                <button className="basicbutton logout-button" onClick={() => setpmodal(true)} >See More</button>
                <button className="basicbutton logout-button">Logout</button>
            </div>

        </div>
    )
}
