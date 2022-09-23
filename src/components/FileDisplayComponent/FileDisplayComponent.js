import React, { useState } from 'react';
import './FileDisplayComponent.css';
import { CodeBlock } from 'react-code-blocks';
import axios from 'axios';

const FileDisplayComponent = (file) => {
  const [active, setActive] = useState(false);
  const [code, setCode] = useState('');
  async function openSnippet() {
    setActive(!active);
    setCode((await axios.get(file.raw_url)).data);
  }

  return (
    <div className='FileDisplayComponent'>
      <span className='fileLanguage'> {file.language}</span>
      <button type='button' className='fileName' onClick={openSnippet}>
        {file.filename}
      </button>
      <div className={`snippet ${active === true ? 'active' : ''}`}>
        <CodeBlock text={code} language={file.language} wrapLines />
      </div>
    </div>
  );
};
export default FileDisplayComponent;
