import React from 'react';
import './modal.scss';

export default function Modal(props) {
  let {src, title, closeModal, prevModalImg, nextModalImg, countImage, allPhotosLength} = props;
  let stopEvent = function(e) {
    e.stopPropagation();
  };
  return (
    <div className="modal-wrap" onClick = {closeModal}>
      <div className="modal" onClick={stopEvent}>
        <div className="modal-prev" onClick = {prevModalImg}></div>
        <div className="modal-next" onClick = {nextModalImg}></div>
        <div className="modal-close" onClick = {closeModal}></div>
        <figure>
          <img src={src} width='600' height='600' alt={title} />
          <figcaption>{title}</figcaption>
        </figure>
        <div className="modal-count">
          {countImage+1} of {allPhotosLength+1}
        </div>
      </div>
    </div>
  )
}