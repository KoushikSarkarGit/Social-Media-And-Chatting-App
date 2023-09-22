import React from 'react'
import Logo from "../img/logo.png";
import '../pagecss/authorization.css'
import { Link, useNavigate } from 'react-router-dom';


export default function Loginpage() {
    const navigate = useNavigate()

    return (
        <div className="Signupbox">


            <div className="signupcontainer" style={{ padding: '5px' }}  >
                <form className="infoForm authForm">
                    <h3>Log In</h3>

                    <div className='formdata'>
                        <input
                            type="text"
                            placeholder="Username"
                            className="infoInput"
                            name="username"
                        />
                    </div>

                    <div className='formdata'>
                        <input
                            type="password"
                            className="infoInput"
                            placeholder="Password"
                            name="password"
                        />
                    </div>

                    <div>
                        <span style={{ fontSize: "16px", color: 'black' }}>
                            Don't have an account? <Link style={{ textDecoration: 'none', color: 'blue' }} to='/signup'>Sign up </Link>
                        </span>

                    </div>
                    <div className="btncase">
                        <button style={{ height: '2.5rem', width: '7.5rem', fontSize: 'medium' }} className="basicbutton infoButton" onClick={() => { navigate('/') }} >Back to Home</button>
                        <button style={{ height: '2.5rem', fontSize: 'medium' }} className="basicbutton infoButton">Login</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
