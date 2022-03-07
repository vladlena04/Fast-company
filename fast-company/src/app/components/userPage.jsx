import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import Comments from "./comments";
import UserCard from "./userCard";
import QualitiesCard from "./qualitiesCard";
import MeetingsCard from "./meetingsCard";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [allUsers, setAllUsers] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.users.fetchAll().then((data) => setAllUsers(data));
    }, []);

    return (
        user && allUsers
            ? (
                <div className='container'>
                    <div className='row gutters-sm'>
                        <div className='col-md-4 mb-3'>
                            <UserCard user={user}></UserCard>
                            <QualitiesCard data={user.qualities}></QualitiesCard>
                            <MeetingsCard value={user.completedMeetings}></MeetingsCard>
                        </div>
                        <div className='col-md-8'>
                            <Comments />
                        </div>
                    </div>
                </div>)
            : (<div className='d-flex justify-content-center'>Загрузка данных о пользователе</div>)
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;