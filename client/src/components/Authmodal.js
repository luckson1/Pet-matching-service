import React from 'react';
import { useFormik } from "formik"
import * as Yup from 'yup'

// use yup to handle errors 
const errorSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'First name Too Short!')
        .max(50, 'First name Too Long!')
        .required('First name Required'),
    lastName: Yup.string()
        .min(2, 'Last name Too Short!')
        .max(50, 'Last name Too Long!')
        .required('Last name Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string()
        .min(8, 'Passwords must be at least 8 characters long!')
        .required('Password Required'),
        
});

export const Authmodal = ({ setShowModal, isSignUp, setIsSignUp}) => {

    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: errorSchema,
        onSubmit: values => {
            console.log(values)
        },
    });
    
    return (<div className='auth-modal'>
        <div onClick={() => { setShowModal(false); setIsSignUp(true) }} className="close-icon"><i className="bi bi-file-excel"></i></div>
        <h2>{isSignUp ? "CREATE ACCOUNT" : "LOGIN"}</h2>
        <p> By clicking Log In you are in agreement with our terms. Learn more from our Privacy Policy Page</p>
        <form onSubmit={formik.handleSubmit} >
            { isSignUp && <input
                value={formik.values.firstName}
                onChange={formik.handleChange("firstName")}
                onBlur={formik.handleBlur("firstName")}
                type="text"
                placeholder="First Name"
            />}
            {/* Err */}
            {isSignUp && <div className="form-validation">
                {formik.touched.firstName && formik.errors.firstName}
            </div>}
            {isSignUp && <input
                value={formik.values.lastName}
                onChange={formik.handleChange("lastName")}
                onBlur={formik.handleBlur("lastName")}
                type="text"
                placeholder="Last Name"
            />}
            {/* Err */}
            {isSignUp && <div className="form-validation">
                {formik.touched.lastName && formik.errors.lastName}
            </div>}
            <input
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                type="email"
                placeholder="E-mail address"
            />
            {/* Err */}
            <div className="form-validation">
                {formik.touched.email && formik.errors.email}
            </div>
            <input
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                type="password"
                placeholder="Password"
            />
            {/* Err */}
            <div className="form-validation">
                {formik.touched.password && formik.errors.password}
            </div>
            <button
                type="submit"
                className="secondary-button"
            >
                Sign Up
            </button>
        </form>

    </div>);
};
