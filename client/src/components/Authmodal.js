import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction, registerUserAction } from "../redux/usersSlices";
import DisabledButton from "./DisabledButton";
import { useState } from "react";

// use yup to handle errors
const SignInErrorSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name Too Short!")
    .max(50, "First name Too Long!")
    .required("First name Required"),
  lastName: Yup.string()
    .min(2, "Last name Too Short!")
    .max(50, "Last name Too Long!")
    .required("Last name Required"),
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password must contain 6 or more characters with at least one of each: uppercase, lowercase, number and special character"
    )

    .required("Password Required"),
});
const LoginErrorSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string().required("Password Required"),
});

export const Authmodal = ({ setShowModal, isSignUp, setIsSignUp }) => {
  const [reveal, setReveal] = useState(false);
  // dispatch
  const dispatch = useDispatch();

  // get data from store

  const user = useSelector((state) => {
    return state?.users;
  });
  const { userLoading, userServerErr, userAppErr } = user;
  // use formik hook to handle form state
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
      petPreference: "",
      children: "",
      petOwned: "",
      garden: "",
      active: "",
      about: "",
      image: "",
    },

    validationSchema: isSignUp ? SignInErrorSchema : LoginErrorSchema,
    onSubmit: (values) => {
      isSignUp
        ? dispatch(registerUserAction(values))
        : dispatch(loginUserAction(values));
    },
  });

  return (
    <div className="auth-modal bg-gradient-to-b from-primary  to-base-100 ">
     <div className="my-8">
     <div
        onClick={() => {
          setShowModal(false);
          setIsSignUp(true);
        }}
        className="close-icon text-white"
      >
        <i className="bi bi-file-excel"></i>
      </div>
      <h1 className="text-white">{isSignUp ? "CREATE ACCOUNT" : "LOG IN"}</h1>
     </div>
   
      {/* Errors */}
      {userAppErr || userServerErr ? (
        <div className="form-validation" role="alert">
          {userServerErr} {userAppErr}
        </div>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        {isSignUp && (
          <input
            value={formik.values.firstName}
            className="rounded"
            onChange={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            type="text"
            placeholder="First Name"
          />
        )}
        {/* Err */}
        <div className="form-validation">
          {formik.touched.firstName && formik.errors.firstName}
        </div>
        {isSignUp && (
          <input
            className="rounded"
            value={formik.values.lastName}
            onChange={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            type="text"
            placeholder="Last Name"
          />
        )}
        {/* Err */}
        <div className="form-validation">
          {formik.touched.lastName && formik.errors.lastName}
        </div>
        <input
          value={formik.values.email}
          className="rounded"
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
          className="rounded"
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          type={reveal ? "text" : "password"}
          placeholder="Password"
        />
        <div className="toggle-icon">
          <i
            className={reveal ? "bi bi-eye-slash " : "bi bi-eye "}
            id="togglePassword"
            onClick={() => setReveal(!reveal)}
          ></i>
        </div>
        {/* Err */}
        <div className="form-validation mt-3">
          {formik.touched.password && formik.errors.password}
        </div>
        {userLoading ? (
          <DisabledButton />
        ) : (
          <button type="submit" className="mt-5 btn btn-secondary">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        )}
      </form>
    </div>
  );
};
