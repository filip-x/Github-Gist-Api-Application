import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './GistComponent.css';
import axios from 'axios';
import FileDisplayComponent from '../FileDisplayComponent/FileDisplayComponent';
import UserDisplayComponent from '../UserDisplayComponent/UserDisplayComponent';

const GistComponent = (gistData) => {
  const files = gistData.files;
  const [topUsers, setTopUsers] = useState();
  const forksUrl = gistData.forks_url;
  useEffect(() => {
    const runAsyncEffect = async () => {
      let forkList = [];
      let currPage = 1;
      let result;
      do {
        result = await axios.get(forksUrl + '?page=' + currPage);
        currPage++;
        forkList = forkList.concat(result.data);
      } while (result.data.length > 0);
      //after we get all forks we sort them by creation date and then we extract the users who forked them,
      // then we remove the duplicate users in order to only have distinct users.
      forkList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      const forkedUsers = forkList.map((fork) => fork.owner);
      console.log('How many users before filter:' + forkedUsers.length);
      const uniqueUsers = forkedUsers.filter(
        (item, pos) => forkedUsers.indexOf(item) === pos
      );
      console.log('How many users after filter:' + forkedUsers.length);
      const topThree = uniqueUsers.slice(0, 3);
      setTopUsers(topThree);
    };
    runAsyncEffect();
  }, []);

  //here starts the jsx code
  return (
    <div className='GistComponent'>
      <div className='gistFiles'>
        {Object.entries(files).map(([key, value]) => (
          <FileDisplayComponent {...value} />
        ))}
      </div>
      <div className='users'>
        {topUsers &&
          topUsers.map((user) => (
            <UserDisplayComponent key={Date.now() * Math.random()} {...user} />
          ))}
        {topUsers && topUsers.length === 0 && (
          <span>This Gist has never been forked</span>
        )}
      </div>
    </div>
  );
};
export default GistComponent;
