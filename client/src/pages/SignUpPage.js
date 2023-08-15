import React from 'react'
import Logo from "../img/logo.png";
import '../pagecss/authorization.css'
import { Link } from 'react-router-dom';


export default function SignUpPage() {
    return (
        <div className="Signupbox">


            <div className="a-right">
                <form className="infoForm ">
                    <h3>Sign up</h3>

                    <div className='formdata' >
                        <input
                            type="text"
                            placeholder="First Name"
                            className="infoInput"
                            name="firstname"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="infoInput"
                            name="lastname"
                        />
                    </div>

                    <div className='formdata' >
                        <input
                            type="text"
                            className="infoInput"
                            name="username"
                            placeholder="Usernames"
                        />
                    </div>

                    <div className='formdata' >
                        <input
                            type="text"
                            className="infoInput"
                            name="password"
                            placeholder="Password"
                        />
                        <input
                            type="text"
                            className="infoInput"
                            name="confirmpass"
                            placeholder="Confirm Password"
                        />
                    </div>

                    <div>
                        <span style={{ fontSize: '16px', color: 'black' }}>Already have an account? <Link style={{ textDecoration: 'none', color: 'blue' }} to='/login' > Login! </Link> </span>
                    </div>
                    <button style={{ height: '2.5rem', fontSize: 'medium' }} className="basicbutton infoButton" type="submit">Signup</button>
                </form>
            </div>

        </div>
    )
}
