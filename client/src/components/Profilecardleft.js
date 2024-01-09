import React, { useEffect, useState } from 'react'
// import Cover from '../img/cover.jpg'
import Cover from '../img/defaultCoverpic.jpg'
import Profile from '../img/defaultprofimg2.jpg'
import '../pagecss/profilecardleftstl.css'
import axios from 'axios'
import toast from 'react-hot-toast'






export default function Profilecardleft({ uId }) {

    const [userprofile, setUserprofile] = useState()


    const getUserprofile = async () => {
        try {

            if (uId) {
                await axios.get(`http://localhost:9000/api/v1/user/get-user-medium/${uId}`).then(async (res) => {


                    if (res.data.success === true) {
                        setUserprofile(res.data.finaldata)
                        // console.log(res.data)
                    }

                }).catch((err) => {
                    console.log(err)
                    toast.error('some internal axios error occured')
                })
            }

        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
        }
    }



    useEffect(() => {
        getUserprofile()

    }, [uId]);



    const ProfilePage = true;
    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={userprofile?.coverPicture ? userprofile?.coverPicture : Cover} alt="" />
                <img src={userprofile?.profilePicture ? userprofile?.profilePicture : Profile} alt="" />
            </div>

            <div className="ProfileName">
                <span>{userprofile?.firstname ? userprofile?.firstname + ' ' + userprofile?.lastname : '...'}</span>
                <span>@{userprofile?.username ? userprofile.username : '...'}</span>


                <button type="button" className="btn btn-primary showdetailsdiv px-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <span >Show Details</span>
                </button>

            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{userprofile?.followingCount !== null ? userprofile?.followingCount : '...'}</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{userprofile?.followersCount !== null ? userprofile?.followersCount : '...'}</span>
                        <span>Followers</span>
                    </div>

                    {ProfilePage && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{userprofile?.totalPostsCount !== null ? userprofile?.totalPostsCount.totalpostno
                                    : '...'}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {ProfilePage ? "" : <span>My Profile</span>}




            {/* modal starts here */}



            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 " id="exampleModalLabel">Profile Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                userprofile ? <div className='d-flex flex-column'>

                                    <div><b>Name:</b>  {userprofile.firstname}  {userprofile.lastname}</div>
                                    <div><b>Username:</b>  {userprofile.username}  </div>
                                    {userprofile?.sex && <div><b>Sex:</b>  {userprofile.sex}  </div>}
                                    {userprofile?.bio && <div><b>Bio:</b>  {userprofile.bio}  </div>}

                                    {userprofile?.livesin && <div> <b>Lives in:</b>  {userprofile.livesin}  </div>}

                                    {userprofile?.worksAt && <div> <b>Works At:</b>  {userprofile.worksAt}  </div>}
                                    {userprofile?.relationship && <div> <b>Relationship:</b>   {userprofile.relationship}  </div>}


                                </div> :
                                    <div> ... </div>

                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
