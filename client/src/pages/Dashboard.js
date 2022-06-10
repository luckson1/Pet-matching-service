import React, { useState } from 'react';
import TinderCard from 'react-tinder-card'
import Cat from "../components/images/Cat.jpg"
import Dog from "../components/images/Dog.jpg"
import { PetInfo } from '../components/PetInfo';




const db = [
  {
    name: 'Richard Hendricks',
    url: "../components/images/Dog.jpg",
  },
  {
    name: 'Erlich Bachman',
    url: { Cat }
  },
  {
    name: 'Monica Hall',
    url: { Dog }
  },
  {
    name: 'Jared Dunn',
    url: { Cat }
  },
  {
    name: 'Dinesh Chugtai',
    url: { Dog }
  }
]
export const Dashboard = () => {
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }
  return (
  <div className='dashboard'>
    <div className='pet-container'>
<PetInfo />
    </div>
    <div className='swiper-container'>
      <div className='card-container'>
        {characters.map((character) =>
          <TinderCard 
          className='swipe' 
          key={character.name} 
          onSwipe={(dir) => swiped(dir, character.name)} 
          onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: "url(" + character.url + ")" }} className='card'>
              <h3>{character.name}</h3>
            </div>
            <div className='swipe-info'>
{lastDirection?<p>You swiped {lastDirection}</p>:null}
            </div>
          </TinderCard>
        )}
      </div>

    </div>
  </div>);
};
