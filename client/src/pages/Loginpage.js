import React, { useContext, useEffect } from 'react'

import '../pagecss/authorization.css'
import { Link, useNavigate } from 'react-router-dom';
import { loginschema } from '../YupSchemas/yupschemafile'
import { useFormik } from 'formik'
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../components/Layout';
// import { check } from 'express-validator';
import { Appcontext } from '../ContextFolder/ContextCreator';
// import { json } from 'body-parser';

export default function Loginpage() {
    const navigate = useNavigate()

    const cur = useContext(Appcontext);
    const { setisAdmin, setjwtToken, setUserdata, setusername } = cur;



    let myinitialvalues = {
        email: '',
        password: '',

    }

    const {
        email,
        password,
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        touched

    } = useFormik({
        initialValues: myinitialvalues,
        validationSchema: loginschema,
        onSubmit: async (values, action) => {

            // console.log(values);

            try {
                await axios.post(`http://localhost:9000/api/v1/user/login`, {

                    email: values.email,
                    password: values.password,
                }).then(async (res) => {


                    await localStorage.setItem('authdata', JSON.stringify(res.data))
                    const gotres = await localStorage.getItem('authdata');
                    const mydata = await JSON.parse(gotres);
                    await console.log(mydata)

                    await setUserdata(mydata);
                    await setusername(mydata.sentuser.username)
                    await setjwtToken(mydata.jwttoken)

                    await setisAdmin(mydata.sentuser.isAdmin)

                    toast.success(`${res.data.msg}. 😄`);

                    setTimeout(() => {

                        navigate('/');
                    }, 100);

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


    const checkIfAlreadyLoggedIn = async () => {


        const getrawdata = await localStorage.getItem('authdata');
        const loginstatus = JSON.parse(getrawdata)
        if (loginstatus?.jwttoken) {
            navigate('/')

        }

    }

    useEffect(() => {
        checkIfAlreadyLoggedIn();

    }, [checkIfAlreadyLoggedIn])


    return (
        <Layout title={'Login Page'} >
            <div className="Signupbox">


                <div className="signupcontainer" style={{ padding: '5px' }}  >
                    <form className="infoForm " onSubmit={handleSubmit}  >
                        <h3  >Log In</h3>



                        <div className='restholders '>
                            <div className='formdata'>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="infoInput"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </div>
                            <div className="d-flex ">
                                {errors.email && touched.email && <span className="formerrortext  mb-n2 "> {errors.email} </span>}
                            </div>
                        </div>








                        <div className='restholders '>

                            <div className='formdata '>
                                <input
                                    type="password"
                                    className="infoInput"
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className="d-flex  ">
                                {errors.password && touched.password && <span className="formerrortext "> {errors.password} </span>}
                            </div>
                        </div>




                        <div>
                            <span style={{ fontSize: "16px", color: 'black' }}>
                                Don't have an account? <Link style={{ textDecoration: 'none', color: 'blue' }} to='/signup'>Sign up </Link>
                            </span>

                        </div>
                        <div className="btncase">
                            <button style={{ height: '2.5rem', width: '7.5rem', fontSize: 'medium' }} className="basicbutton infoButton" onClick={() => { navigate('/') }} >Back to Home</button>
                            <button style={{ height: '2.5rem', fontSize: 'medium' }} type='submit' className="basicbutton infoButton">Login</button>
                        </div>

                    </form>
                </div>
            </div>
        </Layout>
    )
}
