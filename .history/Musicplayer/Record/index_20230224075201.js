import React from 'react'

const Record = ({ imageUrl = "", isPlaying }) => {
  return (
    <div className={`record${isPlaying ? "" : " record--stopped"} bg-slate-800`}>
      {imageUrl && (
        <img
          className="record__img"
          src={imageUrl}
          alt="album or song artwork"
        />
      )}
      <span className="record__center__black" />
      <span className="record__center__white" />
    </div>
  )
}

export default Record


