import React from 'react'
import Logo from "../img/logo.png";
import '../pagecss/authorization.css'

export default function Loginpage() {
    return (
        <div className="Auth">
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="PlatformName">
                    <h1>Kwetter</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            <div className="a-right">
                <form className="infoForm authForm">
                    <h3>Log In</h3>

                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="infoInput"
                            name="username"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            className="infoInput"
                            placeholder="Password"
                            name="password"
                        />
                    </div>

                    <div>
                        <span style={{ fontSize: "12px" }}>
                            Don't have an account Sign up
                        </span>
                        <button className="basicbutton infoButton">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
