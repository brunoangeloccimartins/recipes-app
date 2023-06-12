import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import YouTubePlayer from 'youtube-player';

function YoutubePlayer({ videoUrl }) {
//   const playerRef = useRef(null);

  //   const getVideoIdFromUrl = (url) => {
  //     const videoIdMatch = url.match(/(?:[?&]v=|\/embed\/|\/v\/|\.be\/|\/user\/\w+\/|\/videos\/|embed\/|youtu.be\/|\/v=|v\/|e\/|y\/|u\/\w+\/|\/embed\/|youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|youtu.be\/|\/v\/|e\/|y\/|u\/\w+\/|watch\?v=|\&v=)([^#\&\?]*).*/);
  //     return videoIdMatch && videoIdMatch[1];
  //   };

  useEffect(() => {
    const player = YouTubePlayer('youtube-player');

    player.on('ready', () => {
      player.playVideo();
      player.requestFullscreen();
      player.setPlaybackQuality('hd720');
    });

    return () => {
      player.destroy();
    };
  }, [videoUrl]);

  return <div id="youtube-player" />;
}

YoutubePlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
};

export default YoutubePlayer;
