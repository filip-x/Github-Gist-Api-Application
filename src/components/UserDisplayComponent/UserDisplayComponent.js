import React from 'react';
import './UserDisplayComponent.css';

const UserDisplayComponent = (user) => (
  <div className='UserDisplayComponent'>
    <img className='userAvatar' src={user.avatar_url} />
    <span className='userName'>{user.login}</span>
  </div>
);

export default UserDisplayComponent;
