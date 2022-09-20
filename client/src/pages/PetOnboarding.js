import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Nav } from "../components/navigation/Nav";
import { useDispatch, useSelector } from "react-redux";
import { createPetAction } from "../redux/petsSlices";
import { useNavigate } from "react-router";
import kitten from "../components/images/kitten.jpg";

const onboardingErrorSchema = Yup.object().shape({
  age: Yup.number()
    .min(1, "Invalide Age!")
    .max(25, "Too old!")
    .positive()
    .required("Age Required"),

  gender: Yup.string().required("Gender Required"),
  breed: Yup.string().required("Breed Required"),
  name: Yup.string().required("Breed Required"),
  petType: Yup.string().required("Pet preference Required"),
  children: Yup.string().required("Children Information Required"),
  petTorrelance: Yup.string().required("Pets Information Required"),
  garden: Yup.string().required("Garden Information Required"),
  active: Yup.string().required("This Information is Required"),
  about: Yup.string()
    .min(20, "About Me Information is Too Short!")
    .max(1000, "About Me Information is Too Long!")
    .required("About Me Information is Required"),
  image: Yup.string().required("Profile Image is Required"),
});

// const editErrorSchema = Yup.object().shape({
//     age: Yup
//         .number()
//         .min(1, 'Invalide Age!')
//         .max(25, 'Too old!')
//         .positive()
//         .required('Age Required'),

//     gender: Yup
//         .string()
//         .required('Gender Required'),
//     breed: Yup
//         .string()
//         .required('Breed Required'),
//     name: Yup
//         .string()
//         .required('Breed Required'),
//     petType: Yup
//         .string()
//         .required('Pet preference Required'),
//     children: Yup
//         .string()
//         .required('Children Information Required'),
//     petTorrelance: Yup
//         .string()
//         .required('Pets Information Required'),
//     garden: Yup
//         .string()
//         .required('Garden Information Required'),
//     active: Yup
//         .string()
//         .required('This Information is Required'),
//     about: Yup.string()
//         .min(20, 'About Me Information is Too Short!')
//         .max(1000, 'About Me Information is Too Long!')
//         .required('About Me Information is Required'),

// });

export const PetOnboarding = () => {
  //get state from store
  const user = useSelector((state) => {
    return state?.users;
  });
  const pet = useSelector((state) => {
    return state?.pets;
  });
  const { isPetCreated } = pet;

  const { userAuth } = user;
  const authToken = userAuth;

  // dispatch create pet action
  const dispatch = useDispatch();

  // use formik hook to handle form state

  const formik = useFormik({
    initialValues: {
      age: "",
      gender: "",
      name: "",
      breed: "",
      petType: "",
      children: "",
      petTorrelance: "",
      garden: "",
      active: "",
      about: "",
      image: "",
    },
    validationSchema: onboardingErrorSchema,
    onSubmit: (values) => {
      dispatch(createPetAction(values));
    },
  });

  // force navigation to dashboard
  const navigate = useNavigate();

  useEffect(() => {
    if (isPetCreated) {
      navigate("/all-pets");
    }
  }, [navigate, isPetCreated]);

  return (
    <>
      <Nav authToken={authToken} />
      <div className="onboarding">
        <h2>CREATE A PET PROFILE</h2>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <section>
            <label htmlFor="petType">Type of Pet?</label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.petType && formik.errors.petType}
            </div>
            <div className="multiple-input-container">
              <input
                id="cats"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petType", "cats");
                }}
                onBlur={formik.handleBlur("petType")}
                type="radio"
                checked={formik.values.petType === "cats"}
              />
              <label htmlFor="cats">Cat</label>

              <input
                id="dogs"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petType", "dogs");
                }}
                onBlur={formik.handleBlur("petType")}
                type="radio"
                checked={formik.values.petType === "dogs"}
              />
              <label htmlFor="dogs">Dog</label>
            </div>
            <label>Pet's Breed?</label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.breed && formik.errors.breed}
            </div>
            <div className="multiple-input-container">
              <input
                id="breed"
                value={formik.values.breed}
                onChange={formik.handleChange("breed")}
                onBlur={formik.handleBlur("breed")}
                type="text"
                placeholder="breed"
              />
            </div>

            <label>Name</label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.name && formik.errors.name}
            </div>
            <div className="multiple-input-container">
              <input
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                type="text"
                placeholder="name"
              />
            </div>
            <label>Approximate Age?</label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.age && formik.errors.age}
            </div>
            <div className="multiple-input-container">
              <input
                id="age"
                value={formik.values.age}
                onChange={formik.handleChange("age")}
                onBlur={formik.handleBlur("age")}
                type="number"
                placeholder="Age"
              />
            </div>
            <label>Pets Gender</label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.gender && formik.errors.gender}
            </div>

            <div className="multiple-input-container">
              <input
                id="male"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("gender", "male");
                }}
                onBlur={formik.handleBlur("gender")}
                type="radio"
                checked={formik.values.gender === "male"}
              />

              <label htmlFor="male">Male</label>

              <input
                id="female"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("gender", "female");
                }}
                onBlur={formik.handleBlur("gender")}
                type="radio"
                checked={formik.values.gender === "female"}
              />
              <label htmlFor="female">Female</label>
            </div>

            <label htmlFor="children">Good With Children below 10 Years?</label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.children && formik.errors.children}
            </div>
            <div className="multiple-input-container">
              <input
                id="yes-children"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("children", "yes");
                }}
                onBlur={formik.handleBlur("children")}
                type="radio"
                checked={formik.values.children === "yes"}
              />
              <label htmlFor="yes-children">Yes</label>

              <input
                id="No-children"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("children", "no");
                }}
                onBlur={formik.handleBlur("children")}
                type="radio"
                checked={formik.values.children === "no"}
              />
              <label htmlFor="No-children">No</label>
            </div>
            <label htmlFor="pets-owned">
              Which animals can the Pet live with in the Same Household?
            </label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.petTorrelance && formik.errors.petTorrelance}
            </div>
            <div className="multiple-input-container">
              <input
                id="cats-owned"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petTorrelance", "cat");
                }}
                onBlur={formik.handleBlur("petTorrelance")}
                type="radio"
                checked={formik.values.petTorrelance === "cat"}
              />
              <label htmlFor="cats-owned">Cat/(s)</label>

              <input
                id="dogs-owned"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petTorrelance", "dog");
                }}
                onBlur={formik.handleBlur("petTorrelance")}
                type="radio"
                checked={formik.values.petTorrelance === "dog"}
              />
              <label htmlFor="dogs-owned">Dog/(s)</label>

              <input
                id="none-owned"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petTorrelance", "none");
                }}
                onBlur={formik.handleBlur("petTorrelance")}
                type="radio"
                checked={formik.values.petTorrelance === "none"}
              />
              <label htmlFor="none-owned">none</label>

              <input
                id="both-owned"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petTorrelance", "both");
                }}
                onBlur={formik.handleBlur("petTorrelance")}
                type="radio"
                checked={formik.values.petTorrelance === "both"}
              />
              <label htmlFor="both-owned">Both</label>
            </div>
            <label htmlFor="garden">
              Does the pet need a dedicated Garden?
            </label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.garden && formik.errors.garden}
            </div>
            <div className="multiple-input-container">
              <input
                id="yes-garden"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("garden", "yes");
                }}
                onBlur={formik.handleBlur("garden")}
                type="radio"
                checked={formik.values.garden === "yes"}
              />
              <label htmlFor="yes-garden">Yes</label>

              <input
                id="No-garden"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("garden", "no");
                }}
                onBlur={formik.handleBlur("garden")}
                type="radio"
                checked={formik.values.garden === "no"}
              />
              <label htmlFor="No-garden">No</label>
            </div>
            <label htmlFor="active">
              Can the Pet live a Very active Lifestyle?{" "}
            </label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.active && formik.errors.active}
            </div>
            <div className="multiple-input-container">
              <input
                id="yes-active"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("active", "yes");
                }}
                onBlur={formik.handleBlur("active")}
                type="radio"
                checked={formik.values.active === "yes"}
              />
              <label htmlFor="yes-active">Yes</label>

              <input
                id="No-active"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("active", "no");
                }}
                onBlur={formik.handleBlur("active")}
                type="radio"
                checked={formik.values.active === "no"}
              />
              <label htmlFor="No-active">No</label>
            </div>
            <label>About the Pet</label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.about && formik.errors.about}
            </div>
            <textarea
              id="about"
              value={formik.values.about}
              onChange={formik.handleChange("about")}
              onBlur={formik.handleBlur("about")}
              type="textarea"
              placeholder="The Pet Loves......."
            />

            <input type="submit" />
          </section>

          <section>
            <label htmlFor="about">Profile Pic</label>

            {/* errors */}
            <div className="form-validation">
              {formik.touched.image && formik.errors.image}
            </div>

            <input
              name="image"
              value={undefined}
              onChange={(e) =>
                formik.setFieldValue("image", e.currentTarget.files[0])
              }
              onBlur={formik.handleBlur("image")}
              type="file"
              placeholder="Profile Image"
              id="image"
            />
            <img alt="kitten" src={kitten} />
          </section>
        </form>
      </div>
    </>
  );
};
