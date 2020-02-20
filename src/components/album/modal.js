import React from 'react';
import './modal.scss';

export default function Modal(props) {
  let {src, title, closeModal, prevModalImg, nextModalImg, countImage, allPhotosLength, loadImage, loadModal} = props;
  let stopEvent = function(e) {
    e.stopPropagation();
  };
  
  return (
    <div className="modal-wrap" onClick = {closeModal}>
      {loadModal?<div className="preload"></div>:<div className={loadImage?"modal loadedImage":"modal"} onClick={stopEvent}>
        <div className="modal-prev" onClick = {prevModalImg}></div>
        <div className="modal-next" onClick = {nextModalImg}></div>
        <div className="modal-close" onClick = {closeModal}></div>
        <figure>
          <img src={src} width='600' height='600' alt={title} />
          <figcaption>{title}</figcaption>
        </figure>
        {loadImage?<div className="preload"></div>:null} 
        <div className="modal-count">
          {countImage+1} of {allPhotosLength+1}
        </div>
      </div>
      }
    </div>
  )
}