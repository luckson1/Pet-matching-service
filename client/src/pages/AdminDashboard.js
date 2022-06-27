import React from 'react';
import {  Nav2 } from '../components/navigation/Nav2';
export const AdminDashboard = () => {
    const authToken=true
    return(
    <section>
        <Nav2 authToken={authToken}/>
        <div className="stats">

        </div>

    </section>);
};
