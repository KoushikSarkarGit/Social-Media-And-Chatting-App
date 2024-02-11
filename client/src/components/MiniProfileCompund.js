import React, { useContext, useRef, useState } from 'react'

import '../pagecss/miniprofilecard.css'


import { UilEllipsisV } from '@iconscout/react-unicons'
import { UilTimes } from "@iconscout/react-unicons";
import { Appcontext } from '../ContextFolder/ContextCreator'
import defaultprofileimg2 from '../img/defaultprofimg2.jpg'
import axios from 'axios'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

export default function MiniProfileCompund() {

    const cur = useContext(Appcontext);
    const { username, userdata, jwtToken, userId, setNeedtorun, needtorun } = cur;
    const [tobeuploadedprofilePic, setTobeuploadedprofilePic] = useState()
    const [imageSizeNotValid, setImageSizeNotValid] = useState(false);
    const profileImageRef = useRef(null)

    const [profilepicselected, setProfilepicselected] = useState(false);
    const [coverpicselected, setCoverpicselected] = useState(false);

    const uploadProfileImage = async () => {

        const imageSizeLimit = 3 * 1024 * 1024;

        const selectedFile = profileImageRef.current.files[0];
        if (selectedFile && selectedFile.size > imageSizeLimit) {
            // Image size exceeds the limit
            toast.error('Image size must be less than 3MB.');
            setImageSizeNotValid(true)
            profileImageRef.current.value = null
            return;
        }

        const finalimage = new FormData();
        await finalimage.append('profilePicture', profileImageRef.current.files[0]);

        if (jwtToken && userId) {

            try {
                await axios.put(`http://localhost:9000/api/v1/user/update-profilepic/${userId}`,
                    finalimage,
                    {
                        headers: {
                            token: jwtToken
                        }
                    }

                ).then(async (res) => {
                    console.log(res.data)

                    if (res.data.success === true) {
                        Swal.fire({
                            title: "Profile Image Updated Successfully",
                            icon: 'success',
                            allowOutsideClick: false,
                            confirmButtonText: "Ok"
                        })

                        needtorun ? setNeedtorun(false) : setNeedtorun(true);

                    } else {
                        Swal.fire({
                            title: "Oops...?",
                            text: "Something went wrong!",
                            icon: "error"
                        });
                    }


                }).catch((err) => {

                    console.log(err)
                    toast.error('some internal axios error occured')

                })
            } catch (error) {
                console.log(error)
                toast.error('some internal error occured')
            }



        }


    }



    const uploadCoverImage = async () => {

        const imageSizeLimit = 3 * 1024 * 1024;
        const selectedFile = profileImageRef.current.files[0];

        if (selectedFile) {
            toast.error('No Image Selected');
            return;
        }

        if (selectedFile && selectedFile.size > imageSizeLimit) {
            // Image size exceeds the limit
            toast.error('Image size must be less than 3MB.');
            setImageSizeNotValid(true)
            profileImageRef.current.value = null
            return;
        }

        const finalimage = new FormData();
        await finalimage.append('coverPicture', profileImageRef.current.files[0]);

        if (jwtToken && userId) {

            try {
                await axios.put(`http://localhost:9000/api/v1/user/update-coverpic/${userId}`,
                    finalimage,
                    {
                        headers: {
                            token: jwtToken
                        }
                    }

                ).then(async (res) => {

                    if (res.data.success === true) {
                        Swal.fire({
                            title: "Cover Image Updated Successfully",
                            icon: 'success',
                            allowOutsideClick: false,
                            confirmButtonText: "Ok"
                        })
                    } else {
                        Swal.fire({
                            title: "Oops...?",
                            text: "Something went wrong!",
                            icon: "error"
                        });
                    }


                }).catch((err) => {
                    console.log(err)
                    toast.error('some internal axios error occured')

                })
            } catch (error) {
                console.log(error)
                toast.error('some internal error occured')
            }
        }

    }






    const insertimagehandler = (e) => {

        const imageSizeLimit = 3 * 1024 * 1024;

        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];


            if (selectedFile && selectedFile.size > imageSizeLimit) {
                // Image size exceeds the limit
                toast.error('Image size must be less than 3MB.');
                setImageSizeNotValid(true)
                profileImageRef.current.value = null
                return;
            }



            if (allowedFileTypes.includes(selectedFile.type)) {
                setTobeuploadedprofilePic(URL.createObjectURL(selectedFile));

            } else {
                // Display an error message or handle it as per your requirement
                toast.error('Invalid file type. Please select a JPG, JPEG, or PNG file.');
                profileImageRef.current.value = null
                return;
            }
        }


    }





    return (
        <div className='miniprofilecardbox'>


            <div className="miniprofileimg">
                <img src={userdata?.profilePicture ? userdata?.profilePicture : defaultprofileimg2} alt="myprofilepic" />
            </div>

            <div className="ProfileDetails">
                <span> <b> {userdata ? (userdata?.firstname + ' ' + userdata.lastname) : <div style={{ color: 'grey' }}>Please Sign In</div>}</b> </span>
                <span >{username ? '@' + username : ''}</span>
            </div>


            {/* dropdown option  */}
            <div className="moreicon dropend" >
                {jwtToken ? <UilEllipsisV className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" /> : <UilEllipsisV onClick={() => {
                    toast('Please Login First!', {
                        icon: '🐣',
                    })
                }} />}


                <ul className="dropdown-menu " style={{ position: 'absolute', minWidth: 'auto' }}>
                    <li>
                        <button
                            className="dropdown-item px-3 "
                            type="button"
                            style={{ color: 'rgb(255 92 7)' }}
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => {
                                setProfilepicselected(true)
                                setCoverpicselected(false)
                            }}
                        >

                            Change Profile Image
                        </button>
                    </li>


                    <li>
                        <button
                            className="dropdown-item px-3 "
                            type="button"
                            style={{ color: 'rgb(255 92 7)' }}
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => {
                                setProfilepicselected(false)
                                setCoverpicselected(true)
                            }}
                        >
                            Change Cover Image
                        </button>
                    </li>

                </ul>

            </div>



            {/* modal starts here  */}
            <div>

                {/* Modal */}
                <div className="modal fade modal-lg" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div className="modal-dialog" >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">{profilepicselected ? 'Change Profile Picture' : 'Change Cover Picture'}</h1>
                                <button type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal" aria-label="Close"
                                    onClick={() => {
                                        setTobeuploadedprofilePic(null);
                                        setImageSizeNotValid(false);
                                        profileImageRef.current.value = null
                                    }}
                                />
                            </div>
                            <div className="modal-body">







                                <div className="input-group">
                                    <input type="file"
                                        className="form-control"
                                        id="inputGroupFile04"
                                        aria-describedby="inputGroupFileAddon04"
                                        aria-label="Upload"
                                        ref={profileImageRef}
                                        onChange={insertimagehandler}

                                    />

                                </div>





                                {tobeuploadedprofilePic && <div className="tobeuloadedimg2 mt-3">
                                    {imageSizeNotValid && <span style={{ color: 'red' }}> *image size must be under 3 Mb</span>}
                                    <div className="imgdismiss2" >
                                        <UilTimes onClick={() => {
                                            setTobeuploadedprofilePic(null);
                                            setImageSizeNotValid(false);
                                            profileImageRef.current.value = null
                                        }}
                                            id='postImageDismiss2'
                                            style={{ color: "rgb(255, 38, 0)" }} />
                                    </div>
                                    <div className="imgbox2 mt-3">
                                        <img src={tobeuploadedprofilePic} alt="ProfileIMG" />
                                    </div>

                                </div>}




                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        setTobeuploadedprofilePic(null);
                                        setImageSizeNotValid(false)
                                        profileImageRef.current.value = null
                                    }}
                                >Close</button>
                                <button type="button"
                                    className="btn btn-primary"
                                    onClick={() => {

                                        Swal.fire({
                                            title: 'Are you sure?',
                                            text: 'The Image Will Be saved',
                                            icon: 'question',
                                            showCancelButton: true,
                                            confirmButtonColor: "rgb(39 216 37)",
                                            confirmButtonText: 'Save',
                                            cancelButtonText: `Cancel`
                                        }).then(async (result) => {

                                            if (result.isConfirmed) {
                                                if (profileImageRef) {
                                                    uploadProfileImage()
                                                }
                                                else if (coverpicselected) {
                                                    uploadCoverImage()
                                                }
                                                else {
                                                    return
                                                }

                                            }


                                        })

                                    }}
                                >Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>










        </div>
    )
}



