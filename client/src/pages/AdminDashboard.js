import React from 'react';
import { Nav } from '../components/navigation/Nav2';
export const AdminDashboard = () => {
    const authToken=true
    return(
    <section>
        <Nav authToken={authToken}/>
        <div className="stats">

        </div>

    </section>);
};
