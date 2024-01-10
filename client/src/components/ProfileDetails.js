import React, { useContext, useState } from 'react'
import '../pagecss/profiledetails.css'

import { UilPen } from "@iconscout/react-unicons";
import Profiledetailsmodal from './Profiledetailsmodal';
import { Appcontext } from '../ContextFolder/ContextCreator';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { Formik, useFormik } from 'formik';

export default function ProfileDetails() {

    const cur = useContext(Appcontext);
    const { jwtToken, userlastname, userfristname, username, userdata, logoutfunction } = cur;
    const [pmodal, setpmodal] = useState(false);
    const navigate = useNavigate()

    const profiledetailslogout = () => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: 'This will log you Out',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: "#d33",
                confirmButtonText: 'Yes, LogOut'
            }).then((result) => {

                if (result.isConfirmed) {
                    logoutfunction()
                    setTimeout(() => {
                        navigate('/login')
                    }, 200);
                }

            })

        } catch (error) {
            console.log(error)
        }
    }





    let myinitialvalues = {

        usernamef: username,
        fristnamef: userfristname,
        lastnamef: userlastname,
        sexf: userdata.sex,
        phonef: userdata.phone,
        biof: userdata.bio,
        livesinf: userdata.livesin,
        worksAtf: userdata.worksAt,
        relationshipf: userdata.relationship

    }




    const {
        usernamef,
        fristnamef,
        lastnamef,
        sexf,
        phonef,
        biof,
        livesinf,
        worksAtf,
        relationshipf,

        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        touched

    } = useFormik({
        initialValues: myinitialvalues,
        // validationSchema: loginschema,
        onSubmit: async (values, action) => {

            console.log(values);

            // try {
            //     await axios.post(`http://localhost:9000/api/v1/user/login`, {

            //         email: values.email,
            //         password: values.password,
            //     }).then(async (res) => {




            //     }).catch((err) => {

            //         console.log(err)
            //         toast.error('some internal axios error occured')

            //     })
            // } catch (error) {
            //     console.log(error)
            //     toast.error('some internal error occured')
            // }


        }
    })












    return (
        <div className='profiledetailsbox'>


            <div className="userinfo">
                <h4 className='text-center flex-fill'>Your Info</h4>

                <div className='px-1 py-1 editbtn' type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                    <UilPen
                        width="2rem"
                        height="1.6rem"
                        style={{ color: '#0079ff' }}
                    />
                </div>
            </div>
            <hr className='hrprofdet' />


            <div className="info">
                {userfristname ? <div><b>Name:</b>  {userfristname} {userlastname}  </div> : <div><b>Name:</b>  ...  </div>}
            </div>


            <div className="info">
                {username ? <div><b>Username:</b>  @{username}   </div> : <div><b>Username:</b>  ...  </div>}
            </div>

            <div className="info">
                {userdata?.sex ? <div><b>Gender:</b>  {userdata.sex}  </div> : <div><b>Gender:</b>  ...  </div>}
            </div>


            <div className="info">
                {userdata?.livesin ? <div> <b>Lives in:</b>  {userdata.livesin}  </div> : <div><b>Lives in:</b>  ...  </div>}
            </div>


            <div className="info">
                {userdata?.worksAt ? <div> <b>Works At:</b>  {userdata.worksAt}  </div> : <div><b>Works At:</b>  ...  </div>}
            </div>


            {/* <div className="info">
                {userdata?.relationship ? <div> <b>Relationship Status:</b>   {userdata.relationship}  </div> : <div><b>Relationship Status:</b>  ...  </div>}
            </div> */}


            <div className="info">
                {userdata?.bio ? <div> <b>Bio:</b>   {userdata?.bio.length > 20 ? <>{userdata?.bio.splice(0, 20)} ...</> : userdata?.bio}  </div> : <div><b>Bio:</b>  ...  </div>}
            </div>


            <div className=" text-center " style={{ marginBottom: '-0.7rem', marginTop: '-1.7rem' }}>
                <h2>...</h2>

            </div>

            <Profiledetailsmodal pmodal={pmodal} setpmodal={setpmodal}
                jwtToken={jwtToken}
                userlastname={userlastname}
                userfristname={userfristname}
                username={username}
                userdata={userdata} />

            <div className="btncontainer">
                <button className="basicbutton logout-button" onClick={() => setpmodal(true)} >See More</button>
                <button className="basicbutton logout-button" onClick={() => { profiledetailslogout() }} >Logout</button>
            </div>







            {/* modal for edit details start here */}

            <div className="modal fade  " id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Profile Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" defaultValue={userdata?.email} aria-describedby="emailHelp" disabled />

                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                                        <input type="text" className="form-control" name='fristnamef' value={fristnamef} defaultValue={userdata?.firstname} aria-label="First name" onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" aria-label="Last name" name='lastnamef' value={lastnamef} defaultValue={userlastname} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                        <input type="text" className="form-control" aria-label="First name" name='usernamef' value={usernamef} defaultValue={username} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Gender</label>
                                        <select className="form-select" id="sexinput" aria-label="Default select example" name='sexf'
                                            value={sexf} onChange={handleChange} onBlur={handleBlur} >

                                            <option defaultValue value={null} >Select Your Gender</option>
                                            <option value={'male'}>Male</option>
                                            <option value={'female'}>Female</option>
                                            <option value={'others'}>Others</option>
                                            <option value={null}>Don't Want to Reveal</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Lives In</label>
                                        <input type="text" className="form-control" aria-label="First name" name='livesinf' value={livesinf} defaultValue={userdata.livesin} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Working At</label>
                                        <input type="text" className="form-control" aria-label="Last name" name='worksAtf' value={worksAtf} defaultValue={userdata.worksAt} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                                        <input type="text" className="form-control" aria-label="First name" name='phonef' value={phonef} defaultValue={userdata.phone} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Relationship Status</label>
                                        <input type="text" className="form-control" aria-label="Last name" name='relationshipf' value={relationshipf} defaultValue={userdata.relationship} onChange={handleChange} onBlur={handleBlur} />
                                    </div>
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Bio</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={2} defaultValue={userdata.bio} name='biof' value={biof} onChange={handleChange} onBlur={handleBlur} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                handleSubmit()
                            }} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    )
}
