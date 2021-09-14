import React from "react";

function VideoPlayer(props) {
  const { url, channel, description } = props.currentVideo;

  const goToChannel = () => {
    window.open(`https://www.youtube.com/channel/${channel.id}`, '_blank');
  }

  return (
    <div className="row my-3">

      <div className="col-7">
        <iframe className="w-100" style={{ height: '50vh' }}
          src={url + '?autoplay=1'}
          allowFullScreen allow="autoplay"></iframe>
      </div>

      <div className="col-5">
        <div className="row align-items-center">
          <div className="col-2 p-0 overflow-hidden rounded-circle">
            <img className="w-100 cursor-pointer" src={channel.thumbnail} onClick={goToChannel} />
          </div>
          <div className="col-10" style={{ textAlign: 'left' }}>
            <span className="cursor-pointer" onClick={goToChannel}>{channel.title}</span>
          </div>
        </div>

        <hr className="my-2" />

        <div className="row">
          <div className="col-12" style={{ textAlign: 'left' }}>
            <p>{description}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default VideoPlayer;