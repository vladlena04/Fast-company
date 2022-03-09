import React, { useState } from "react";
import LoginForm from "../component/loginForm";
import RegisterForm from "../component/registerForm";
import { useParams } from "react-router-dom";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(type === "register" ? "register" : "login");
    const toggleFormType = (params) => {
        setFormType(prevState => prevState === "register" ? "login" : "register");
    };
    const renderLink = (text) => {
        return (
            <a role='button' onClick={toggleFormType}>{text}</a>
        );
    };
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 shadow p-4 justify-content-center'>
                    {formType === "register" ? <>
                        <h3>Register</h3>
                        <RegisterForm/>
                        <p>Already have account? {renderLink("Sign In")}</p>
                    </> : <>
                        <h3>Login</h3>
                        <LoginForm />
                        <p className='d-flex justify-content-center m-2'> have account? {renderLink("Sign Up")}</p>
                    </>}
                </div>
            </div>
        </div>
    );
};

export default Login;