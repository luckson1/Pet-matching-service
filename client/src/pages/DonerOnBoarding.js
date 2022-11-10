import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Nav } from "../components/navigation/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import DisabledButton from "../components/DisabledButton";
import { registerUserAction } from "../redux/usersSlices";

const errorSchema = Yup.object().shape({
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
  petOwned: Yup.string().required("Pets Information Required"),
  reason: Yup.string().required("reasons Required"),
  vaccines: Yup.string().required("vaccines Information Required"),


});
export const DonerOnboarding = () => {
  // dispatch action of creating a profile
  const [reveal, setReveal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state?.users;
  });
  const { userLoading, isRegistered, userServerErr, userAppErr } = user;

  // use formik hook to handle form state
  const formik = useFormik({
    initialValues: {
   
     email: "",
     password: "",
     firstName: "",
     lastName: "",
      petOwned: "",
      reason: "",
      vaccines: "",
      isAdmin: true
     
    },
    validationSchema: errorSchema,
    onSubmit: (values) => {
dispatch(registerUserAction(values))
    },
  });



  // force navagation to the dashboard page

  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      return navigate("/register-success");
    }
  }, [isRegistered, navigate]);
  return (
    <>
      <Nav />
      <div className="onboarding h-11/12 w-11/12 md:w-6/12 bg-indigo-50 shadow-2xl mt-16 rounded-xl mx-auto text-xs md:text-sm px-2 md:px-3">
        <h2>CREATE PROFILE</h2>
        <form onSubmit={formik.handleSubmit} >
          <section>
           
       <div className="mb-10 doner-onboarding">
          <input
            value={formik.values.firstName}
            className="rounded py-10 w-72"
            onChange={formik.handleChange("firstName")}
            onBlur={formik.handleBlur("firstName")}
            type="text"
            placeholder="First Name"
          />
       
        {/* Err */}
        <div className="form-validation">
          {formik.touched.firstName && formik.errors.firstName}
        </div>
     
          <input
       className="rounded py-10 w-72"
            value={formik.values.lastName}
            onChange={formik.handleChange("lastName")}
            onBlur={formik.handleBlur("lastName")}
            type="text"
            placeholder="Last Name"
          />
   
        {/* Err */}
        <div className="form-validation">
          {formik.touched.lastName && formik.errors.lastName}
        </div>
        <input
          value={formik.values.email}
     className="rounded py-10 w-72"
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
     className="rounded py-10 w-72"
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
        <div className="form-validation">
          {formik.touched.password && formik.errors.password}
        </div>
</div>
            <label htmlFor="pets-owned" >What pet do you wish to donate?</label>
         
            <div className="multiple-input-container">
              <input
                id="cats-owned"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petOwned", "cat");
                }}
                onBlur={formik.handleBlur("petOwned")}
                type="radio"
                checked={formik.values.petOwned === "cat"}
              />
              <label htmlFor="cats-owned">Cat</label>

              <input
                id="dogs-owned"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petOwned", "dog");
                }}
                onBlur={formik.handleBlur("petOwned")}
                type="radio"
                checked={formik.values.petOwned === "dog"}
              />
              <label htmlFor="dogs-owned">Dog</label>
              <input
                id="chicken-owned"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petOwned", "chicken");
                }}
                onBlur={formik.handleBlur("petOwned")}
                type="radio"
                checked={formik.values.petOwned === "chicken"}
              />
              <label htmlFor="chicken-owned">chicken</label>

              <input
                id="none-owned"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petOwned", "none");
                }}
                onBlur={formik.handleBlur("petOwned")}
                type="radio"
                checked={formik.values.petOwned === "none"}
              />
              <label htmlFor="none-owned">none</label>

              <input
                id="both-owned"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petOwned", "both");
                }}
                onBlur={formik.handleBlur("petOwned")}
                type="radio"
                checked={formik.values.petOwned === "both"}
              />
              <label htmlFor="both-owned">Cat & Dog</label>
                {/* errors */}
                <div className="form-validation">
              {formik.touched.petOwned && formik.errors.petOwned}
            </div>
            </div>
        
            <label htmlFor="garden">Is the pet vaccination upto date?</label>
           
            <div className="multiple-input-container">
              <input
                id="yes"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("vaccines", "yes");
                }}
                onBlur={formik.handleBlur("vaccines")}
                type="radio"
                checked={formik.values.vaccines === "yes"}
              />
              <label htmlFor="yes">Yes, I have the documentation</label>
              <input
                id="yes-no-docs"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("vaccines", "yes-no-docs");
                }}
                onBlur={formik.handleBlur("vaccines")}
                type="radio"
                checked={formik.values.vaccines === "yes-no-docs"}
              />
                <label htmlFor="yes-no-docs">Yes, but dont have the documentation</label>

              <input
                id="No"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("vaccines", "No");
                }}
                onBlur={formik.handleBlur("vacinnation")}
                type="radio"
                checked={formik.values.vaccines === "No"}
              />
              <label htmlFor="No">No</label>
             {/* errors */}
             <div className="form-validation">
              {formik.touched.vaccines && formik.errors.vaccines}
            </div>
      
            </div>
            
            <label>Why do you want to donate the pet?</label>
          
            <textarea
            value={formik.values.reason}
       className="rounded py-10 w-72"
            onChange={formik.handleChange("reason")}
            onBlur={formik.handleBlur("reason")}
            type="text"
            placeholder="Reason"
          />
            <div className="form-validation">
              {formik.touched.reason && formik.errors.reason}
            </div>
         
            {userLoading ? (
          <DisabledButton />
        ) : (
          <button type="submit" className="mt-5 py-2 px-20 border-solid bg-sky-600 rounded-3xl">
           Sign Up
          </button>
        )}
         
          </section>
          {userServerErr || userAppErr ? (
            <div className="form-validation" role="alert">
              {userServerErr} {userAppErr}
            </div>
          ) : null}
        </form>
        
      </div>
    </>
  );
};
