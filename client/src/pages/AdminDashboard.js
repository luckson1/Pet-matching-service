import React from 'react';
import { Nav } from '../components/Nav2';
export const AdminDashboard = () => {
    const authToken=true
    return(
    <section>
        <Nav authToken={authToken}/>

    </section>);
};
