import React from 'react';
import HomePage from './Home';
import FriendPage from './Friend';
import CoursePage from './Course';
import GroupPage from './Group';
import UserPage from './User';
import GroupInfoPage from './GroupInfo';
import AdminPage from './Admin';

const MainView = ({ currentPage, userID }) => {

    switch (currentPage) {
        case 0:
            return <HomePage userID={userID}/>;
        case 1:
            return <FriendPage userID={userID}/>;
        case 2:
            return <CoursePage userID={userID}/>;
        case 3:
            return <GroupPage userID={userID}/>;
        case 4:
            return <UserPage userID={userID}/>;
        case 5:
            return <AdminPage userID={userID}/>;
        default:
            return null;
    }
};

export default MainView;
