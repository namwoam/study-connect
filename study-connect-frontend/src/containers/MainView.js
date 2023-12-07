import React from 'react';
import HomePage from './Home';
import CoursePage from './Course';

const MainView = ({ currentPage }) => {

    switch (currentPage) {
        case 0:
        return <HomePage />;
        // case 1:
        // return <FriendPage />;
        case 2:
        return <CoursePage />;
        // case 3:
        // return <GroupPage />;
        default:
        return null;
    }
};

export default MainView;
