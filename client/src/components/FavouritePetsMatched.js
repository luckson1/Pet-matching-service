import React from 'react'

export default function FavouritePetsMatched({petsMatched}) {

  return (
    <div className='favpets'>
    {petsMatched?.map(pet =>
        <div className="infocardContainer" key={pet?._id}>
            <div id="main">
                <img alt="" src={pet?.image}></img>
            </div>
            <div id="textbois" className='text-xs px-2 py-8 text-slate-00'>
                <h3 className='text-lg'>{pet?.name}</h3>
                <p>Friendly to a child: {pet?.children}</p>
                <p>Likes cats/dogs: {pet?.petTorrelance}</p>
                <p>Gender: {pet?.gender}</p>
                <p>Breed: {pet?.breed}</p>
                <p>Needs Garden: {pet?.garden}</p>
            </div>
        </div> )}

</div>
  )
}
