import React from 'react';
import {Link} from "react-router-dom";
import './album.scss';

export default function Album(props) {
  let {title, id, photos, users} = props;
  photos = photos.filter(el=>el.albumId==id)

  return (
    <div className="album">
      <Link to={`/photographer/${users[0].username}/${title.replace(/ /g,'_')}`} >
        <img src={photos[0].url} width='600' height='600' alt={photos[0].title} />
        <span className='album-title'>{title}</span>
        <span className='album-contains'>album contains - {photos.length} photos</span>
      </Link>
    </div>
  )
}
