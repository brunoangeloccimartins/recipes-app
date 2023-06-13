import PropTypes from 'prop-types';
import React from 'react';
import ReactPlayer from 'react-player';

function YouTubePlayer({ test, videoUrl }) {
  return <ReactPlayer url={ videoUrl } data-testid={ test } />;
}

YouTubePlayer.propTypes = {
  test: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
};

export default YouTubePlayer;
