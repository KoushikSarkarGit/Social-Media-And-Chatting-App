import React, { useEffect, useRef, useState } from 'react'
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


    const textarearef = useRef(null)
    const [textareaval, settextareaval] = useState('');

    const onchangehandler = (event) => {

        settextareaval(event.target.value)

    }


    useEffect(() => {
        textarearef.current.style.height = 'auto';
        textarearef.current.style.height = textarearef.current.scrollHeight + 'px';
        if (textarearef.current.clientHeight < 90) { // Adjust the minimum height as needed
            textarearef.current.style.height = '50px';
        }

    }, [textareaval])




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

                    <textarea className='form-control' placeholder="What's happening" name='textareaval' value={textareaval} ref={textarearef} onChange={(event) => onchangehandler(event)} />

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
                        <div className="imgdismiss" >
                            <UilTimes onClick={() => { setpostimage(null) }} id='postImageDismiss' style={{ color: "rgb(255, 38, 0)" }} />
                        </div>
                        <div className="imgbox">
                            <img src={postimage} alt="image" />
                        </div>

                    </div>}

                </div>

            </div>
        </div>
    )
}
