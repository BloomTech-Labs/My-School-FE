import React, { useEffect } from 'react';
import TopNav from './Dashboards/Nav/TopNav';

const MainLayout = props => {
    const Page = props.page; 

    useEffect(() => {
        console.log("main layout mounts")
    }, [])

    return (
        <>
            <TopNav />
            {Page}
        </>
    )
}

export default MainLayout;