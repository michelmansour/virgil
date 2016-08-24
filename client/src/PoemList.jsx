import React, { PropTypes } from 'react';
import Poem from './Poem';

const PoemList = ({ data }) => {
  const poemNodes = data.map((poem) => (
    <Poem poem={poem} key={poem.id} />
  ));
  return (
    <div className="poemList" id="mainPoemList">
      {poemNodes}
    </div>
  );
};

PoemList.propTypes = {
  data: PropTypes.arrayOf(Poem.propTypes.poem).isRequired,
};

export default PoemList;
