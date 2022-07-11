import { ErrorMessage } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorDisplayMessage from '../components/ErrorDisplayMessage';
import LoadingComponent from '../components/LoadingSpinner';
import { Nav } from '../components/navigation/Nav';
import { fetchMatchedPetsAction } from '../redux/petsSlices';

export const FavouritePets = () => {
    // dispatch action to fetch
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMatchedPetsAction())
    }, [dispatch])

    //get state from store

    const user = useSelector((state) => state?.users)
    const { userAuth } = user

    const petsState = useSelector((state) => state?.pets)
    const { petLoading, petsMatched, petServerErr, petAppErr } = petsState

    //show dashboard button
    const isDashboard = true
    return (
        <>
            <Nav authToken={userAuth} isDashboard={isDashboard} />
            {petLoading ? <LoadingComponent />
                : petServerErr || petAppErr ? <ErrorDisplayMessage>Error</ErrorDisplayMessage>
                    : petsMatched?.length === 0 ? <h3>No Pets to display</h3>
                        : <section>
                            <div className='heading'>
                                <h4>These are the Pets You Swiped as  Your Favourite. Click on the image for more information</h4>
                            </div>
                            <div className='favpets'>
                                {petsMatched?.map(pet =>
                                    <div class="infocardContainer" key={pet?._id}>
                                        <div id="main">
                                            <img alt="" src={pet?.image}></img>
                                        </div>
                                        <div id="textbois">
                                            <h3>{pet?.name}</h3>
                                            <p>Friendly to a child: {pet?.children}</p>
                                            <p>Likes cats/dogs: {pet?.petTorrelance}</p>
                                            <p>Gender: {pet?.gender}</p>
                                            <p>Breed: {pet?.breed}</p>
                                            <p>Needs Garden: {pet?.garden}</p>
                                        </div>
                                    </div> )}

                            </div>
                        </section>}
        </>
    );
};
