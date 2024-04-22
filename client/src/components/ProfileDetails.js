import React, { useContext, useRef, useState } from 'react'
import '../pagecss/profiledetails.css'
import '../pagecss/authorization.css'

import { UilPen } from "@iconscout/react-unicons";
import Profiledetailsmodal from './Profiledetailsmodal';
import { Appcontext } from '../ContextFolder/ContextCreator';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { Formik, useFormik } from 'formik';
import { editmodalschema } from '../YupSchemas/yupschemafile'
import axios from 'axios'
import toast from 'react-hot-toast'


export default function ProfileDetails() {

    const cur = useContext(Appcontext);
    const modalRef = useRef(null);
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
        touched,
        resetForm,
        isValid

    } = useFormik({
        initialValues: myinitialvalues,
        validationSchema: editmodalschema,
        onSubmit: async (values, action) => {

            Swal.fire({
                title: 'Are you sure?',
                text: 'The changes will be made',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: "#d33",
                confirmButtonText: 'Save Changes',
                cancelButtonText: `Go back`
            }).then(async (result) => {

                if (result.isConfirmed) {
                    resetForm()
                    modalRef.current.click();
                    console.log(values);


                    try {
                        await axios.put(`http://localhost:9000/api/v1/user/update-userdetails/${userdata._id}`, {
                            username: values.usernamef,
                            fristname: values.fristnamef,
                            lastname: values.lastnamef,
                            sex: values.sexf,
                            phone: values.phonef,
                            bio: values.biof,
                            livesin: values.livesinf,
                            worksAt: values.worksAtf,
                            relationship: values.relationshipf
                        },
                            {
                                headers: { token: jwtToken }
                            }
                        ).then(async (res) => {

                            if (res.data.success == true) {

                                const authData = await JSON.parse(localStorage.getItem('authdata'));

                                authData.sentuser.username = await res.data.updateduser.username;
                                authData.sentuser.fristname = await res.data.updateduser.fristname;
                                authData.sentuser.lastname = await res.data.updateduser.lastname;
                                authData.sentuser.sex = await res.data.updateduser.sex;
                                authData.sentuser.phone = await res.data.updateduser.phone;
                                authData.sentuser.bio = await res.data.updateduser.bio;
                                authData.sentuser.livesin = await res.data.updateduser.livesin;
                                authData.sentuser.worksAt = await res.data.updateduser.worksAt;
                                authData.sentuser.relationship = await res.data.updateduser.relationship;

                                await localStorage.setItem('authdata', JSON.stringify(authData));

                                Swal.fire({
                                    title: "Your Profile Details Are Updated Successfully",
                                    icon: 'success',
                                    confirmButtonText: "Ok"

                                }).then((result) => {

                                    if (result.isConfirmed) {
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 500);

                                    }
                                });

                            }
                            else {
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

            })





        }
    })












    return (
        <div className='profiledetailsbox'>


            <div className="userinfo">
                <h4 className='text-center flex-fill' style={{ color: 'rgb(255, 94, 0)' }}> Your Info </h4>

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


            <div className="info" >
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
                {userdata?.bio ? <div> <b>Bio:</b>   {userdata?.bio.length > 20 ? <>{userdata?.bio.slice(0, 20)} ...</> : userdata?.bio}  </div> : <div><b>Bio:</b>  ...  </div>}
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
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Profile Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" defaultValue={userdata?.email} aria-describedby="emailHelp" disabled />

                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                                        <input type="text" className="form-control" name='fristnamef' value={fristnamef} defaultValue={userdata?.firstname} aria-label="First name" onChange={handleChange} onBlur={handleBlur} />
                                        {(errors.fristnamef && touched.fristnamef) ? <p className="formerrortext2 text-center"> {errors.fristnamef} </p> : null}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" aria-label="Last name" name='lastnamef' value={lastnamef} defaultValue={userlastname} onChange={handleChange} onBlur={handleBlur} />
                                        {(errors.lastnamef && touched.lastnamef) ? <p className="formerrortext2 text-center"> {errors.lastnamef} </p> : null}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col" >
                                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                        <input type="text" className="form-control" aria-label="First name" disabled name='usernamef' value={usernamef} defaultValue={'@' + username} onChange={handleChange} onBlur={handleBlur} />

                                        {/* {(errors.usernamef && touched.usernamef) ? <p className="formerrortext2 text-center"> {errors.usernamef} </p> : null} */}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Gender</label>
                                        <select className="form-select" id="sexinput" aria-label="Default select example" name='sexf'
                                            defaultValue={userdata.sex}
                                            value={sexf} onChange={handleChange} onBlur={handleBlur} >

                                            <option value={undefined}  >Select Your Gender</option>
                                            <option value={'male'}>Male</option>
                                            <option value={'female'}>Female</option>
                                            <option value={'others'}>Others</option>

                                        </select>

                                        {(errors.sexf && touched.sexf) ? <p className="formerrortext2 text-center"> {errors.sexf} </p> : null}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Lives In</label>
                                        <input type="text" className="form-control" aria-label="First name" name='livesinf' value={livesinf} defaultValue={userdata.livesin} onChange={handleChange} onBlur={handleBlur} />

                                        {(errors.livesinf && touched.livesinf) ? <p className="formerrortext2 text-center"> {errors.livesinf} </p> : null}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Working At</label>
                                        <input type="text" className="form-control" aria-label="Last name" name='worksAtf' value={worksAtf} defaultValue={userdata.worksAt} onChange={handleChange} onBlur={handleBlur} />

                                        {(errors.worksAtf && touched.worksAtf) ? <p className="formerrortext2 text-center"> {errors.worksAtf} </p> : null}
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                                        <input type="number" className="form-control" aria-label="First name" name='phonef' value={phonef} defaultValue={userdata.phone} onChange={handleChange} onBlur={handleBlur} />

                                        {(errors.phonef && touched.phonef) ? <p className="formerrortext2 text-center"> {errors.phonef} </p> : null}
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Relationship Status</label>
                                        <input type="text" className="form-control" aria-label="Last name" name='relationshipf' value={relationshipf} defaultValue={userdata.relationship} onChange={handleChange} onBlur={handleBlur} />

                                        {(errors.relationshipf && touched.relationshipf) ? <p className="formerrortext2 text-center"> {errors.relationshipf} </p> : null}
                                    </div>
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Bio</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={2} defaultValue={userdata.bio} name='biof' value={biof} onChange={handleChange} onBlur={handleBlur} />

                                    {(errors.biof && touched.biof) ? <p className="formerrortext2 text-center"> {errors.biof} </p> : null}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" ref={modalRef} data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" disabled={!isValid}   >Save changes</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>





        </div>
    )
}
