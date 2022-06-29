import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

    const user= useSelector( (state)=> state?.users)
    const {userAuth}= user

    const petsState= useSelector( (state)=> state?.pets)
    const {petLoading, petsMatched}=petsState

   //show dashboard button
const isDashboard=true
        return (
        <>
        <Nav authToken={userAuth} isDashboard={isDashboard}/>
    {petLoading? <LoadingComponent />:
    <section>
        <div className='heading'>
<h4>These are the Pets You Swiped as  Your Favourite. Click on the image for more information</h4>
        </div>
    <div className='favpets'>
        { petsMatched?.map(pet=> 
<div class="infocardContainer" key={pet?._id}>
    <div id="main">
        <img alt="" src={pet?.image}></img>
    </div>
    <div id="textbois">
        <h3>{pet?.name}</h3>
        <p>Friendly to children: {pet?.children}</p>
        <p>Likes cats/dogs/both: {pet?.petTorrelance}</p>
        <p>Gender: {pet?.gender}</p>
        <p>Breed: {pet?.breed}</p>        
        <p>Needs Garden: {pet?.garden}</p>
        <div id="hotlinks">

        </div>
    </div>
</div>


)}

</div>
</section>}
        </>
    );
};
