import React, { useReducer, useRef, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import YTAPI from './class/YTAPI';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';
import ErrorBoundary from './components/ErrorBoundary';


export const VideoContext = React.createContext();

function App() {
  const [currentVideo, setCurrentVideo] = useState({});
  const searchBarRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setVideoList':
        return { videos: action.videos, nextPageToken: action.nextPageToken };
      case 'appendVideoList':
        return { videos: state.videos.concat(action.videos), nextPageToken: action.nextPageToken };
      default:
        return state;
    }
  };
  const [videoList, dispatchVideoList] = useReducer(reducer, { videos: [], nextPageToken: null });


  const searchVideo = searchText => {
    YTAPI.query(searchText)
      .then(response => {
        setErrorMessage(null);

        dispatchVideoList(
          {
            type: 'setVideoList',
            videos: YTAPI.queryResult(response),
            nextPageToken: YTAPI.getNextPageToken(response)
          }
        );
        setCurrentVideo({});
      })
      .catch(error => setErrorMessage(YTAPI.errorMessage(error)));
  };

  const loadMoreVideo = (onDone) => {
    if (!searchBarRef.current || !videoList.nextPageToken) // stop loading
      return;

    const searchText = searchBarRef.current.state.search;
    YTAPI.query(searchText, videoList.nextPageToken)
      .then(response => {
        setErrorMessage(null);

        if (onDone && typeof onDone === 'function')
          onDone();

        dispatchVideoList({
          type: 'appendVideoList',
          videos: YTAPI.queryResult(response),
          nextPageToken: YTAPI.getNextPageToken(response)
        });
      })
      .catch(error => setErrorMessage(YTAPI.errorMessage(error)));
  };

  const playVideo = url => {
    const [video] = videoList.videos.filter(video => video.url === url); // find video

    if (!video) {
      setErrorMessage('Video not found');
      return;
    }

    YTAPI.channel(video.channel.id) // get channel thumbnail
      .then(response => {
        setErrorMessage(null);
        const channel = YTAPI.channelResult(response);
        setCurrentVideo({ ...video, channel: channel });
      })
      .catch(error => setErrorMessage(YTAPI.errorMessage(error)));
  };

  return (
    <div id="div-app" className="App container py-2">
      <ErrorBoundary>
        <SearchBar searchVideo={searchVideo} ref={searchBarRef} />
        {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

        {currentVideo.url && <VideoPlayer currentVideo={currentVideo} />}
        <VideoContext.Provider value={playVideo}>
          <VideoList videoList={videoList.videos} loadMoreVideo={loadMoreVideo} currentVideo={currentVideo} />
        </VideoContext.Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
