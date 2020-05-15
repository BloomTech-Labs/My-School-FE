import React from  'react';


export default function TopNav() {
    return (
      <nav className="top-nav">
          {/* logo link to landing page or login? */}
          <a href="http://www.myschoolathome.io"><img url="..\mySchoolLogo.svg" /></a>

          {/* Image linked to current user account */}
          <img alt="user avatar"/>

          {/* Name linked to current user account */}
          <span alt="user name">{}</span>

          {/* Gear icon for parent users -- route to account settings */}

          {/* Breadcrumb? */}
      </nav>
    );
  }