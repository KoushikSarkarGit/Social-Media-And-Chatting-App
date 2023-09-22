import React from 'react'
import Logo from "../img/logo.png";
import '../pagecss/authorization.css'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'

import { signupschema } from '../YupSchemas/yupschemafile'

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
        errors

    } = useFormik({
        initialValues: myinitialvalues,
        validationSchema: signupschema,
        onSubmit: (values) => {

            console.log(values);

        }
    })



    return (
        <div className="Signupbox">


            <div className="signupcontainer">
                <form className="infoForm " onSubmit={handleSubmit}>
                    <h3>Sign up</h3>

                    <div className='formdata' >
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="infoInput"
                                name="firstname"
                                value={firstname}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />


                        </div>


                        <div>
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
                        <div className="errorsofname">
                            <span className="formerrortext"> {errors.firstname} </span>
                            <span className="formerrortext"> {errors.lastname} </span>
                        </div>

                    </div>

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

                    <div>
                        <span style={{ fontSize: '16px', color: 'black' }}>Already have an account? <Link style={{ textDecoration: 'none', color: 'blue' }} to='/login' > Login! </Link> </span>
                    </div>

                    <div className="btncase">
                        <button style={{ height: '2.5rem', width: '7.5rem', fontSize: 'medium' }} className="basicbutton infoButton" onClick={() => { navigate('/') }} >Back to Home</button>

                        <button style={{ height: '2.5rem', fontSize: 'medium' }} type='submit' className="basicbutton infoButton">Sign Up</button>
                    </div>

                </form>
            </div>

        </div>
    )
}
