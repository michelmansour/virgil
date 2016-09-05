import React, { PropTypes } from 'react';
import { requestWithAuth } from './auth';
import Poem from './Poem';
import CommentListContainer from './CommentListContainer';

class PoemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poem: {
        id: -1,
        title: '',
        author: '',
        text: '',
      },
      comments: [],
    };
  }

  componentDidMount = () => {
    this.fetchPoem();
  };

  fetchPoem = () => {
    const fetchPoemUrl = `/api/poem/${this.props.params.poemId}`;
    requestWithAuth({
      url: fetchPoemUrl,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({ poem: data });
      },
      error: (xhr, status, err) => {
        console.error(fetchPoemUrl, status, err.toString());
      },
    });
  };

  render = () => (
    <div className="poemContainer">
      <Poem poem={this.state.poem} />
      <CommentListContainer url={`/api/comments/${this.props.params.poemId}`} pollInterval={2000} />
    </div>
  );
}

PoemContainer.propTypes = {
  params: PropTypes.object.isRequired,
};

export default PoemContainer;
