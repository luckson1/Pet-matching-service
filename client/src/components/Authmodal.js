import { useFormik } from "formik"
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction, registerUserAction } from '../redux/usersSlices';
import DisabledButton from "./DisabledButton";

// use yup to handle errors 
const SignInErrorSchema = Yup.object().shape({
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
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        ,'password must contain 6 or more characters with at least one of each: uppercase, lowercase, number and special character'
      )
      
        .required('Password Required'),
        
});
const LoginErrorSchema = Yup.object().shape({
   
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string()
      .required('Password Required'),
        
});

export const Authmodal = ({ setShowModal, isSignUp, setIsSignUp}) => {

    // dispatch
const dispatch=useDispatch()

// get data from store

const user = useSelector((state) => {
    return state?.users
})
const { userLoading, userServerErr, userAppErr}=user;
    // use formik hook to handle form state 
   const formik = useFormik({
       initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            gender: '',
            petPreference: "",
            children: "",
            petOwned: "",
            garden: "",
            active: "",
            about: "",
            image: ""

        },
    
        validationSchema: isSignUp? SignInErrorSchema: LoginErrorSchema,
        onSubmit: values => {
            isSignUp? dispatch(registerUserAction(values)):  dispatch(loginUserAction(values))
        },
    })
    
    return (<div className='auth-modal'>
        <div onClick={() => { setShowModal(false); setIsSignUp(true) }} className="close-icon"><i className="bi bi-file-excel"></i></div>
        <h2>{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h2>
       { isSignUp && <p> By clicking Sign Up you are in agreement with our terms. Learn more from our Privacy Policy Page</p>}
       {/* Errors */}
       {userAppErr || userServerErr ? (
                <div className="form-validation" role="alert">
                  {userServerErr} {userAppErr}
                </div>
              ) : null}
        <form onSubmit={formik.handleSubmit} >

            { isSignUp && <input
                value={formik.values.firstName}
                onChange={formik.handleChange("firstName")}
                onBlur={formik.handleBlur("firstName")}
                type="text"
                placeholder="First Name"
            />}
            {/* Err */}
            <div className="form-validation">
                {formik.touched.firstName && formik.errors.firstName}
            </div>
            {isSignUp && <input
                value={formik.values.lastName}
                onChange={formik.handleChange("lastName")}
                onBlur={formik.handleBlur("lastName")}
                type="text"
                placeholder="Last Name"
            />}
            {/* Err */}
            <div className="form-validation">
                {formik.touched.lastName && formik.errors.lastName}
            </div>
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
        {userLoading? <DisabledButton /> :     <button
                type="submit"
                className="secondary-button"
            >
                {isSignUp? "Sign Up": "Login"}
            </button>}
        </form>

    </div>);
};
