import React from 'react';
export const PetInfo = () => {
    return(
    <div className='pet'>
        <div className='pet-header'>
            <h4>Jojo 5 year old </h4>
            <h4> Female Local Breed</h4>

        </div>
        <div className='pet-details'>
            <p><i class="bi bi-emoji-smile"></i> I am friendly to kinds below 8 years</p>
            <p><i class="bi bi-emoji-smile"></i> I am shy with strangers but quickly warm up</p>
            <p><i class="bi bi-emoji-smile"></i> I can live comfortably with other dogs in the homestead</p>
            <p><i class="bi bi-emoji-smile"></i> I would prefer a homeastead with a garden</p>

        </div>
        <div className='pet-background'>
<h4>Backgroud: </h4>
<p> I was rescued from Kibra with my siblings and we were the lucky ones as only 6 of the 16 could be taken.</p>
        </div>

    </div>);
};
