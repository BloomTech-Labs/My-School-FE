import React from 'react';
import TopNav from './Dashboards/Nav/TopNav';

const MainLayout = props => {
    const Page = props.page; 

    return (
        <>
            <TopNav />
            {Page}
        </>
    )
}

export default MainLayout;