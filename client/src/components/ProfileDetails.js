import React, { useContext, useState } from 'react'
import '../pagecss/profiledetails.css'

import { UilPen } from "@iconscout/react-unicons";
import Profiledetailsmodal from './Profiledetailsmodal';
import { Appcontext } from '../ContextFolder/ContextCreator';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

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
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Profile Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" defaultValue={userdata?.email} aria-describedby="emailHelp" disabled />

                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                                        <input type="text" className="form-control" placeholder="First name" aria-label="First name" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                        <input type="text" className="form-control" placeholder="First name" aria-label="First name" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Gender</label>
                                        <select className="form-select" id="sexinput" aria-label="Default select example">
                                            <option defaultValue>Select Your Gender</option>
                                            <option value={'male'}>Male</option>
                                            <option value={'female'}>Female</option>
                                            <option value={'others'}>Others</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Lives In</label>
                                        <input type="text" className="form-control" placeholder="First name" aria-label="First name" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Working At</label>
                                        <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                                        <input type="text" className="form-control" placeholder="First name" aria-label="First name" />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Relationship Status</label>
                                        <input type="text" className="form-control" placeholder="Last name" aria-label="Last name" />
                                    </div>
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Bio</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={2} defaultValue={""} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>





        </div>
    )
}
