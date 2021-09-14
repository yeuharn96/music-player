import React, { useRef, useEffect, useState } from "react";
import VideoListItem from "./VideoListItem";

function VideoList(props) {
    const { videoList, currentVideo } = props;
    const lastItemRef = useRef(null);
    const observer = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (lastItemRef.current) {
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    // console.log('get next page');
                    setIsLoading(true)
                    props.loadMoreVideo(() => setIsLoading(false));
                }
            });

            observer.current.observe(lastItemRef.current);
        }

        return () => {
            if (observer.current)
                observer.current.disconnect();
        } // remove observer on DOM unmount
    }, [lastItemRef.current]);

    return (
        <div className="row mt-2">
            {
                videoList.map((video, index) =>
                    <div className="col-2" key={video.url + index}>
                        <VideoListItem
                            ref={videoList.length === index + 1 ? lastItemRef : null}
                            url={video.url}
                            thumbnail={video.thumbnail}
                            title={video.title}
                            channel={video.channel.title}
                            nowPlaying={currentVideo.url === video.url} />
                    </div>
                )
            }
            {
                isLoading &&
                <div className="col-2 my-auto text-center">
                    <div className="spinner-border" role="status"></div>
                    Loading...
                </div>
            }
        </div>
    )
}

export default VideoList;