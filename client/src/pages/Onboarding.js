import * as Yup from 'yup'
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { Nav } from '../components/navigation/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { createProfileAction } from '../redux/usersSlices';
import { useNavigate } from 'react-router';
import DisabledButton from '../components/DisabledButton';




const errorSchema = Yup.object().shape({

    gender: Yup
        .string()
        .required('Gender Required'),
    petPreference: Yup
        .string()
        .required('Pet preference Required'),
    children: Yup
        .string()
        .required('Children Information Required'),
    petOwned: Yup
        .string()
        .required('Pets Information Required'),
    garden: Yup
        .string()
        .required('Garden Information Required'),
    active: Yup
        .string()
        .required('This Information is Required'),
    about: Yup.string()
        .min(20, 'About Me Information is Too Short!')
        .max(1000, 'About Me Information is Too Long!')
        .required('About Me Information is Required'),

});
export const Onboarding = () => {
    // dispatch action of creating a profile

    const dispatch = useDispatch()



    // use formik hook to handle form state 
    const formik = useFormik({
        initialValues: {
        
            gender: '',
            petPreference: "",
            children: "",
            petOwned: "",
            garden: "",
            active: "",
            about: "",
            image: ""

        },
        validationSchema: errorSchema,
        onSubmit: values => {
            dispatch(createProfileAction(values))
        },
    });


    //get state from store 
    const user = useSelector((state) => {
        return state?.users
    })

    const { isProfilecreated, createProfileLoading, createProfileAppErr, createProfileServerErr} = user

// force navagation to the dashboard page

const navigate=useNavigate();

useEffect(() => {
    if (isProfilecreated) {
      return navigate('/dashboard')
    }
  }, [isProfilecreated, navigate])

    return (<>
        <Nav
            authToken />
        <div className='onboarding'>
            <h2>CREATE PROFILE</h2>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <section>

                    <label>Select Your Gender</label>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.gender && formik.errors.gender}
                    </div>

                    <div className='multiple-input-container'>
                        <input
                            id='male'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('gender', "male") }}
                            onBlur={formik.handleBlur("gender")}
                            type="radio"
                            checked={formik.values.gender === "male"}

                        />

                        <label htmlFor="male">Male</label>

                        <input
                            id='female'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('gender', "female") }}
                            onBlur={formik.handleBlur("gender")}
                            type="radio"
                            checked={formik.values.gender === "female"}

                        />
                        <label htmlFor="female">Female</label>

                    </div>
                    <label htmlFor="petPreference">What is Your Pets Preference</label>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.petPreference && formik.errors.petPreference}
                    </div>
                    <div className='multiple-input-container'>

                        <input
                            id='cats'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('petPreference', "cats") }}
                            onBlur={formik.handleBlur("petPreference")}
                            type="radio"
                            checked={formik.values.petPreference === "cats"}

                        />
                        <label htmlFor="cats">Cats</label>


                        <input
                            id='dogs'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('petPreference', "dogs") }}
                            onBlur={formik.handleBlur("petPreference")}
                            type="radio"
                            checked={formik.values.petPreference === "dogs"}

                        />
                        <label htmlFor="dogs">Dogs</label>

                        <input
                            id='any'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('petPreference', "any") }}
                            onBlur={formik.handleBlur("petPreference")}
                            type="radio"
                            checked={formik.values.petPreference === "any"}

                        />
                        <label htmlFor="any">Any</label>


                    </div>
                    <label htmlFor="children">Do You Have Children below 10 Years?</label>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.children && formik.errors.children}
                    </div>
                    <div className='multiple-input-container'>

                        <input
                            id='yes-children'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('children', "yes") }}
                            onBlur={formik.handleBlur("children")}
                            type="radio"
                            checked={formik.values.children === "yes"}

                        />
                        <label htmlFor="yes-children">Yes</label>

                        <input
                            id='No-children'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('children', "no") }}
                            onBlur={formik.handleBlur("children")}
                            type="radio"
                            checked={formik.values.children === "no"}

                        />
                        <label htmlFor="No-children">No</label>

                    </div>
                    <label htmlFor="pets-owned">Do You Currently Own Any Pets?</label>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.petOwned && formik.errors.petOwned}
                    </div>
                    <div className='multiple-input-container'>

                        <input
                            id='cats-owned'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('petOwned', "cat") }}
                            onBlur={formik.handleBlur("petOwned")}
                            type="radio"
                            checked={formik.values.petOwned === "cat"}

                        />
                        <label htmlFor="cats-owned">Cat/(s)</label>


                        <input
                            id='dogs-owned'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('petOwned', "dog") }}
                            onBlur={formik.handleBlur("petOwned")}
                            type="radio"
                            checked={formik.values.petOwned === "dog"}

                        />
                        <label htmlFor="dogs-owned">Dog/(s)</label>

                        <input
                            id='none-owned'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('petOwned', "none") }}
                            onBlur={formik.handleBlur("petOwned")}
                            type="radio"
                            checked={formik.values.petOwned === "none"}

                        />
                        <label htmlFor="none-owned">none</label>

                        <input
                            id='both-owned'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('petOwned', "both") }}
                            onBlur={formik.handleBlur("petOwned")}
                            type="radio"
                            checked={formik.values.petOwned === "both"}

                        />
                        <label htmlFor="both-owned">Both</label>


                    </div>
                    <label htmlFor="garden">Do You Have a Garden?</label>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.garden && formik.errors.garden}
                    </div>
                    <div className='multiple-input-container'>

                        <input
                            id='yes-garden'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('garden', "yes") }}
                            onBlur={formik.handleBlur("garden")}
                            type="radio"
                            checked={formik.values.garden === "yes"}

                        />
                        <label htmlFor="yes-garden">Yes</label>


                        <input
                            id='No-garden'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('garden', "no") }}
                            onBlur={formik.handleBlur("garden")}
                            type="radio"
                            checked={formik.values.garden === "no"}

                        />
                        <label htmlFor="No-garden">No</label>

                    </div>
                    <label htmlFor="active">Will You Involve Your Pet in a Very active Lifestyle? </label>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.active && formik.errors.active}
                    </div>
                    <div className='multiple-input-container'>

                        <input
                            id='yes-active'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('active', "yes") }}
                            onBlur={formik.handleBlur("active")}
                            type="radio"
                            checked={formik.values.active === "yes"}

                        />
                        <label htmlFor="yes-active">Yes, We Will Jog Together</label>


                        <input
                            id='No-active'
                            value={undefined}
                            onChange={() => { formik.setFieldValue('active', "no") }}
                            onBlur={formik.handleBlur("active")}
                            type="radio"
                            checked={formik.values.active === "no"}

                        />
                        <label htmlFor="No-active">No, Walks are Fine</label>


                    </div>
                    <label >About Me</label>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.about && formik.errors.about}
                    </div>
                    <textarea
                        id='about'
                        value={formik.values.about}
                        onChange={formik.handleChange("about")}
                        onBlur={formik.handleBlur("about")}
                        type="textarea"
                        placeholder="I like long walks......."
                    />



                    <label

                        htmlFor="about">
                        Profile Pic (Optional)
                    </label>
                    {/* errors */}
                    <div className="form-validation">
                        {formik.touched.image && formik.errors.image}
                    </div>

                    <input
                        name="image"
                        value={undefined}
                        onChange={(e) =>
                            formik.setFieldValue('image', e.currentTarget.files[0])
                        }
                        onBlur={formik.handleBlur("image")}

                        type="file"
                        placeholder="Profile Image"
                        id="image"
                    />


                    {createProfileLoading?<DisabledButton />:<input type="submit" />}

                </section>
{createProfileServerErr || createProfileAppErr?  <div className="form-validation" role="alert">
{createProfileServerErr} {createProfileAppErr}
</div>: null}
                <section>


                </section>

            </form>
        </div>
    </>);


};
