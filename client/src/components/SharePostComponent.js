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
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';



export default function SharePostComponent() {


    const cur = useContext(Appcontext);
    const { jwtToken, userdata } = cur;

    const navigate = useNavigate()

    const [wordlimitreached, setwordlimitreached] = useState(false);

    const [postimage, setpostimage] = useState();
    const [taglist, setTaglist] = useState([]);
    const [tagmodal, setTagmodal] = useState(false);
    const [newtag, setNewtag] = useState('');
    const [isloading, setIsloading] = useState(false);
    const postimgref = useRef('')

    const [imageSizeNotValid, setImageSizeNotValid] = useState(false);
    const textarearef = useRef(null)
    const [textareaval, settextareaval] = useState('');


    const maxpostdescriptionlimit = 2000


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
        // if (e.target.files && e.target.files[0]) {

        //     setpostimage(URL.createObjectURL(e.target.files[0]))

        // }
        const imageSizeLimit = 3 * 1024 * 1024;

        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];






            if (selectedFile && selectedFile.size > imageSizeLimit) {
                // Image size exceeds the limit
                toast.error('Image size must be less than 3MB.');
                setImageSizeNotValid(true)
                return;
            }



            if (allowedFileTypes.includes(selectedFile.type)) {
                setpostimage(URL.createObjectURL(selectedFile));

            } else {
                // Display an error message or handle it as per your requirement
                toast.error('Invalid file type. Please select a JPG, JPEG, or PNG file.');
                return;
            }
        }




    }




    const finalsubmit = async (e) => {
        e.preventDefault()

        if (!jwtToken) {
            navigate('/login')
            return
        }

        const selectedFile = postimgref.current.files[0];
        if (selectedFile && textareaval.length < 1) { return }


        if (textareaval.length < 1) { return }


        //swal

        Swal.fire({
            title: 'Are you sure?',
            text: 'The Contents Will Be Posted',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: "rgb(39 216 37)",
            confirmButtonText: 'Post',
            cancelButtonText: `Cancel`
        }).then(async (result) => {

            if (result.isConfirmed) {

                let cjwtToken;
                let mydata = await localStorage.getItem('authdata')
                let jsondata = await JSON.parse(mydata)
                cjwtToken = jsondata.jwttoken


                try {

                    const imageSizeLimit = 3 * 1024 * 1024;
                    // const selectedFile = postimgref.current.files[0];

                    if (selectedFile && selectedFile.size > imageSizeLimit) {
                        // Image size exceeds the limit
                        toast.error('Image size must be less than 3MB.');
                        setImageSizeNotValid(true)
                        return;
                    }

                    const finalpostval = new FormData();
                    finalpostval.append('postdescription', textareaval)
                    await finalpostval.append('hashtags', JSON.stringify(taglist))
                    await finalpostval.append('postimage', postimgref.current.files[0]);


                    // console.log(Object.fromEntries(finalpostval))

                    if (cjwtToken) {
                        setIsloading(true)

                        await axios.post(`http://localhost:9000/api/v1/post/create-post`,
                            finalpostval,
                            {
                                headers: {
                                    token: cjwtToken
                                },
                            }).then(async (res) => {

                                if (res.data.success) {
                                    setTaglist([]);
                                    settextareaval('')
                                    setpostimage('')
                                    setTagmodal(false)
                                    // console.log(res.data)

                                    Swal.fire({
                                        title: "Post Created Successfully",
                                        icon: 'success',
                                        allowOutsideClick: false,
                                        confirmButtonText: "Ok"
                                    })
                                }
                                else {
                                    Swal.fire({
                                        title: "Oops...?",
                                        text: "Something went wrong!",
                                        icon: "error"
                                    });
                                }

                                setIsloading(false)

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

        })

        //swal


    }






    const showAlert = () => {
        Swal.fire({
            title: "Your post is being created...", // Adjust title as needed
            icon: 'info',
            html: isloading ? `     
                    <div class="spinner-border my-2 text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>        
          `
                : "",
            timer: 20000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false, // Prevent outside click closing
            backdrop: true, // Add a backdrop for emphasis
            willClose: () => {

                if (isloading) {
                    // Alert the user or prevent closing 
                    Swal.fire({
                        title: "Loading...",
                        icon: 'info',
                        html: `
                        <div class="spinner-border text-warning my-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div> 
                        `,
                        allowOutsideClick: false,
                        backdrop: true,
                    });
                }
            }
        });
    };












    useEffect(() => {
        if (isloading) {
            showAlert();



            setTimeout(() => {
                setIsloading(false)
            }, 10000);



        }
    }, [isloading]);



    useEffect(() => {
        if (textareaval.length >= maxpostdescriptionlimit) {
            setwordlimitreached(true)

        }
        else {
            setwordlimitreached(false)
        }

    }, [textareaval]);














    return (
        <form className='sharecompbox' onSubmit={(e) => { finalsubmit(e) }} >
            {/* <Toaster /> */}
            <img src={userdata?.profilePicture ? userdata?.profilePicture : myprofileimage} alt="" className='postcompImg' />

            <div className="postbox">

                <div>

                    <textarea
                        className='form-control '
                        placeholder="What's happening"
                        name='textareaval'
                        value={textareaval}
                        ref={textarearef}
                        maxLength={maxpostdescriptionlimit}
                        onChange={(event) => onchangehandler(event)} />

                    {wordlimitreached && <span style={{ color: 'red' }}>*maximum word limit reached  ({maxpostdescriptionlimit}/{maxpostdescriptionlimit})</span>}


                    {postimage && <div className="tobeuloadedimg">
                        {imageSizeNotValid && <span style={{ color: 'red' }}> *image size must be under 3 Mb</span>}
                        <div className="imgdismiss" >
                            <UilTimes onClick={() => { setpostimage(null); setImageSizeNotValid(false) }} id='postImageDismiss' style={{ color: "rgb(255, 38, 0)" }} />
                        </div>
                        <div className="imgbox">
                            <img src={postimage} alt="postIMG" />
                        </div>

                    </div>}

                    {
                        tagmodal && <div className='tagbox '>
                            <div className='d-flex flex-column  flex-wrap px-2 py-2 my-1'>


                                {taglist.length >= 10 && <span style={{ color: 'red' }}>*maximum tag limit reached (10/10)</span>}

                                <span className='me-2'> <b>Tags:</b></span>

                                <div className='d-flex flex-row flex-wrap '>
                                    {
                                        taglist.map((item, index) => {
                                            return <div className="d-flex indivtag align-items-center mx-1 py-1 my-1 badge text-bg-primary" key={index + 's'}>
                                                #{item.tagname}
                                                <RxCross1 className='ms-2 indivtagcross' type='button' onClick={() => removetag(index)} />

                                            </div>
                                        })
                                    }
                                </div>



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

                                <button className="btn btn-outline-primary"
                                    disabled={(newtag.length < 1 || taglist.length >= 10)}
                                    type="button"
                                    id="button-addon2"

                                    onClick={() => {
                                        setTaglist([...taglist, { "tagname": newtag }]);
                                        setNewtag('')
                                    }}
                                >Add tag</button>
                            </div>
                        </div>
                    }






                    <div className="postingfeatures">
                        <div className="feature" style={{ color: "var(--photo)" }} onClick={() => {
                            postimgref.current.click()
                            setImageSizeNotValid(false);
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

                        <button
                            className="basicbutton postbutton"
                            type='submit'


                            onClick={() => {
                                if (!jwtToken) {
                                    navigate('/login')
                                }

                                if (postimage && textareaval.length < 1) {
                                    toast('Please Add Caption', {
                                        icon: '🐣',
                                    })
                                    return
                                }
                                else if (textareaval.length < 1) {
                                    toast('Please Enter Some Text In Your Post', {
                                        icon: '🐣',
                                    })
                                    return
                                }

                            }}

                        >
                            Share
                        </button>

                        <input type="file" name='imgupload' ref={postimgref} style={{ display: 'none' }} onChange={insertimagehandler} />

                    </div>

                </div>

            </div>
        </form>
    )
}
