import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ScrollToTopOnMount from '../services';
import Modal from './modal';
import '../photogalery.scss';
import './albumPhoto.scss';

export default class AlbumPhoto extends Component {
  constructor(props) {
    super(props);
    let {users, albums, photos, match} = this.props;
    users = users.filter(el=>el.username == match.params.id);
    albums = albums.filter(el=>el.userId == users[0].id);
    albums = albums.filter(el=>el.title == match.params.subId.replace(/_/g, ' '));
    photos = photos.filter(el=>el.albumId == albums[0].id);
    this.state = {
      isModal: false,
      idModalPhotos: null,
      urlModalPhoto: null,
      titleModalPhoto: null,
      allPhotosLength: (photos.length-1),
      countImage: null,
      photos,
      users,
      albums
    }
    this.modal = this.modal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.prevModalImg = this.prevModalImg.bind(this);
    this.nextModalImg = this.nextModalImg.bind(this);
  }
  prevModalImg() {
    let {idModalPhotos, photos, allPhotosLength} = this.state;
    let countModalPhoto = photos.findIndex(el=>el.id == idModalPhotos) - 1;

    if(countModalPhoto<0) {
      this.setState({
        countImage: allPhotosLength,
        idModalPhotos: photos[allPhotosLength].id,
        urlModalPhoto: photos[allPhotosLength].url,
        titleModalPhoto: photos[allPhotosLength].title
      });
    } else {
      this.setState({
        countImage: countModalPhoto,
        idModalPhotos: photos[countModalPhoto].id,
        urlModalPhoto: photos[countModalPhoto].url,
        titleModalPhoto: photos[countModalPhoto].title
      });
    }
  }
  nextModalImg() {
    let {idModalPhotos, photos, allPhotosLength} = this.state;
    let countModalPhoto = photos.findIndex(el=>el.id == idModalPhotos) + 1;

    if(countModalPhoto>allPhotosLength) {
      this.setState({
        countImage: 0,
        idModalPhotos: photos[0].id,
        urlModalPhoto: photos[0].url,
        titleModalPhoto: photos[0].title
      });
    } else {
      this.setState({
        countImage: countModalPhoto,
        idModalPhotos: photos[countModalPhoto].id,
        urlModalPhoto: photos[countModalPhoto].url,
        titleModalPhoto: photos[countModalPhoto].title
      });
    }
  }
  closeModal() {
    let body = document.getElementsByTagName('body');
    body[0].style.overflow = 'visible';
    this.setState({
      isModal: false,
    });
  }
  modal(e) {
    e.preventDefault();
    let body = document.getElementsByTagName('body');
    let {photos} = this.state;
    let idModalPhotos = e.target.getAttribute('data-id');
    let modalPhoto = photos.filter(el=>el.id == idModalPhotos);
    let countModalPhoto = photos.findIndex(el=>el.id == idModalPhotos);
    let urlModalPhoto = modalPhoto[0].url;
    let titleModalPhoto = modalPhoto[0].title;
    this.setState({
      isModal: true,
      idModalPhotos,
      urlModalPhoto,
      titleModalPhoto,
      countImage: countModalPhoto
    });
    body[0].style.overflow = 'hidden';
  }
  render() {
    let {isModal, photos, titleModalPhoto, urlModalPhoto, idModalPhotos, users, albums, countImage, allPhotosLength} = this.state;
    return (
      <div className="photogalery">
        <ScrollToTopOnMount />
        {isModal?<Modal src = {urlModalPhoto} key={idModalPhotos} title = {titleModalPhoto} closeModal = {this.closeModal} prevModalImg = {this.prevModalImg} nextModalImg = {this.nextModalImg} countImage ={countImage} allPhotosLength = {allPhotosLength} />:null}
        <div className="back">
          <Link to={`/photographer/${users[0].username}`} >Back to {users[0].name} albums</Link>
        </div>
        <h1>Album - {albums[0].title}</h1>
        <div className="photo-list">
          {
            photos.length?photos.map(el=><div className='photo-list-item' key={el.id} onClick={this.modal}><img src={el.thumbnailUrl} alt={el.title} data-id={el.id} /></div>):<div className='noItems'>Photographer has no photos yet</div>
          }
        </div>
        <div className="back">
          <Link to={`/photographer/${users[0].username}`} >Back to {users[0].name} albums</Link>
        </div>
      </div>
    )
  }
}
