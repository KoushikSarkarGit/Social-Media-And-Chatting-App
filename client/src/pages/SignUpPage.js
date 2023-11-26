import React from 'react'

import '../pagecss/authorization.css'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'

import { signupschema } from '../YupSchemas/yupschemafile'
import axios from 'axios'
import toast from 'react-hot-toast';
import Layout from '../components/Layout';



export default function SignUpPage() {
    const navigate = useNavigate()



    let myinitialvalues = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    }

    const {
        firstname,
        lastname,
        username,
        email,
        password,
        confirmpassword,
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        touched

    } = useFormik({
        initialValues: myinitialvalues,
        validationSchema: signupschema,
        onSubmit: async (values, action) => {

            console.log(values);

            try {
                await axios.post(`http://localhost:9000/api/v1/user/register`, {
                    firstname: values.firstname,
                    lastname: values.lastname,
                    username: values.username,
                    email: values.email,
                    password: values.password,
                }).then(async (res) => {
                    await console.log(res.data);

                    navigate('/login');

                    setTimeout(() => {
                        toast.success(`${res.data.msg}`)
                    }, 100);

                }).catch((err) => {

                    console.log(err.response.data)
                    toast.error('some internal error occured')

                })
            } catch (error) {
                console.log(error)
                toast.error('some internal error occured')
            }






        }
    })



    return (
        <Layout title={`Create Account `}>
            <div className="Signupbox">


                <div className="signupcontainer">
                    <form className="infoForm " onSubmit={handleSubmit}>
                        <h3>Sign up</h3>
                        <div className='firstinputholder'>
                            <div className='formdata' >

                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="infoInput"
                                    name="firstname"
                                    value={firstname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />



                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="infoInput"
                                    name="lastname"
                                    value={lastname}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />



                            </div>
                            <div className="d-flex justify-content-space-between">
                                {errors.firstname && touched.firstname && <span className="formerrortext me-5 "> {errors.firstname} </span>}
                                {errors.lastname && touched.lastname && <span className="formerrortext ms-4"> {errors.lastname} </span>}
                            </div>

                        </div>




                        <div className='restholders'>
                            <div className='formdata' >
                                <input
                                    type="text"
                                    className="infoInput"
                                    name="username"
                                    placeholder="Usernames"
                                    value={username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </div>
                            <div className="d-flex justify-content-space-between">
                                {errors.username && touched.username && <span className="formerrortext me-2 "> {errors.username} </span>}

                            </div>
                        </div>

                        <div className='restholders'>
                            <div className='formdata' >
                                <input
                                    type="email"
                                    className="infoInput"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div className="d-flex justify-content-space-between">
                                {errors.email && touched.email && <span className="formerrortext me-2 "> {errors.email} </span>}

                            </div>
                        </div>



                        <div className='firstinputholder'>
                            <div className='formdata' >
                                <input
                                    type="text"
                                    className="infoInput"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <input
                                    type="text"
                                    className="infoInput"
                                    name="confirmpassword"
                                    placeholder="Confirm Password"
                                    value={confirmpassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            <div className="d-flex justify-content-space-between ">
                                {errors.password && touched.password && <span className="formerrortext me-5 pe-3 "> {errors.password} </span>}
                                {errors.confirmpassword && touched.confirmpassword && <span className="formerrortext ms-2 me-3"> {errors.confirmpassword} </span>}
                            </div>
                        </div>




                        <div className='mt-1'>
                            <span style={{ fontSize: '16px', color: 'black' }}>Already have an account? <Link style={{ textDecoration: 'none', color: 'blue' }} to='/login' >  Login! </Link> </span>
                        </div>

                        <div className="btncase mb-2">
                            <button style={{ height: '2.5rem', width: '7.5rem', fontSize: 'medium' }} className="basicbutton infoButton" onClick={() => { navigate('/') }} >Back to Home</button>

                            <button style={{ height: '2.5rem', fontSize: 'medium' }} type='submit' className="basicbutton infoButton"
                            >Sign Up</button>
                        </div>

                    </form>
                </div>

            </div>

        </Layout>
    )
}
