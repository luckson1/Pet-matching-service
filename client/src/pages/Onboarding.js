import * as Yup from "yup";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Nav } from "../components/navigation/Nav";
import { useDispatch, useSelector } from "react-redux";
import { createProfileAction } from "../redux/usersSlices";
import { useNavigate } from "react-router";
import DisabledButton from "../components/DisabledButton";

const errorSchema = Yup.object().shape({
  petPreference: Yup.string().required("Pet preference Required"),
  children: Yup.string().required("Children Information Required"),
  petOwned: Yup.string().required("Pets Information Required"),
  petAge: Yup.string().required("Pets Information Required"),
  previousPets: Yup.string().required("Previous Pets Information Required"),
  garden: Yup.string().required("Garden Information Required"),
  active: Yup.string().required("This Information is Required"),

});
export const Onboarding = () => {
  // dispatch action of creating a profile

  const dispatch = useDispatch();

  // use formik hook to handle form state
  const formik = useFormik({
    initialValues: {
      petPreference: "",
      children: "",
      petOwned: "",
      previousPets: "",
      garden: "",
      active: "",
      petAge: "",
      image: "",
    },
    validationSchema: errorSchema,
    onSubmit: (values) => {
      dispatch(createProfileAction(values));
    },
  });

  //get state from store
  const user = useSelector((state) => {
    return state?.users;
  });

  const {
    isProfilecreated,
    createProfileLoading,
    createProfileAppErr,
    createProfileServerErr,
  } = user;

  // force navagation to the dashboard page

  const navigate = useNavigate();

  useEffect(() => {
    if (isProfilecreated) {
      return navigate("/dashboard");
    }
  }, [isProfilecreated, navigate]);

  return (
    <>
      <Nav />
      <div className="onboarding h-11/12 w-11/12 md:w-8/12 bg-indigo-50 shadow-2xl mt-24 rounded-xl mx-auto text-xs md:text-sm">
        <h2>CREATE PROFILE</h2>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <section>
           
            <label htmlFor="petPreference">What pet are you hoping to adopt?</label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.petPreference && formik.errors.petPreference}
            </div>
            <div className="multiple-input-container">
              <input
                id="cats"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petPreference", "cats");
                }}
                onBlur={formik.handleBlur("petPreference")}
                type="radio"
                checked={formik.values.petPreference === "cats"}
              />
              <label htmlFor="cats">A cat</label>

              <input
                id="dogs"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petPreference", "dogs");
                }}
                onBlur={formik.handleBlur("petPreference")}
                type="radio"
                checked={formik.values.petPreference === "dogs"}
              />
              <label htmlFor="dogs">A Dog</label>

              <input
                id="any"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petPreference", "any");
                }}
                onBlur={formik.handleBlur("petPreference")}
                type="radio"
                checked={formik.values.petPreference === "any"}
              />
              <label htmlFor="any">Any</label>
            </div>
            <label htmlFor="children">
              Do You Have Children?
            </label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.children && formik.errors.children}
            </div>
            <div className="multiple-input-container">
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
              <label htmlFor="yes-children">Yes, some below 8 years</label>

              <input
                id="Yes-older-children"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("children", "Yes above 8");
                }}
                onBlur={formik.handleBlur("children")}
                type="radio"
                checked={formik.values.children === "Yes above 8"}
              />
              <label htmlFor="Yes-older-children">Yes, all above 8 years</label>
            </div>
            <label htmlFor="pets-owned">Do You Currently Own Any Pets?</label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.petOwned && formik.errors.petOwned}
            </div>
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
              <label htmlFor="both-owned">Cat&Dog</label>
            </div>
            <label htmlFor="pets-Prev-owned">Have you owned any pet in the past?</label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.previousPets && formik.errors.previousPets}
            </div>
            <div className="multiple-input-container">
              <input
                id="cats-prev-pets"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("previousPets", "cat");
                }}
                onBlur={formik.handleBlur("previousPets")}
                type="radio"
                checked={formik.values.previousPets === "cat"}
              />
              <label htmlFor="cats-prev-pets">Cat/(s)</label>

              <input
                id="dogs-prev-pets"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("previousPets", "dog");
                }}
                onBlur={formik.handleBlur("previousPets")}
                type="radio"
                checked={formik.values.previousPets === "dog"}
              />
              <label htmlFor="dogs-prev-pets">Dog/(s)</label>

              <input
                id="none-prev-pets"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("previousPets", "none");
                }}
                onBlur={formik.handleBlur("previousPets")}
                type="radio"
                checked={formik.values.previousPets === "none"}
              />
              <label htmlFor="none-prev-pets">none</label>

              <input
                id="both-prev-pets"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("previousPets", "both");
                }}
                onBlur={formik.handleBlur("previousPets")}
                type="radio"
                checked={formik.values.previousPets === "both"}
              />
              <label htmlFor="both-prev-pets">Both</label>
            </div>
            <label htmlFor="garden">Do You Have a Garden?</label>
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
              <label htmlFor="yes-garden">Yes, Private Garden</label>
              <input
                id="yes-garden-shared"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("garden", "shared");
                }}
                onBlur={formik.handleBlur("garden")}
                type="radio"
                checked={formik.values.garden === "shared"}
              />
              <label htmlFor="yes-garden-shared">Yes, Shared Garden</label>

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
              Will You Involve Your Pet in a Very active Lifestyle?{" "}
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
              <label htmlFor="yes-active">Yes, We Will Jog Together</label>

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
              <label htmlFor="No-active">No, Walks are Fine</label>
            </div>
            <label>What pet age group do you prefer?</label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.petAge && formik.errors.petAge}
            </div>
            <div className="multiple-input-container">
              <input
                id="senior"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petAge", "senior");
                }}
                onBlur={formik.handleBlur("petAge")}
                type="radio"
                checked={formik.values.petAge === "senior"}
              />
              <label htmlFor="senior">Senior</label>
              <input
                id="adult"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petAge", "adult");
                }}
                onBlur={formik.handleBlur("petAge")}
                type="radio"
                checked={formik.values.petAge === "adult"}
              />
              <label htmlFor="adult">Adult</label>

              <input
                id="young"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petAge", "kitten/puppy");
                }}
                onBlur={formik.handleBlur("petAge")}
                type="radio"
                checked={formik.values.petAge === "kitten/puppy"}
              />
              <label htmlFor="young">Kitten/puppy</label>
              <input
                id="any-age"
                value={undefined}
                onChange={() => {
                  formik.setFieldValue("petAge", "any");
                }}
                onBlur={formik.handleBlur("petAge")}
                type="radio"
                checked={formik.values.petAge === "any"}
              />
              <label htmlFor="any-age">Any</label>
            </div>

            <label htmlFor="image">Profile Pic (Optional)</label>
            {/* errors */}
            <div className="form-validation">
              {formik.touched.image && formik.errors.image}
            </div>

            <input
            id="image"
              name="image"
              value={undefined}
              onChange={(e) =>
                formik.setFieldValue("image", e.currentTarget.files[0])
              }
              onBlur={formik.handleBlur("image")}
              type="file"
            />

            {createProfileLoading ? (
              <DisabledButton />
            ) : (
              <input type="submit" className="bg-violet-200" />
            )}
          </section>
          {createProfileServerErr || createProfileAppErr ? (
            <div className="form-validation" role="alert">
              {createProfileServerErr} {createProfileAppErr}
            </div>
          ) : null}
          <section></section>
        </form>
        
      </div>
    </>
  );
};
