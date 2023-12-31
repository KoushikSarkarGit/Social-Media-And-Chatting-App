import React, { useContext, useEffect, useRef, useState } from 'react'
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
// import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import myprofileimage from "../img/defaultprofimg2.jpg";
import { RxCross1 } from "react-icons/rx";
import { UilLabelAlt } from '@iconscout/react-unicons'
import '../pagecss/sharecomponent.css'
import { Appcontext } from '../ContextFolder/ContextCreator';
import axios from 'axios';
import toast from 'react-hot-toast';



export default function SharePostComponent() {


    const cur = useContext(Appcontext);
    const { userprofileimg } = cur;



    const [postimage, setpostimage] = useState();
    const [taglist, setTaglist] = useState([]);
    const [tagmodal, setTagmodal] = useState(false);
    const [newtag, setNewtag] = useState('');
    const postimgref = useRef('')

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


    const removetag = (index) => {

        const updatedTagList = [...taglist];
        updatedTagList.splice(index, 1);
        setTaglist(updatedTagList);

    }


    const insertimagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {

            setpostimage(URL.createObjectURL(e.target.files[0]))
            console.log('done')
        }
    }



    const finalsubmit = async (e) => {

        e.preventDefault()
        let jwtToken;
        let mydata = await localStorage.getItem('authdata')
        let jsondata = await JSON.parse(mydata)
        jwtToken = jsondata.jwttoken


        try {

            const finalpostval = new FormData();
            finalpostval.append('postdescription', textareaval)
            await finalpostval.append('hashtags', JSON.stringify(taglist))
            await finalpostval.append('postimage', postimgref.current.files[0]);


            // console.log(Object.fromEntries(finalpostval))

            if (jwtToken) {

                await axios.post(`http://localhost:9000/api/v1/post/create-post`,
                    finalpostval,
                    {
                        headers: {
                            token: jwtToken
                        },
                    }).then(async (res) => {

                        if (res.data.success) {
                            setTaglist([]);
                            settextareaval('')
                            setpostimage('')
                            setTagmodal(false)
                            // console.log(res.data)
                            toast.success(res.data.msg)
                        }

                    }).catch((err) => {
                        console.log(err)
                        toast.error('some internal axios error occured')
                    })
            }


        } catch (error) {
            console.log(error)
            toast.error('Oops! Some error happened')
        }

    }




    return (
        <form className='sharecompbox' onSubmit={(e) => { finalsubmit(e) }} >

            <img src={userprofileimg ? userprofileimg : myprofileimage} alt="" className='postcompImg' />

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
                                        return <div className="d-flex indivtag align-items-center mx-1 py-1 badge text-bg-primary" key={index + 's'}>
                                            #{item.tagname}
                                            <RxCross1 className='ms-2 indivtagcross' type='button' onClick={() => removetag(index)} />

                                        </div>
                                    })
                                }

                            </div>

                            <div className="input-group mb-3">

                                <input type="text" className="form-control py-2" placeholder="Enter tag here" aria-label="Recipient's username" aria-describedby="button-addon2" value={newtag}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        const isValidInput = /^[a-zA-Z]+$/.test(inputValue);
                                        if (isValidInput || inputValue === '') {
                                            setNewtag(e.target.value)
                                        }
                                    }} />

                                <button className="btn btn-outline-primary" disabled={newtag.length < 1} type="button" id="button-addon2"

                                    onClick={() => {
                                        setTaglist([...taglist, { "tagname": newtag }]);
                                        setNewtag('')
                                    }} >Add tag</button>
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

                            Tags
                        </div>

                        <button className="basicbutton postbutton" type='submit'  >Share</button>

                        <input type="file" name='imgupload' ref={postimgref} style={{ display: 'none' }} onChange={insertimagehandler} />

                    </div>

                </div>

            </div>
        </form>
    )
}
