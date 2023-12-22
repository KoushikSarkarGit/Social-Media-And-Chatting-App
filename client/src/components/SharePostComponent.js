import React, { useEffect, useRef, useState } from 'react'
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
// import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import myprofileimage from "../img/profileImg.jpg";
import { RxCross1 } from "react-icons/rx";
import { UilLabelAlt } from '@iconscout/react-unicons'
import '../pagecss/sharecomponent.css'

export default function SharePostComponent() {

    const [postimage, setpostimage] = useState();
    const [taglist, setTaglist] = useState([{ "tagname": "tagdfdfdfdfdf1" }, { "tagname": "tag2" }, { "tagname": "tag3" }]);
    const [tagmodal, setTagmodal] = useState(false);


    const postimgref = useRef()


    const textarearef = useRef(null)
    const [textareaval, settextareaval] = useState('');

    const onchangehandler = (event) => {

        settextareaval(event.target.value)

    }


    useEffect(() => {
        textarearef.current.style.height = 'auto';
        textarearef.current.style.height = textarearef.current.scrollHeight + 'px';
        if (textarearef.current.clientHeight < 85) { // Adjust the minimum height as needed
            textarearef.current.style.height = '53px';
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

                    <textarea className='form-control ' placeholder="What's happening" name='textareaval' value={textareaval} ref={textarearef} onChange={(event) => onchangehandler(event)} />


                    {postimage && <div className="tobeuloadedimg">
                        <div className="imgdismiss" >
                            <UilTimes onClick={() => { setpostimage(null) }} id='postImageDismiss' style={{ color: "rgb(255, 38, 0)" }} />
                        </div>
                        <div className="imgbox">
                            <img src={postimage} alt="postIMG" />
                        </div>

                    </div>}

                    {
                        tagmodal && <div className='tagbox '>
                            <div className='d-flex flex-wrap px-2 py-2 my-1'>

                                <span className='me-2'> <b>Tags:</b></span>

                                {
                                    taglist.map((item, index) => {
                                        return <div className="d-flex  align-items-center mx-1 py-1 badge text-bg-primary" key={index + 's'}>
                                            #{item.tagname}
                                            <RxCross1 className='ms-2 indivtagcross' type='button' />
                                            {/* <button type="button" className="btn-close ms-2 " data-bs-dismiss="modal" aria-label="Close"></button> */}
                                        </div>
                                    })
                                }

                            </div>

                            <div className="input-group mb-3">

                                <input type="text" class="form-control py-2" placeholder="Enter tag here" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                <button className="btn btn-outline-primary" type="button" id="button-addon2">Add tag</button>
                            </div>
                        </div>
                    }






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
                        <div className={`feature + ${tagmodal ? 'clickedfeature' : ''}`} style={{ color: "blue" }}
                            onClick={() => {
                                if (tagmodal === true) {
                                    setTagmodal(false)
                                }
                                else {
                                    setTagmodal(true)
                                }
                            }}  >

                            <UilLabelAlt className='sharefeaturecomp ' />

                            Add Tag
                        </div>

                        <button className="basicbutton postbutton">Share</button>

                        <input type="file" name='imgupload' ref={postimgref} style={{ display: 'none' }} onChange={insertimagehandler} />

                    </div>

                </div>

            </div>
        </div>
    )
}
