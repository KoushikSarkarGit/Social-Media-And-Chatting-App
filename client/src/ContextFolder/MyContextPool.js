import React, { useEffect, useState } from 'react'
import { Appcontext } from './ContextCreator'
import toast from 'react-hot-toast';
import axios from 'axios';


export default function MyContextPool(props) {

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
            await setjwtToken(jsonedcurdata.jwttoken);
            await setusername(jsonedcurdata.sentuser.username)
            await setisAdmin(jsonedcurdata.sentuser.isAdmin)
            await setUserdata(jsonedcurdata.sentuser)
            await setUserprofileimg(jsonedcurdata.sentuser.profilePicture)
            await setUserfristname(jsonedcurdata.sentuser.firstname)
            await setUserlastname(jsonedcurdata.sentuser.lastname)
            await setUserId(jsonedcurdata.sentuser._id)


            try {

                await axios.post(`http://localhost:9000/api/v1/user/check-validity-of-jwttoken-from-client`, {},
                    {
                        headers: {
                            // Authorization header with the JWT token
                            token: jsonedcurdata.jwttoken
                        }
                    }).then(async (res) => {
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









    const logoutfunction = async () => {
        await localStorage.removeItem('authdata');
        // navigate('/')
        await setusername(null);
        await setjwtToken(null);
        await setUserdata(null)
        await setisAdmin(false)

        toast('LogOut Successful!', {
            icon: '👋🏼',
        });

    }








    return (
        <Appcontext.Provider value={{ jwtToken, username, isAdmin, userlastname, userfristname, userprofileimg, setisAdmin, setjwtToken, setUserdata, setusername, userdata, logoutfunction, userId, setUserId }}>
            {!loading && props.children
            }
        </Appcontext.Provider>
    )
}
