import React from 'react';
import {Link} from "react-router-dom";
import Album from './album';
import ScrollToTopOnMount from '../services';
import '../photogalery.scss';
import './userAlbum.scss';

export default function UserAlbums(props) {
  let {users, albums, photos, match} = props;
  users = users.filter((el)=>el.username == match.params.id);
  albums = albums.filter(el=>el.userId == users[0].id);

  return (
    <div className="photogalery">
      <ScrollToTopOnMount />
      <div className="back">
        <Link to={'/'} >Back to authors selection</Link>
      </div>
      <h1>{users[0].name}</h1>
      <div className="album-list">
        {
          albums.length?albums.map(el=>{
            return (
              <Album key = {el.id} title={el.title} id = {el.id} photos = {photos} users = {users} />
            )
          }):<div className='noItems'>Photographers has no albums yet</div>
        }
      </div>
      <div className="back">
        <Link to={'/'} >Back to authors selection</Link>
      </div>
    </div>
  )
}