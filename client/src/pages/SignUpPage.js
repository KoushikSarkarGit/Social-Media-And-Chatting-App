import React from 'react'
import Logo from "../img/logo.png";
import '../pagecss/authorization.css'


export default function SignUpPage() {
    return (
        <div className="Signupbox">
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="PlatformName">
                    <h1>Kwetter</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            <div className="a-right">
                <form className="infoForm authForm">
                    <h3>Sign up</h3>

                    <div>
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

                    <div>
                        <input
                            type="text"
                            className="infoInput"
                            name="username"
                            placeholder="Usernames"
                        />
                    </div>

                    <div>
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
                        <span style={{ fontSize: '12px' }}>Already have an account. Login!</span>
                    </div>
                    <button className="basicbutton infoButton" type="submit">Signup</button>
                </form>
            </div>

        </div>
    )
}
