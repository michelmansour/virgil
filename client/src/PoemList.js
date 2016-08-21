import React from 'react';
import Poem from './Poem';

const PoemList = ({ data }) => {
  let poemNodes = data.map(function (poem) {
    return (
      <Poem poem={poem} key={poem.id} />
    );
  });
  return (
    <div className="poemList" id='mainPoemList'>
      {poemNodes}
    </div>
  );
};

export default PoemList;
