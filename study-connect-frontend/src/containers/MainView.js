import React from 'react';
import HomePage from './Home';
import FriendPage from './Friend';
import CoursePage from './Course';
import GroupPage from './Group';
import UserPage from './User';

const MainView = ({ currentPage }) => {

    switch (currentPage) {
        case 0:
        return <HomePage />;
        case 1:
        return <FriendPage />;
        case 2:
        return <CoursePage />;
        case 3:
        return <GroupPage />;
        case 4:
            return <UserPage />;
        default:
        return null;
    }
};

export default MainView;
