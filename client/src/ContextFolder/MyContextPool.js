import React, { useEffect, useState } from 'react'
import { Appcontext } from './ContextCreator'
import toast from 'react-hot-toast';


export default function MyContextPool(props) {

    const [jwtToken, setjwtToken] = useState('');
    const [username, setusername] = useState(null)
    const [isAdmin, setisAdmin] = useState(false)
    const [userdata, setUserdata] = useState(null);


    const settingloginStatus = async () => {
        let curauth = await localStorage.getItem('authdata');
        if (curauth) {
            let jsonedcurdata = await JSON.parse(curauth)
            await setjwtToken(jsonedcurdata.jwttoken);
            await setusername(jsonedcurdata.sentuser.username)
            await setisAdmin(jsonedcurdata.sentuser.isAdmin)
            await setUserdata(jsonedcurdata.sentuser)




        }
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
        <Appcontext.Provider value={{ jwtToken, username, isAdmin, setisAdmin, setjwtToken, setUserdata, setusername, userdata, logoutfunction }}>
            {props.children}
        </Appcontext.Provider>
    )
}
