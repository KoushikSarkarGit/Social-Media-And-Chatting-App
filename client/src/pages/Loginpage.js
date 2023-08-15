import React from 'react'
import Logo from "../img/logo.png";
import '../pagecss/authorization.css'
import { Link } from 'react-router-dom';


export default function Loginpage() {
    return (
        <div className="Signupbox">


            <div className="a-right" style={{ padding: '5px' }}  >
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
                    <button style={{ height: '2.5rem', fontSize: 'medium' }} className="basicbutton infoButton">Login</button>
                </form>
            </div>
        </div>
    )
}
