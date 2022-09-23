import React from 'react';
import PropTypes from 'prop-types';
import './UserDisplayComponent.css';

const UserDisplayComponent = (user) => (
  <div className='UserDisplayComponent'>
    <img className='userAvatar' src={user.avatar_url} />
    <span className='userName'>{user.login}</span>
  </div>
);

export default UserDisplayComponent;
