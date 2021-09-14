import React, { useContext } from "react";
import { VideoContext } from '../App';

const cssEllipsis = {
    display: 'block',
    width: '100%',
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
};

const cssNowPlaying = {
    position: 'absolute',
    top: 0,
    left: 0,
    color: 'white'
};

const classNowPlayingBorder = 'border border-3 border-danger';

function VideoListItem(props, ref) {
    const playVideo = useContext(VideoContext); // to get playVideo() from App.js
    const handleClickVideo = () => {
        playVideo(props.url);
    };

    // main render element
    const videoItem = (
        <div ref={ref}
            className={`row my-2 py-1 video-list-item ${props.nowPlaying ? classNowPlayingBorder : ''}`}
            onClick={handleClickVideo}>
            <div className="col-12">
                <img src={props.thumbnail} className="w-100" />
            </div>
            <div className="col-12" style={{ textAlign: "left" }}>
                <span className="m-0" title={props.title}
                    style={{ ...cssEllipsis, maxHeight: '1.6rem' }}>{props.title}</span>
                <small title={props.channel}
                    style={cssEllipsis}>{props.channel}</small>
            </div>
        </div>
    );

    // wrap element to label this video item as "Now Playing"
    const labelNowPlaying = (item) => (
        <div className="position-relative">
            <span className="bg-danger px-1 rounded" style={cssNowPlaying}>Now Playing</span>
            {item}
        </div>
    );

    // if this video is currently playing, labelled as "Now Playing"
    return (props.nowPlaying ? labelNowPlaying(videoItem) : videoItem);
}

export default React.forwardRef(VideoListItem); // to get "ref" from VideoList.js