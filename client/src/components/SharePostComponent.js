import React, { useRef, useState } from 'react'
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import myprofileimage from "../img/profileImg.jpg";

import { UilLabelAlt } from '@iconscout/react-unicons'
import '../pagecss/sharecomponent.css'

export default function SharePostComponent() {

    const [postimage, setpostimage] = useState();
    const postimgref = useRef()

    const insertimagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {

            setpostimage(URL.createObjectURL(e.target.files[0]))
            console.log('done')
        }
    }


    return (
        <div className='sharecompbox' >

            <img src={myprofileimage} alt="" className='postcompImg' />

            <div className="postbox">

                <div>

                    <input type="text" placeholder="What's happening" />

                    <div className="postingfeatures">
                        <div className="feature" style={{ color: "var(--photo)" }} onClick={() => {
                            postimgref.current.click()
                        }}  >
                            <UilScenery />
                            Photo
                        </div>
                        <div className="feature" style={{ color: "red" }}>
                            <UilPlayCircle />
                            Video
                        </div>{" "}
                        <div className="feature" style={{ color: "orange" }}>

                            < UilSchedule />


                            Schedule
                        </div>{" "}
                        <div className="feature" style={{ color: "blue" }}>

                            <UilLabelAlt className='sharefeaturecomp' />

                            Add Tag
                        </div>

                        <button className="basicbutton postbutton">Share</button>

                        <input type="file" name='imgupload' ref={postimgref} style={{ display: 'none' }} onChange={insertimagehandler} />

                    </div>
                    {postimage && <div className="tobeuloadedimg">
                        <UilTimes onClick={() => { setpostimage(null) }} id='postImageDismiss' style={{ color: "rgb(255, 38, 0)" }} />
                        <div className="imgbox">
                            <img src={postimage} alt="image" />
                        </div>

                    </div>}

                </div>

            </div>
        </div>
    )
}
