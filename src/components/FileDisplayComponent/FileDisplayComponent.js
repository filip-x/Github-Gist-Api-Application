import React from 'react';
import PropTypes from 'prop-types';
import './FileDisplayComponent.css';

const FileDisplayComponent = (file) => (
  <div className='FileDisplayComponent'>
    <span className='fileLanguage'> {file.language}</span>
    <span className='fileName'>{file.filename}</span>
  </div>
);
export default FileDisplayComponent;
