import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderComponent(){

return (
         <>
            <header className='head'>
                 <img className = "logo" src ="./logo192.png" alt='logo'/> 
                 <h1>BILLING MANAGEMENT</h1> 
                 <img className = "banner" src ="./BillingBanner.png" alt='banner'/> 
            </header>
        <div className='navigate'>
        <nav className='navi'>
          <Link to="/">HOME</Link>
          <Link to="/add">ADD RECORDS</Link>
          <Link to="/billable">GET BILLABLE RECORDS</Link>
        </nav>

        </div>
            </>  
        );
    
}
