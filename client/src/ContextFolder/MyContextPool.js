import React, { useEffect, useState } from 'react'
import { Appcontext } from './ContextCreator'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function MyContextPool(props) {

    const [curdevice, setCurdevice] = useState('pc');
    const [jwtToken, setjwtToken] = useState('');
    const [username, setusername] = useState(null)
    const [isAdmin, setisAdmin] = useState(false)
    const [userdata, setUserdata] = useState(null);


    const [userprofileimg, setUserprofileimg] = useState(null)
    const [userfristname, setUserfristname] = useState(null)
    const [userlastname, setUserlastname] = useState(null)
    const [userId, setUserId] = useState(null);


    const [loading, setLoading] = useState(true)

    const settingloginStatus = async () => {
        let curauth = await localStorage.getItem('authdata');
        if (curauth) {
            let jsonedcurdata = await JSON.parse(curauth)

            await setUserdata(jsonedcurdata?.sentuser);
            await setUserprofileimg(jsonedcurdata?.sentuser?.profilePicture)
            await setjwtToken(jsonedcurdata?.jwttoken);
            await setusername(jsonedcurdata?.sentuser?.username)
            await setisAdmin(jsonedcurdata?.sentuser?.isAdmin)

            await setUserfristname(jsonedcurdata?.sentuser?.firstname)
            await setUserlastname(jsonedcurdata?.sentuser?.lastname)
            await setUserId(jsonedcurdata?.sentuser?._id)



            try {

                await axios.post(`http://localhost:9000/api/v1/user/check-validity-of-jwttoken-from-client`,
                    {},
                    {
                        headers: { token: jsonedcurdata.jwttoken }
                    }
                ).then(async (res) => {
                    // console.log(res.data)
                    setLoading(false);
                    if (res.data.success === false) {
                        await localStorage.removeItem('authdata');

                        await setusername(null);
                        await setjwtToken(null);
                        await setUserdata(null)
                        await setisAdmin(false)

                        window.location.reload()

                    }

                }).catch((err) => {
                    console.log(err)
                    toast.error('some internal axios error occured')
                })

            } catch (error) {
                console.log(error)
                toast.error('some internal error occured')
                setLoading(false);
            }

        }

        setLoading(false);
    }




    useEffect(() => {
        settingloginStatus();


    }, [])





    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            if (width > 1024) {
                setCurdevice('pc');
            } else if (width > 768) {
                setCurdevice('tablet');
            } else {
                setCurdevice('mobile');
            }


        }

        // Call handleResize initially to set the initial device type
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);













    const refreshLoggedUserDetails = async () => {
        let curauth = await localStorage.getItem('authdata');
        if (curauth) {
            let jsonedcurdata = await JSON.parse(curauth)

            try {

                await axios.get(`http://localhost:9000/api/v1/user/refresh-logged-user-data`,
                    {
                        headers: { token: jsonedcurdata.jwttoken }
                    }
                ).then(async (res) => {
                    // console.log(res.data)

                    if (res.data.success === true) {

                        jsonedcurdata.sentuser = await res.data.refreshedUserdetails;
                        const updatedAuthData = await JSON.stringify(jsonedcurdata);
                        await localStorage.setItem('authdata', updatedAuthData);


                        await setUserdata(res.data?.refreshedUserdetails);
                        await setUserprofileimg(res.data?.refreshedUserdetails?.profilePicture)

                        await setusername(res.data?.refreshedUserdetails?.username)
                        await setisAdmin(res.data?.refreshedUserdetails?.isAdmin)

                        await setUserfristname(res.data?.refreshedUserdetails?.firstname)
                        await setUserlastname(res.data?.refreshedUserdetails?.lastname)
                        await setUserId(res.data?.refreshedUserdetails?._id)


                    }

                }).catch((err) => {
                    console.log(err)
                    toast.error('some internal axios error occured')
                })

            } catch (error) {
                console.log(error)
                toast.error('some internal error occured')
                setLoading(false);
            }

        }

    }







    const LikePost = async (postid, userjwt) => {
        let curauth = await localStorage.getItem('authdata');
        if (curauth) {
            let jsonedcurdata = await JSON.parse(curauth)

            if (jsonedcurdata.jwttoken !== userjwt) {
                toast.error('Unauthorized Action')
                return;
            }

            try {
                await axios.put(`http://localhost:9000/api/v1/user/like-post/${postid}`,
                    {},
                    {
                        headers: { token: jsonedcurdata.jwttoken }
                    }
                ).then(async (res) => {
                    if (res.data.success === true) {
                        return true;
                    }
                    else {
                        return false;
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


    const UnLikePost = async (postid, userjwt) => {
        let curauth = await localStorage.getItem('authdata');
        if (curauth) {
            let jsonedcurdata = await JSON.parse(curauth)

            if (jsonedcurdata.jwttoken !== userjwt) {
                toast.error('Unauthorized Action')
                return;
            }

            try {
                await axios.put(`http://localhost:9000/api/v1/user/unlike-post/${postid}`,
                    {},
                    {
                        headers: { token: jsonedcurdata.jwttoken }
                    }
                ).then(async (res) => {
                    if (res.data.success === true) {
                        return true;
                    }
                    else {
                        return false;
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


    const RepostThePost = async (postid, userjwt) => {
        let curauth = await localStorage.getItem('authdata');
        if (curauth) {
            let jsonedcurdata = await JSON.parse(curauth)

            if (jsonedcurdata.jwttoken !== userjwt) {
                toast.error('Unauthorized Action')
                return;
            }

            try {
                await axios.put(`http://localhost:9000/api/v1/user/repost/${postid}`,
                    {},
                    {
                        headers: { token: jsonedcurdata.jwttoken }
                    }
                ).then(async (res) => {
                    if (res.data.success === true) {
                        return true;
                    }
                    else {
                        return false;
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




    const UnRepostThePost = async (postid, userjwt) => {
        let curauth = await localStorage.getItem('authdata');
        if (curauth) {
            let jsonedcurdata = await JSON.parse(curauth)

            if (jsonedcurdata.jwttoken !== userjwt) {
                toast.error('Unauthorized Action')
                return;
            }

            try {
                await axios.put(`http://localhost:9000/api/v1/user/unrepost/${postid}`,
                    {},
                    {
                        headers: { token: jsonedcurdata.jwttoken }
                    }
                ).then(async (res) => {
                    if (res.data.success === true) {
                        return true;
                    }
                    else {
                        return false;
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




    const followSomeone = async (tobefollowedId) => {

        if (tobefollowedId == userId) { return }

        if (jwtToken) {

            try {
                await axios.put(`http://localhost:9000/api/v1/user/follow-user/${tobefollowedId}`,
                    {},
                    {
                        headers: { token: jwtToken }
                    }).then(async (res) => {

                        console.log(res.data)

                    }).catch((err) => {
                        console.log(err)
                        toast.error('some internal axios error occured')
                    })
            } catch (error) {
                console.log(error)
                toast.error('some internal error occured')
            }

        }
        else {
            toast.error('no token found. please login again')
            return;
        }

    }







    const UnfollowSomeone = async (tobeunfollowedId) => {

        if (tobeunfollowedId == userId) { return }

        if (jwtToken) {

            try {
                await axios.put(`http://localhost:9000/api/v1/user/unfollow-user/${tobeunfollowedId}`,
                    {},
                    {
                        headers: { token: jwtToken }
                    }).then(async (res) => {

                        console.log(res.data)

                    }).catch((err) => {
                        console.log(err)
                        toast.error('some internal axios error occured')
                    })
            } catch (error) {
                console.log(error)
                toast.error('some internal error occured')
            }

        }
        else {
            toast.error('no token found. please login again')
            return;
        }

    }





    const checkIfLoggedUserFollowsUser = async (tocheckuserId) => {
        let curauth = await localStorage.getItem('authdata');
        if (curauth || jwtToken) {
            let jsonedcurdata = await JSON.parse(curauth)

            if (tocheckuserId === userId) {
                return;
            }

            try {
                const res = await axios.get(`http://localhost:9000/api/v1/user/check-if-logged-user-follows-user/${tocheckuserId}`,
                    {
                        headers: { token: jsonedcurdata.jwttoken || jwtToken }
                    }
                ).catch((err) => {
                    console.log(err)
                    toast.error('some internal axios error occured')
                })



                if (res.data.success === true) {
                    // console.log(res.data.followedbyuser)
                    if (res.data.followedbyuser) {
                        // console.log('entered block true')
                        return true;
                    }
                    else {
                        // console.log('entered block false')
                        return false;
                    }

                }
                else {
                    return false;
                }




            } catch (error) {
                console.log(error)
                toast.error('some internal error occured')

            }
        }
    }







    const getRelativeTime = (createdAt) => {

        const now = new Date();
        const commentDate = new Date(createdAt);

        const timeDifferenceInSeconds = Math.floor((now - commentDate) / 1000);

        if (timeDifferenceInSeconds < 60) {
            return `${timeDifferenceInSeconds} second${timeDifferenceInSeconds !== 1 ? 's' : ''} ago`;
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(timeDifferenceInSeconds / 86400);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }

    };





    const logoutfunction = async () => {
        await localStorage.removeItem('authdata');
        // navigate('/')
        await setusername(null);
        await setjwtToken('');
        await setUserdata(null)
        await setisAdmin(false)
        await setUserdata(null);
        await setUserprofileimg(null)
        await setUserfristname(null)
        await setUserlastname(null)
        await setUserId(null)
        setLoading(false);

        toast('LogOut Successful!', {
            icon: '👋🏼',
        });

    }








    return (
        <Appcontext.Provider value={{ jwtToken, username, isAdmin, userlastname, userfristname, userprofileimg, setisAdmin, setjwtToken, setUserdata, setusername, userdata, logoutfunction, userId, setUserId, LikePost, UnLikePost, RepostThePost, UnRepostThePost, getRelativeTime, refreshLoggedUserDetails, followSomeone, UnfollowSomeone, checkIfLoggedUserFollowsUser, curdevice, setCurdevice }}>
            {!loading && props.children
            }
        </Appcontext.Provider>
    )
}
