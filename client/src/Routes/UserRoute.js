import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { Appcontext } from '../ContextFolder/ContextCreator';

//route for checking logged in user
export default function UserRoute() {

    const [islogged, setislogged] = useState(false)


    const cur = useContext(Appcontext);
    const { jwtToken } = cur;

    useEffect(() => {

        const checkiflogged = async () => {
            console.log('entered')
            let response;

            await axios.post(`${process.env.React_APP_API}/api/v1/user-prot-check`).then((res) => {
                // console.log(res)
                response = res;
            })

            if (response.data.ok) {
                await setislogged(true)
            }
            else {
                await setislogged(false);
            }

        }
        if (jwtToken) {
            checkiflogged();

        }

    }, [jwtToken])


    return islogged ? <Outlet /> : <Spinner />
}